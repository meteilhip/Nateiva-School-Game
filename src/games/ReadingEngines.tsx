/**
 * NATEIVA EDUKIDS — DISTINCT READING & PHONICS ENGINES
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AudioManager from '../audio/AudioManager';

// ==========================================
// 1. PHONICS FISHING (Wouri River Rod & Hook)
// ==========================================
export function PhonicsFishing({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const [hookDepth, setHookDepth] = useState(0); // 0 = air, 1 = shallow, 2 = deep
  const fishOptions = question.options || ['B', 'P', 'M'];
  const targetPhoneme = question.ans || 'P';

  const castLine = (depth: number, phoneme: string) => {
    AudioManager.play({ text: `Lancer de ligne vers le poisson ${phoneme} !`, contentId: 'fish_cast' });
    setHookDepth(depth);
    setTimeout(() => {
      onAnswer(phoneme);
    }, 600);
  };

  return (
    <View style={styles.engineCard}>
      <Text style={styles.engineTitle}>🎣 Phonics Fishing • Fleuve Wouri</Text>
      <Text style={styles.engineSubtitle}>Pêche le poisson portant le son : [{targetPhoneme}]</Text>
      <View style={styles.riverPool}>
        <Text style={styles.fishingRod}>🎣 ~~~~{hookDepth > 0 ? '🪝' : ''}</Text>
        <View style={styles.schoolOfFish}>
          {fishOptions.map((f: string, i: number) => (
            <TouchableOpacity key={i} style={styles.fishItem} onPress={() => castLine(i + 1, f)}>
              <Text style={styles.fishSprite}>🐟 [{f}]</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

// ==========================================
// 2. ALPHABET SAFARI HUNT (Flashlight Sweep)
// ==========================================
export function AlphabetSafariHunt({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const [flashlightPos, setFlashlightPos] = useState(1);
  const creatures = question.options || ['Lion 🦁 (L)', 'Girafe 🦒 (G)', 'Singe 🐒 (S)'];
  const targetLetter = question.ans || 'L';

  const sweep = (idx: number, item: string) => {
    AudioManager.play({ text: `Lampe dirigée vers ${item} !`, contentId: 'safari_sweep' });
    setFlashlightPos(idx);
    setTimeout(() => onAnswer(item), 500);
  };

  return (
    <View style={styles.engineCard}>
      <Text style={styles.engineTitle}>🔦 Alphabet Safari • Trouve la lettre : {targetLetter}</Text>
      <View style={styles.savannaTwilight}>
        {creatures.map((c: string, i: number) => (
          <TouchableOpacity key={i} style={[styles.savannaBush, flashlightPos === i && styles.bushLit]} onPress={() => sweep(i, c)}>
            <Text style={styles.creatureText}>{flashlightPos === i ? c : '🌿 ?'}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// ==========================================
// 3. SYLLABLE LILYPAD JUMP (Frog Leap)
// ==========================================
export function SyllableLilypadJump({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const [frogPos, setFrogPos] = useState(0);
  const targetSyllables = parseInt(question.ans) || 2;
  const word = question.word || 'Ba-na-ne';

  const hop = (count: number) => {
    AudioManager.play({ text: `Hop ! ${count} syllabes !`, contentId: 'frog_hop' });
    setFrogPos(count);
    setTimeout(() => onAnswer(String(count)), 600);
  };

  return (
    <View style={styles.engineCard}>
      <Text style={styles.engineTitle}>🐸 Syllable Lilypad • Mot : "{word}"</Text>
      <View style={styles.pondArea}>
        {[1, 2, 3, 4].map(num => (
          <TouchableOpacity key={num} style={[styles.lilypad, frogPos === num && styles.lilypadFrog]} onPress={() => hop(num)}>
            <Text style={styles.padNumber}>{frogPos === num ? '🐸' : '🪷'}</Text>
            <Text style={styles.padLabel}>{num} syllabe{num > 1 ? 's' : ''}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// ==========================================
// 4. SENTENCE TRAIN (Grammar Wagon Coupler)
// ==========================================
export function SentenceRailroad({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const candidates: string[] = question.options || ['Le lion', 'dort', 'dans la savane.'];

  const addWord = (w: string) => {
    AudioManager.play({ text: w, contentId: 'word_speak' });
    if (!selectedWords.includes(w)) {
      const next = [...selectedWords, w];
      setSelectedWords(next);
      if (next.length === candidates.length) {
        onAnswer(next.join(' '));
      }
    }
  };

  return (
    <View style={styles.engineCard}>
      <Text style={styles.engineTitle}>🚂 Sentence Railroad • Ordonne la phrase</Text>
      <View style={styles.trainCouplingRow}>
        <Text style={styles.locomotive}>🚂</Text>
        {selectedWords.map((w, i) => (
          <View key={i} style={styles.wagonBox}><Text style={styles.wagonText}>{w}</Text></View>
        ))}
      </View>
      <View style={styles.wordsRow}>
        {candidates.map((w: string) => (
          <TouchableOpacity key={w} style={styles.wordChip} onPress={() => addWord(w)}>
            <Text style={styles.wordChipText}>{w}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// ==========================================
// 5. WORD BLACKSMITH ANVIL (Phoneme Blending)
// ==========================================
export function WordBlacksmithAnvil({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const [blended, setBlended] = useState(false);
  const parts = question.parts || ['M', 'A'];
  const fullWord = question.ans || 'MA';

  const strikeAnvil = () => {
    AudioManager.play({ text: `Kling ! ${fullWord} !`, contentId: 'anvil_strike' });
    setBlended(true);
    setTimeout(() => onAnswer(fullWord), 600);
  };

  return (
    <View style={styles.engineCard}>
      <Text style={styles.engineTitle}>⚒️ Word Blacksmith • Forge les phonèmes</Text>
      <View style={styles.anvilStage}>
        <Text style={styles.anvilIcon}>🪨⚒️</Text>
        <Text style={styles.anvilWord}>{blended ? fullWord : parts.join(' + ')}</Text>
      </View>
      <TouchableOpacity style={styles.strikeBtn} onPress={strikeAnvil}>
        <Text style={styles.strikeBtnText}>⚡ Frapper l'Enclume ({parts.join(' + ')})</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  engineCard: { backgroundColor: '#FFFFFF', borderRadius: 24, padding: 16, alignItems: 'center', width: '100%', maxWidth: 460, borderWidth: 2, borderColor: '#E2E8F0', marginVertical: 10, shadowColor: '#17233D', shadowOpacity: 0.08, shadowRadius: 12, elevation: 4 },
  engineTitle: { fontSize: 16, fontWeight: 'bold', color: '#17233D', marginBottom: 4, textAlign: 'center' },
  engineSubtitle: { fontSize: 13, color: '#4A5568', marginBottom: 12, textAlign: 'center' },

  // River
  riverPool: { width: '100%', backgroundColor: '#0284C7', padding: 14, borderRadius: 18, alignItems: 'center' },
  fishingRod: { fontSize: 28, marginBottom: 10 },
  schoolOfFish: { flexDirection: 'row', gap: 12, flexWrap: 'wrap', justifyContent: 'center' },
  fishItem: { backgroundColor: '#BAE6FD', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 16, borderWidth: 2, borderColor: '#38BDF8' },
  fishSprite: { fontSize: 18, fontWeight: 'bold', color: '#0369A1' },

  // Safari
  savannaTwilight: { width: '100%', backgroundColor: '#1E293B', padding: 16, borderRadius: 18, flexDirection: 'row', gap: 10, justifyContent: 'center' },
  savannaBush: { width: 90, height: 75, backgroundColor: '#334155', borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  bushLit: { backgroundColor: '#FEF08A', borderWidth: 2, borderColor: '#F59E0B' },
  creatureText: { fontSize: 14, fontWeight: 'bold', color: '#F8FAFC' },

  // Lilypad
  pondArea: { flexDirection: 'row', gap: 10, justifyContent: 'center', marginVertical: 10 },
  lilypad: { width: 75, height: 75, borderRadius: 37.5, backgroundColor: '#DCFCE7', borderWidth: 2, borderColor: '#22C55E', alignItems: 'center', justifyContent: 'center' },
  lilypadFrog: { backgroundColor: '#86EFAC', transform: [{ scale: 1.08 }] },
  padNumber: { fontSize: 24 },
  padLabel: { fontSize: 10, fontWeight: 'bold', color: '#166534', marginTop: 2 },

  // Railroad
  trainCouplingRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginVertical: 10 },
  locomotive: { fontSize: 32 },
  wagonBox: { backgroundColor: '#EFF6FF', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 10, borderWidth: 2, borderColor: '#377DFF' },
  wagonText: { fontWeight: 'bold', color: '#1D4ED8' },
  wordsRow: { flexDirection: 'row', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginTop: 10 },
  wordChip: { backgroundColor: '#F1F5F9', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 14, borderWidth: 1, borderColor: '#CBD5E1' },
  wordChipText: { fontSize: 14, fontWeight: 'bold', color: '#17233D' },

  // Anvil
  anvilStage: { alignItems: 'center', marginVertical: 15 },
  anvilIcon: { fontSize: 50 },
  anvilWord: { fontSize: 28, fontWeight: '900', color: '#E5252A', marginTop: 6 },
  strikeBtn: { backgroundColor: '#E5252A', paddingVertical: 14, paddingHorizontal: 24, borderRadius: 16, width: '100%', alignItems: 'center' },
  strikeBtnText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});
