package com.example.data.model

enum class GrammaticalGender(val code: String, val displayName: String, val czName: String) {
    MA("Ma", "Masculine Animate", "Mužský životný"),
    MI("Mi", "Masculine Inanimate", "Mužský neživotný"),
    F("F", "Feminine", "Ženský"),
    N("N", "Neuter", "Střední")
}

data class DeclensionRow(
    val gender: GrammaticalGender,
    val pronoun: String,
    val adjective: String,
    val hardPattern: String,
    val softPattern: String,
    val note: String = ""
)

data class ConsonantAlternation(
    val fromChar: String,
    val toChar: String,
    val baseWord: String,
    val changedWord: String,
    val translation: String,
    val contextExample: String
)

data class PrepositionInfo(
    val prep: String,
    val meaning: String,
    val example: String,
    val english: String
)

data class A2VerbInfo(
    val verb: String,
    val english: String,
    val examTopic: String,
    val samplePhrase: String,
    val sampleTranslation: String
)

data class GrammarRule(
    val title: String,
    val summary: String,
    val detail: String,
    val example: String
)

data class GrammarExample(
    val czSentence: String,
    val enSentence: String,
    val highlightWord: String,
    val note: String
)

data class CaseInfo(
    val caseNumber: Int,
    val shortCode: String,
    val czechName: String,
    val czechQuestion: String,
    val englishQuestion: String,
    val meaningDescription: String,
    val englishAnalogy: String,
    val rows: List<DeclensionRow>,
    val prepositions: List<PrepositionInfo>,
    val a2Verbs: List<A2VerbInfo>,
    val specialRules: List<GrammarRule>,
    val consonantAlternations: List<ConsonantAlternation> = emptyList(),
    val examples: List<GrammarExample>
)

data class ExerciseQuestion(
    val id: String,
    val caseNumber: Int,
    val gender: GrammaticalGender?,
    val examTopic: String, // e.g. "Doctor / Zdraví", "Shopping / Obchod", "OAMP / Immigration", "Transport / Doprava"
    val promptEnglish: String,
    val sentenceCzechPrompt: String,
    val options: List<String>,
    val correctIndex: Int,
    val fullCorrectCzechSentence: String,
    val explanation: String,
    val ruleBadge: String
)

enum class MasteryStatus {
    NOT_STARTED,
    NEEDS_PRACTICE,
    MASTERED
}

data class ChecklistItem(
    val id: String,
    val category: String, // "Cases", "Prepositions", "Alternations", "A2 Verbs", "A2 Exam Topics"
    val title: String,
    val description: String,
    val exampleCzech: String,
    val caseNumber: Int? = null
)
