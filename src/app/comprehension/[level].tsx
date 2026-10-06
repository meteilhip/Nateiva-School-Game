import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { ExerciseComponent } from '@/components/ExerciseComponent';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { saveProgress } from '@/db';

export default function ComprehensionScreen() {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [score, setScore] = useState(0);
  const router = useRouter();
  const { i18n } = useTranslation();

  const isFrench = i18n.language === 'fr';

  const COMPREHENSION_EXERCISES = isFrench ? [
    { 
      question: "Léo a un petit chat noir.\n\nQuelle est la couleur du chat ?", 
      options: ["Noir", "Blanc", "Roux"], 
      answer: "Noir",
      explanation: "Relis la phrase : 'Léo a un petit chat NOIR'. Le mot magique est 'noir' !",
      explanationVisual: ["🐈‍⬛", "🟰", "NOIR"]
    },
    { 
      question: "Marie mange une pomme rouge.\n\nQue mange Marie ?", 
      options: ["Une banane", "Une pomme", "Du pain"], 
      answer: "Une pomme",
      explanation: "L'histoire nous dit : 'Marie mange une POMME rouge'. Elle mange donc une pomme !",
      explanationVisual: ["👧", "🍎", "🟰", "POMME"]
    },
  ] : [
    { 
      question: "Leo has a small black cat.\n\nWhat color is the cat?", 
      options: ["Black", "White", "Orange"], 
      answer: "Black",
      explanation: "Read the story again: 'Leo has a small BLACK cat'. So the color is Black!",
      explanationVisual: ["🐈‍⬛", "🟰", "BLACK"]
    },
    { 
      question: "Mary is eating a red apple.\n\nWhat is Mary eating?", 
      options: ["A banana", "An apple", "Bread"], 
      answer: "An apple",
      explanation: "The story says: 'Mary is eating a red APPLE'. So she is eating an apple!",
      explanationVisual: ["👧", "🍎", "🟰", "APPLE"]
    },
  ];

  const handleComplete = (isCorrect: boolean) => {
    let newScore = score;
    if (isCorrect) {
      newScore += 1;
      setScore(newScore);
    }

    if (currentExercise < COMPREHENSION_EXERCISES.length - 1) {
      setCurrentExercise(currentExercise + 1);
    } else {
      // Finished all exercises
      const finalScore = Math.round((newScore / COMPREHENSION_EXERCISES.length) * 100);
      saveProgress('comprehension', 1, finalScore);
      alert(`Level Complete! Score: ${finalScore}%`);
      router.replace('/');
    }
  };

  const exercise = COMPREHENSION_EXERCISES[currentExercise];

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.progressText}>
          Story {currentExercise + 1} / {COMPREHENSION_EXERCISES.length}
        </ThemedText>
        <ThemedText style={styles.scoreText}>Score: {score}</ThemedText>
      </View>

      <ExerciseComponent
        key={currentExercise}
        question={exercise.question}
        options={exercise.options}
        correctAnswer={exercise.answer}
        explanation={exercise.explanation}
        explanationVisual={exercise.explanationVisual}
        onComplete={handleComplete}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF3E0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    marginTop: 40, 
  },
  progressText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
});
