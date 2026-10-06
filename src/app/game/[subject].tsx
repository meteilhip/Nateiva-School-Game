import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router, useFocusEffect } from 'expo-router';
import * as Speech from 'expo-speech';

import { CountAndTap, NumberMatch, TenFrame, AdditionBuilder } from '../../games/MathEngines';
import { PhonemeMatch, WordBuilder, ReadAloud } from '../../games/LanguageEngines';
import { ClassificationLab } from '../../games/ScienceEngines';
import { TutorOverlay } from '../../components/TutorOverlay';

import { getProfiles, getMastery, saveMastery, saveProfile } from '../../storage/db';
import { calculateNewMastery, SkillMastery } from '../../adaptive/engine';

const generateQuestionsForSkill = (skillId: string, difficulty: number) => {
  if (skillId === 'math_count_1_10') {
    if (difficulty === 1) {
      return [
        { id: '1', type: 'COUNT_AND_TAP', q: 'Combien y a-t-il de pommes ?', ans: '3', options: ['2','3','4','5'], hint: 'Compte chaque pomme une par une.' },
        { id: '2', type: 'TEN_FRAME', q: 'Combien de points rouges ?', ans: '4', options: ['2','3','4','5'], hint: 'Regarde la grille.' },
      ];
    } else {
      return [
        { id: '1', type: 'COUNT_AND_TAP', q: 'Combien y a-t-il de pommes ?', ans: '8', options: ['6','7','8','9'], hint: 'Il y en a beaucoup.' },
        { id: '2', type: 'TEN_FRAME', q: 'Combien de points rouges ?', ans: '9', options: ['7','8','9','10'], hint: 'Presque plein.' },
        { id: '3', type: 'NUMBER_MATCH', q: 'Choisis le nombre Neuf', ans: '9', options: ['6','7','8','9'], hint: 'Neuf.' },
      ];
    }
  }
  if (skillId === 'math_add_10') {
    if (difficulty === 1) {
      return [
        { id: '1', type: 'ADDITION_BUILDER', q: 'Résous l addition :', equation: '2 + 1 = ?', ans: '3', options: ['2','3','4','5'], hint: 'Juste après 2.' },
        { id: '2', type: 'ADDITION_BUILDER', q: 'Résous l addition :', equation: '3 + 2 = ?', ans: '5', options: ['4','5','6','7'], hint: 'Ajoute 2 à 3.' },
      ];
    } else {
      return [
        { id: '1', type: 'ADDITION_BUILDER', q: 'Résous l addition :', equation: '5 + 4 = ?', ans: '9', options: ['7','8','9','10'], hint: 'Presque 5+5.' },
        { id: '2', type: 'ADDITION_BUILDER', q: 'Résous l addition :', equation: '6 + 3 = ?', ans: '9', options: ['7','8','9','10'], hint: 'Ajoute 3 à 6.' },
      ];
    }
  }
  if (skillId === 'fr_read_vowels') {
    return [
      { id: '1', type: 'PHONEME_MATCH', q: 'Quel mot contient le son O ?', ans: 'Moto', options: ['Moto', 'Lit', 'Sac', 'Mur'], hint: 'Ecoute O.' },
    ];
  }
  if (skillId === 'sci_animal_habitat') {
    return [
      { id: '1', type: 'CLASSIFICATION', q: 'Lequel vit dans l eau ?', ans: 'Poisson', options: ['Chat', 'Chien', 'Poisson', 'Poule'], hint: 'Nageoires.' },
    ];
  }
  return [{ id: 'fallback', type: 'NUMBER_MATCH', q: 'Jeu a venir.', ans: 'OK', options: ['OK'], hint: 'Choisis OK.' }];
};

export default function GameActivityScreen() {
  const { subject, skillId } = useLocalSearchParams();
  const [questions, setQuestions] = useState<any[]>([]);
  const [qIndex, setQIndex] = useState(0);
  const [lives, setLives] = useState(3);
  
  const [feedback, setFeedback] = useState<string | null>(null);
  const [errorsOnCurrent, setErrorsOnCurrent] = useState(0);
  const [showTutor, setShowTutor] = useState(false);
  
  const [isFinished, setIsFinished] = useState(false);
  const [coinsEarned, setCoinsEarned] = useState(0);
  const [difficultyLevel, setDifficultyLevel] = useState(1);
  const [responses, setResponses] = useState<{isCorrect: boolean, attempts: number}[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadInitialData();
    }, [skillId])
  );

  const loadInitialData = async () => {
    try {
      const profiles = await getProfiles();
      const profile = profiles.length > 0 ? profiles[0] : null;
      let diff = 1;
      
      if (profile && skillId) {
        const allMastery = await getMastery(profile.id);
        const skillMastery = allMastery[skillId as string];
        if (skillMastery && skillMastery.probabilityMastered > 0.5) {
          diff = 2;
        }
      }
      
      setDifficultyLevel(diff);
      if (skillId) {
        setQuestions(generateQuestionsForSkill(skillId as string, diff));
      }
    } catch (e) {
      setQuestions(generateQuestionsForSkill(skillId as string, 1));
    }
  };

  const speak = (text: string) => {
    Speech.stop();
    Speech.speak(text, { language: 'fr-FR', rate: 0.9 });
  };

  const completeLevel = async () => {
    const correctCount = responses.filter(r => r.isCorrect && r.attempts === 0).length; 
    const earned = (correctCount * 10) * difficultyLevel; 
    setCoinsEarned(earned);
    setIsFinished(true);

    try {
      const profiles = await getProfiles();
      const profile = profiles.length > 0 ? profiles[0] : null;
      if (profile) {
        profile.coins += earned;
        await saveProfile(profile);

        if (skillId) {
          const allMastery = await getMastery(profile.id);
          let currentSkillMastery = allMastery[skillId as string] || {
            skillId: skillId as string,
            probabilityMastered: 0.2,
            attemptsCount: 0,
            consecutiveSuccesses: 0,
            isMastered: false,
            lastReviewedAt: new Date().toISOString()
          };

          for (const res of responses) {
            currentSkillMastery = calculateNewMastery(currentSkillMastery, res.isCorrect);
          }
          
          allMastery[skillId as string] = currentSkillMastery;
          await saveMastery(profile.id, allMastery);
        }
      }
    } catch (e) { }
  };

  const handleAnswer = (selected: string) => {
    if (feedback || showTutor) return;
    const q = questions[qIndex];
    
    if (selected === q.ans) {
      setFeedback('Correct !');
      speak('Correct !');
      
      const isPerfect = errorsOnCurrent === 0;
      setResponses(prev => [...prev, { isCorrect: isPerfect, attempts: errorsOnCurrent }]);

      setTimeout(() => {
        setFeedback(null);
        setErrorsOnCurrent(0); 
        
        if (qIndex + 1 < questions.length) {
          setQIndex(qIndex + 1);
          speak(questions[qIndex + 1].q);
        } else {
          completeLevel();
        }
      }, 1500);
    } else {
      const newErrors = errorsOnCurrent + 1;
      setErrorsOnCurrent(newErrors);
      setLives(prev => prev - 1);
      
      setResponses(prev => [...prev, { isCorrect: false, attempts: newErrors }]);
      
      if (newErrors === 1) {
        setFeedback('Presque ! ' + q.hint);
        speak('Presque ! ' + q.hint);
        setTimeout(() => setFeedback(null), 2500);
      } else if (newErrors === 2) {
        setFeedback('Essaie encore.');
        speak('Essaie encore.');
        setTimeout(() => setFeedback(null), 2500);
      } else {
        setFeedback(null);
        setShowTutor(true);
      }
    }
  };

  if (questions.length === 0) return <View style={styles.container}><Text>Chargement...</Text></View>;

  if (isFinished) {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Niveau Termine !</Text>
          <Text style={styles.coinsText}>+{coinsEarned} Coins</Text>
          <Text style={styles.feedback}>Niveau de difficulte : {difficultyLevel}</Text>
          <TouchableOpacity style={styles.continueBtn} onPress={() => router.replace('/levels/' + subject)}>
            <Text style={styles.continueText}>Continuer</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

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
      default: return <Text>Engine non trouve</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>Retour</Text>
        </TouchableOpacity>
        <Text style={styles.stats}>Niveau {difficultyLevel}</Text>
        <Text style={styles.stats}>Vies: {lives}</Text>
        <Text style={styles.stats}>{qIndex + 1} / {questions.length}</Text>
      </View>

      <View style={styles.card}>
        {renderGameEngine()}

        <TouchableOpacity style={styles.hintBtn} onPress={() => speak(currentQ.hint)}>
          <Text style={styles.hintText}>Indice</Text>
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
  container: { flex: 1, backgroundColor: '#F8FAFC', padding: 20, justifyContent: 'center' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, marginTop: 20 },
  backBtn: { padding: 10, backgroundColor: '#E2E8F0', borderRadius: 10 },
  backText: { fontWeight: 'bold' },
  stats: { fontSize: 16, fontWeight: 'bold', color: '#475569' },
  card: { backgroundColor: 'white', padding: 20, borderRadius: 20, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 5, flex: 1, justifyContent: 'center' },
  hintBtn: { backgroundColor: '#FEF3C7', padding: 10, borderRadius: 10, marginBottom: 20, marginTop: 20 },
  hintText: { color: '#B45309', fontWeight: 'bold' },
  feedback: { fontSize: 18, fontWeight: 'bold', color: '#10B981', marginBottom: 20, textAlign: 'center' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#1E293B', marginBottom: 20 },
  coinsText: { fontSize: 48, fontWeight: 'bold', color: '#F59E0B', marginBottom: 20 },
  continueBtn: { backgroundColor: '#3B82F6', padding: 20, borderRadius: 16, width: '100%', alignItems: 'center', marginTop: 20 },
  continueText: { color: 'white', fontSize: 20, fontWeight: 'bold' }
});
