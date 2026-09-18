package com.example.ui.screens

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
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
import com.example.data.model.ChecklistItem
import com.example.data.model.MasteryStatus
import com.example.ui.components.CzechAudioButton
import com.example.ui.components.SectionHeader
import com.example.ui.theme.*
import com.example.ui.viewmodel.CzechGrammarViewModel

@Composable
fun ChecklistScreen(
    viewModel: CzechGrammarViewModel,
    modifier: Modifier = Modifier
) {
    val checklistFilter by viewModel.checklistFilter.collectAsState()
    val userRecords by viewModel.userChecklistRecords.collectAsState()
    val allItems = viewModel.allChecklistItems

    // Map each item to current user status
    val itemStatusMap = remember(userRecords) {
        userRecords.associate { it.itemId to it.statusCode }
    }

    val masteredCount = allItems.count { (itemStatusMap[it.id] ?: 0) == 2 }
    val needsPracticeCount = allItems.count { (itemStatusMap[it.id] ?: 0) == 1 }
    val notStartedCount = allItems.size - masteredCount - needsPracticeCount
    val masteryPercent = if (allItems.isNotEmpty()) (masteredCount * 100) / allItems.size else 0

    val filteredItems = allItems.filter { item ->
        val status = when (itemStatusMap[item.id] ?: 0) {
            2 -> MasteryStatus.MASTERED
            1 -> MasteryStatus.NEEDS_PRACTICE
            else -> MasteryStatus.NOT_STARTED
        }
        checklistFilter == null || checklistFilter == status
    }

    val groupedItems = filteredItems.groupBy { it.category }

    LazyColumn(
        modifier = modifier
            .fillMaxSize()
            .padding(horizontal = 16.dp),
        contentPadding = PaddingValues(top = 12.dp, bottom = 80.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        // Mastery Summary Card
        item {
            Card(
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.primaryContainer),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column {
                            Text(
                                text = "STUDENT PROGRESS CHECKLIST",
                                style = MaterialTheme.typography.labelSmall.copy(
                                    color = MaterialTheme.colorScheme.primary,
                                    fontWeight = FontWeight.ExtraBold,
                                    letterSpacing = 1.2.sp
                                )
                            )
                            Text(
                                text = "$masteryPercent% A2 Topics Mastered",
                                style = MaterialTheme.typography.titleMedium.copy(
                                    fontWeight = FontWeight.Bold,
                                    color = MaterialTheme.colorScheme.onPrimaryContainer
                                )
                            )
                        }

                        Surface(
                            shape = CircleShape,
                            color = CzechSuccess,
                            modifier = Modifier.size(44.dp)
                        ) {
                            Box(contentAlignment = Alignment.Center) {
                                Text(
                                    text = "$masteryPercent%",
                                    fontWeight = FontWeight.Bold,
                                    color = Color.White,
                                    fontSize = 13.sp
                                )
                            }
                        }
                    }

                    Spacer(modifier = Modifier.height(10.dp))
                    LinearProgressIndicator(
                        progress = { masteryPercent / 100f },
                        modifier = Modifier.fillMaxWidth().height(8.dp).clip(RoundedCornerShape(4.dp)),
                        color = CzechSuccess,
                        trackColor = MaterialTheme.colorScheme.surface.copy(alpha = 0.5f)
                    )

                    Spacer(modifier = Modifier.height(12.dp))

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text(text = "✅ Mastered: $masteredCount", style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.Bold, color = CzechSuccess))
                        Text(text = "🔄 Need Practice: $needsPracticeCount", style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.Bold, color = CzechGold))
                        Text(text = "⚪ Not Started: $notStartedCount", style = MaterialTheme.typography.bodySmall.copy(color = MaterialTheme.colorScheme.onPrimaryContainer))
                    }
                }
            }
        }

        // Filter Chips
        item {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                FilterChip(
                    selected = checklistFilter == null,
                    onClick = { viewModel.setChecklistFilter(null) },
                    label = { Text("All (${allItems.size})") },
                    shape = RoundedCornerShape(10.dp)
                )
                FilterChip(
                    selected = checklistFilter == MasteryStatus.MASTERED,
                    onClick = { viewModel.setChecklistFilter(if (checklistFilter == MasteryStatus.MASTERED) null else MasteryStatus.MASTERED) },
                    label = { Text("Mastered ($masteredCount)") },
                    shape = RoundedCornerShape(10.dp)
                )
                FilterChip(
                    selected = checklistFilter == MasteryStatus.NEEDS_PRACTICE,
                    onClick = { viewModel.setChecklistFilter(if (checklistFilter == MasteryStatus.NEEDS_PRACTICE) null else MasteryStatus.NEEDS_PRACTICE) },
                    label = { Text("Need Practice ($needsPracticeCount)") },
                    shape = RoundedCornerShape(10.dp)
                )
            }
        }

        // Grouped Items
        groupedItems.forEach { (category, items) ->
            item {
                SectionHeader(title = category)
            }

            items(items) { item ->
                val code = itemStatusMap[item.id] ?: 0
                val status = when (code) {
                    2 -> MasteryStatus.MASTERED
                    1 -> MasteryStatus.NEEDS_PRACTICE
                    else -> MasteryStatus.NOT_STARTED
                }

                ChecklistItemCard(
                    item = item,
                    status = status,
                    onToggleStatus = {
                        viewModel.toggleChecklistItemStatus(item.id, status)
                    },
                    onSpeak = { viewModel.speakCzech(it) }
                )
            }
        }
    }
}

@Composable
fun ChecklistItemCard(
    item: ChecklistItem,
    status: MasteryStatus,
    onToggleStatus: () -> Unit,
    onSpeak: (String) -> Unit
) {
    val (statusIcon, iconColor, statusLabel) = when (status) {
        MasteryStatus.MASTERED -> Triple(Icons.Default.CheckCircle, CzechSuccess, "Mastered")
        MasteryStatus.NEEDS_PRACTICE -> Triple(Icons.Default.Autorenew, CzechGold, "Need Practice")
        MasteryStatus.NOT_STARTED -> Triple(Icons.Default.RadioButtonUnchecked, MaterialTheme.colorScheme.outline, "Not Started")
    }

    Card(
        shape = RoundedCornerShape(14.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
        modifier = Modifier
            .fillMaxWidth()
            .clickable { onToggleStatus() }
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(14.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            IconButton(
                onClick = onToggleStatus,
                modifier = Modifier.size(36.dp)
            ) {
                Icon(
                    imageVector = statusIcon,
                    contentDescription = statusLabel,
                    tint = iconColor,
                    modifier = Modifier.size(28.dp)
                )
            }

            Spacer(modifier = Modifier.width(10.dp))

            Column(modifier = Modifier.weight(1f)) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = item.title,
                        style = MaterialTheme.typography.titleSmall.copy(
                            fontWeight = FontWeight.Bold,
                            color = MaterialTheme.colorScheme.onSurface
                        )
                    )
                    Surface(
                        shape = RoundedCornerShape(6.dp),
                        color = when (status) {
                            MasteryStatus.MASTERED -> CzechSuccessContainer
                            MasteryStatus.NEEDS_PRACTICE -> CzechGoldContainer
                            MasteryStatus.NOT_STARTED -> MaterialTheme.colorScheme.surfaceVariant
                        }
                    ) {
                        Text(
                            text = statusLabel,
                            fontSize = 10.sp,
                            fontWeight = FontWeight.Bold,
                            color = when (status) {
                                MasteryStatus.MASTERED -> CzechSuccess
                                MasteryStatus.NEEDS_PRACTICE -> CzechOnGoldContainer
                                MasteryStatus.NOT_STARTED -> MaterialTheme.colorScheme.onSurfaceVariant
                            },
                            modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                        )
                    }
                }

                Spacer(modifier = Modifier.height(4.dp))

                Text(
                    text = item.description,
                    style = MaterialTheme.typography.bodySmall.copy(
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                )

                Spacer(modifier = Modifier.height(6.dp))

                Surface(
                    shape = RoundedCornerShape(6.dp),
                    color = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.6f),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Row(
                        modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp),
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text(
                            text = "🇨🇿 ${item.exampleCzech}",
                            style = MaterialTheme.typography.labelSmall.copy(
                                fontWeight = FontWeight.SemiBold,
                                color = CzechBluePrimary
                            ),
                            modifier = Modifier.weight(1f)
                        )
                        CzechAudioButton(
                            textToSpeak = item.exampleCzech,
                            onSpeak = onSpeak
                        )
                    }
                }
            }
        }
    }
}
