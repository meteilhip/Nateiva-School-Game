/**
 * NATEIVA EDUKIDS — DISTINCT PRONUNCIATION & LISTENING ENGINES
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AudioManager from '../audio/AudioManager';

// ==========================================
// 1. LISTEN & REPEAT STUDIO (Mouth & Syllable Cadence)
// ==========================================
export function ListenAndRepeatStudio({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const targetWord = question.word || question.ans || 'Pirogue';
  const syllables: string[] = question.syllables || ['Pi', 'ro', 'gue'];
  const [activeSyllable, setActiveSyllable] = useState<number | null>(null);
  const [repeatedCount, setRepeatedCount] = useState<number>(0);

  const playFull = (slow: boolean = false) => {
    AudioManager.play({
      text: targetWord,
      rate: slow ? 0.65 : 0.88,
      contentId: 'pron_full'
    });
  };

  const playSyl = (syl: string, idx: number) => {
    setActiveSyllable(idx);
    AudioManager.play({
      text: syl,
      rate: 0.7,
      contentId: 'pron_syl',
      onDone: () => setActiveSyllable(null)
    });
  };

  const registerRepetition = () => {
    AudioManager.play({ text: 'Très bien répété !', contentId: 'pron_repeat' });
    const next = repeatedCount + 1;
    setRepeatedCount(next);
    if (next >= 2) {
      setTimeout(() => onAnswer(targetWord), 600);
    }
  };

  return (
    <View style={styles.engineCard}>
      <Text style={styles.engineTitle}>🗣️ Studio de Prononciation • Écoute & Répète</Text>
      <View style={styles.mouthCard}>
        <Text style={styles.mouthEmoji}>👄</Text>
        <Text style={styles.wordDisplay}>{targetWord}</Text>
      </View>
      <View style={styles.audioControlsRow}>
        <TouchableOpacity style={styles.soundBtn} onPress={() => playFull(false)}>
          <Text style={styles.soundBtnText}>🔊 Écouter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.soundBtn, styles.soundBtnSlow]} onPress={() => playFull(true)}>
          <Text style={styles.soundBtnText}>🐢 Écoute Lente</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.syllablesBreakdown}>
        {syllables.map((s, i) => (
          <TouchableOpacity key={i} style={[styles.sylChip, activeSyllable === i && styles.sylChipActive]} onPress={() => playSyl(s, i)}>
            <Text style={styles.sylChipText}>{s}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.repeatBtn} onPress={registerRepetition}>
        <Text style={styles.repeatBtnText}>🎙️ J'ai Répété le Mot ! ({repeatedCount}/2)</Text>
      </TouchableOpacity>
    </View>
  );
}

// ==========================================
// 2. MINIMAL PAIRS CHAMBER (Sound Discrimination)
// ==========================================
export function MinimalPairsChamber({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const pair: string[] = question.options || ['Bateau ⛵ (B)', 'Gâteau 🎂 (G)'];
  const targetSound = question.ans || pair[0];

  const playChoice = (opt: string) => {
    AudioManager.play({ text: opt, contentId: 'sound_discrim' });
    setTimeout(() => onAnswer(opt), 500);
  };

  return (
    <View style={styles.engineCard}>
      <Text style={styles.engineTitle}>👂 Discrimination Auditive • Sons Proches</Text>
      <Text style={styles.promptSub}>Touche le mot qui commence par le bon son :</Text>
      <View style={styles.pairsRow}>
        {pair.map((opt: string) => (
          <TouchableOpacity key={opt} style={styles.pairCard} onPress={() => playChoice(opt)}>
            <Text style={styles.pairIcon}>📢</Text>
            <Text style={styles.pairText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  engineCard: { backgroundColor: '#FFFFFF', borderRadius: 24, padding: 16, alignItems: 'center', width: '100%', maxWidth: 460, borderWidth: 2, borderColor: '#E2E8F0', marginVertical: 10, shadowColor: '#17233D', shadowOpacity: 0.08, shadowRadius: 12, elevation: 4 },
  engineTitle: { fontSize: 16, fontWeight: 'bold', color: '#17233D', marginBottom: 10, textAlign: 'center' },
  promptSub: { fontSize: 13, color: '#64748B', marginBottom: 14, textAlign: 'center' },

  mouthCard: { backgroundColor: '#F8FAFD', padding: 16, borderRadius: 20, alignItems: 'center', width: '100%', borderWidth: 2, borderColor: '#E2E8F0', marginBottom: 12 },
  mouthEmoji: { fontSize: 44, marginBottom: 4 },
  wordDisplay: { fontSize: 26, fontWeight: '900', color: '#E5252A' },

  audioControlsRow: { flexDirection: 'row', gap: 10, marginBottom: 14 },
  soundBtn: { backgroundColor: '#377DFF', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 14 },
  soundBtnSlow: { backgroundColor: '#FFC83D' },
  soundBtnText: { color: 'white', fontWeight: 'bold', fontSize: 13 },

  syllablesBreakdown: { flexDirection: 'row', gap: 10, marginBottom: 14 },
  sylChip: { backgroundColor: '#EFF6FF', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 12, borderWidth: 2, borderColor: '#377DFF' },
  sylChipActive: { backgroundColor: '#38CFA4', borderColor: '#059669' },
  sylChipText: { fontSize: 18, fontWeight: 'bold', color: '#1D4ED8' },

  repeatBtn: { backgroundColor: '#38CFA4', paddingVertical: 14, paddingHorizontal: 20, borderRadius: 16, width: '100%', alignItems: 'center' },
  repeatBtnText: { color: 'white', fontWeight: 'bold', fontSize: 15 },

  // Pairs
  pairsRow: { width: '100%', gap: 12 },
  pairCard: { backgroundColor: '#EFF6FF', padding: 16, borderRadius: 16, borderWidth: 2, borderColor: '#BFDBFE', alignItems: 'center', flexDirection: 'row', gap: 12 },
  pairIcon: { fontSize: 26 },
  pairText: { fontSize: 16, fontWeight: 'bold', color: '#1E40AF' }
});
