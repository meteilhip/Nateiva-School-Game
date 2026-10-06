import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Audio } from 'expo-av';
import Animated, { FadeIn, FadeOut, BounceIn, SlideInRight, SlideOutLeft, ZoomIn } from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { AnimalMascot } from './AnimalMascot';

interface ExerciseProps {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  explanationVisual?: string[];
  onComplete: (isCorrect: boolean) => void;
}

type Emotion = 'happy' | 'sad' | 'neutral';

export const ExerciseComponent: React.FC<ExerciseProps> = ({
  question,
  options,
  correctAnswer,
  explanation,
  explanationVisual,
  onComplete,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [mascotMessage, setMascotMessage] = useState<string>("Hi friend! 👋 Let's solve this together!");
  const [mascotEmotion, setMascotEmotion] = useState<Emotion>("neutral");
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrectState, setIsCorrectState] = useState(false);

  useEffect(() => {
    // Reset state when new question comes in
    setSelectedOption(null);
    setMascotMessage("Hi friend! 👋 Let's solve this together! What do you think?");
    setMascotEmotion("neutral");
    setShowExplanation(false);
  }, [question]);

  const handleOptionPress = (option: string) => {
    setSelectedOption(option);
    const isCorrect = option === correctAnswer;
    setIsCorrectState(isCorrect);
    
    if (isCorrect) {
      setMascotMessage("YAY! You are so smart! That's correct! 🎉🎈");
      setMascotEmotion("happy");
      // Advance automatically if correct
      setTimeout(() => {
        onComplete(true);
      }, 2500);
    } else {
      setMascotMessage("Oops! Let's learn how to do this! " + explanation);
      setMascotEmotion("sad");
      setShowExplanation(true);
    }
  };

  const handleContinue = () => {
    onComplete(isCorrectState);
  };

  return (
    <Animated.View 
      entering={SlideInRight.duration(500)} 
      exiting={SlideOutLeft.duration(500)}
      style={styles.container}
    >
      <AnimalMascot message={mascotMessage} emotion={mascotEmotion} />

      <Animated.View entering={BounceIn.delay(300)} style={styles.questionCard}>
        <ThemedText style={styles.questionText}>{question}</ThemedText>
      </Animated.View>

      <View style={styles.optionsContainer}>
        {options.map((option, index) => {
          const isSelected = selectedOption === option;
          const isCorrect = option === correctAnswer;
          
          let backgroundColor = '#FFF'; // Default
          let borderColor = '#E0E0E0';
          if (isSelected) {
            backgroundColor = isCorrect ? '#E8F5E9' : '#FFEBEE';
            borderColor = isCorrect ? '#4CAF50' : '#F44336';
          } else if (selectedOption && isCorrect) {
            backgroundColor = '#E8F5E9';
            borderColor = '#4CAF50';
          }

          return (
            <Animated.View key={option} entering={FadeIn.delay(index * 200 + 500)}>
              <TouchableOpacity
                style={[styles.optionButton, { backgroundColor, borderColor }]}
                onPress={() => handleOptionPress(option)}
                disabled={selectedOption !== null}
              >
                <ThemedText style={styles.optionText}>{option}</ThemedText>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </View>

      {showExplanation && (
        <Animated.View entering={BounceIn} style={styles.explanationContainer}>
          
          {explanationVisual && explanationVisual.length > 0 && (
            <Animated.View entering={ZoomIn.delay(300).springify()} style={styles.visualCard}>
              <View style={styles.visualRow}>
                {explanationVisual.map((item, index) => (
                  <Animated.View key={`${index}-${item}`} entering={BounceIn.delay(600 + index * 400)}>
                    <ThemedText style={styles.visualTextItem}>{item}</ThemedText>
                  </Animated.View>
                ))}
              </View>
            </Animated.View>
          )}

          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <ThemedText style={styles.continueText}>Okay, I understand! 🚀</ThemedText>
          </TouchableOpacity>
        </Animated.View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.four,
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#F7F9FC',
  },
  questionCard: {
    backgroundColor: '#FFF',
    padding: 32,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 40,
    alignItems: 'center',
  },
  questionText: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2C3E50',
  },
  optionsContainer: {
    width: '100%',
    gap: Spacing.four,
  },
  optionButton: {
    padding: Spacing.four,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  optionText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#34495E',
  },
  explanationContainer: {
    marginTop: 30,
    alignItems: 'center',
    width: '100%',
  },
  continueButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  continueText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  visualCard: {
    backgroundColor: '#FFF9C4',
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#FBC02D',
    alignItems: 'center',
    shadowColor: '#FBC02D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    width: '100%',
  },
  visualRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  visualTextItem: {
    fontSize: 48,
    textAlign: 'center',
  }
});
