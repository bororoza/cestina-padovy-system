package com.example.ui.screens

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.rememberScrollState
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
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.R
import com.example.ui.components.CzechAudioButton
import com.example.ui.components.GenderBadge
import com.example.ui.components.TutorAdviceCard
import com.example.ui.theme.*
import com.example.ui.viewmodel.CzechGrammarViewModel

@Composable
fun ExerciseScreen(
    viewModel: CzechGrammarViewModel,
    modifier: Modifier = Modifier
) {
    val quizState by viewModel.quizState.collectAsState()
    val questions by viewModel.currentQuestions.collectAsState()
    val isSpeaking by viewModel.speechHelper.isSpeaking.collectAsState()
    val currentWordSpeaking by viewModel.speechHelper.currentWord.collectAsState()

    val currentQ = questions.getOrNull(quizState.currentQuestionIndex)
    val isCaseCompleted = quizState.currentQuestionIndex >= questions.size - 1 && quizState.isAnswerSubmitted

    LazyColumn(
        modifier = modifier
            .fillMaxSize()
            .padding(horizontal = 16.dp),
        contentPadding = PaddingValues(top = 12.dp, bottom = 80.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        // Case Filter Selection Chips
        item {
            Column {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Text(
                            text = "🧩",
                            fontSize = 16.sp
                        )
                        Spacer(modifier = Modifier.width(6.dp))
                        Text(
                            text = "AUTOKOREKTIVNÍ TRÉNINK",
                            style = MaterialTheme.typography.labelSmall.copy(
                                color = BrandMagentaPrimary,
                                fontWeight = FontWeight.Black,
                                letterSpacing = 1.1.sp
                            )
                        )
                    }
                    // Streak & Score Pill
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        Surface(
                            shape = RoundedCornerShape(12.dp),
                            color = BrandGoldContainer,
                            border = BorderStroke(1.dp, BrandGoldTertiary)
                        ) {
                            Row(
                                verticalAlignment = Alignment.CenterVertically,
                                modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                            ) {
                                Text(text = "🔥 ${quizState.streak}", fontWeight = FontWeight.Bold, fontSize = 12.sp, color = BrandOnGoldContainer)
                            }
                        }
                        Surface(
                            shape = RoundedCornerShape(12.dp),
                            color = BrandMagentaContainer,
                            border = BorderStroke(1.dp, BrandMagentaPrimary.copy(alpha = 0.5f))
                        ) {
                            Row(
                                verticalAlignment = Alignment.CenterVertically,
                                modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                            ) {
                                Text(
                                    text = "👍 ${quizState.scoreCount}",
                                    fontWeight = FontWeight.Bold,
                                    fontSize = 12.sp,
                                    color = BrandOnMagentaContainer
                                )
                            }
                        }
                    }
                }

                Spacer(modifier = Modifier.height(8.dp))

                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .horizontalScroll(rememberScrollState()),
                    horizontalArrangement = Arrangement.spacedBy(6.dp)
                ) {
                    FilterChip(
                        selected = quizState.selectedCaseFilter == null,
                        onClick = { viewModel.setQuizCaseFilter(null) },
                        label = { Text("Všech 7 pádů (175)") },
                        shape = RoundedCornerShape(10.dp),
                        colors = FilterChipDefaults.filterChipColors(
                            selectedContainerColor = BrandMagentaPrimary,
                            selectedLabelColor = Color.White
                        )
                    )
                    (1..7).forEach { caseNum ->
                        val code = when (caseNum) {
                            1 -> "1. Nom (25)"
                            2 -> "2. Gen (25)"
                            3 -> "3. Dat (25)"
                            4 -> "4. Aku (25)"
                            5 -> "5. Vok (25)"
                            6 -> "6. Lok (25)"
                            else -> "7. Ins (25)"
                        }
                        FilterChip(
                            selected = quizState.selectedCaseFilter == caseNum,
                            onClick = { viewModel.setQuizCaseFilter(caseNum) },
                            label = { Text(code) },
                            shape = RoundedCornerShape(10.dp),
                            colors = FilterChipDefaults.filterChipColors(
                                selectedContainerColor = BrandMagentaPrimary,
                                selectedLabelColor = Color.White
                            )
                        )
                    }
                }
            }
        }

        if (currentQ == null || questions.isEmpty()) {
            item {
                Card(
                    shape = RoundedCornerShape(16.dp),
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
                    modifier = Modifier.fillMaxWidth().padding(vertical = 24.dp)
                ) {
                    Column(
                        modifier = Modifier.padding(24.dp).fillMaxWidth(),
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        Text(text = "Žádné další otázky v této kategorii.", style = MaterialTheme.typography.bodyMedium)
                        Spacer(modifier = Modifier.height(12.dp))
                        Button(
                            onClick = { viewModel.setQuizCaseFilter(null) },
                            colors = ButtonDefaults.buttonColors(containerColor = BrandMagentaPrimary)
                        ) {
                            Text("Zobrazit všech 175 otázek")
                        }
                    }
                }
            }
        } else {
            // Case Finished Celebratory Card (when on last question and submitted)
            if (isCaseCompleted) {
                item {
                    Card(
                        shape = RoundedCornerShape(20.dp),
                        colors = CardDefaults.cardColors(containerColor = BrandMagentaContainer),
                        border = BorderStroke(2.dp, BrandGoldTertiary),
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Column(
                            modifier = Modifier.padding(16.dp),
                            horizontalAlignment = Alignment.CenterHorizontally
                        ) {
                            Box(
                                modifier = Modifier
                                    .size(120.dp)
                                    .clip(RoundedCornerShape(16.dp))
                            ) {
                                Image(
                                    painter = painterResource(id = R.drawable.img_puzzle_complete),
                                    contentDescription = "Puzzle dokončeno",
                                    contentScale = ContentScale.Crop,
                                    modifier = Modifier.fillMaxSize()
                                )
                            }
                            Spacer(modifier = Modifier.height(10.dp))
                            Text(
                                text = "Dílek skládačky je na svém místě! 🎉",
                                style = MaterialTheme.typography.titleMedium.copy(
                                    fontWeight = FontWeight.Black,
                                    color = BrandOnMagentaContainer
                                )
                            )
                            Spacer(modifier = Modifier.height(4.dp))
                            Text(
                                text = "Úspěšně jsi prošel/prošla otázkami tohoto pádu podle zkouškového standardu A2. Pokračuj v tréninku a upevni si všechny koncovky!",
                                style = MaterialTheme.typography.bodySmall.copy(
                                    color = BrandOnMagentaContainer.copy(alpha = 0.9f),
                                    lineHeight = 18.sp
                                ),
                                textAlign = androidx.compose.ui.text.style.TextAlign.Center
                            )
                        }
                    }
                }
            }

            // Question Progress Bar
            item {
                Column {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = "Otázka ${quizState.currentQuestionIndex + 1} z ${questions.size}",
                            style = MaterialTheme.typography.labelMedium.copy(fontWeight = FontWeight.Bold)
                        )
                        Surface(
                            shape = RoundedCornerShape(8.dp),
                            color = BrandMagentaContainer
                        ) {
                            Text(
                                text = "🧩 ${currentQ.ruleBadge}",
                                style = MaterialTheme.typography.labelSmall.copy(
                                    color = BrandOnMagentaContainer,
                                    fontWeight = FontWeight.Bold
                                ),
                                modifier = Modifier.padding(horizontal = 8.dp, vertical = 3.dp)
                            )
                        }
                    }
                    Spacer(modifier = Modifier.height(6.dp))
                    LinearProgressIndicator(
                        progress = { (quizState.currentQuestionIndex + 1).toFloat() / questions.size },
                        modifier = Modifier.fillMaxWidth().height(8.dp).clip(RoundedCornerShape(4.dp)),
                        color = BrandMagentaPrimary,
                        trackColor = DensityTrackLight
                    )
                }
            }

            // Main Question Card
            item {
                Card(
                    shape = RoundedCornerShape(18.dp),
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                    elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
                    border = BorderStroke(1.dp, DensityBorderSubtle),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Column(modifier = Modifier.padding(18.dp)) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Surface(
                                shape = RoundedCornerShape(8.dp),
                                color = CzechRedContainer
                            ) {
                                Text(
                                    text = "📌 ${currentQ.examTopic}",
                                    fontSize = 11.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = CzechOnRedContainer,
                                    modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                                )
                            }
                            if (currentQ.gender != null) {
                                GenderBadge(gender = currentQ.gender, compact = true)
                            }
                        }

                        Spacer(modifier = Modifier.height(12.dp))

                        Text(
                            text = currentQ.promptEnglish,
                            style = MaterialTheme.typography.bodyMedium.copy(
                                color = MaterialTheme.colorScheme.onSurfaceVariant
                            )
                        )

                        Spacer(modifier = Modifier.height(10.dp))

                        // Czech Sentence with Blank Box
                        Surface(
                            shape = RoundedCornerShape(12.dp),
                            color = BrandMagentaContainer.copy(alpha = 0.4f),
                            border = BorderStroke(1.dp, BrandMagentaPrimary.copy(alpha = 0.2f)),
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Row(
                                modifier = Modifier.padding(14.dp),
                                verticalAlignment = Alignment.CenterVertically,
                                horizontalArrangement = Arrangement.SpaceBetween
                            ) {
                                Text(
                                    text = currentQ.sentenceCzechPrompt,
                                    style = MaterialTheme.typography.titleMedium.copy(
                                        fontWeight = FontWeight.Bold,
                                        color = BrandOnMagentaContainer
                                    ),
                                    modifier = Modifier.weight(1f)
                                )
                                CzechAudioButton(
                                    textToSpeak = currentQ.sentenceCzechPrompt.replace("___", "..."),
                                    onSpeak = { viewModel.speakCzech(it) }
                                )
                            }
                        }
                    }
                }
            }

            // Options List
            item {
                Text(
                    text = "Vyberte správný tvar slova:",
                    style = MaterialTheme.typography.labelMedium.copy(
                        fontWeight = FontWeight.Bold,
                        color = MaterialTheme.colorScheme.onSurface
                    )
                )
            }

            items(currentQ.options.size) { idx ->
                val option = currentQ.options[idx]
                val isSelected = quizState.selectedOptionIndex == idx
                val isSubmitted = quizState.isAnswerSubmitted
                val isCorrectAnswer = idx == currentQ.correctIndex

                val cardBg = when {
                    isSubmitted && isCorrectAnswer -> CzechSuccessContainer
                    isSubmitted && isSelected && !isCorrectAnswer -> CzechRedContainer
                    isSelected -> BrandMagentaContainer
                    else -> MaterialTheme.colorScheme.surface
                }

                val border = when {
                    isSubmitted && isCorrectAnswer -> BorderStroke(2.dp, CzechSuccess)
                    isSubmitted && isSelected && !isCorrectAnswer -> BorderStroke(2.dp, CzechRedAccent)
                    isSelected -> BorderStroke(2.dp, BrandMagentaPrimary)
                    else -> BorderStroke(1.dp, MaterialTheme.colorScheme.outlineVariant.copy(alpha = 0.5f))
                }

                Card(
                    shape = RoundedCornerShape(14.dp),
                    colors = CardDefaults.cardColors(containerColor = cardBg),
                    border = border,
                    modifier = Modifier
                        .fillMaxWidth()
                        .clickable(enabled = !isSubmitted) {
                            viewModel.selectQuizOption(idx)
                        }
                ) {
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(horizontal = 16.dp, vertical = 14.dp),
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Surface(
                                shape = CircleShape,
                                color = if (isSelected) BrandMagentaPrimary else MaterialTheme.colorScheme.surfaceVariant,
                                modifier = Modifier.size(26.dp)
                            ) {
                                Box(contentAlignment = Alignment.Center) {
                                    Text(
                                        text = ('A' + idx).toString(),
                                        fontSize = 12.sp,
                                        fontWeight = FontWeight.Black,
                                        color = if (isSelected) Color.White else MaterialTheme.colorScheme.onSurfaceVariant
                                    )
                                }
                            }
                            Spacer(modifier = Modifier.width(12.dp))
                            Text(
                                text = option,
                                style = MaterialTheme.typography.bodyLarge.copy(
                                    fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Medium,
                                    color = MaterialTheme.colorScheme.onSurface
                                )
                            )
                        }

                        if (isSubmitted) {
                            if (isCorrectAnswer) {
                                Row(verticalAlignment = Alignment.CenterVertically) {
                                    Text(text = "👍", fontSize = 16.sp)
                                    Spacer(modifier = Modifier.width(4.dp))
                                    Icon(
                                        imageVector = Icons.Default.CheckCircle,
                                        contentDescription = "Správně",
                                        tint = CzechSuccess
                                    )
                                }
                            } else if (isSelected) {
                                Icon(
                                    imageVector = Icons.Default.Cancel,
                                    contentDescription = "Špatně",
                                    tint = CzechRedAccent
                                )
                            }
                        }
                    }
                }
            }

            // Auto-Correction Explanation Card (Visible after submit)
            if (quizState.isAnswerSubmitted) {
                item {
                    Card(
                        shape = RoundedCornerShape(16.dp),
                        colors = CardDefaults.cardColors(
                            containerColor = if (quizState.isAnswerCorrect) CzechSuccessContainer.copy(alpha = 0.7f) else CzechRedContainer.copy(alpha = 0.7f)
                        ),
                        border = BorderStroke(1.dp, if (quizState.isAnswerCorrect) CzechSuccess else CzechRedAccent),
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Column(modifier = Modifier.padding(16.dp)) {
                            Row(
                                verticalAlignment = Alignment.CenterVertically,
                                horizontalArrangement = Arrangement.SpaceBetween,
                                modifier = Modifier.fillMaxWidth()
                            ) {
                                Row(verticalAlignment = Alignment.CenterVertically) {
                                    Text(
                                        text = if (quizState.isAnswerCorrect) "👍" else "⚠️",
                                        fontSize = 20.sp
                                    )
                                    Spacer(modifier = Modifier.width(8.dp))
                                    Text(
                                        text = if (quizState.isAnswerCorrect) "Výborně! (Správně)" else "Pozor na koncovku!",
                                        style = MaterialTheme.typography.titleMedium.copy(
                                            fontWeight = FontWeight.Black,
                                            color = if (quizState.isAnswerCorrect) CzechSuccess else CzechRedAccent
                                        )
                                    )
                                }
                                CzechAudioButton(
                                    textToSpeak = currentQ.fullCorrectCzechSentence,
                                    onSpeak = { viewModel.speakCzech(it) },
                                    label = "Poslech"
                                )
                            }

                            Spacer(modifier = Modifier.height(10.dp))

                            Surface(
                                shape = RoundedCornerShape(8.dp),
                                color = Color.White.copy(alpha = 0.8f),
                                modifier = Modifier.fillMaxWidth()
                            ) {
                                Row(
                                    modifier = Modifier.padding(10.dp),
                                    verticalAlignment = Alignment.CenterVertically
                                ) {
                                    Text(text = "🇨🇿", fontSize = 16.sp)
                                    Spacer(modifier = Modifier.width(8.dp))
                                    Text(
                                        text = currentQ.fullCorrectCzechSentence,
                                        style = MaterialTheme.typography.bodyLarge.copy(
                                            fontWeight = FontWeight.Bold,
                                            color = MaterialTheme.colorScheme.onSurface
                                        )
                                    )
                                }
                            }

                            Spacer(modifier = Modifier.height(8.dp))

                            Text(
                                text = "💡 Pravidlo: ${currentQ.explanation}",
                                style = MaterialTheme.typography.bodyMedium.copy(
                                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                                    lineHeight = 20.sp
                                )
                            )
                        }
                    }
                }
            }

            // Action Buttons (Submit / Next)
            item {
                Spacer(modifier = Modifier.height(4.dp))
                if (!quizState.isAnswerSubmitted) {
                    Button(
                        onClick = { viewModel.submitQuizAnswer() },
                        enabled = quizState.selectedOptionIndex != null,
                        shape = RoundedCornerShape(14.dp),
                        modifier = Modifier.fillMaxWidth().height(52.dp),
                        colors = ButtonDefaults.buttonColors(containerColor = BrandMagentaPrimary)
                    ) {
                        Text(
                            text = "Zkontrolovat odpověď 👍",
                            style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.Bold)
                        )
                    }
                } else {
                    Button(
                        onClick = { viewModel.nextQuizQuestion() },
                        shape = RoundedCornerShape(14.dp),
                        modifier = Modifier.fillMaxWidth().height(52.dp),
                        colors = ButtonDefaults.buttonColors(containerColor = BrandMagentaPrimary)
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Text(
                                text = "Další otázka",
                                style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.Bold)
                            )
                            Spacer(modifier = Modifier.width(8.dp))
                            Icon(imageVector = Icons.Default.ArrowForward, contentDescription = null)
                        }
                    }
                }
            }
        }
    }
}
