package com.example.ui.screens

import android.annotation.SuppressLint
import android.content.Context
import android.os.Build
import android.speech.tts.TextToSpeech
import android.view.ViewGroup
import android.webkit.JavascriptInterface
import android.webkit.WebChromeClient
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.viewinterop.AndroidView
import java.util.Locale

class WebAppInterface(private val context: Context, private val tts: TextToSpeech?) {
    @JavascriptInterface
    fun speakText(text: String, rate: Float) {
        tts?.setSpeechRate(rate)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            tts?.speak(text, TextToSpeech.QUEUE_FLUSH, null, "WEB_TTS")
        } else {
            @Suppress("DEPRECATION")
            tts?.speak(text, TextToSpeech.QUEUE_FLUSH, null)
        }
    }
}

@SuppressLint("SetJavaScriptEnabled")
@Composable
fun WebViewScreen() {
    val context = LocalContext.current

    // Initialize TTS for native audio playback from WebView
    var textToSpeech: TextToSpeech? = remember { null }
    textToSpeech = remember {
        var speech: TextToSpeech? = null
        speech = TextToSpeech(context) { status ->
            if (status == TextToSpeech.SUCCESS) {
                val localeCzech = Locale("cs", "CZ")
                speech?.language = localeCzech
            }
        }
        speech
    }

    DisposableEffect(Unit) {
        onDispose {
            textToSpeech?.stop()
            textToSpeech?.shutdown()
        }
    }

    AndroidView(
        factory = { ctx ->
            WebView(ctx).apply {
                layoutParams = ViewGroup.LayoutParams(
                    ViewGroup.LayoutParams.MATCH_PARENT,
                    ViewGroup.LayoutParams.MATCH_PARENT
                )
                // Set software rendering layer if GPU rendernode is unavailable in headless/emulator environments
                setLayerType(android.view.View.LAYER_TYPE_SOFTWARE, null)

                webChromeClient = WebChromeClient()
                webViewClient = WebViewClient()

                settings.apply {
                    javaScriptEnabled = true
                    domStorageEnabled = true
                    allowFileAccess = true
                    databaseEnabled = true
                    cacheMode = WebSettings.LOAD_DEFAULT
                    useWideViewPort = true
                    loadWithOverviewMode = true
                }

                addJavascriptInterface(WebAppInterface(ctx, textToSpeech), "AndroidBridge")
                loadUrl("file:///android_asset/web/index.html")
            }
        },
        modifier = Modifier.fillMaxSize()
    )
}
