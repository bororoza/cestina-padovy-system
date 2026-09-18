package com.example.ui.components

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.core.*
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.VolumeUp
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.filled.Speed
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.scale
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.model.GrammaticalGender
import com.example.ui.theme.*

@Composable
fun CzechAudioButton(
    textToSpeak: String,
    onSpeak: (String) -> Unit,
    modifier: Modifier = Modifier,
    isSpeaking: Boolean = false,
    label: String? = null,
    slow: Boolean = false
) {
    val infiniteTransition = rememberInfiniteTransition(label = "pulse")
    val pulseScale by infiniteTransition.animateFloat(
        initialValue = 1.0f,
        targetValue = if (isSpeaking) 1.15f else 1.0f,
        animationSpec = infiniteRepeatable(
            animation = tween(600, easing = FastOutSlowInEasing),
            repeatMode = RepeatMode.Reverse
        ),
        label = "pulseScale"
    )

    Surface(
        onClick = { onSpeak(textToSpeak) },
        shape = RoundedCornerShape(16.dp),
        color = if (isSpeaking) CzechRedAccent.copy(alpha = 0.15f) else MaterialTheme.colorScheme.primaryContainer,
        modifier = modifier
            .minimumInteractiveComponentSize()
            .scale(if (isSpeaking) pulseScale else 1.0f)
    ) {
        Row(
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.Center,
            modifier = Modifier.padding(horizontal = 10.dp, vertical = 6.dp)
        ) {
            Icon(
                imageVector = Icons.AutoMirrored.Filled.VolumeUp,
                contentDescription = "Pronounce $textToSpeak",
                tint = if (isSpeaking) CzechRedAccent else MaterialTheme.colorScheme.primary,
                modifier = Modifier.size(18.dp)
            )
            if (label != null) {
                Spacer(modifier = Modifier.width(6.dp))
                Text(
                    text = label,
                    style = MaterialTheme.typography.labelMedium.copy(
                        fontWeight = FontWeight.SemiBold,
                        color = if (isSpeaking) CzechRedAccent else MaterialTheme.colorScheme.primary
                    )
                )
            }
        }
    }
}

@Composable
fun GenderBadge(
    gender: GrammaticalGender,
    modifier: Modifier = Modifier,
    compact: Boolean = false
) {
    val (bg, textColor) = when (gender) {
        GrammaticalGender.MA -> Color(0xFFDBEAFE) to Color(0xFF1E40AF)
        GrammaticalGender.MI -> Color(0xFFE0E7FF) to Color(0xFF3730A3)
        GrammaticalGender.F -> Color(0xFFFCE7F3) to Color(0xFF9D174D)
        GrammaticalGender.N -> Color(0xFFEDE9FE) to Color(0xFF5B21B6)
    }

    Surface(
        shape = RoundedCornerShape(8.dp),
        color = bg,
        modifier = modifier
    ) {
        Row(
            verticalAlignment = Alignment.CenterVertically,
            modifier = Modifier.padding(horizontal = 8.dp, vertical = 3.dp)
        ) {
            Box(
                modifier = Modifier
                    .size(8.dp)
                    .clip(CircleShape)
                    .background(textColor)
            )
            Spacer(modifier = Modifier.width(5.dp))
            Text(
                text = if (compact) gender.code else "${gender.code} (${gender.displayName})",
                color = textColor,
                fontSize = 11.sp,
                fontWeight = FontWeight.Bold
            )
        }
    }
}

@Composable
fun CaseChip(
    caseNumber: Int,
    shortCode: String,
    name: String,
    isSelected: Boolean,
    onClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    FilterChip(
        selected = isSelected,
        onClick = onClick,
        label = {
            Text(
                text = "$caseNumber. $shortCode",
                fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Medium
            )
        },
        colors = FilterChipDefaults.filterChipColors(
            selectedContainerColor = CzechBluePrimary,
            selectedLabelColor = Color.White
        ),
        shape = RoundedCornerShape(12.dp),
        modifier = modifier.minimumInteractiveComponentSize()
    )
}

@Composable
fun SectionHeader(
    title: String,
    subtitle: String? = null,
    modifier: Modifier = Modifier
) {
    Column(modifier = modifier.fillMaxWidth().padding(vertical = 8.dp)) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            Box(
                modifier = Modifier
                    .width(5.dp)
                    .height(22.dp)
                    .clip(RoundedCornerShape(3.dp))
                    .background(BrandMagentaPrimary)
            )
            Spacer(modifier = Modifier.width(8.dp))
            Text(
                text = title,
                style = MaterialTheme.typography.titleMedium.copy(
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.onBackground
                )
            )
        }
        if (subtitle != null) {
            Text(
                text = subtitle,
                style = MaterialTheme.typography.bodySmall.copy(
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                ),
                modifier = Modifier.padding(start = 13.dp, top = 2.dp)
            )
        }
    }
}

/**
 * Cheerful mentor advice card ("Lektorka radí") with doodle accents and brand colors.
 */
@Composable
fun TutorAdviceCard(
    tipTitle: String,
    tipMessage: String,
    modifier: Modifier = Modifier
) {
    Surface(
        shape = RoundedCornerShape(18.dp),
        color = BrandMagentaContainer.copy(alpha = 0.65f),
        border = androidx.compose.foundation.BorderStroke(1.5.dp, BrandMagentaPrimary.copy(alpha = 0.35f)),
        modifier = modifier.fillMaxWidth()
    ) {
        Row(
            modifier = Modifier.padding(14.dp),
            verticalAlignment = Alignment.Top
        ) {
            Surface(
                shape = CircleShape,
                color = BrandMagentaPrimary,
                modifier = Modifier.size(38.dp)
            ) {
                Box(contentAlignment = Alignment.Center) {
                    Text(
                        text = "💡",
                        fontSize = 18.sp
                    )
                }
            }
            Spacer(modifier = Modifier.width(12.dp))
            Column(modifier = Modifier.weight(1f)) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Text(
                        text = tipTitle,
                        style = MaterialTheme.typography.titleSmall.copy(
                            fontWeight = FontWeight.Bold,
                            color = BrandOnMagentaContainer
                        )
                    )
                    Spacer(modifier = Modifier.width(6.dp))
                    Surface(
                        shape = RoundedCornerShape(6.dp),
                        color = BrandGoldContainer
                    ) {
                        Text(
                            text = "Lektorka radí",
                            fontSize = 10.sp,
                            fontWeight = FontWeight.Bold,
                            color = BrandOnGoldContainer,
                            modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                        )
                    }
                }
                Spacer(modifier = Modifier.height(4.dp))
                Text(
                    text = tipMessage,
                    style = MaterialTheme.typography.bodySmall.copy(
                        color = BrandOnMagentaContainer.copy(alpha = 0.9f),
                        lineHeight = 18.sp
                    )
                )
            }
        }
    }
}

/**
 * Interactive 7-piece Puzzle Strip representing the 7 cases in Čeština na úrovni.
 */
@Composable
fun PuzzleCasesMap(
    completedCases: Set<Int>,
    selectedCase: Int,
    onSelectCase: (Int) -> Unit,
    modifier: Modifier = Modifier
) {
    Surface(
        shape = RoundedCornerShape(16.dp),
        color = MaterialTheme.colorScheme.surface,
        tonalElevation = 2.dp,
        border = androidx.compose.foundation.BorderStroke(1.dp, DensityBorderSubtle),
        modifier = modifier.fillMaxWidth()
    ) {
        Column(modifier = Modifier.padding(12.dp)) {
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
                        text = "Skládačka 7 pádů",
                        fontWeight = FontWeight.Bold,
                        style = MaterialTheme.typography.titleSmall
                    )
                }
                Text(
                    text = "${completedCases.size}/7 hotovo",
                    fontSize = 11.sp,
                    fontWeight = FontWeight.Bold,
                    color = if (completedCases.size == 7) CzechSuccess else BrandMagentaPrimary
                )
            }

            Spacer(modifier = Modifier.height(10.dp))

            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                for (c in 1..7) {
                    val isDone = completedCases.contains(c)
                    val isCurrent = selectedCase == c

                    val caseCode = when (c) {
                        1 -> "Nom"
                        2 -> "Gen"
                        3 -> "Dat"
                        4 -> "Aku"
                        5 -> "Vok"
                        6 -> "Lok"
                        7 -> "Ins"
                        else -> "$c"
                    }

                    Surface(
                        onClick = { onSelectCase(c) },
                        shape = RoundedCornerShape(10.dp),
                        color = when {
                            isCurrent -> BrandMagentaPrimary
                            isDone -> CzechSuccessContainer
                            else -> MaterialTheme.colorScheme.surfaceVariant
                        },
                        border = if (isCurrent) androidx.compose.foundation.BorderStroke(2.dp, BrandGoldTertiary) else null,
                        modifier = Modifier
                            .weight(1f)
                            .padding(horizontal = 2.dp)
                            .height(48.dp)
                    ) {
                        Column(
                            horizontalAlignment = Alignment.CenterHorizontally,
                            verticalArrangement = Arrangement.Center,
                            modifier = Modifier.fillMaxSize()
                        ) {
                            Text(
                                text = "$c.",
                                fontSize = 12.sp,
                                fontWeight = FontWeight.Black,
                                color = when {
                                    isCurrent -> Color.White
                                    isDone -> CzechOnSuccessContainer
                                    else -> MaterialTheme.colorScheme.onSurfaceVariant
                                }
                            )
                            Text(
                                text = if (isDone) "✓" else caseCode,
                                fontSize = 9.sp,
                                fontWeight = FontWeight.Bold,
                                color = when {
                                    isCurrent -> Color.White
                                    isDone -> CzechSuccess
                                    else -> MaterialTheme.colorScheme.onSurfaceVariant.copy(alpha = 0.8f)
                                }
                            )
                        }
                    }
                }
            }
        }
    }
}

