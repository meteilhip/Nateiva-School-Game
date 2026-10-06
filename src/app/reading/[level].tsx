import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { ExerciseComponent } from '@/components/ExerciseComponent';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { saveProgress } from '@/db';

export default function ReadingScreen() {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [score, setScore] = useState(0);
  const router = useRouter();
  const { i18n } = useTranslation();

  const isFrench = i18n.language === 'fr';

  const READING_EXERCISES = isFrench ? [
    { question: "Quel est le mot pour 🍎 ?", options: ["Pomme", "Banane", "Chien"], answer: "Pomme", explanation: "Regarde l'image ! C'est un fruit rouge, on l'appelle une pomme 🍎 !", explanationVisual: ["🍎", "🟰", "POMME"] },
    { question: "Quel est le mot pour 🚗 ?", options: ["Arbre", "Voiture", "Maison"], answer: "Voiture", explanation: "Vroum vroum ! Ça roule sur la route, c'est une voiture 🚗 !", explanationVisual: ["🚗", "🟰", "VOITURE"] },
    { question: "Quel est le mot pour ☀️ ?", options: ["Lune", "Étoile", "Soleil"], answer: "Soleil", explanation: "Il brille fort le jour dans le ciel, c'est le soleil ☀️ !", explanationVisual: ["☀️", "🟰", "SOLEIL"] },
  ] : [
    { question: "What is the word for 🍎?", options: ["Apple", "Banana", "Dog"], answer: "Apple", explanation: "Look at the picture! It's a sweet red fruit, it's an Apple 🍎!", explanationVisual: ["🍎", "🟰", "APPLE"] },
    { question: "What is the word for 🚗?", options: ["Tree", "Car", "House"], answer: "Car", explanation: "Vroom vroom! It drives on the road, it's a Car 🚗!", explanationVisual: ["🚗", "🟰", "CAR"] },
    { question: "What is the word for ☀️?", options: ["Moon", "Star", "Sun"], answer: "Sun", explanation: "It shines bright in the day sky, it's the Sun ☀️!", explanationVisual: ["☀️", "🟰", "SUN"] },
  ];

  const handleComplete = (isCorrect: boolean) => {
    let newScore = score;
    if (isCorrect) {
      newScore += 1;
      setScore(newScore);
    }

    if (currentExercise < READING_EXERCISES.length - 1) {
      setCurrentExercise(currentExercise + 1);
    } else {
      // Finished all exercises
      const finalScore = Math.round((newScore / READING_EXERCISES.length) * 100);
      saveProgress('reading', 1, finalScore);
      alert(`Level Complete! Score: ${finalScore}%`);
      router.replace('/');
    }
  };

  const exercise = READING_EXERCISES[currentExercise];

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.progressText}>
          Question {currentExercise + 1} / {READING_EXERCISES.length}
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
    backgroundColor: '#E0F7FA',
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
