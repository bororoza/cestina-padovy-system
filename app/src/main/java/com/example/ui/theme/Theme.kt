package com.example.ui.theme

import android.os.Build
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.dynamicDarkColorScheme
import androidx.compose.material3.dynamicLightColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext

private val DarkColorScheme =
  darkColorScheme(
    primary = DensityPrimaryDark,
    onPrimary = DensityOnPrimaryDark,
    primaryContainer = DensityPrimaryContainerDark,
    onPrimaryContainer = DensityOnPrimaryContainerDark,
    secondary = DensitySecondary,
    onSecondary = DensityOnSecondary,
    secondaryContainer = DensitySecondaryContainer,
    onSecondaryContainer = DensityOnSecondaryContainer,
    tertiary = DensityTertiary,
    onTertiary = DensityOnTertiary,
    tertiaryContainer = DensityTertiaryContainer,
    onTertiaryContainer = DensityOnTertiaryContainer,
    background = DensityBgDark,
    onBackground = DensityTextDark,
    surface = DensitySurfaceDark,
    onSurface = DensityTextDark,
    surfaceVariant = DensitySurfaceVariantDark,
    onSurfaceVariant = DensityTextSecondaryDark,
    outline = DensityBorderDark
  )

private val LightColorScheme =
  lightColorScheme(
    primary = DensityPrimary,
    onPrimary = DensityOnPrimary,
    primaryContainer = DensityPrimaryContainer,
    onPrimaryContainer = DensityOnPrimaryContainer,
    secondary = DensitySecondary,
    onSecondary = DensityOnSecondary,
    secondaryContainer = DensitySecondaryContainer,
    onSecondaryContainer = DensityOnSecondaryContainer,
    tertiary = DensityTertiary,
    onTertiary = DensityOnTertiary,
    tertiaryContainer = DensityTertiaryContainer,
    onTertiaryContainer = DensityOnTertiaryContainer,
    background = DensityBgLight,
    onBackground = DensityTextPrimary,
    surface = DensitySurfaceLight,
    onSurface = DensityTextPrimary,
    surfaceVariant = DensitySurfaceVariantLight,
    onSurfaceVariant = DensityTextSecondary,
    outline = DensityBorderLight,
    outlineVariant = DensityBorderSubtle
  )

@Composable
fun MyApplicationTheme(
  darkTheme: Boolean = isSystemInDarkTheme(),
  dynamicColor: Boolean = false,
  content: @Composable () -> Unit,
) {
  val colorScheme =
    when {
      dynamicColor && Build.VERSION.SDK_INT >= Build.VERSION_CODES.S -> {
        val context = LocalContext.current
        if (darkTheme) dynamicDarkColorScheme(context) else dynamicLightColorScheme(context)
      }
      darkTheme -> DarkColorScheme
      else -> LightColorScheme
    }

  MaterialTheme(colorScheme = colorScheme, typography = Typography, content = content)
}

