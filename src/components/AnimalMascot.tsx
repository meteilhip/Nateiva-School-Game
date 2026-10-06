import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withSequence,
  withTiming,
  withRepeat
} from 'react-native-reanimated';

import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

type Emotion = 'happy' | 'sad' | 'neutral';

interface AnimalMascotProps {
  message: string;
  emotion: Emotion;
}

export function AnimalMascot({ message, emotion }: AnimalMascotProps) {
  const scale = useSharedValue(0.5);
  const translateY = useSharedValue(0);

  useEffect(() => {
    // Entrance animation
    scale.value = withSpring(1, { damping: 12 });
    
    // Emotion-based animation
    if (emotion === 'happy') {
      translateY.value = withSequence(
        withTiming(-20, { duration: 150 }),
        withTiming(0, { duration: 150 }),
        withTiming(-20, { duration: 150 }),
        withTiming(0, { duration: 150 })
      );
    } else if (emotion === 'sad') {
      translateY.value = withSequence(
        withTiming(10, { duration: 300 }),
        withTiming(0, { duration: 300 })
      );
    }
  }, [emotion, message]);

  const mascotStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { translateY: translateY.value }
      ]
    };
  });

  const getEmoji = () => {
    switch (emotion) {
      case 'happy': return '🦊';
      case 'sad': return '🦊';
      default: return '🦊';
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.mascotContainer, mascotStyle]}>
        <ThemedText style={styles.emoji}>{getEmoji()}</ThemedText>
      </Animated.View>
      
      {message ? (
        <ThemedView style={styles.bubble}>
          <ThemedText style={styles.messageText}>{message}</ThemedText>
        </ThemedView>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 10,
    marginTop: 20,
  },
  mascotContainer: {
    marginRight: 12,
  },
  emoji: {
    fontSize: 60,
  },
  bubble: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 20,
    borderTopLeftRadius: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  messageText: {
    fontSize: 18,
    color: '#333',
    fontWeight: '600',
  }
});
