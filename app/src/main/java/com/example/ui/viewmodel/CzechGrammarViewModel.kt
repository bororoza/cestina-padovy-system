package com.example.ui.viewmodel

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.example.audio.CzechSpeechHelper
import com.example.data.GrammarRepository
import com.example.data.local.AppDatabase
import com.example.data.local.ChecklistRecordEntity
import com.example.data.local.ExerciseRecordEntity
import com.example.data.local.UserEntity
import com.example.data.model.*
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch

enum class AppTab(val title: String, val czechTitle: String) {
    TABLE("Table", "Tabulka pádů"),
    PRACTICE("Practice", "Cvičení"),
    AUDIO_LAB("Audio Lab", "Výslovnost"),
    CHECKLIST("Checklist", "Můj seznam"),
    STATS("Statistics", "Statistiky")
}

data class QuizState(
    val currentQuestionIndex: Int = 0,
    val selectedOptionIndex: Int? = null,
    val isAnswerSubmitted: Boolean = false,
    val isAnswerCorrect: Boolean = false,
    val scoreCount: Int = 0,
    val streak: Int = 0,
    val selectedCaseFilter: Int? = null // null means All / A2 mixed
)

data class CaseMasteryStat(
    val caseNumber: Int,
    val shortCode: String,
    val czechName: String,
    val totalAttempts: Int,
    val correctAttempts: Int,
    val accuracyPercent: Int,
    val masteryLevel: MasteryStatus
)

class CzechGrammarViewModel(application: Application) : AndroidViewModel(application) {

    private val repository = GrammarRepository(AppDatabase.getDatabase(application))
    val speechHelper = CzechSpeechHelper(application)

    // Current user state
    val currentUser: StateFlow<UserEntity?> = repository.getActiveUser()
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), null)

    // Navigation & View state
    private val _currentTab = MutableStateFlow(AppTab.TABLE)
    val currentTab: StateFlow<AppTab> = _currentTab.asStateFlow()

    private val _selectedCaseIndex = MutableStateFlow(1) // 1 to 7
    val selectedCaseIndex: StateFlow<Int> = _selectedCaseIndex.asStateFlow()

    private val _selectedGenderFilter = MutableStateFlow<GrammaticalGender?>(null)
    val selectedGenderFilter: StateFlow<GrammaticalGender?> = _selectedGenderFilter.asStateFlow()

    private val _searchQuery = MutableStateFlow("")
    val searchQuery: StateFlow<String> = _searchQuery.asStateFlow()

    // Practice / Quiz State
    private val _quizState = MutableStateFlow(QuizState())
    val quizState: StateFlow<QuizState> = _quizState.asStateFlow()

    // Filtered questions based on selected filter
    val currentQuestions: StateFlow<List<ExerciseQuestion>> = _quizState.map { state ->
        val filter = state.selectedCaseFilter
        if (filter == null) {
            repository.exerciseQuestions
        } else {
            repository.exerciseQuestions.filter { it.caseNumber == filter }
        }
    }.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), repository.exerciseQuestions)

    // User's exercise records
    val exerciseRecords: StateFlow<List<ExerciseRecordEntity>> = currentUser.flatMapLatest { user ->
        if (user != null) repository.getExerciseRecords(user.email) else flowOf(emptyList())
    }.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    // Checklist user state
    val userChecklistRecords: StateFlow<List<ChecklistRecordEntity>> = currentUser.flatMapLatest { user ->
        if (user != null) repository.getChecklistForUser(user.email) else flowOf(emptyList())
    }.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    // Checklist Filter
    private val _checklistFilter = MutableStateFlow<MasteryStatus?>(null) // null = all
    val checklistFilter: StateFlow<MasteryStatus?> = _checklistFilter.asStateFlow()

    val allCases = repository.allCases
    val consonantAlternations = repository.consonantAlternations
    val keyRules = repository.keyRules
    val allChecklistItems = repository.defaultChecklistItems
    val pronunciationGuides = repository.pronunciationSounds

    init {
        // Automatically ensure default guest user or saved user exists
        viewModelScope.launch {
            repository.getActiveUser().firstOrNull()?.let { user ->
                _selectedCaseIndex.value = user.lastStudiedCase.coerceIn(1, 7)
                _currentTab.value = AppTab.entries.getOrElse(user.lastSelectedTab) { AppTab.TABLE }
            } ?: run {
                repository.loginOrCreateUser("student@czech.cz", "Czech Student")
            }
        }
    }

    fun selectTab(tab: AppTab) {
        _currentTab.value = tab
        saveUserPosition()
    }

    fun selectCase(caseNumber: Int) {
        _selectedCaseIndex.value = caseNumber.coerceIn(1, 7)
        saveUserPosition()
    }

    fun selectGenderFilter(gender: GrammaticalGender?) {
        _selectedGenderFilter.value = gender
    }

    fun updateSearchQuery(query: String) {
        _searchQuery.value = query
    }

    fun loginUser(email: String, displayName: String) {
        viewModelScope.launch {
            val user = repository.loginOrCreateUser(email, displayName)
            _selectedCaseIndex.value = user.lastStudiedCase.coerceIn(1, 7)
            _currentTab.value = AppTab.entries.getOrElse(user.lastSelectedTab) { AppTab.TABLE }
        }
    }

    private fun saveUserPosition() {
        val user = currentUser.value ?: return
        viewModelScope.launch {
            repository.updateLastPosition(
                email = user.email,
                caseNumber = _selectedCaseIndex.value,
                tabIndex = _currentTab.value.ordinal
            )
        }
    }

    // Speech helpers
    fun speakCzech(text: String, slow: Boolean = false) {
        speechHelper.speak(text, slow)
    }

    fun toggleSlowSpeech() {
        speechHelper.toggleSlowMode()
    }

    // Quiz / Practice actions
    fun setQuizCaseFilter(caseNumber: Int?) {
        _quizState.value = _quizState.value.copy(
            selectedCaseFilter = caseNumber,
            currentQuestionIndex = 0,
            selectedOptionIndex = null,
            isAnswerSubmitted = false,
            isAnswerCorrect = false
        )
    }

    fun selectQuizOption(optionIndex: Int) {
        if (_quizState.value.isAnswerSubmitted) return
        _quizState.value = _quizState.value.copy(selectedOptionIndex = optionIndex)
    }

    fun submitQuizAnswer() {
        val state = _quizState.value
        val questions = currentQuestions.value
        val currentQ = questions.getOrNull(state.currentQuestionIndex) ?: return
        val selectedIdx = state.selectedOptionIndex ?: return

        val isCorrect = selectedIdx == currentQ.correctIndex
        val newScore = if (isCorrect) state.scoreCount + 1 else state.scoreCount
        val newStreak = if (isCorrect) state.streak + 1 else 0

        _quizState.value = state.copy(
            isAnswerSubmitted = true,
            isAnswerCorrect = isCorrect,
            scoreCount = newScore,
            streak = newStreak
        )

        // Read out the full sentence with TTS so the user hears correct rhythm
        speakCzech(currentQ.fullCorrectCzechSentence)

        // Record in Room Database
        val user = currentUser.value
        if (user != null) {
            viewModelScope.launch {
                repository.recordExerciseAttempt(
                    userEmail = user.email,
                    questionId = currentQ.id,
                    caseNumber = currentQ.caseNumber,
                    isCorrect = isCorrect,
                    answeredOption = currentQ.options[selectedIdx]
                )
            }
        }
    }

    fun nextQuizQuestion() {
        val state = _quizState.value
        val questions = currentQuestions.value
        val nextIdx = (state.currentQuestionIndex + 1) % questions.size.coerceAtLeast(1)
        _quizState.value = state.copy(
            currentQuestionIndex = nextIdx,
            selectedOptionIndex = null,
            isAnswerSubmitted = false,
            isAnswerCorrect = false
        )
    }

    // Checklist Actions
    fun setChecklistFilter(filter: MasteryStatus?) {
        _checklistFilter.value = filter
    }

    fun toggleChecklistItemStatus(itemId: String, currentStatus: MasteryStatus) {
        val nextStatus = when (currentStatus) {
            MasteryStatus.NOT_STARTED -> MasteryStatus.NEEDS_PRACTICE
            MasteryStatus.NEEDS_PRACTICE -> MasteryStatus.MASTERED
            MasteryStatus.MASTERED -> MasteryStatus.NOT_STARTED
        }
        val user = currentUser.value ?: return
        viewModelScope.launch {
            repository.updateChecklistItem(user.email, itemId, nextStatus)
        }
    }

    fun clearStats() {
        val user = currentUser.value ?: return
        viewModelScope.launch {
            repository.clearHistory(user.email)
        }
    }

    override fun onCleared() {
        super.onCleared()
        speechHelper.shutdown()
    }
}
