import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Animated, { FadeIn, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import * as Speech from 'expo-speech';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { AdaptiveEngine, Question } from '@/engine/AdaptiveEngine';
import { QUESTION_BANK } from '@/data/questions';
import { getAllMastery, addXp, getAssignedTasks, completeTask } from '@/db';

const BOSSES: Record<string, { name: string; emoji: string; maxHp: number; xpReward: number }> = {
  "forest": { name: "Shadow Beast", emoji: "🐺", maxHp: 100, xpReward: 50 },
  "castle": { name: "Ghost Knight", emoji: "👻", maxHp: 100, xpReward: 60 },
  "space":  { name: "Alien King",   emoji: "👾", maxHp: 120, xpReward: 80 },
  "time":   { name: "Mummy Lord",   emoji: "🧟", maxHp: 150, xpReward: 100 },
  "puzzle": { name: "Riddle Sphinx",emoji: "🦁", maxHp: 200, xpReward: 150 },
};

export default function BossBattleScreen() {
  const { zone } = useLocalSearchParams<{ zone: string }>();
  const router = useRouter();

  const [engine, setEngine] = useState<AdaptiveEngine | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [qIndex, setQIndex] = useState(0);
  
  const bossDef = BOSSES[zone] || BOSSES["forest"];
  const [bossHp, setBossHp] = useState(bossDef.maxHp);
  const [playerHp, setPlayerHp] = useState(100);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [showExplanation, setShowExplanation] = useState<string | null>(null);
  const [battleOver, setBattleOver] = useState(false);

  useEffect(() => {
    const mastery = getAllMastery();
    const eng = new AdaptiveEngine(mastery);
    setEngine(eng);
    
    const zoneQuestions = QUESTION_BANK.filter(q => q.zone === zone);
    const picked = eng.pickNextQuestion(zoneQuestions, 5); // Pick 5 dynamic questions
    setQuestions(picked);
  }, [zone]);

  const bossHpStyle = useAnimatedStyle(() => ({ width: withSpring(`${(bossHp / bossDef.maxHp) * 100}%`) }));
  const playerHpStyle = useAnimatedStyle(() => ({ width: withSpring(`${(playerHp / 100) * 100}%`) }));

  const speak = (text: string) => {
    Speech.stop();
    Speech.speak(text, { rate: 0.9, pitch: 1.1 });
  };

  const handleAnswer = (choice: string) => {
    if (!engine || battleOver) return;

    const q = questions[qIndex];
    const isCorrect = choice === q.answer;
    
    // Update BKT offline engine
    engine.update(q.skillId, isCorrect);

    setFeedback({ isCorrect, text: isCorrect ? "🌟 Correct Attack!" : `❌ Miss! It was ${q.answer}` });
    
    if (q.explanation) {
      setShowExplanation(q.explanation);
      if (!isCorrect) {
        speak(q.explanation);
      }
    }

    setTimeout(() => {
      setFeedback(null);
      setShowExplanation(null);
      
      if (isCorrect) {
        const newBossHp = Math.max(0, bossHp - 25);
        setBossHp(newBossHp);
        if (newBossHp === 0) return handleWin();
      } else {
        const newPlayerHp = Math.max(0, playerHp - 20);
        setPlayerHp(newPlayerHp);
        if (newPlayerHp === 0) return handleLose();
      }

      if (qIndex < questions.length - 1) {
        setQIndex(qIndex + 1);
        Speech.stop();
      } else {
        // Ran out of questions but nobody died - fetch more!
        const zoneQs = QUESTION_BANK.filter(q => q.zone === zone);
        const moreQs = engine.pickNextQuestion(zoneQs, 5);
        setQuestions([...questions, ...moreQs]);
        setQIndex(qIndex + 1);
        Speech.stop();
      }
    }, isCorrect ? 2000 : 4500); // Give more time to read if wrong
  };

  const handleWin = () => {
    setBattleOver(true);
    addXp(bossDef.xpReward);
    
    // Mark tasks for this zone as complete
    const assigned = getAssignedTasks();
    assigned.filter(t => t.zone === zone && !t.isCompleted).forEach(t => {
      completeTask(t.id);
    });

    alert(`🏆 Victory! You earned ${bossDef.xpReward} XP!`);
    router.replace('/map');
  };

  const handleLose = () => {
    setBattleOver(true);
    addXp(10); // Participation XP
    alert(`😓 Defeat... But you learned something! (+10 XP)`);
    router.replace('/map');
  };

  if (questions.length === 0) return null;
  const q = questions[qIndex];

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        
        {/* Back Button */}
        <TouchableOpacity style={styles.backBtn} onPress={() => router.replace('/map')}>
          <ThemedText style={styles.backBtnText}>⬅️ Flee / Back to Map</ThemedText>
        </TouchableOpacity>

        {/* Health Bars */}
        <View style={styles.hpHeader}>
          <View style={styles.hpBox}>
            <ThemedText style={styles.hpLabel}>YOU</ThemedText>
            <View style={styles.hpBarBg}>
              <Animated.View style={[styles.hpBarFill, { backgroundColor: '#4ADE80' }, playerHpStyle]} />
            </View>
          </View>
          
          <View style={[styles.hpBox, { alignItems: 'flex-end' }]}>
            <ThemedText style={styles.hpLabel}>{bossDef.name}</ThemedText>
            <View style={[styles.hpBarBg, { justifyContent: 'flex-end' }]}>
              <Animated.View style={[styles.hpBarFill, { backgroundColor: '#EF4444' }, bossHpStyle]} />
            </View>
          </View>
        </View>

        {/* Boss Emoji */}
        <Animated.View entering={FadeIn} style={styles.bossContainer}>
          <ThemedText style={styles.bossEmoji}>{bossDef.emoji}</ThemedText>
        </Animated.View>

        {/* Question */}
        <View style={styles.questionBox}>
          {q.emoji && <ThemedText style={styles.qEmoji}>{q.emoji}</ThemedText>}
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <ThemedText style={styles.questionText}>{q.prompt}</ThemedText>
            <TouchableOpacity onPress={() => speak(q.prompt)} style={{marginLeft: 10}}>
              <ThemedText style={{fontSize: 24}}>🔊</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        {/* Answers */}
        <View style={styles.choicesGrid}>
          {q.choices.map(c => (
            <TouchableOpacity key={c} style={styles.choiceBtn} onPress={() => handleAnswer(c)} disabled={feedback !== null}>
              <ThemedText style={styles.choiceText}>{c}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>

        {/* Feedback */}
        {feedback && (
          <Animated.View entering={FadeIn} style={styles.feedbackBox}>
            <ThemedText style={styles.feedbackText}>{feedback.text}</ThemedText>
            {showExplanation && (
              <Animated.View entering={FadeIn.delay(300)} style={styles.helperBox}>
                <ThemedText style={styles.helperEmoji}>🦉</ThemedText>
                <View style={styles.speechBubble}>
                  <ThemedText style={styles.explanationText}>{showExplanation}</ThemedText>
                  <TouchableOpacity onPress={() => speak(showExplanation)} style={{alignSelf: 'flex-end', marginTop: 5}}>
                    <ThemedText style={{fontSize: 20}}>🔊</ThemedText>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            )}
          </Animated.View>
        )}

      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#333333' }, // Grey
  scroll: { padding: 20, paddingTop: 60, paddingBottom: 60 },
  backBtn: { backgroundColor: '#555', padding: 10, borderRadius: 12, alignSelf: 'flex-start', marginBottom: 20 },
  backBtnText: { color: '#FFF', fontWeight: 'bold' },
  hpHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 40 },
  hpBox: { width: '45%' },
  hpLabel: { color: '#FFF', fontWeight: 'bold', marginBottom: 4 },
  hpBarBg: { height: 16, backgroundColor: '#000000', borderRadius: 8, overflow: 'hidden' }, // Black
  hpBarFill: { height: '100%', borderRadius: 8 },
  bossContainer: { alignItems: 'center', marginBottom: 40 },
  bossEmoji: { fontSize: 100 },
  questionBox: { backgroundColor: '#FFF', padding: 24, borderRadius: 20, alignItems: 'center', marginBottom: 24 }, // White
  qEmoji: { fontSize: 40, marginBottom: 10 },
  questionText: { fontSize: 22, fontWeight: 'bold', color: '#000', textAlign: 'center' }, // Black
  choicesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  choiceBtn: { width: '48%', backgroundColor: '#FF0000', padding: 20, borderRadius: 16, alignItems: 'center' }, // Red
  choiceText: { color: '#FFF', fontSize: 20, fontWeight: 'bold' }, // White
  feedbackBox: { marginTop: 30, alignItems: 'center' },
  feedbackText: { color: '#FFF', fontSize: 28, fontWeight: 'bold', marginBottom: 10 }, // White
  helperBox: { flexDirection: 'row', alignItems: 'center', marginTop: 10, paddingHorizontal: 20 },
  helperEmoji: { fontSize: 50, marginRight: 10 },
  speechBubble: { backgroundColor: '#FFF', padding: 16, borderRadius: 20, borderBottomLeftRadius: 0, maxWidth: '80%' }, // White
  explanationText: { color: '#000', fontSize: 18, fontWeight: '600' } // Black
});