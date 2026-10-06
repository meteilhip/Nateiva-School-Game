import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import * as Speech from 'expo-speech';

import { CountAndTap, NumberMatch } from '../../games/MathEngines';
import { PhonemeMatch, WordBuilder } from '../../games/LanguageEngines';
import { ClassificationLab } from '../../games/ScienceEngines';
import { TutorOverlay } from '../../components/TutorOverlay';

const MOCK_QUESTIONS = {
  math: [
    { id: 'm1', type: 'COUNT_AND_TAP', q: 'Combien y a-t-il de pommes ?', ans: '4', options: ['3','4','5','6'], hint: 'Compte chaque pomme une par une.' },
    { id: 'm2', type: 'NUMBER_MATCH', q: 'Choisis le nombre "Huit"', ans: '8', options: ['6','7','8','9'], hint: 'Huit s\'écrit avec deux cercles.' }
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
  const [errorsOnCurrent, setErrorsOnCurrent] = useState(0);
  const [showTutor, setShowTutor] = useState(false);

  useEffect(() => {
    if (subject && MOCK_QUESTIONS[subject as keyof typeof MOCK_QUESTIONS]) {
      setQuestions(MOCK_QUESTIONS[subject as keyof typeof MOCK_QUESTIONS]);
    }
  }, [subject]);

  const speak = (text: string) => {
    Speech.stop();
    Speech.speak(text, { language: 'fr-FR', rate: 0.9 });
  };

  const handleAnswer = (selected: string) => {
    if (feedback || showTutor) return;
    const q = questions[qIndex];
    
    if (selected === q.ans) {
      setFeedback('Correct ! 🎉');
      speak('Correct !');
      setTimeout(() => {
        setFeedback(null);
        setErrorsOnCurrent(0); // Reset errors for next question
        if (qIndex + 1 < questions.length) {
          setQIndex(qIndex + 1);
          speak(questions[qIndex + 1].q);
        } else {
          router.replace('/world');
        }
      }, 1500);
    } else {
      const newErrors = errorsOnCurrent + 1;
      setErrorsOnCurrent(newErrors);
      setLives(prev => prev - 1);
      
      // Three-Stage Remediation Logic
      if (newErrors === 1) {
        setFeedback(`Presque ! ${q.hint}`);
        speak(`Presque ! ${q.hint}`);
        setTimeout(() => setFeedback(null), 2500);
      } else if (newErrors === 2) {
        setFeedback(`Essaie encore. Regarde bien l'indice.`);
        speak(`Essaie encore.`);
        setTimeout(() => setFeedback(null), 2500);
      } else {
        // Third error -> Trigger Tutor
        setFeedback(null);
        setShowTutor(true);
      }
    }
  };

  if (questions.length === 0) return <View style={styles.container}><Text>Chargement...</Text></View>;

  const currentQ = questions[qIndex];

  const renderGameEngine = () => {
    switch (currentQ.type) {
      case 'COUNT_AND_TAP': return <CountAndTap question={currentQ} onAnswer={handleAnswer} />;
      case 'NUMBER_MATCH': return <NumberMatch question={currentQ} onAnswer={handleAnswer} />;
      case 'PHONEME_MATCH': return <PhonemeMatch question={currentQ} onAnswer={handleAnswer} />;
      case 'CLASSIFICATION': return <ClassificationLab question={currentQ} onAnswer={handleAnswer} />;
      default: return <Text>Engine non trouvé</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>⬅️ Retour</Text>
        </TouchableOpacity>
        <Text style={styles.stats}>Vies: {"❤️".repeat(Math.max(0, lives))}</Text>
        <Text style={styles.stats}>{qIndex + 1} / {questions.length}</Text>
      </View>

      <View style={styles.card}>
        {renderGameEngine()}

        <TouchableOpacity style={styles.hintBtn} onPress={() => speak(currentQ.hint)}>
          <Text style={styles.hintText}>💡 Indice / Hint</Text>
        </TouchableOpacity>

        {feedback && <Text style={styles.feedback}>{feedback}</Text>}
      </View>

      {showTutor && (
        <TutorOverlay 
          question={currentQ} 
          onClose={() => {
            setShowTutor(false);
            setErrorsOnCurrent(0); // Optional: reset to give them another normal chance
          }} 
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC', padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, marginTop: 20 },
  backBtn: { padding: 10, backgroundColor: '#E2E8F0', borderRadius: 10 },
  backText: { fontWeight: 'bold' },
  stats: { fontSize: 18, fontWeight: 'bold' },
  card: { backgroundColor: 'white', padding: 10, borderRadius: 20, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 5, flex: 1 },
  hintBtn: { backgroundColor: '#FEF3C7', padding: 10, borderRadius: 10, marginBottom: 20 },
  hintText: { color: '#B45309', fontWeight: 'bold' },
  feedback: { fontSize: 18, fontWeight: 'bold', color: '#EF4444', marginBottom: 20, textAlign: 'center' }
});
