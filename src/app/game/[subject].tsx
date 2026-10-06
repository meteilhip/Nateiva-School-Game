import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import * as Speech from 'expo-speech';

import { CountAndTap, NumberMatch, TenFrame, AdditionBuilder } from '../../games/MathEngines';
import { PhonemeMatch, WordBuilder, ReadAloud } from '../../games/LanguageEngines';
import { ClassificationLab } from '../../games/ScienceEngines';
import { TutorOverlay } from '../../components/TutorOverlay';

// Helper to generate dynamic questions based on skill
const generateQuestionsForSkill = (skillId: string, subject: string) => {
  if (skillId === 'math_count_1_10') {
    return [
      { id: '1', type: 'COUNT_AND_TAP', q: 'Combien y a-t-il de pommes ?', ans: '3', options: ['2','3','4','5'], hint: 'Compte chaque pomme une par une.' },
      { id: '2', type: 'TEN_FRAME', q: 'Combien de points rouges ?', ans: '7', options: ['6','7','8','9'], hint: 'Regarde la grille de dix.' },
      { id: '3', type: 'NUMBER_MATCH', q: 'Choisis le nombre "Cinq"', ans: '5', options: ['3','4','5','6'], hint: 'Cinq a un ventre.' },
    ];
  }
  if (skillId === 'math_add_10') {
    return [
      { id: '1', type: 'ADDITION_BUILDER', q: 'Résous l\'addition :', equation: '3 + 2 = ?', ans: '5', options: ['4','5','6','7'], hint: 'Mets 3 dans ta tête et ajoute 2.' },
      { id: '2', type: 'ADDITION_BUILDER', q: 'Résous l\'addition :', equation: '4 + 4 = ?', ans: '8', options: ['6','7','8','9'], hint: 'C\'est un double !' },
    ];
  }
  if (skillId === 'fr_read_vowels') {
    return [
      { id: '1', type: 'PHONEME_MATCH', q: 'Quel mot contient le son "O" ?', ans: 'Moto', options: ['Moto', 'Lit', 'Sac', 'Mur'], hint: 'Écoute le son Ooooo.' },
      { id: '2', type: 'READ_ALOUD', q: 'Lis cette voyelle à voix haute :', ans: 'A', options: [], hint: 'Ouvre grand la bouche : Aaaa.' },
    ];
  }
  if (skillId === 'sci_animal_habitat') {
    return [
      { id: '1', type: 'CLASSIFICATION', q: 'Lequel de ces animaux vit dans l\'eau ?', ans: 'Poisson', options: ['Chat', 'Chien', 'Poisson', 'Poule'], hint: 'Il a des nageoires.' },
    ];
  }
  
  // Fallback if no skill matched
  return [
    { id: 'fallback', type: 'NUMBER_MATCH', q: 'Jeu en développement. Retourne à la carte.', ans: 'OK', options: ['OK'], hint: 'Choisis OK.' }
  ];
};

export default function GameActivityScreen() {
  const { subject, skillId } = useLocalSearchParams();
  const [questions, setQuestions] = useState<any[]>([]);
  const [qIndex, setQIndex] = useState(0);
  const [lives, setLives] = useState(3);
  
  const [feedback, setFeedback] = useState<string | null>(null);
  const [errorsOnCurrent, setErrorsOnCurrent] = useState(0);
  const [showTutor, setShowTutor] = useState(false);

  useEffect(() => {
    if (subject && skillId) {
      setQuestions(generateQuestionsForSkill(skillId as string, subject as string));
    }
  }, [subject, skillId]);

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
        setErrorsOnCurrent(0); 
        if (qIndex + 1 < questions.length) {
          setQIndex(qIndex + 1);
          speak(questions[qIndex + 1].q);
        } else {
          // Finished level!
          router.replace(`/levels/${subject}`);
        }
      }, 1500);
    } else {
      const newErrors = errorsOnCurrent + 1;
      setErrorsOnCurrent(newErrors);
      setLives(prev => prev - 1);
      
      if (newErrors === 1) {
        setFeedback(`Presque ! ${q.hint}`);
        speak(`Presque ! ${q.hint}`);
        setTimeout(() => setFeedback(null), 2500);
      } else if (newErrors === 2) {
        setFeedback(`Essaie encore. Regarde bien l'indice.`);
        speak(`Essaie encore.`);
        setTimeout(() => setFeedback(null), 2500);
      } else {
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
      case 'TEN_FRAME': return <TenFrame question={currentQ} onAnswer={handleAnswer} />;
      case 'ADDITION_BUILDER': return <AdditionBuilder question={currentQ} onAnswer={handleAnswer} />;
      case 'NUMBER_MATCH': return <NumberMatch question={currentQ} onAnswer={handleAnswer} />;
      case 'PHONEME_MATCH': return <PhonemeMatch question={currentQ} onAnswer={handleAnswer} />;
      case 'READ_ALOUD': return <ReadAloud question={currentQ} onAnswer={handleAnswer} />;
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
            setErrorsOnCurrent(0); 
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
  hintBtn: { backgroundColor: '#FEF3C7', padding: 10, borderRadius: 10, marginBottom: 20, marginTop: 20 },
  hintText: { color: '#B45309', fontWeight: 'bold' },
  feedback: { fontSize: 18, fontWeight: 'bold', color: '#EF4444', marginBottom: 20, textAlign: 'center' }
});
