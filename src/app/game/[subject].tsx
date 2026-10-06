import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { getMastery, saveMastery, ChildProfile, getProfiles } from '../../storage/db';
import { calculateNewMastery, AttemptRecord, SkillMastery } from '../../adaptive/engine';
import * as Speech from 'expo-speech';

// Mock content based on the Curriculum spec (Part 2 & 7)
const MOCK_QUESTIONS = {
  math: [
    { id: 'm1', type: 'COUNT_AND_TAP', q: 'Combien font 4 + 3 ?', ans: '7', options: ['5','6','7','8'], hint: 'Compte 4 puis ajoute 3.' },
    { id: 'm2', type: 'NUMBER_MATCH', q: 'Choisis le nombre "Huit"', ans: '8', options: ['6','7','8','9'], hint: 'Huit vient après sept.' }
  ],
  reading: [
    { id: 'r1', type: 'PHONEME_MATCH', q: 'Quel mot commence par la lettre "M" ?', ans: 'Maman', options: ['Papa', 'Maman', 'Chat', 'Chien'], hint: 'Écoute le son Mmmmm.' }
  ],
  science: [
    { id: 's1', type: 'CLASSIFICATION', q: 'Lequel de ces animaux vit dans l\'eau ?', ans: 'Poisson', options: ['Chat', 'Chien', 'Poisson', 'Poule'], hint: 'Il a des nageoires.' }
  ]
};

export default function GameActivityScreen() {
  const { subject } = useLocalSearchParams();
  const [questions, setQuestions] = useState<any[]>([]);
  const [qIndex, setQIndex] = useState(0);
  const [lives, setLives] = useState(3);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    // Load questions based on adaptive engine in the future
    if (subject && MOCK_QUESTIONS[subject as keyof typeof MOCK_QUESTIONS]) {
      setQuestions(MOCK_QUESTIONS[subject as keyof typeof MOCK_QUESTIONS]);
    }
  }, [subject]);

  const speak = (text: string) => {
    Speech.stop();
    Speech.speak(text, { language: 'fr-FR', rate: 0.9 });
  };

  const handleAnswer = (selected: string) => {
    if (feedback) return;
    const q = questions[qIndex];
    
    if (selected === q.ans) {
      setFeedback('Correct ! 🎉');
      speak('Correct !');
      // Here we would call the adaptive engine to update mastery
      setTimeout(() => {
        setFeedback(null);
        if (qIndex + 1 < questions.length) {
          setQIndex(qIndex + 1);
          speak(questions[qIndex + 1].q);
        } else {
          router.replace('/world');
        }
      }, 1500);
    } else {
      setFeedback(`Faux. ${q.hint}`);
      speak(q.hint);
      setLives(prev => prev - 1);
      setTimeout(() => setFeedback(null), 2500);
    }
  };

  if (questions.length === 0) return <View style={styles.container}><Text>Chargement...</Text></View>;

  const currentQ = questions[qIndex];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>⬅️ Flee</Text>
        </TouchableOpacity>
        <Text style={styles.stats}>Vies: {"❤️".repeat(Math.max(0, lives))}</Text>
        <Text style={styles.stats}>{qIndex + 1} / {questions.length}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.question}>{currentQ.q}</Text>

        <TouchableOpacity style={styles.hintBtn} onPress={() => speak(currentQ.hint)}>
          <Text style={styles.hintText}>💡 Indice / Hint</Text>
        </TouchableOpacity>

        {feedback && <Text style={styles.feedback}>{feedback}</Text>}

        <View style={styles.optionsGrid}>
          {currentQ.options.map((opt: string) => (
            <TouchableOpacity key={opt} style={styles.optBtn} onPress={() => handleAnswer(opt)}>
              <Text style={styles.optText}>{opt}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC', padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, marginTop: 20 },
  backBtn: { padding: 10, backgroundColor: '#E2E8F0', borderRadius: 10 },
  backText: { fontWeight: 'bold' },
  stats: { fontSize: 18, fontWeight: 'bold' },
  card: { backgroundColor: 'white', padding: 24, borderRadius: 20, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
  question: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  hintBtn: { backgroundColor: '#FEF3C7', padding: 10, borderRadius: 10, marginBottom: 20 },
  hintText: { color: '#B45309', fontWeight: 'bold' },
  feedback: { fontSize: 18, fontWeight: 'bold', color: '#10B981', marginBottom: 20, textAlign: 'center' },
  optionsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 15 },
  optBtn: { backgroundColor: '#F1F5F9', borderWidth: 2, borderColor: '#CBD5E1', padding: 20, borderRadius: 16, width: '45%', alignItems: 'center' },
  optText: { fontSize: 20, fontWeight: 'bold', color: '#334155' }
});
