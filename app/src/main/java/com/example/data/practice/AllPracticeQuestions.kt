package com.example.data.practice

import com.example.data.model.ExerciseQuestion

object AllPracticeQuestions {
    val ALL: List<ExerciseQuestion> =
        Case1NominativeQuestions.questions +
        Case2GenitiveQuestions.questions +
        Case3DativeQuestions.questions +
        Case4AccusativeQuestions.questions +
        Case5VocativeQuestions.questions +
        Case6LocativeQuestions.questions +
        Case7InstrumentalQuestions.questions
}
