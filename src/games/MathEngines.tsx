import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export function CountAndTap({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  // Safe parsing for length
  const length = parseInt(question.ans) || 0;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{question.q}</Text>
      <View style={styles.objectsGrid}>
        {Array.from({ length }).map((_, i) => (
          <Text key={i} style={styles.objectIcon}>🍎</Text>
        ))}
      </View>
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

export function NumberMatch({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
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

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  objectsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 30, justifyContent: 'center' },
  objectIcon: { fontSize: 50 },
  options: { flexDirection: 'row', flexWrap: 'wrap', gap: 15, justifyContent: 'center' },
  btn: { padding: 20, backgroundColor: '#DBEAFE', borderRadius: 15, borderWidth: 2, borderColor: '#3B82F6', minWidth: 80, alignItems: 'center' },
  btnText: { fontSize: 28, fontWeight: 'bold', color: '#1E3A8A' }
});
