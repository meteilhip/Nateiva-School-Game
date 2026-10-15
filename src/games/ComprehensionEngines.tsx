/**
 * NATEIVA EDUKIDS — DISTINCT TEXT COMPREHENSION ENGINES
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AudioManager from '../audio/AudioManager';

// ==========================================
// 1. STORY SEQUENCE MOSAIC (Beginning, Middle, End)
// ==========================================
export function StorySequenceMosaic({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const [selectedOrder, setSelectedOrder] = useState<string[]>([]);
  const storyEvents: string[] = question.options || [
    '1. Kiki trouve un manguier chargé de fruits',
    '2. Il grimpe doucement sur la plus haute branche',
    '3. Il partage les mangues avec sa famille'
  ];

  const tapEvent = (ev: string) => {
    AudioManager.play({ text: ev, contentId: 'story_event' });
    if (!selectedOrder.includes(ev)) {
      const next = [...selectedOrder, ev];
      setSelectedOrder(next);
      if (next.length === storyEvents.length) {
        onAnswer(next.join(' -> '));
      }
    }
  };

  const resetOrder = () => setSelectedOrder([]);

  return (
    <View style={styles.engineCard}>
      <Text style={styles.engineTitle}>📜 Story Sequence • Remets l'histoire dans l'ordre</Text>
      <View style={styles.timelineSlots}>
        {['Début 🌱', 'Milieu 🌿', 'Fin 🌳'].map((slot, i) => (
          <View key={i} style={styles.timelineSlot}>
            <Text style={styles.slotLabel}>{slot}</Text>
            <Text style={styles.slotValue}>{selectedOrder[i] || 'En attente...'}</Text>
          </View>
        ))}
      </View>
      <View style={styles.eventsList}>
        {storyEvents.map((ev: string) => (
          <TouchableOpacity key={ev} style={[styles.eventCard, selectedOrder.includes(ev) && styles.eventSelected]} onPress={() => tapEvent(ev)}>
            <Text style={styles.eventText}>{ev}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.resetBtn} onPress={resetOrder}>
        <Text style={styles.resetText}>🔄 Recommencer l'Ordre</Text>
      </TouchableOpacity>
    </View>
  );
}

// ==========================================
// 2. DETECTIVE CLUE DOSSIER (Evidence & Deduction)
// ==========================================
export function DetectiveClueDossier({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const dossierStory = question.story || 'Pendant la nuit à Kribi, le grand filet doré du pêcheur a disparu. Seules des traces de pattes de crabe ont été retrouvées près de la crique.';
  const clues: string[] = question.options || ['Un crabe géant 🦀', 'Un lion de la savane 🦁', 'Un oiseau migrateur 🦜'];
  const [investigatedClue, setInvestigatedClue] = useState<string | null>(null);

  const inspectClue = (clue: string) => {
    AudioManager.play({ text: `Preuve inspectée : ${clue}`, contentId: 'clue_inspect' });
    setInvestigatedClue(clue);
  };

  const stampDeduction = () => {
    if (investigatedClue) {
      AudioManager.play({ text: `Sceau de déduction apposé sur : ${investigatedClue} !`, contentId: 'clue_stamped' });
      onAnswer(investigatedClue);
    }
  };

  return (
    <View style={styles.engineCard}>
      <Text style={styles.engineTitle}>🕵️‍♂️ Detective Clue Dossier • Enquête</Text>
      <View style={styles.dossierBox}>
        <Text style={styles.dossierNarrative}>"{dossierStory}"</Text>
      </View>
      <View style={styles.cluesRow}>
        {clues.map((c: string) => (
          <TouchableOpacity key={c} style={[styles.clueBadge, investigatedClue === c && styles.clueBadgeActive]} onPress={() => inspectClue(c)}>
            <Text style={styles.clueText}>🔍 {c}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={[styles.stampBtn, !investigatedClue && styles.stampBtnDisabled]} disabled={!investigatedClue} onPress={stampDeduction}>
        <Text style={styles.stampBtnText}>🏷️ Apposer le Sceau de Déduction</Text>
      </TouchableOpacity>
    </View>
  );
}

// ==========================================
// 3. CAUSE & EFFECT LAB (Narrative Branches)
// ==========================================
export function CauseAndEffectLab({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const causeText = question.cause || 'Il pleut abondamment sur le champ de maïs sans s\'arrêter.';
  const effects: string[] = question.options || ['La terre devient très boueuse 🌧️', 'Le soleil brûle les feuilles ☀️', 'Il se met à neiger ❄️'];

  const selectEffect = (eff: string) => {
    AudioManager.play({ text: `Conséquence : ${eff}`, contentId: 'effect_select' });
    onAnswer(eff);
  };

  return (
    <View style={styles.engineCard}>
      <Text style={styles.engineTitle}>⚖️ Cause & Effect Lab • Conséquence logique</Text>
      <View style={styles.causeBox}>
        <Text style={styles.causeLabel}>CAUSE :</Text>
        <Text style={styles.causeDescription}>{causeText}</Text>
      </View>
      <Text style={styles.promptSelect}>Que va-t-il se passer ensuite ?</Text>
      <View style={styles.effectsColumn}>
        {effects.map((eff: string) => (
          <TouchableOpacity key={eff} style={styles.effectBtn} onPress={() => selectEffect(eff)}>
            <Text style={styles.effectText}>{eff}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  engineCard: { backgroundColor: '#FFFFFF', borderRadius: 24, padding: 16, alignItems: 'center', width: '100%', maxWidth: 460, borderWidth: 2, borderColor: '#E2E8F0', marginVertical: 10, shadowColor: '#17233D', shadowOpacity: 0.08, shadowRadius: 12, elevation: 4 },
  engineTitle: { fontSize: 16, fontWeight: 'bold', color: '#17233D', marginBottom: 12, textAlign: 'center' },

  // Sequence
  timelineSlots: { width: '100%', gap: 8, marginBottom: 14 },
  timelineSlot: { backgroundColor: '#F8FAFD', padding: 8, borderRadius: 12, borderWidth: 1, borderColor: '#CBD5E1' },
  slotLabel: { fontSize: 11, fontWeight: 'bold', color: '#E5252A' },
  slotValue: { fontSize: 13, color: '#17233D', marginTop: 2 },
  eventsList: { width: '100%', gap: 8 },
  eventCard: { backgroundColor: '#EFF6FF', padding: 12, borderRadius: 14, borderWidth: 2, borderColor: '#93C5FD' },
  eventSelected: { opacity: 0.4 },
  eventText: { fontSize: 13, fontWeight: 'bold', color: '#1E40AF' },
  resetBtn: { marginTop: 10, padding: 8 },
  resetText: { color: '#64748B', fontWeight: 'bold', fontSize: 12 },

  // Dossier
  dossierBox: { backgroundColor: '#FFFBEB', padding: 14, borderRadius: 16, borderWidth: 2, borderColor: '#FDE68A', marginBottom: 12, width: '100%' },
  dossierNarrative: { fontSize: 14, fontStyle: 'italic', color: '#78350F', lineHeight: 20 },
  cluesRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 14 },
  clueBadge: { backgroundColor: '#F1F5F9', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 14, borderWidth: 2, borderColor: '#CBD5E1' },
  clueBadgeActive: { borderColor: '#E5252A', backgroundColor: '#FEE2E2' },
  clueText: { fontSize: 13, fontWeight: 'bold', color: '#17233D' },
  stampBtn: { backgroundColor: '#E5252A', paddingVertical: 14, paddingHorizontal: 20, borderRadius: 16, width: '100%', alignItems: 'center' },
  stampBtnDisabled: { opacity: 0.4 },
  stampBtnText: { color: 'white', fontWeight: 'bold', fontSize: 15 },

  // Cause & Effect
  causeBox: { backgroundColor: '#FEF3C7', padding: 14, borderRadius: 16, width: '100%', marginBottom: 10, borderWidth: 2, borderColor: '#FCD34D' },
  causeLabel: { fontSize: 11, fontWeight: '900', color: '#92400E' },
  causeDescription: { fontSize: 14, fontWeight: 'bold', color: '#78350F', marginTop: 2 },
  promptSelect: { fontSize: 13, fontWeight: 'bold', color: '#4A5568', marginVertical: 8 },
  effectsColumn: { width: '100%', gap: 10 },
  effectBtn: { backgroundColor: '#F8FAFD', paddingVertical: 12, paddingHorizontal: 16, borderRadius: 14, borderWidth: 2, borderColor: '#CBD5E1', alignItems: 'center' },
  effectText: { fontSize: 14, fontWeight: 'bold', color: '#17233D' }
});
