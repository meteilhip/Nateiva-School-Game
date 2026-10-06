import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';

interface SpeechInputAdapterProps {
  expectedText: string;
  onResult: (isCorrect: boolean, spokenText: string) => void;
  language?: string;
}

export function SpeechInputAdapter({ expectedText, onResult, language = 'fr-FR' }: SpeechInputAdapterProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [notSupported, setNotSupported] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'web') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) {
        setNotSupported(true);
      }
    } else {
      // For iOS/Android, we would normally use @react-native-voice/voice here.
      // We will fall back to a mock for now until the native module is linked.
      setNotSupported(true); 
    }
  }, []);

  const handleListenWeb = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = language;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript('Écoute en cours...');
    };

    recognition.onresult = (event: any) => {
      const spoken = event.results[0][0].transcript;
      setTranscript(spoken);
      
      // Simple evaluation logic: check if expected text is in the spoken text (case insensitive)
      const cleanExpected = expectedText.toLowerCase().replace(/[.,!?]/g, '').trim();
      const cleanSpoken = spoken.toLowerCase().replace(/[.,!?]/g, '').trim();
      
      const isCorrect = cleanSpoken.includes(cleanExpected) || cleanExpected.includes(cleanSpoken);
      
      setTimeout(() => {
        setIsListening(false);
        onResult(isCorrect, spoken);
      }, 1000);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
      setTranscript('Erreur: ' + event.error);
    };

    recognition.onspeechend = () => {
      recognition.stop();
    };

    recognition.start();
  };

  const startListening = () => {
    if (Platform.OS === 'web') {
      handleListenWeb();
    }
  };

  if (notSupported) {
    return (
      <View style={styles.container}>
        <Text style={styles.warning}>🎙️ Reconnaissance vocale non supportée sur ce navigateur/appareil.</Text>
        <TouchableOpacity style={styles.fallbackBtn} onPress={() => onResult(true, expectedText)}>
          <Text style={styles.fallbackText}>Valider manuellement (Mock)</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.targetText}>Lis ceci : "{expectedText}"</Text>
      
      <TouchableOpacity 
        style={[styles.micBtn, isListening && styles.micBtnActive]} 
        onPress={startListening}
        disabled={isListening}
      >
        <Text style={styles.micIcon}>{isListening ? '🎙️...' : '🎤'}</Text>
        <Text style={styles.micText}>{isListening ? 'Parlez maintenant...' : 'Appuyez pour parler'}</Text>
      </TouchableOpacity>

      {transcript ? <Text style={styles.transcript}>Vous avez dit : "{transcript}"</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center', backgroundColor: '#F8FAFC', borderRadius: 16, width: '100%' },
  targetText: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#1E293B', textAlign: 'center' },
  micBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#3B82F6', paddingVertical: 16, paddingHorizontal: 24, borderRadius: 30, gap: 10 },
  micBtnActive: { backgroundColor: '#EF4444' },
  micIcon: { fontSize: 24 },
  micText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  transcript: { marginTop: 20, fontSize: 18, color: '#475569', fontStyle: 'italic', textAlign: 'center' },
  warning: { color: '#B45309', marginBottom: 15, textAlign: 'center' },
  fallbackBtn: { backgroundColor: '#E2E8F0', padding: 12, borderRadius: 8 },
  fallbackText: { color: '#475569', fontWeight: 'bold' }
});
