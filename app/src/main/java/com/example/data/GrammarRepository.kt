package com.example.data

import com.example.data.local.*
import com.example.data.model.*
import com.example.data.practice.AllPracticeQuestions
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map

class GrammarRepository(
    private val database: AppDatabase
) {
    private val userDao = database.userDao()
    private val exerciseDao = database.exerciseRecordDao()
    private val checklistDao = database.checklistDao()

    val allCases: List<CaseInfo> = CzechGrammarData.ALL_CASES
    val consonantAlternations: List<ConsonantAlternation> = CzechGrammarData.CONSONANT_ALTERNATIONS
    val keyRules: List<GrammarRule> = CzechGrammarData.KEY_RULES_FOR_ENGLISH_LEARNERS
    val exerciseQuestions: List<ExerciseQuestion> = AllPracticeQuestions.ALL
    val defaultChecklistItems: List<ChecklistItem> = CzechGrammarData.CHECKLIST_ITEMS
    val pronunciationSounds: List<PronunciationGuide> = CzechGrammarData.PRONUNCIATION_SOUNDS

    fun getActiveUser(): Flow<UserEntity?> = userDao.getActiveUser()

    suspend fun loginOrCreateUser(email: String, displayName: String): UserEntity {
        val cleanEmail = email.trim().lowercase()
        val user = UserEntity(
            email = cleanEmail,
            displayName = displayName.ifBlank { cleanEmail.substringBefore("@") },
            avatarColorIndex = (cleanEmail.hashCode() % 5 + 5) % 5,
            lastActiveTimestamp = System.currentTimeMillis(),
            lastStudiedCase = 1,
            lastSelectedTab = 0
        )
        userDao.insertUser(user)
        return user
    }

    suspend fun updateLastPosition(email: String, caseNumber: Int, tabIndex: Int) {
        userDao.updateLastPosition(email, caseNumber, tabIndex)
    }

    fun getExerciseRecords(email: String): Flow<List<ExerciseRecordEntity>> =
        exerciseDao.getAllRecordsForUser(email)

    suspend fun recordExerciseAttempt(
        userEmail: String,
        questionId: String,
        caseNumber: Int,
        isCorrect: Boolean,
        answeredOption: String
    ) {
        exerciseDao.insertRecord(
            ExerciseRecordEntity(
                userEmail = userEmail,
                questionId = questionId,
                caseNumber = caseNumber,
                isCorrect = isCorrect,
                answeredOption = answeredOption
            )
        )

        // Automatically update checklist item for this case if student performs well
        if (isCorrect) {
            val caseItem = defaultChecklistItems.find { it.caseNumber == caseNumber }
            if (caseItem != null) {
                checklistDao.insertOrUpdate(
                    ChecklistRecordEntity(
                        userEmail = userEmail,
                        itemId = caseItem.id,
                        statusCode = 2 // Mastered
                    )
                )
            }
        }
    }

    fun getChecklistForUser(email: String): Flow<List<ChecklistRecordEntity>> =
        checklistDao.getChecklistForUser(email)

    suspend fun updateChecklistItem(email: String, itemId: String, status: MasteryStatus, notes: String = "") {
        val code = when (status) {
            MasteryStatus.NOT_STARTED -> 0
            MasteryStatus.NEEDS_PRACTICE -> 1
            MasteryStatus.MASTERED -> 2
        }
        checklistDao.insertOrUpdate(
            ChecklistRecordEntity(
                userEmail = email,
                itemId = itemId,
                statusCode = code,
                notes = notes
            )
        )
    }

    suspend fun clearHistory(email: String) {
        exerciseDao.clearRecordsForUser(email)
    }
}
