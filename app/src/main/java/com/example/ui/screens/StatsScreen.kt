package com.example.ui.screens

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.model.MasteryStatus
import com.example.ui.components.PuzzleCasesMap
import com.example.ui.components.SectionHeader
import com.example.ui.components.TutorAdviceCard
import com.example.ui.theme.*
import com.example.ui.viewmodel.CaseMasteryStat
import com.example.ui.viewmodel.CzechGrammarViewModel

@Composable
fun StatsScreen(
    viewModel: CzechGrammarViewModel,
    onOpenProfile: () -> Unit,
    modifier: Modifier = Modifier
) {
    val currentUser by viewModel.currentUser.collectAsState()
    val exerciseRecords by viewModel.exerciseRecords.collectAsState()
    val checklistRecords by viewModel.userChecklistRecords.collectAsState()

    var showClearDialog by remember { mutableStateOf(false) }

    val totalAttempts = exerciseRecords.size
    val correctAttempts = exerciseRecords.count { it.isCorrect }
    val overallAccuracy = if (totalAttempts > 0) (correctAttempts * 100) / totalAttempts else 0

    val caseStats = remember(exerciseRecords) {
        (1..7).map { caseNum ->
            val recordsForCase = exerciseRecords.filter { it.caseNumber == caseNum }
            val attempts = recordsForCase.size
            val correct = recordsForCase.count { it.isCorrect }
            val accuracy = if (attempts > 0) (correct * 100) / attempts else 0
            val code = when (caseNum) {
                1 -> "Nom"
                2 -> "Gen"
                3 -> "Dat"
                4 -> "Aku"
                5 -> "Vok"
                6 -> "Lok"
                else -> "Ins"
            }
            val name = when (caseNum) {
                1 -> "1. Nominativ"
                2 -> "2. Genitiv"
                3 -> "3. Dativ"
                4 -> "4. Akuzativ"
                5 -> "5. Vokativ"
                6 -> "6. Lokál"
                else -> "7. Instrumentál"
            }
            val mastery = when {
                attempts >= 3 && accuracy >= 80 -> MasteryStatus.MASTERED
                attempts > 0 -> MasteryStatus.NEEDS_PRACTICE
                else -> MasteryStatus.NOT_STARTED
            }
            CaseMasteryStat(caseNum, code, name, attempts, correct, accuracy, mastery)
        }
    }

    val masteredCases = remember(caseStats) {
        caseStats.filter { it.masteryLevel == MasteryStatus.MASTERED }.map { it.caseNumber }.toSet()
    }

    val a2ReadinessScore = remember(overallAccuracy, totalAttempts) {
        when {
            totalAttempts >= 20 && overallAccuracy >= 85 -> "Připraven/a ke zkoušce A2! 🎖️"
            totalAttempts >= 10 && overallAccuracy >= 65 -> "Skvělý pokrok (pokročilý trénink) 📈"
            else -> "Začátek tréninku (doporučujeme procvičovat denně) 🚀"
        }
    }

    LazyColumn(
        modifier = modifier
            .fillMaxSize()
            .padding(horizontal = 16.dp),
        contentPadding = PaddingValues(top = 12.dp, bottom = 80.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        // User Profile & Save Status Card
        item {
            Card(
                shape = RoundedCornerShape(18.dp),
                colors = CardDefaults.cardColors(containerColor = BrandMagentaContainer),
                border = BorderStroke(1.5.dp, BrandMagentaPrimary.copy(alpha = 0.3f)),
                modifier = Modifier.fillMaxWidth()
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Surface(
                            shape = CircleShape,
                            color = BrandMagentaPrimary,
                            border = BorderStroke(1.5.dp, BrandGoldTertiary),
                            modifier = Modifier.size(50.dp)
                        ) {
                            Box(contentAlignment = Alignment.Center) {
                                val initial = (currentUser?.displayName?.firstOrNull() ?: 'Č').uppercaseChar()
                                Text(
                                    text = initial.toString(),
                                    fontWeight = FontWeight.Black,
                                    color = Color.White,
                                    fontSize = 20.sp
                                )
                            }
                        }
                        Spacer(modifier = Modifier.width(12.dp))
                        Column {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Text(
                                    text = currentUser?.displayName ?: "Student češtiny",
                                    style = MaterialTheme.typography.titleMedium.copy(
                                        fontWeight = FontWeight.Black,
                                        color = BrandOnMagentaContainer
                                    )
                                )
                                Spacer(modifier = Modifier.width(4.dp))
                                Text(text = "✨", fontSize = 12.sp)
                            }
                            Text(
                                text = currentUser?.email ?: "student@cestina.cz",
                                style = MaterialTheme.typography.bodySmall.copy(
                                    color = BrandOnMagentaContainer.copy(alpha = 0.8f)
                                )
                            )
                            Text(
                                text = "Aktivní záložka: ${currentUser?.lastStudiedCase ?: 1}. pád",
                                style = MaterialTheme.typography.labelSmall.copy(
                                    color = BrandMagentaDark,
                                    fontWeight = FontWeight.Bold
                                )
                            )
                        }
                    }

                    OutlinedButton(
                        onClick = onOpenProfile,
                        shape = RoundedCornerShape(10.dp),
                        border = BorderStroke(1.dp, BrandMagentaPrimary)
                    ) {
                        Text("Změnit", color = BrandMagentaPrimary, fontWeight = FontWeight.Bold)
                    }
                }
            }
        }

        // Summary Metric Grid
        item {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                StatPillCard(
                    title = "Úspěšnost",
                    value = "$overallAccuracy%",
                    icon = Icons.Default.GpsFixed,
                    color = BrandMagentaPrimary,
                    modifier = Modifier.weight(1f)
                )
                StatPillCard(
                    title = "Odpovědí",
                    value = "$totalAttempts",
                    icon = Icons.Default.Quiz,
                    color = BrandBlueSecondary,
                    modifier = Modifier.weight(1f)
                )
                StatPillCard(
                    title = "Série",
                    value = "${currentUser?.streakDays ?: 1} dní",
                    icon = Icons.Default.LocalFireDepartment,
                    color = BrandGoldTertiary,
                    modifier = Modifier.weight(1f)
                )
            }
        }

        // Visual Puzzle Map Overview
        item {
            PuzzleCasesMap(
                completedCases = masteredCases,
                selectedCase = currentUser?.lastStudiedCase ?: 1,
                onSelectCase = { viewModel.selectCase(it) }
            )
        }

        // Tutor Advice Card
        item {
            TutorAdviceCard(
                tipTitle = "Rada lektorky pro trvalý pobyt",
                tipMessage = "U zkoušky A2 se v písemné i ústní části nejvíce hodnotí správné použití pádových koncovek po běžných předložkách (do Prahy, z práce, v obchodě, se synem). Trénujte pravidelně!"
            )
        }

        // A2 Exam Readiness
        item {
            Card(
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
                border = BorderStroke(1.dp, DensityBorderSubtle),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(
                        text = "HODNOCENÍ PŘIPRAVENOSTI KE ZKOUŠCE A2",
                        style = MaterialTheme.typography.labelSmall.copy(
                            color = BrandMagentaPrimary,
                            fontWeight = FontWeight.Black,
                            letterSpacing = 1.1.sp
                        )
                    )
                    Spacer(modifier = Modifier.height(6.dp))
                    Text(
                        text = a2ReadinessScore,
                        style = MaterialTheme.typography.titleMedium.copy(
                            fontWeight = FontWeight.Bold,
                            color = MaterialTheme.colorScheme.onSurface
                        )
                    )
                    Spacer(modifier = Modifier.height(6.dp))
                    Text(
                        text = "Oficiální Příručka pro uchazeče 2026 klade důraz na bezchybné rozlišení 2., 4., 6. a 7. pádu v každodenních situacích (nákupy, cestování, úřady, práce).",
                        style = MaterialTheme.typography.bodySmall.copy(
                            color = MaterialTheme.colorScheme.onSurfaceVariant,
                            lineHeight = 18.sp
                        )
                    )
                }
            }
        }

        // Case-by-Case Breakdown
        item {
            SectionHeader(
                title = "Přehled zvládnutí jednotlivých pádů",
                subtitle = "Sledujte úspěšnost v každém ze 7 pádů češtiny"
            )
        }

        items(caseStats) { stat ->
            Card(
                shape = RoundedCornerShape(14.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                border = BorderStroke(1.dp, DensityBorderSubtle),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(modifier = Modifier.padding(14.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = stat.czechName,
                            style = MaterialTheme.typography.titleSmall.copy(
                                fontWeight = FontWeight.Bold,
                                color = MaterialTheme.colorScheme.onSurface
                            )
                        )
                        Text(
                            text = "${stat.accuracyPercent}% (${stat.correctAttempts}/${stat.totalAttempts})",
                            style = MaterialTheme.typography.bodyMedium.copy(
                                fontWeight = FontWeight.Bold,
                                color = if (stat.accuracyPercent >= 75) CzechSuccess else BrandMagentaPrimary
                            )
                        )
                    }

                    Spacer(modifier = Modifier.height(6.dp))

                    LinearProgressIndicator(
                        progress = { if (stat.totalAttempts > 0) stat.accuracyPercent / 100f else 0f },
                        modifier = Modifier.fillMaxWidth().height(6.dp).clip(RoundedCornerShape(3.dp)),
                        color = if (stat.accuracyPercent >= 75) CzechSuccess else BrandMagentaPrimary,
                        trackColor = DensityTrackLight
                    )
                }
            }
        }

        // Reset Data Button
        item {
            Spacer(modifier = Modifier.height(10.dp))
            OutlinedButton(
                onClick = { showClearDialog = true },
                colors = ButtonDefaults.outlinedButtonColors(contentColor = CzechRedAccent),
                shape = RoundedCornerShape(12.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                Icon(imageVector = Icons.Default.DeleteSweep, contentDescription = null)
                Spacer(modifier = Modifier.width(8.dp))
                Text("Vynulovat historii cvičení")
            }
        }
    }

    if (showClearDialog) {
        AlertDialog(
            onDismissRequest = { showClearDialog = false },
            title = { Text("Vynulovat postup?") },
            text = { Text("Tato akce vymaže historii vašich odpovědí a statistiku úspěšnosti pro tento profil.") },
            confirmButton = {
                TextButton(
                    onClick = {
                        viewModel.clearStats()
                        showClearDialog = false
                    }
                ) {
                    Text("Vynulovat", color = CzechRedAccent, fontWeight = FontWeight.Bold)
                }
            },
            dismissButton = {
                TextButton(onClick = { showClearDialog = false }) {
                    Text("Zrušit")
                }
            }
        )
    }
}

@Composable
fun StatPillCard(
    title: String,
    value: String,
    icon: androidx.compose.ui.graphics.vector.ImageVector,
    color: Color,
    modifier: Modifier = Modifier
) {
    Card(
        shape = RoundedCornerShape(14.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        border = BorderStroke(1.dp, DensityBorderSubtle),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
        modifier = modifier
    ) {
        Column(
            modifier = Modifier.padding(12.dp),
            horizontalAlignment = Alignment.Start
        ) {
            Icon(
                imageVector = icon,
                contentDescription = null,
                tint = color,
                modifier = Modifier.size(22.dp)
            )
            Spacer(modifier = Modifier.height(6.dp))
            Text(
                text = value,
                style = MaterialTheme.typography.titleMedium.copy(
                    fontWeight = FontWeight.Black,
                    color = MaterialTheme.colorScheme.onSurface
                )
            )
            Text(
                text = title,
                style = MaterialTheme.typography.labelSmall.copy(
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            )
        }
    }
}
