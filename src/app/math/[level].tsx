import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

import { ExerciseComponent } from '@/components/ExerciseComponent';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { saveProgress } from '@/db';

const MATH_EXERCISES = [
  { 
    question: "2 + 2 = ?", 
    options: ["3", "4", "5"], 
    answer: "4",
    explanation: "If you have 2 apples 🍎🍎 and you get 2 more 🍎🍎, let's count them: 1, 2, 3, 4! So 2 + 2 is 4!",
    explanationVisual: ["🍎", "🍎", "➕", "🍎", "🍎", "🟰", "🍎🍎🍎🍎"]
  },
  { 
    question: "5 - 3 = ?", 
    options: ["1", "2", "3"], 
    answer: "2",
    explanation: "You have 5 stars ⭐⭐⭐⭐⭐. If you give 3 away, how many are left? Let's count the ones left: 1, 2! So 5 - 3 is 2!",
    explanationVisual: ["⭐⭐⭐⭐⭐", "➖", "⭐⭐⭐", "🟰", "⭐⭐"]
  },
  { 
    question: "4 + 1 = ?", 
    options: ["4", "5", "6"], 
    answer: "5",
    explanation: "Hold up 4 toys 🧸🧸🧸🧸, now add 1 more 🧸. How many toys? 5! So 4 + 1 is 5!",
    explanationVisual: ["🧸🧸🧸🧸", "➕", "🧸", "🟰", "🧸🧸🧸🧸🧸"]
  },
];

export default function MathScreen() {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [score, setScore] = useState(0);
  const router = useRouter();

  const handleComplete = (isCorrect: boolean) => {
    let newScore = score;
    if (isCorrect) {
      newScore += 1;
      setScore(newScore);
    }

    if (currentExercise < MATH_EXERCISES.length - 1) {
      setCurrentExercise(currentExercise + 1);
    } else {
      // Finished all exercises
      const finalScore = Math.round((newScore / MATH_EXERCISES.length) * 100);
      saveProgress('math', 1, finalScore);
      alert(`Level Complete! Score: ${finalScore}%`);
      router.replace('/');
    }
  };

  const exercise = MATH_EXERCISES[currentExercise];

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.progressText}>
          Question {currentExercise + 1} / {MATH_EXERCISES.length}
        </ThemedText>
        <ThemedText style={styles.scoreText}>Score: {score}</ThemedText>
      </View>

      <ExerciseComponent
        key={currentExercise} // Force remount for new exercise
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    marginTop: 40, // Avoid safe area issues
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
