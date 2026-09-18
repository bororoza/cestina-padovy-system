package com.example.audio

import android.content.Context
import android.speech.tts.TextToSpeech
import android.speech.tts.UtteranceProgressListener
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import java.util.Locale

class CzechSpeechHelper(context: Context) : TextToSpeech.OnInitListener {

    private var tts: TextToSpeech? = TextToSpeech(context.applicationContext, this)
    private var isInitialized = false

    private val _isSpeaking = MutableStateFlow(false)
    val isSpeaking: StateFlow<Boolean> = _isSpeaking.asStateFlow()

    private val _currentWord = MutableStateFlow<String?>(null)
    val currentWord: StateFlow<String?> = _currentWord.asStateFlow()

    private val _isSlowMode = MutableStateFlow(false)
    val isSlowMode: StateFlow<Boolean> = _isSlowMode.asStateFlow()

    override fun onInit(status: Int) {
        if (status == TextToSpeech.SUCCESS) {
            val czechLocale = Locale("cs", "CZ")
            val result = tts?.setLanguage(czechLocale)
            if (result == TextToSpeech.LANG_MISSING_DATA || result == TextToSpeech.LANG_NOT_SUPPORTED) {
                // Fallback to general czech or default
                tts?.setLanguage(Locale("cs"))
            }
            tts?.setPitch(1.0f)
            tts?.setSpeechRate(1.0f)
            isInitialized = true

            tts?.setOnUtteranceProgressListener(object : UtteranceProgressListener() {
                override fun onStart(utteranceId: String?) {
                    _isSpeaking.value = true
                }

                override fun onDone(utteranceId: String?) {
                    _isSpeaking.value = false
                    _currentWord.value = null
                }

                @Deprecated("Deprecated in Java")
                override fun onError(utteranceId: String?) {
                    _isSpeaking.value = false
                    _currentWord.value = null
                }
            })
        }
    }

    fun toggleSlowMode() {
        val newSlow = !_isSlowMode.value
        _isSlowMode.value = newSlow
        tts?.setSpeechRate(if (newSlow) 0.72f else 1.0f)
    }

    fun speak(text: String, slow: Boolean = _isSlowMode.value) {
        if (!isInitialized || tts == null) return
        stop()
        _currentWord.value = text
        tts?.setSpeechRate(if (slow) 0.72f else 1.0f)
        val params = HashMap<String, String>()
        params[TextToSpeech.Engine.KEY_PARAM_UTTERANCE_ID] = "CzechVoice_${System.currentTimeMillis()}"
        @Suppress("DEPRECATION")
        tts?.speak(text, TextToSpeech.QUEUE_FLUSH, params)
    }

    fun stop() {
        tts?.stop()
        _isSpeaking.value = false
        _currentWord.value = null
    }

    fun shutdown() {
        tts?.stop()
        tts?.shutdown()
        tts = null
    }
}
