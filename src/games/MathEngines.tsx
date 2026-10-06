import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export function CountAndTap({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
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

export function AdditionBuilder({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{question.q}</Text>
      <Text style={styles.equation}>{question.equation || '2 + 3 = ?'}</Text>
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

export function TenFrame({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{question.q}</Text>
      <View style={styles.frame}>
        {Array.from({ length: 10 }).map((_, i) => (
          <View key={i} style={styles.frameCell}>
            {i < parseInt(question.ans) && <View style={styles.dot} />}
          </View>
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

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  equation: { fontSize: 48, fontWeight: 'bold', color: '#1E3A8A', marginBottom: 30 },
  objectsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 30, justifyContent: 'center' },
  objectIcon: { fontSize: 50 },
  options: { flexDirection: 'row', flexWrap: 'wrap', gap: 15, justifyContent: 'center' },
  btn: { padding: 20, backgroundColor: '#DBEAFE', borderRadius: 15, borderWidth: 2, borderColor: '#3B82F6', minWidth: 80, alignItems: 'center' },
  btnText: { fontSize: 28, fontWeight: 'bold', color: '#1E3A8A' },
  frame: { flexDirection: 'row', flexWrap: 'wrap', width: 300, borderWidth: 2, borderColor: '#1E3A8A', marginBottom: 30 },
  frameCell: { width: 59, height: 50, borderWidth: 1, borderColor: '#1E3A8A', alignItems: 'center', justifyContent: 'center' },
  dot: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#EF4444' }
});
