package com.example.data.local

import androidx.room.*
import kotlinx.coroutines.flow.Flow

@Dao
interface UserDao {
    @Query("SELECT * FROM users WHERE email = :email LIMIT 1")
    fun getUserByEmail(email: String): Flow<UserEntity?>

    @Query("SELECT * FROM users ORDER BY lastActiveTimestamp DESC LIMIT 1")
    fun getActiveUser(): Flow<UserEntity?>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertUser(user: UserEntity)

    @Update
    suspend fun updateUser(user: UserEntity)

    @Query("UPDATE users SET lastStudiedCase = :caseNumber, lastSelectedTab = :tabIndex, lastActiveTimestamp = :time WHERE email = :email")
    suspend fun updateLastPosition(email: String, caseNumber: Int, tabIndex: Int, time: Long = System.currentTimeMillis())
}

@Dao
interface ExerciseRecordDao {
    @Query("SELECT * FROM exercise_records WHERE userEmail = :userEmail ORDER BY timestamp DESC")
    fun getAllRecordsForUser(userEmail: String): Flow<List<ExerciseRecordEntity>>

    @Query("SELECT * FROM exercise_records WHERE userEmail = :userEmail AND caseNumber = :caseNumber")
    fun getRecordsForCase(userEmail: String, caseNumber: Int): Flow<List<ExerciseRecordEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertRecord(record: ExerciseRecordEntity)

    @Query("DELETE FROM exercise_records WHERE userEmail = :userEmail")
    suspend fun clearRecordsForUser(userEmail: String)
}

@Dao
interface ChecklistDao {
    @Query("SELECT * FROM checklist_records WHERE userEmail = :userEmail")
    fun getChecklistForUser(userEmail: String): Flow<List<ChecklistRecordEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertOrUpdate(record: ChecklistRecordEntity)

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertAll(records: List<ChecklistRecordEntity>)
}
