import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

export function CountAndTap({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const length = parseInt(question.ans) || 0;
  const [tapped, setTapped] = useState<number[]>([]);

  const handleTap = (index: number) => {
    if (!tapped.includes(index)) {
      setTapped([...tapped, index]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{question.q}</Text>
      <View style={styles.objectsGrid}>
        {Array.from({ length }).map((_, i) => (
          <TouchableOpacity 
            key={i} 
            onPress={() => handleTap(i)}
            style={[styles.tappableObject, tapped.includes(i) && styles.tappedObject]}
          >
            <Text style={styles.objectIcon}>{question.icon || '🍎'}</Text>
            {tapped.includes(i) && <Text style={styles.tappedNumber}>{tapped.indexOf(i) + 1}</Text>}
          </TouchableOpacity>
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
      <View style={styles.bigNumberContainer}>
        <Text style={styles.bigNumberText}>{question.displayNumber || question.ans}</Text>
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

export function AdditionBuilder({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  // Parse equation e.g. "3 + 2 = ?"
  const parts = (question.equation || '3 + 2 = ?').split(' ');
  const num1 = parseInt(parts[0]) || 0;
  const num2 = parseInt(parts[2]) || 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{question.q}</Text>
      
      <View style={styles.visualMath}>
        <View style={styles.mathGroup}>
          <Text style={styles.mathNumber}>{num1}</Text>
          <View style={styles.dotsRow}>
            {Array.from({length: num1}).map((_, i) => <View key={i} style={styles.mathDot} />)}
          </View>
        </View>
        <Text style={styles.mathOperator}>+</Text>
        <View style={styles.mathGroup}>
          <Text style={styles.mathNumber}>{num2}</Text>
          <View style={styles.dotsRow}>
            {Array.from({length: num2}).map((_, i) => <View key={i} style={[styles.mathDot, {backgroundColor: '#10B981'}]} />)}
          </View>
        </View>
        <Text style={styles.mathOperator}>=</Text>
        <Text style={styles.mathQuestionMark}>?</Text>
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
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20, width: '100%' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, textAlign: 'center', color: '#1E293B' },
  
  // CountAndTap
  objectsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 15, marginBottom: 40, justifyContent: 'center', maxWidth: 400 },
  tappableObject: { padding: 10, backgroundColor: '#F1F5F9', borderRadius: 20, alignItems: 'center', justifyContent: 'center', width: 80, height: 80, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
  tappedObject: { backgroundColor: '#BBF7D0', transform: [{ scale: 0.95 }] },
  objectIcon: { fontSize: 40 },
  tappedNumber: { position: 'absolute', bottom: -10, right: -10, backgroundColor: '#10B981', color: 'white', width: 24, height: 24, borderRadius: 12, textAlign: 'center', fontWeight: 'bold', overflow: 'hidden' },
  
  // AdditionBuilder
  visualMath: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 40, backgroundColor: '#F8FAFC', padding: 20, borderRadius: 20, borderWidth: 2, borderColor: '#E2E8F0' },
  mathGroup: { alignItems: 'center', gap: 10 },
  mathNumber: { fontSize: 48, fontWeight: 'bold', color: '#3B82F6' },
  dotsRow: { flexDirection: 'row', flexWrap: 'wrap', width: 60, justifyContent: 'center', gap: 5 },
  mathDot: { width: 15, height: 15, borderRadius: 10, backgroundColor: '#3B82F6' },
  mathOperator: { fontSize: 40, fontWeight: 'bold', color: '#64748B', marginHorizontal: 20 },
  mathQuestionMark: { fontSize: 60, fontWeight: 'bold', color: '#F59E0B' },

  // NumberMatch
  bigNumberContainer: { backgroundColor: '#EFF6FF', width: 150, height: 150, borderRadius: 75, alignItems: 'center', justifyContent: 'center', marginBottom: 40, borderWidth: 4, borderColor: '#BFDBFE' },
  bigNumberText: { fontSize: 80, fontWeight: 'bold', color: '#2563EB' },

  // TenFrame
  frame: { flexDirection: 'row', flexWrap: 'wrap', width: 320, borderWidth: 4, borderColor: '#1E3A8A', marginBottom: 40, borderRadius: 8, backgroundColor: 'white' },
  frameCell: { width: 62, height: 60, borderWidth: 2, borderColor: '#1E3A8A', alignItems: 'center', justifyContent: 'center' },
  dot: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#EF4444' },

  // Common Options
  options: { flexDirection: 'row', flexWrap: 'wrap', gap: 20, justifyContent: 'center', width: '100%' },
  btn: { paddingVertical: 15, paddingHorizontal: 30, backgroundColor: '#DBEAFE', borderRadius: 20, borderWidth: 3, borderColor: '#3B82F6', minWidth: 100, alignItems: 'center', shadowColor: '#3B82F6', shadowOpacity: 0.3, shadowRadius: 5, elevation: 5 },
  btnText: { fontSize: 32, fontWeight: 'bold', color: '#1E3A8A' }
});
