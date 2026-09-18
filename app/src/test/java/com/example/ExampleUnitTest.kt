package com.example

import com.example.data.practice.AllPracticeQuestions
import org.junit.Assert.*
import org.junit.Test

class ExampleUnitTest {
    @Test
    fun addition_isCorrect() {
        assertEquals(4, 2 + 2)
    }

    @Test
    fun verify_twenty_five_questions_per_case() {
        val allQuestions = AllPracticeQuestions.ALL
        assertEquals("Total questions should be 175 (7 cases * 25 questions)", 175, allQuestions.size)

        // Verify each case has exactly 25 questions
        for (c in 1..7) {
            val caseQuestions = allQuestions.filter { it.caseNumber == c }
            assertEquals("Case $c must have exactly 25 questions", 25, caseQuestions.size)

            // Verify each question has valid data
            for (q in caseQuestions) {
                assertTrue("Question ID must not be empty", q.id.isNotBlank())
                assertTrue("Prompt must not be empty", q.promptEnglish.isNotBlank())
                assertTrue("Sentence prompt must contain blank '___'", q.sentenceCzechPrompt.contains("___"))
                assertEquals("Question must have exactly 4 options", 4, q.options.size)
                assertTrue("Correct index must be within 0..3", q.correctIndex in 0..3)
                assertTrue("Full sentence must not be blank", q.fullCorrectCzechSentence.isNotBlank())
                assertTrue("Explanation must not be blank", q.explanation.isNotBlank())
                assertTrue("Rule badge must not be blank", q.ruleBadge.isNotBlank())
            }
        }

        // Verify all question IDs are globally unique
        val uniqueIds = allQuestions.map { it.id }.toSet()
        assertEquals("All question IDs must be unique", 175, uniqueIds.size)
    }
}
