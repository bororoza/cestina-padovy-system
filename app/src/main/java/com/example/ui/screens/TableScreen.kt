package com.example.ui.screens

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
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
import com.example.data.model.*
import com.example.ui.components.*
import com.example.ui.theme.*
import com.example.ui.viewmodel.CzechGrammarViewModel

@Composable
fun TableScreen(
    viewModel: CzechGrammarViewModel,
    modifier: Modifier = Modifier
) {
    val selectedCaseNumber by viewModel.selectedCaseIndex.collectAsState()
    val selectedGender by viewModel.selectedGenderFilter.collectAsState()
    val isSpeaking by viewModel.speechHelper.isSpeaking.collectAsState()
    val currentWordSpeaking by viewModel.speechHelper.currentWord.collectAsState()
    val isSlowMode by viewModel.speechHelper.isSlowMode.collectAsState()
    val exerciseRecords by viewModel.exerciseRecords.collectAsState()

    val currentCase = viewModel.allCases.find { it.caseNumber == selectedCaseNumber } ?: viewModel.allCases.first()

    // Calculate completed case numbers from exercise accuracy
    val completedCaseNumbers = remember(exerciseRecords) {
        (1..7).filter { caseNum ->
            val records = exerciseRecords.filter { it.caseNumber == caseNum }
            records.isNotEmpty() && (records.count { it.isCorrect } * 100 / records.size) >= 75
        }.toSet()
    }

    LazyColumn(
        modifier = modifier
            .fillMaxSize()
            .padding(horizontal = 16.dp),
        contentPadding = PaddingValues(top = 12.dp, bottom = 80.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        // Tutor & Brand Hero Banner
        item {
            Card(
                shape = RoundedCornerShape(20.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
                border = androidx.compose.foundation.BorderStroke(1.5.dp, BrandMagentaContainer),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column {
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(190.dp)
                    ) {
                        Image(
                            painter = painterResource(id = R.drawable.img_notebook_cases),
                            contentDescription = "Otevřený sešit s přehledem koncovek českých pádů",
                            contentScale = ContentScale.Crop,
                            alignment = Alignment.Center,
                            modifier = Modifier.fillMaxSize()
                        )
                        Surface(
                            shape = RoundedCornerShape(topStart = 0.dp, bottomStart = 0.dp, topEnd = 12.dp, bottomEnd = 12.dp),
                            color = BrandMagentaPrimary,
                            modifier = Modifier
                                .align(Alignment.TopStart)
                                .padding(top = 12.dp)
                        ) {
                            Row(
                                modifier = Modifier.padding(horizontal = 10.dp, vertical = 5.dp),
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Text(text = "📖 Studijní sešit pádů", color = Color.White, fontWeight = FontWeight.Bold, fontSize = 11.sp)
                                Spacer(modifier = Modifier.width(4.dp))
                                Text(text = "✨", fontSize = 11.sp)
                            }
                        }
                    }

                    Column(modifier = Modifier.padding(16.dp)) {
                        Text(
                            text = "Složte si českou gramatiku jako puzzle!",
                            style = MaterialTheme.typography.titleMedium.copy(
                                fontWeight = FontWeight.Black,
                                color = MaterialTheme.colorScheme.onBackground
                            )
                        )
                        Spacer(modifier = Modifier.height(4.dp))
                        Text(
                            text = "A2 pádový systém pro trvalý pobyt v ČR. Každý pád má jasná pravidla a otázku — prozkoumejte tabulku a poslechněte si rodilou výslovnost.",
                            style = MaterialTheme.typography.bodySmall.copy(
                                color = MaterialTheme.colorScheme.onSurfaceVariant,
                                lineHeight = 18.sp
                            )
                        )

                        Spacer(modifier = Modifier.height(10.dp))
                        Row(
                            horizontalArrangement = Arrangement.spacedBy(8.dp),
                            modifier = Modifier.horizontalScroll(rememberScrollState())
                        ) {
                            Surface(shape = RoundedCornerShape(8.dp), color = BrandMagentaContainer) {
                                Text(text = "🧩 7 pádů", fontSize = 11.sp, fontWeight = FontWeight.Bold, color = BrandOnMagentaContainer, modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp))
                            }
                            Surface(shape = RoundedCornerShape(8.dp), color = BrandGoldContainer) {
                                Text(text = "👍 175 cvičení", fontSize = 11.sp, fontWeight = FontWeight.Bold, color = BrandOnGoldContainer, modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp))
                            }
                            Surface(shape = RoundedCornerShape(8.dp), color = BrandBlueContainer) {
                                Text(text = "🔊 Nativní audio", fontSize = 11.sp, fontWeight = FontWeight.Bold, color = BrandOnBlueContainer, modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp))
                            }
                        }
                    }
                }
            }
        }

        // Interactive 7-Piece Puzzle Navigation
        item {
            PuzzleCasesMap(
                completedCases = completedCaseNumbers,
                selectedCase = selectedCaseNumber,
                onSelectCase = { viewModel.selectCase(it) }
            )
        }

        // Active Case Overview Banner
        item {
            Card(
                shape = RoundedCornerShape(18.dp),
                colors = CardDefaults.cardColors(containerColor = BrandMagentaContainer),
                border = androidx.compose.foundation.BorderStroke(1.5.dp, BrandMagentaPrimary.copy(alpha = 0.4f)),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column(modifier = Modifier.weight(1f)) {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Surface(
                                    shape = CircleShape,
                                    color = BrandMagentaPrimary,
                                    modifier = Modifier.size(26.dp)
                                ) {
                                    Box(contentAlignment = Alignment.Center) {
                                        Text(
                                            text = "${currentCase.caseNumber}",
                                            color = Color.White,
                                            fontWeight = FontWeight.Black,
                                            fontSize = 13.sp
                                        )
                                    }
                                }
                                Spacer(modifier = Modifier.width(8.dp))
                                Text(
                                    text = currentCase.czechName,
                                    style = MaterialTheme.typography.titleLarge.copy(
                                        fontWeight = FontWeight.Black,
                                        color = BrandOnMagentaContainer
                                    )
                                )
                            }
                            Spacer(modifier = Modifier.height(4.dp))
                            Text(
                                text = "${currentCase.czechQuestion} (${currentCase.englishQuestion})",
                                style = MaterialTheme.typography.bodyMedium.copy(
                                    color = BrandMagentaDark,
                                    fontWeight = FontWeight.Bold
                                )
                            )
                        }
                        CzechAudioButton(
                            textToSpeak = "${currentCase.czechName}. ${currentCase.czechQuestion}",
                            onSpeak = { viewModel.speakCzech(it) },
                            isSpeaking = isSpeaking && currentWordSpeaking?.contains(currentCase.czechName) == true
                        )
                    }

                    Spacer(modifier = Modifier.height(8.dp))
                    HorizontalDivider(color = BrandMagentaPrimary.copy(alpha = 0.2f))
                    Spacer(modifier = Modifier.height(8.dp))

                    Text(
                        text = currentCase.meaningDescription,
                        style = MaterialTheme.typography.bodyMedium.copy(
                            color = BrandOnMagentaContainer,
                            fontWeight = FontWeight.Normal
                        )
                    )
                    Spacer(modifier = Modifier.height(6.dp))
                    Surface(
                        shape = RoundedCornerShape(8.dp),
                        color = Color.White.copy(alpha = 0.7f),
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Row(
                            modifier = Modifier.padding(8.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text(text = "💡", fontSize = 14.sp)
                            Spacer(modifier = Modifier.width(6.dp))
                            Text(
                                text = currentCase.englishAnalogy,
                                style = MaterialTheme.typography.bodySmall.copy(
                                    color = BrandOnMagentaContainer,
                                    fontWeight = FontWeight.Medium
                                )
                            )
                        }
                    }
                }
            }
        }

        // Tutor Advice Card for Selected Case
        item {
            val (tipTitle, tipMessage) = when (currentCase.caseNumber) {
                1 -> "Základní podmět" to "Nominativ určuje, KDO nebo CO dělá děj. Hlídejte si shodu přídavného jména s rodem jména (např. moderní byt, nová práce, hezké náměstí)."
                2 -> "Množství & směr" to "U číslovek 5 a více vždy použijte genitiv (5 studentů, 10 minut). A předložky původu a vyloučení: do, z, od, bez, u, blízko."
                3 -> "Prospěch & pocity" to "Dativ se váže na slovesa pocitu: líbit se, chutnat, je mi dobře/zima. V ženském rodě pozor na alternace (kniha -> knize, ruka -> ruce)."
                4 -> "Klíč k objektu" to "Životná maskulina mají v akuzativu koncovku jako ve 2. pádě (znám nového lékaře). Neživotná mají tvar stejný jako v 1. pádě (mám nový pas)."
                5 -> "Oslovení na úrovni" to "Při oslovení na úřadech i mezi přáteli vždy používejte 5. pád: Vážený pane řediteli, milá Jano, pane doktore!"
                6 -> "Poloha & téma" to "Lokál se NIKDY nepoužívá samostatně — vždy vyžaduje předložku (v, na, o, po, při). Pozor na změny h/ch/k/r na z/š/c/ř před koncovkou -e/-ě."
                7 -> "Doprava bez předložky" to "Častá past pro cizince: dopravní prostředky a nástroje jsou BEZ 's': jedu vlakem, tramvají, píšu perem. 'S/se' znamená doprovod (jdu s kamarádem)."
                else -> "Metodika Čeština na úrovni" to "Učte se pádové koncovky v celých větách z reálného života — tak si je mozek zafixuje nejrychleji."
            }
            TutorAdviceCard(
                tipTitle = tipTitle,
                tipMessage = tipMessage
            )
        }

        // Gender Filter Chips
        item {
            Row(
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(6.dp)
            ) {
                Text(
                    text = "Gender:",
                    style = MaterialTheme.typography.labelMedium.copy(fontWeight = FontWeight.Bold)
                )
                FilterChip(
                    selected = selectedGender == null,
                    onClick = { viewModel.selectGenderFilter(null) },
                    label = { Text("All (4)") },
                    shape = RoundedCornerShape(8.dp)
                )
                GrammaticalGender.entries.forEach { g ->
                    FilterChip(
                        selected = selectedGender == g,
                        onClick = {
                            viewModel.selectGenderFilter(if (selectedGender == g) null else g)
                        },
                        label = { Text(g.code) },
                        shape = RoundedCornerShape(8.dp)
                    )
                }
            }
        }

        // Declension Matrix Table
        item {
            SectionHeader(
                title = "Interactive Declension Forms",
                subtitle = "Tap any row or word to hear native pronunciation"
            )
        }

        val filteredRows = currentCase.rows.filter { selectedGender == null || it.gender == selectedGender }
        items(filteredRows) { row ->
            DeclensionRowCard(
                row = row,
                onSpeak = { viewModel.speakCzech(it) },
                isSpeaking = isSpeaking && currentWordSpeaking == "${row.pronoun} ${row.adjective} ${row.hardPattern}"
            )
        }

        // Prepositions Section (if available)
        if (currentCase.prepositions.isNotEmpty()) {
            item {
                SectionHeader(
                    title = "Prepositions with ${currentCase.shortCode} (${currentCase.prepositions.size})",
                    subtitle = "Always trigger this case when followed by a noun"
                )
                PrepositionGrid(
                    prepositions = currentCase.prepositions,
                    onSpeak = { viewModel.speakCzech(it) }
                )
            }
        }

        // A2 Verbs & Permanent Residence Exam Verbs
        if (currentCase.a2Verbs.isNotEmpty()) {
            item {
                SectionHeader(
                    title = "A2 Verbs & Trvalý Pobyt Exam Requirements",
                    subtitle = "High-yield verbs tested in Czech A2 residency exam"
                )
            }
            items(currentCase.a2Verbs) { verb ->
                A2VerbCard(
                    verbInfo = verb,
                    onSpeak = { viewModel.speakCzech(it) },
                    isSpeaking = isSpeaking && currentWordSpeaking == verb.samplePhrase
                )
            }
        }

        // Consonant Alternations (specifically for Dative & Locative)
        if (currentCase.consonantAlternations.isNotEmpty()) {
            item {
                SectionHeader(
                    title = "Feminine Consonant Softening (*)",
                    subtitle = "K → C, H → Z, CH → Š, R → Ř before -ě / -e"
                )
                AlternationCard(
                    alternations = currentCase.consonantAlternations,
                    onSpeak = { viewModel.speakCzech(it) }
                )
            }
        }

        // Key Rules & Pitfalls for English Learners
        if (currentCase.specialRules.isNotEmpty()) {
            item {
                SectionHeader(
                    title = "Key Rules & Pitfalls for English Learners",
                    subtitle = "Essential grammatical mechanics to avoid common mistakes"
                )
            }
            items(currentCase.specialRules) { rule ->
                RuleCard(rule = rule, onSpeak = { viewModel.speakCzech(it) })
            }
        }

        // Real-world Dialogues / Example Sentences
        if (currentCase.examples.isNotEmpty()) {
            item {
                SectionHeader(
                    title = "Real-World Examples & Dialogues",
                    subtitle = "Authentic sentences with audio"
                )
            }
            items(currentCase.examples) { ex ->
                ExampleSentenceCard(example = ex, onSpeak = { viewModel.speakCzech(it) })
            }
        }
    }
}

@Composable
fun DeclensionRowCard(
    row: DeclensionRow,
    onSpeak: (String) -> Unit,
    isSpeaking: Boolean
) {
    Card(
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
        modifier = Modifier
            .fillMaxWidth()
            .clickable {
                onSpeak("${row.pronoun}, ${row.adjective}, ${row.hardPattern.substringBefore(" (")}, ${row.softPattern.substringBefore(" (")}")
            }
    ) {
        Column(modifier = Modifier.padding(14.dp)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                GenderBadge(gender = row.gender)
                CzechAudioButton(
                    textToSpeak = "${row.pronoun} ${row.adjective} ${row.hardPattern.substringBefore(" (")}",
                    onSpeak = onSpeak,
                    isSpeaking = isSpeaking
                )
            }

            Spacer(modifier = Modifier.height(10.dp))

            // Pronoun & Adjective
            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                Column(modifier = Modifier.weight(1f)) {
                    Text(
                        text = "PRONOUN",
                        style = MaterialTheme.typography.labelSmall.copy(
                            color = MaterialTheme.colorScheme.onSurfaceVariant,
                            fontWeight = FontWeight.Bold
                        )
                    )
                    Text(
                        text = row.pronoun,
                        style = MaterialTheme.typography.bodyMedium.copy(
                            fontWeight = FontWeight.SemiBold,
                            color = CzechBluePrimary
                        )
                    )
                }
                Column(modifier = Modifier.weight(1f)) {
                    Text(
                        text = "ADJECTIVE",
                        style = MaterialTheme.typography.labelSmall.copy(
                            color = MaterialTheme.colorScheme.onSurfaceVariant,
                            fontWeight = FontWeight.Bold
                        )
                    )
                    Text(
                        text = row.adjective,
                        style = MaterialTheme.typography.bodyMedium.copy(
                            fontWeight = FontWeight.SemiBold,
                            color = CzechBluePrimary
                        )
                    )
                }
            }

            Spacer(modifier = Modifier.height(8.dp))
            HorizontalDivider(color = MaterialTheme.colorScheme.outlineVariant.copy(alpha = 0.5f))
            Spacer(modifier = Modifier.height(8.dp))

            // Hard & Soft Patterns
            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                Column(modifier = Modifier.weight(1f)) {
                    Text(
                        text = "HARD PATTERN (Tvrdé)",
                        style = MaterialTheme.typography.labelSmall.copy(
                            color = MaterialTheme.colorScheme.onSurfaceVariant,
                            fontWeight = FontWeight.Bold
                        )
                    )
                    Text(
                        text = row.hardPattern,
                        style = MaterialTheme.typography.bodyMedium.copy(
                            fontWeight = FontWeight.Medium,
                            color = MaterialTheme.colorScheme.onSurface
                        )
                    )
                }
                Column(modifier = Modifier.weight(1f)) {
                    Text(
                        text = "SOFT PATTERN (Měkké)",
                        style = MaterialTheme.typography.labelSmall.copy(
                            color = MaterialTheme.colorScheme.onSurfaceVariant,
                            fontWeight = FontWeight.Bold
                        )
                    )
                    Text(
                        text = row.softPattern,
                        style = MaterialTheme.typography.bodyMedium.copy(
                            fontWeight = FontWeight.Medium,
                            color = MaterialTheme.colorScheme.onSurface
                        )
                    )
                }
            }

            if (row.note.isNotBlank()) {
                Spacer(modifier = Modifier.height(6.dp))
                Text(
                    text = "ℹ️ ${row.note}",
                    style = MaterialTheme.typography.bodySmall.copy(
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                )
            }
        }
    }
}

@Composable
fun PrepositionGrid(
    prepositions: List<PrepositionInfo>,
    onSpeak: (String) -> Unit
) {
    Card(
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.5f)),
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(
            modifier = Modifier.padding(12.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            prepositions.forEach { prep ->
                var expanded by remember { mutableStateOf(false) }
                Surface(
                    shape = RoundedCornerShape(8.dp),
                    color = MaterialTheme.colorScheme.surface,
                    modifier = Modifier
                        .fillMaxWidth()
                        .clickable { expanded = !expanded }
                ) {
                    Column(modifier = Modifier.padding(10.dp)) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.SpaceBetween
                        ) {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Surface(
                                    shape = RoundedCornerShape(6.dp),
                                    color = CzechRedContainer
                                ) {
                                    Text(
                                        text = prep.prep,
                                        color = CzechOnRedContainer,
                                        fontWeight = FontWeight.Bold,
                                        fontSize = 13.sp,
                                        modifier = Modifier.padding(horizontal = 8.dp, vertical = 2.dp)
                                    )
                                }
                                Spacer(modifier = Modifier.width(10.dp))
                                Text(
                                    text = prep.meaning,
                                    style = MaterialTheme.typography.bodyMedium.copy(fontWeight = FontWeight.Medium)
                                )
                            }
                            CzechAudioButton(
                                textToSpeak = prep.example,
                                onSpeak = onSpeak
                            )
                        }

                        if (expanded) {
                            Spacer(modifier = Modifier.height(6.dp))
                            Text(
                                text = "🇨🇿 ${prep.example}",
                                style = MaterialTheme.typography.bodyMedium.copy(
                                    fontWeight = FontWeight.SemiBold,
                                    color = CzechBluePrimary
                                )
                            )
                            Text(
                                text = "🇬🇧 ${prep.english}",
                                style = MaterialTheme.typography.bodySmall.copy(
                                    color = MaterialTheme.colorScheme.onSurfaceVariant
                                )
                            )
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun A2VerbCard(
    verbInfo: A2VerbInfo,
    onSpeak: (String) -> Unit,
    isSpeaking: Boolean
) {
    Card(
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        modifier = Modifier.fillMaxWidth()
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(14.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column(modifier = Modifier.weight(1f)) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Text(
                        text = verbInfo.verb,
                        style = MaterialTheme.typography.titleMedium.copy(
                            fontWeight = FontWeight.Bold,
                            color = CzechBluePrimary
                        )
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Surface(
                        shape = RoundedCornerShape(6.dp),
                        color = CzechGoldContainer
                    ) {
                        Text(
                            text = verbInfo.examTopic,
                            fontSize = 10.sp,
                            fontWeight = FontWeight.Bold,
                            color = CzechOnGoldContainer,
                            modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                        )
                    }
                }
                Text(
                    text = verbInfo.english,
                    style = MaterialTheme.typography.bodySmall.copy(
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                )
                Spacer(modifier = Modifier.height(6.dp))
                Text(
                    text = "“${verbInfo.samplePhrase}”",
                    style = MaterialTheme.typography.bodyMedium.copy(
                        fontWeight = FontWeight.Medium,
                        color = MaterialTheme.colorScheme.onSurface
                    )
                )
                Text(
                    text = verbInfo.sampleTranslation,
                    style = MaterialTheme.typography.bodySmall.copy(
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                )
            }
            CzechAudioButton(
                textToSpeak = verbInfo.samplePhrase,
                onSpeak = onSpeak,
                isSpeaking = isSpeaking
            )
        }
    }
}

@Composable
fun AlternationCard(
    alternations: List<ConsonantAlternation>,
    onSpeak: (String) -> Unit
) {
    Card(
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.secondaryContainer.copy(alpha = 0.4f)),
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(
            modifier = Modifier.padding(14.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            alternations.forEach { alt ->
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(8.dp))
                        .background(MaterialTheme.colorScheme.surface)
                        .padding(10.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Column {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Text(
                                text = "${alt.fromChar} → ${alt.toChar}",
                                style = MaterialTheme.typography.titleMedium.copy(
                                    fontWeight = FontWeight.ExtraBold,
                                    color = CzechRedAccent
                                )
                            )
                            Spacer(modifier = Modifier.width(10.dp))
                            Text(
                                text = "${alt.baseWord} → ${alt.changedWord}",
                                style = MaterialTheme.typography.bodyMedium.copy(
                                    fontWeight = FontWeight.Bold,
                                    color = MaterialTheme.colorScheme.onSurface
                                )
                            )
                        }
                        Text(
                            text = "${alt.translation} (${alt.contextExample})",
                            style = MaterialTheme.typography.bodySmall.copy(
                                color = MaterialTheme.colorScheme.onSurfaceVariant
                            )
                        )
                    }
                    CzechAudioButton(
                        textToSpeak = "${alt.baseWord}. ${alt.changedWord}. ${alt.contextExample}",
                        onSpeak = onSpeak
                    )
                }
            }
        }
    }
}

@Composable
fun RuleCard(
    rule: GrammarRule,
    onSpeak: (String) -> Unit
) {
    Card(
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(modifier = Modifier.padding(14.dp)) {
            Text(
                text = "📌 ${rule.title}",
                style = MaterialTheme.typography.titleSmall.copy(
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.onSurface
                )
            )
            Spacer(modifier = Modifier.height(4.dp))
            Text(
                text = rule.summary,
                style = MaterialTheme.typography.bodyMedium.copy(
                    fontWeight = FontWeight.SemiBold,
                    color = CzechBluePrimary
                )
            )
            Spacer(modifier = Modifier.height(4.dp))
            Text(
                text = rule.detail,
                style = MaterialTheme.typography.bodySmall.copy(
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            )
            Spacer(modifier = Modifier.height(6.dp))
            Surface(
                shape = RoundedCornerShape(6.dp),
                color = MaterialTheme.colorScheme.surfaceVariant,
                modifier = Modifier.fillMaxWidth()
            ) {
                Row(
                    modifier = Modifier.padding(8.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Text(
                        text = rule.example,
                        style = MaterialTheme.typography.bodySmall.copy(
                            fontWeight = FontWeight.Medium,
                            color = MaterialTheme.colorScheme.onSurface
                        ),
                        modifier = Modifier.weight(1f)
                    )
                    CzechAudioButton(textToSpeak = rule.example, onSpeak = onSpeak)
                }
            }
        }
    }
}

@Composable
fun ExampleSentenceCard(
    example: GrammarExample,
    onSpeak: (String) -> Unit
) {
    Card(
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        modifier = Modifier.fillMaxWidth()
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(12.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = example.czSentence,
                    style = MaterialTheme.typography.bodyMedium.copy(
                        fontWeight = FontWeight.Bold,
                        color = MaterialTheme.colorScheme.onSurface
                    )
                )
                Text(
                    text = example.enSentence,
                    style = MaterialTheme.typography.bodySmall.copy(
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                )
                Spacer(modifier = Modifier.height(2.dp))
                Text(
                    text = "💡 ${example.note}",
                    style = MaterialTheme.typography.labelSmall.copy(
                        color = CzechBluePrimary,
                        fontWeight = FontWeight.Medium
                    )
                )
            }
            CzechAudioButton(textToSpeak = example.czSentence, onSpeak = onSpeak)
        }
    }
}
