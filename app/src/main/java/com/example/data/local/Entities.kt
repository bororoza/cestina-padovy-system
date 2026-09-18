package com.example.data.local

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "users")
data class UserEntity(
    @PrimaryKey val email: String,
    val displayName: String,
    val avatarColorIndex: Int = 0,
    val lastActiveTimestamp: Long = System.currentTimeMillis(),
    val streakDays: Int = 1,
    val lastStudiedCase: Int = 1,
    val lastSelectedTab: Int = 0
)

@Entity(tableName = "exercise_records")
data class ExerciseRecordEntity(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val userEmail: String,
    val questionId: String,
    val caseNumber: Int,
    val isCorrect: Boolean,
    val answeredOption: String,
    val timestamp: Long = System.currentTimeMillis()
)

@Entity(tableName = "checklist_records", primaryKeys = ["userEmail", "itemId"])
data class ChecklistRecordEntity(
    val userEmail: String,
    val itemId: String,
    val statusCode: Int, // 0 = Not Started, 1 = Needs Practice, 2 = Mastered
    val notes: String = "",
    val lastUpdated: Long = System.currentTimeMillis()
)
