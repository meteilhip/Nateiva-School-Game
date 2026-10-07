import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export function ClassificationLab({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const emojiMap: Record<string, string> = {
    'Poisson': '🐟',
    'Chat': '🐈',
    'Chien': '🐕',
    'Poule': '🐔',
    'Arbre': '🌳',
    'Fleur': '🌻'
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{question.q}</Text>
      <View style={styles.options}>
        {question.options.map((opt: string) => (
          <TouchableOpacity key={opt} style={styles.cardBtn} onPress={() => onAnswer(opt)}>
            <Text style={styles.cardEmoji}>{emojiMap[opt] || '❓'}</Text>
            <Text style={styles.cardText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20, width: '100%' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 40, textAlign: 'center', color: '#1E293B' },
  options: { flexDirection: 'row', flexWrap: 'wrap', gap: 20, justifyContent: 'center', width: '100%' },
  cardBtn: { padding: 30, backgroundColor: '#D1FAE5', borderRadius: 20, borderWidth: 3, borderColor: '#10B981', minWidth: 150, alignItems: 'center', shadowColor: '#10B981', shadowOpacity: 0.3, shadowRadius: 5, elevation: 5 },
  cardEmoji: { fontSize: 70, marginBottom: 15 },
  cardText: { fontSize: 24, fontWeight: 'bold', color: '#064E3B' }
});
