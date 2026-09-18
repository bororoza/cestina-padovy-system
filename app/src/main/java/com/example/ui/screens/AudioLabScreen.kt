package com.example.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Speed
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.CzechGrammarData
import com.example.data.PronunciationGuide
import com.example.ui.components.CzechAudioButton
import com.example.ui.components.SectionHeader
import com.example.ui.theme.*
import com.example.ui.viewmodel.CzechGrammarViewModel

data class A2SpokenPhrase(
    val category: String,
    val czechText: String,
    val englishText: String,
    val grammarNote: String
)

@Composable
fun AudioLabScreen(
    viewModel: CzechGrammarViewModel,
    modifier: Modifier = Modifier
) {
    val isSlowMode by viewModel.speechHelper.isSlowMode.collectAsState()
    val isSpeaking by viewModel.speechHelper.isSpeaking.collectAsState()
    val currentWordSpeaking by viewModel.speechHelper.currentWord.collectAsState()

    val a2Dialogues = remember {
        listOf(
            A2SpokenPhrase(
                category = "🏥 Doctor & Health (Zdraví)",
                czechText = "Dobrý den, pane doktore. Už tři dny mě bolí v krku a mám vysokou horečku.",
                englishText = "Hello Doctor. My throat has been hurting for three days and I have a high fever.",
                grammarNote = "Vokativ (pane doktore), Akuzativ (mě bolí), Lokál (v krku)"
            ),
            A2SpokenPhrase(
                category = "🏛️ OAMP / Immigration Office (Úřad)",
                czechText = "Dobrý den, podávám žádost o trvalý pobyt v České republice. Zde jsou všechny moje doklady.",
                englishText = "Hello, I am submitting an application for permanent residence in the CR. Here are all my documents.",
                grammarNote = "Akuzativ (o trvalý pobyt), Lokál (v České republice)"
            ),
            A2SpokenPhrase(
                category = "🚆 Public Transport (Doprava)",
                czechText = "Prosím jeden zpáteční lístek do Brna na hlavní nádraží. V kolik hodin ten vlak odjíždí?",
                englishText = "One return ticket to Brno to main station please. At what time does that train depart?",
                grammarNote = "Genitiv po 'do' (do Brna), Akuzativ (na hlavní nádraží)"
            ),
            A2SpokenPhrase(
                category = "🍽️ Restaurant & Food (Restaurace)",
                czechText = "Dám si hovězí guláš s houskovým knedlíkem a jedno velké točené pivo.",
                englishText = "I'll have beef goulash with bread dumpling and one large draft beer.",
                grammarNote = "Instrumentál se 's' (s knedlíkem), Akuzativ (velké pivo)"
            ),
            A2SpokenPhrase(
                category = "🏠 Housing & Rental (Bydlení)",
                czechText = "Hledám nezařízený byt k pronájmu v klidné čtvrti blízko stanice metra.",
                englishText = "I am looking for an unfurnished apartment to rent in a quiet neighborhood near metro station.",
                grammarNote = "Akuzativ (hledám byt), Genitiv po 'blízko' (blízko stanice)"
            )
        )
    }

    LazyColumn(
        modifier = modifier
            .fillMaxSize()
            .padding(horizontal = 16.dp),
        contentPadding = PaddingValues(top = 12.dp, bottom = 80.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        // Speed Control Header Card
        item {
            Card(
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.primaryContainer),
                modifier = Modifier.fillMaxWidth()
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Column(modifier = Modifier.weight(1f)) {
                        Text(
                            text = "AUDIO & PRONUNCIATION LAB",
                            style = MaterialTheme.typography.titleMedium.copy(
                                fontWeight = FontWeight.Bold,
                                color = MaterialTheme.colorScheme.onPrimaryContainer
                            )
                        )
                        Text(
                            text = if (isSlowMode) "Learner Mode (0.75x Slow)" else "Native Speed (1.0x Normal)",
                            style = MaterialTheme.typography.bodySmall.copy(
                                color = MaterialTheme.colorScheme.onPrimaryContainer.copy(alpha = 0.85f)
                            )
                        )
                    }

                    FilterChip(
                        selected = isSlowMode,
                        onClick = { viewModel.toggleSlowSpeech() },
                        label = {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Icon(
                                    imageVector = Icons.Default.Speed,
                                    contentDescription = null,
                                    modifier = Modifier.size(16.dp)
                                )
                                Spacer(modifier = Modifier.width(4.dp))
                                Text(if (isSlowMode) "Slow (0.75x)" else "Normal (1x)")
                            }
                        },
                        shape = RoundedCornerShape(12.dp)
                    )
                }
            }
        }

        // Czech Tricky Sounds Workshop
        item {
            SectionHeader(
                title = "Tricky Czech Sounds Workshop",
                subtitle = "Master unique phonetics like Ř, Ě, and soft consonants"
            )
        }

        items(viewModel.pronunciationGuides) { sound ->
            SoundDrillCard(
                sound = sound,
                onSpeak = { viewModel.speakCzech(it) },
                isSpeaking = isSpeaking,
                currentWordSpeaking = currentWordSpeaking
            )
        }

        // A2 Exam Key Spoken Scenarios
        item {
            SectionHeader(
                title = "A2 Trvalý Pobyt Spoken Exam Scenarios",
                subtitle = "Listen & repeat key conversational sentences"
            )
        }

        items(a2Dialogues) { item ->
            Card(
                shape = RoundedCornerShape(14.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(modifier = Modifier.padding(14.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = item.category,
                            style = MaterialTheme.typography.titleSmall.copy(
                                fontWeight = FontWeight.Bold,
                                color = CzechBluePrimary
                            )
                        )
                        CzechAudioButton(
                            textToSpeak = item.czechText,
                            onSpeak = { viewModel.speakCzech(it) },
                            isSpeaking = isSpeaking && currentWordSpeaking == item.czechText
                        )
                    }

                    Spacer(modifier = Modifier.height(6.dp))

                    Text(
                        text = item.czechText,
                        style = MaterialTheme.typography.bodyLarge.copy(
                            fontWeight = FontWeight.Bold,
                            color = MaterialTheme.colorScheme.onSurface
                        )
                    )

                    Spacer(modifier = Modifier.height(4.dp))

                    Text(
                        text = item.englishText,
                        style = MaterialTheme.typography.bodyMedium.copy(
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    )

                    Spacer(modifier = Modifier.height(6.dp))

                    Surface(
                        shape = RoundedCornerShape(6.dp),
                        color = MaterialTheme.colorScheme.surfaceVariant
                    ) {
                        Text(
                            text = "Grammar: ${item.grammarNote}",
                            style = MaterialTheme.typography.labelSmall.copy(
                                fontWeight = FontWeight.Medium,
                                color = MaterialTheme.colorScheme.onSurfaceVariant
                            ),
                            modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                        )
                    }
                }
            }
        }
    }
}

@OptIn(ExperimentalLayoutApi::class)
@Composable
fun SoundDrillCard(
    sound: PronunciationGuide,
    onSpeak: (String) -> Unit,
    isSpeaking: Boolean,
    currentWordSpeaking: String?
) {
    Card(
        shape = RoundedCornerShape(14.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(modifier = Modifier.padding(14.dp)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Surface(
                        shape = CircleShape,
                        color = CzechRedContainer,
                        modifier = Modifier.size(36.dp)
                    ) {
                        Box(contentAlignment = Alignment.Center) {
                            Text(
                                text = sound.letter.substringBefore(" "),
                                style = MaterialTheme.typography.titleMedium.copy(
                                    fontWeight = FontWeight.ExtraBold,
                                    color = CzechOnRedContainer
                                )
                            )
                        }
                    }
                    Spacer(modifier = Modifier.width(10.dp))
                    Column {
                        Text(
                            text = sound.letter,
                            style = MaterialTheme.typography.titleSmall.copy(
                                fontWeight = FontWeight.Bold,
                                color = MaterialTheme.colorScheme.onSurface
                            )
                        )
                        Text(
                            text = sound.name,
                            style = MaterialTheme.typography.labelSmall.copy(
                                color = MaterialTheme.colorScheme.onSurfaceVariant
                            )
                        )
                    }
                }

                CzechAudioButton(
                    textToSpeak = sound.examples.joinToString(", "),
                    onSpeak = onSpeak
                )
            }

            Spacer(modifier = Modifier.height(8.dp))

            Text(
                text = "👄 ${sound.guideEnglish}",
                style = MaterialTheme.typography.bodySmall.copy(
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            )

            Spacer(modifier = Modifier.height(10.dp))

            Text(
                text = "Tap words to practice pronunciation:",
                style = MaterialTheme.typography.labelSmall.copy(
                    fontWeight = FontWeight.Bold,
                    color = CzechBluePrimary
                )
            )

            Spacer(modifier = Modifier.height(6.dp))

            FlowRow(
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                sound.examples.forEach { word ->
                    val cleanWord = word.substringBefore(" [")
                    val isThisWordSpeaking = isSpeaking && currentWordSpeaking == cleanWord
                    Surface(
                        onClick = { onSpeak(cleanWord) },
                        shape = RoundedCornerShape(8.dp),
                        color = if (isThisWordSpeaking) CzechRedAccent.copy(alpha = 0.2f) else MaterialTheme.colorScheme.surfaceVariant,
                        border = if (isThisWordSpeaking) androidx.compose.foundation.BorderStroke(1.dp, CzechRedAccent) else null
                    ) {
                        Text(
                            text = "🔊 $word",
                            fontSize = 12.sp,
                            fontWeight = FontWeight.SemiBold,
                            color = if (isThisWordSpeaking) CzechRedAccent else MaterialTheme.colorScheme.onSurfaceVariant,
                            modifier = Modifier.padding(horizontal = 8.dp, vertical = 6.dp)
                        )
                    }
                }
            }
        }
    }
}
