package com.example.ui

import androidx.compose.animation.Crossfade
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
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
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.example.R
import com.example.ui.screens.*
import com.example.ui.theme.*
import com.example.ui.viewmodel.AppTab
import com.example.ui.viewmodel.CzechGrammarViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CzechCasesApp(
    viewModel: CzechGrammarViewModel = viewModel()
) {
    val currentTab by viewModel.currentTab.collectAsState()
    val currentUser by viewModel.currentUser.collectAsState()
    val isSlowMode by viewModel.speechHelper.isSlowMode.collectAsState()

    var showProfileDialog by remember { mutableStateOf(false) }
    var isWebMode by remember { mutableStateOf(false) }

    if (isWebMode) {
        Box(modifier = Modifier.fillMaxSize()) {
            WebViewScreen()
            
            // Switch button to switch back to Native Compose if needed
            Surface(
                shape = RoundedCornerShape(20.dp),
                color = MaterialTheme.colorScheme.surface.copy(alpha = 0.92f),
                border = androidx.compose.foundation.BorderStroke(1.dp, BrandMagentaPrimary),
                shadowElevation = 4.dp,
                modifier = Modifier
                    .align(Alignment.TopEnd)
                    .padding(top = 10.dp, end = 12.dp)
            ) {
                Row(
                    modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = "🌐 Web verze",
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Bold,
                        color = BrandMagentaPrimary
                    )
                    Spacer(modifier = Modifier.width(4.dp))
                    IconButton(
                        onClick = { isWebMode = false },
                        modifier = Modifier.size(24.dp).testTag("toggle_native_mode_button")
                    ) {
                        Icon(
                            imageVector = Icons.Default.SwapHoriz,
                            contentDescription = "Přepnout na nativní zobrazení",
                            tint = BrandMagentaPrimary,
                            modifier = Modifier.size(16.dp)
                        )
                    }
                }
            }
        }
        return
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Surface(
                            shape = RoundedCornerShape(10.dp),
                            color = Color.White,
                            border = androidx.compose.foundation.BorderStroke(1.5.dp, BrandGoldTertiary),
                            modifier = Modifier.size(36.dp)
                        ) {
                            Image(
                                painter = painterResource(id = R.drawable.img_brand_logo),
                                contentDescription = "Čeština na úrovni logo",
                                contentScale = ContentScale.Crop,
                                modifier = Modifier.fillMaxSize()
                            )
                        }
                        Spacer(modifier = Modifier.width(10.dp))
                        Column {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Text(
                                    text = "Čeština na úrovni",
                                    style = MaterialTheme.typography.titleMedium.copy(
                                        fontWeight = FontWeight.Black,
                                        color = MaterialTheme.colorScheme.onBackground
                                    )
                                )
                                Spacer(modifier = Modifier.width(4.dp))
                                Text(
                                    text = "✨",
                                    fontSize = 12.sp
                                )
                            }
                            Text(
                                text = "A2 pádový systém • Trvalý pobyt",
                                style = MaterialTheme.typography.labelSmall.copy(
                                    color = BrandMagentaPrimary,
                                    fontWeight = FontWeight.Bold
                                )
                            )
                        }
                    }
                },
                actions = {
                    // Switch to Web HTML/JS view
                    IconButton(
                        onClick = { isWebMode = true },
                        modifier = Modifier.testTag("switch_to_web_button")
                    ) {
                        Surface(
                            shape = RoundedCornerShape(10.dp),
                            color = BrandMagentaContainer,
                            border = androidx.compose.foundation.BorderStroke(1.dp, BrandMagentaPrimary)
                        ) {
                            Row(
                                modifier = Modifier.padding(horizontal = 7.dp, vertical = 5.dp),
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Text(
                                    text = "🌐 Web",
                                    fontSize = 11.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = BrandMagentaPrimary
                                )
                            }
                        }
                    }

                    // Audio Speed Quick Toggle
                    IconButton(
                        onClick = { viewModel.toggleSlowSpeech() },
                        modifier = Modifier.testTag("speed_toggle_button")
                    ) {
                        Surface(
                            shape = RoundedCornerShape(10.dp),
                            color = if (isSlowMode) BrandGoldContainer else MaterialTheme.colorScheme.surfaceVariant,
                            border = if (isSlowMode) androidx.compose.foundation.BorderStroke(1.dp, BrandGoldTertiary) else null
                        ) {
                            Row(
                                modifier = Modifier.padding(horizontal = 7.dp, vertical = 5.dp),
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Text(
                                    text = if (isSlowMode) "🐢 0.75x" else "⚡ 1.0x",
                                    fontSize = 11.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = if (isSlowMode) BrandOnGoldContainer else MaterialTheme.colorScheme.onSurfaceVariant
                                )
                            }
                        }
                    }

                    // User Profile / Login Avatar Button
                    IconButton(
                        onClick = { showProfileDialog = true },
                        modifier = Modifier.testTag("profile_button")
                    ) {
                        Surface(
                            shape = CircleShape,
                            color = BrandMagentaContainer,
                            border = androidx.compose.foundation.BorderStroke(1.5.dp, BrandMagentaPrimary),
                            modifier = Modifier.size(34.dp)
                        ) {
                            Box(contentAlignment = Alignment.Center) {
                                val initial = (currentUser?.displayName?.firstOrNull() ?: 'Č').uppercaseChar()
                                Text(
                                    text = initial.toString(),
                                    fontWeight = FontWeight.Black,
                                    color = BrandMagentaPrimary,
                                    fontSize = 14.sp
                                )
                            }
                        }
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MaterialTheme.colorScheme.surface
                )
            )
        },
        bottomBar = {
            NavigationBar(
                containerColor = MaterialTheme.colorScheme.surface,
                tonalElevation = 6.dp,
                windowInsets = WindowInsets.navigationBars
            ) {
                AppTab.entries.forEach { tab ->
                    val isSelected = currentTab == tab
                    val (icon, label) = when (tab) {
                        AppTab.TABLE -> Icons.Default.TableChart to "Tabulka"
                        AppTab.PRACTICE -> Icons.Default.Quiz to "Procvičování"
                        AppTab.AUDIO_LAB -> Icons.Default.RecordVoiceOver to "Audio Lab"
                        AppTab.CHECKLIST -> Icons.Default.FactCheck to "Předložky"
                        AppTab.STATS -> Icons.Default.Insights to "Můj pokrok"
                    }

                    NavigationBarItem(
                        selected = isSelected,
                        onClick = { viewModel.selectTab(tab) },
                        icon = {
                            Icon(
                                imageVector = icon,
                                contentDescription = label,
                                modifier = Modifier.size(24.dp)
                            )
                        },
                        label = {
                            Text(
                                text = label,
                                fontSize = 11.sp,
                                fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Medium
                            )
                        },
                        colors = NavigationBarItemDefaults.colors(
                            selectedIconColor = BrandMagentaPrimary,
                            selectedTextColor = BrandMagentaPrimary,
                            indicatorColor = BrandMagentaContainer
                        ),
                        modifier = Modifier.testTag("nav_tab_${tab.name.lowercase()}")
                    )
                }
            }
        },
        modifier = Modifier.fillMaxSize()
    ) { innerPadding ->
        Crossfade(
            targetState = currentTab,
            label = "ScreenTransition",
            modifier = Modifier.padding(innerPadding)
        ) { tab ->
            when (tab) {
                AppTab.TABLE -> TableScreen(viewModel = viewModel)
                AppTab.PRACTICE -> ExerciseScreen(viewModel = viewModel)
                AppTab.AUDIO_LAB -> AudioLabScreen(viewModel = viewModel)
                AppTab.CHECKLIST -> ChecklistScreen(viewModel = viewModel)
                AppTab.STATS -> StatsScreen(viewModel = viewModel, onOpenProfile = { showProfileDialog = true })
            }
        }
    }

    if (showProfileDialog) {
        ProfileAuthDialog(
            viewModel = viewModel,
            onDismiss = { showProfileDialog = false }
        )
    }
}
