import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export function PhonemeMatch({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
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

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  options: { flexDirection: 'row', flexWrap: 'wrap', gap: 15, justifyContent: 'center' },
  btn: { padding: 20, backgroundColor: '#FEF3C7', borderRadius: 15, borderWidth: 2, borderColor: '#F59E0B', minWidth: 100, alignItems: 'center' },
  btnText: { fontSize: 24, fontWeight: 'bold', color: '#78350F' }
});
