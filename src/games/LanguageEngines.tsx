import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SpeechInputAdapter } from '../speech/SpeechInputAdapter';

export function PhonemeMatch({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  // Map words to emojis for visual flair
  const emojiMap: Record<string, string> = {
    'Moto': '🏍️',
    'Lit': '🛏️',
    'Sac': '🎒',
    'Mur': '🧱',
    'Chat': '🐈',
    'Chien': '🐕',
    'Papa': '👨',
    'Maman': '👩'
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{question.q}</Text>
      <View style={styles.options}>
        {question.options.map((opt: string) => (
          <TouchableOpacity key={opt} style={styles.bubbleBtn} onPress={() => onAnswer(opt)}>
            <Text style={styles.bubbleEmoji}>{emojiMap[opt] || '❓'}</Text>
            <Text style={styles.bubbleText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

export function WordBuilder({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{question.q}</Text>
      <View style={styles.options}>
        {question.options.map((opt: string) => (
          <TouchableOpacity key={opt} style={styles.btn} onPress={() => onAnswer(opt)}>
            <Text style={styles.btnText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

export function ReadAloud({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{question.q}</Text>
      <View style={styles.speechCard}>
        <SpeechInputAdapter 
          expectedText={question.ans} 
          onResult={(isCorrect, spokenText) => {
            onAnswer(isCorrect ? question.ans : spokenText);
          }} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20, width: '100%' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 40, textAlign: 'center', color: '#1E293B' },
  
  // PhonemeMatch
  options: { flexDirection: 'row', flexWrap: 'wrap', gap: 20, justifyContent: 'center', width: '100%' },
  bubbleBtn: { padding: 20, backgroundColor: '#FEF3C7', borderRadius: 30, borderWidth: 3, borderColor: '#F59E0B', minWidth: 140, alignItems: 'center', shadowColor: '#F59E0B', shadowOpacity: 0.3, shadowRadius: 5, elevation: 5 },
  bubbleEmoji: { fontSize: 60, marginBottom: 10 },
  bubbleText: { fontSize: 24, fontWeight: 'bold', color: '#78350F' },
  
  // Generic
  btn: { padding: 20, backgroundColor: '#FEF3C7', borderRadius: 15, borderWidth: 2, borderColor: '#F59E0B', minWidth: 100, alignItems: 'center' },
  btnText: { fontSize: 24, fontWeight: 'bold', color: '#78350F' },
  
  // ReadAloud
  speechCard: { width: '100%', maxWidth: 500, backgroundColor: 'white', borderRadius: 20, padding: 20, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 }
});
