import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

// 1. LIVING VS NON-LIVING CLASSIFICATION
export function LivingClassification({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const item = question.item || 'Chien';
  const itemEmoji = question.itemEmoji || '🐕';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Est-ce un être VIVANT ou NON-VIVANT ?</Text>
      <Text style={styles.subtext}>Un être vivant naît, grandit, respire et se nourrit.</Text>
      
      <View style={styles.showcaseCard}>
        <Text style={styles.showcaseEmoji}>{itemEmoji}</Text>
        <Text style={styles.showcaseLabel}>{item}</Text>
      </View>

      <View style={styles.optionsRow}>
        <TouchableOpacity style={styles.basketVivant} onPress={() => onAnswer('VIVANT')}>
          <Text style={styles.basketIcon}>🌱</Text>
          <Text style={styles.basketTitle}>ÊTRE VIVANT</Text>
          <Text style={styles.basketDesc}>(Plante, animal, être humain)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.basketNonVivant} onPress={() => onAnswer('NON_VIVANT')}>
          <Text style={styles.basketIcon}>🪨</Text>
          <Text style={styles.basketTitle}>NON-VIVANT</Text>
          <Text style={styles.basketDesc}>(Pierre, voiture, table)</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// 2. CAMEROON HABITAT EXPLORER
export function HabitatExplorer({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const animal = question.animal || 'Tilapia';
  const animalEmoji = question.animalEmoji || '🐟';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Où vit cet animal au Cameroun ?</Text>
      
      <View style={styles.animalCard}>
        <Text style={styles.animalEmoji}>{animalEmoji}</Text>
        <Text style={styles.animalName}>{animal}</Text>
      </View>

      <View style={styles.habitatsGrid}>
        <TouchableOpacity style={styles.habitatSavane} onPress={() => onAnswer('SAVANE')}>
          <Text style={styles.habitatIcon}>🌾</Text>
          <Text style={styles.habitatTitle}>Savane de Waza</Text>
          <Text style={styles.habitatSubtitle}>Grandes herbes du Nord</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.habitatForet} onPress={() => onAnswer('FORET')}>
          <Text style={styles.habitatIcon}>🌳</Text>
          <Text style={styles.habitatTitle}>Forêt du Dja</Text>
          <Text style={styles.habitatSubtitle}>Grands arbres denses du Sud</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.habitatEau} onPress={() => onAnswer('EAU')}>
          <Text style={styles.habitatIcon}>🌊</Text>
          <Text style={styles.habitatTitle}>Fleuve Wouri & Océan</Text>
          <Text style={styles.habitatSubtitle}>Eaux douces et marines</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// 3. PLANT GROWTH SEQUENCE (Stages of Maize/Bean)
export function PlantGrowthSequence({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const allStages = question.stages || [
    { id: '1', name: 'Graine en terre', icon: '🌱' },
    { id: '2', name: 'Germination', icon: '🌿' },
    { id: '3', name: 'Jeune tige', icon: '🪴' },
    { id: '4', name: 'Épi de maïs mûr', icon: '🌽' }
  ];

  const [selectedOrder, setSelectedOrder] = useState<any[]>([]);

  const handleSelectStage = (stage: any) => {
    if (!selectedOrder.some(s => s.id === stage.id)) {
      const next = [...selectedOrder, stage];
      setSelectedOrder(next);
      if (next.length === allStages.length) {
        onAnswer(next.map(s => s.id).join('-'));
      }
    }
  };

  const handleReset = () => setSelectedOrder([]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{question.q || 'Range les étapes de croissance de la plante (1 à 4) :'}</Text>

      {/* Timeline slots */}
      <View style={styles.timelineRow}>
        {allStages.map((_: any, idx: number) => {
          const item = selectedOrder[idx];
          return (
            <View key={idx} style={styles.timelineSlot}>
              <Text style={styles.timelineStepNumber}>{idx + 1}</Text>
              {item ? (
                <View style={styles.timelineFilled}>
                  <Text style={styles.timelineIcon}>{item.icon}</Text>
                  <Text style={styles.timelineText}>{item.name}</Text>
                </View>
              ) : (
                <Text style={styles.timelineEmptyText}>Étape ?</Text>
              )}
            </View>
          );
        })}
      </View>

      {/* Available stages */}
      <View style={styles.options}>
        {allStages.map((stage: any) => {
          const used = selectedOrder.some(s => s.id === stage.id);
          return (
            <TouchableOpacity 
              key={stage.id} 
              disabled={used} 
              style={[styles.stageCard, used && styles.stageCardUsed]} 
              onPress={() => handleSelectStage(stage)}
            >
              <Text style={styles.stageCardIcon}>{stage.icon}</Text>
              <Text style={[styles.stageCardName, used && { color: '#94A3B8' }]}>{stage.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {selectedOrder.length > 0 && (
        <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
          <Text style={styles.resetBtnText}>🔄 Recommencer</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// 4. BODY AND SENSES LAB
export function BodyAndSensesLab({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const stimulus = question.stimulus || 'Musique douce de balafon';
  const stimulusIcon = question.stimulusIcon || '🎵';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quel organe des sens utilise-t-on ?</Text>
      
      <View style={styles.stimulusCard}>
        <Text style={styles.stimulusIcon}>{stimulusIcon}</Text>
        <Text style={styles.stimulusName}>{stimulus}</Text>
      </View>

      <View style={styles.sensesGrid}>
        <TouchableOpacity style={styles.senseBtn} onPress={() => onAnswer('OREILLES')}>
          <Text style={styles.senseEmoji}>👂</Text>
          <Text style={styles.senseLabel}>Oreilles (L'Ouïe)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.senseBtn} onPress={() => onAnswer('YEUX')}>
          <Text style={styles.senseEmoji}>👀</Text>
          <Text style={styles.senseLabel}>Yeux (La Vue)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.senseBtn} onPress={() => onAnswer('NEZ')}>
          <Text style={styles.senseEmoji}>👃</Text>
          <Text style={styles.senseLabel}>Nez (L'Odorat)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.senseBtn} onPress={() => onAnswer('LANGUE')}>
          <Text style={styles.senseEmoji}>👅</Text>
          <Text style={styles.senseLabel}>Langue (Le Goût)</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// 5. HYGIENE & NUTRITION SORT (Healthy habits & malaria prevention)
export function HygieneNutritionSort({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const habit = question.habit || 'Dormir sous une moustiquaire imprégnée';
  const habitIcon = question.habitIcon || '🛏️';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Est-ce bon pour la santé ?</Text>
      
      <View style={styles.habitCard}>
        <Text style={styles.habitIcon}>{habitIcon}</Text>
        <Text style={styles.habitName}>{habit}</Text>
      </View>

      <View style={styles.optionsRow}>
        <TouchableOpacity style={styles.goodHabitBtn} onPress={() => onAnswer('BON')}>
          <Text style={styles.goodHabitIcon}>✅</Text>
          <Text style={styles.goodHabitText}>OUI, très bon pour la santé !</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.badHabitBtn} onPress={() => onAnswer('MAUVAIS')}>
          <Text style={styles.badHabitIcon}>❌</Text>
          <Text style={styles.badHabitText}>NON, dangereux pour la santé</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// 6. CAUSE AND EFFECT LAB
export function CauseAndEffectLab({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{question.q || 'Que se passe-t-il si la plante manque d\'eau ?'}</Text>
      
      <View style={styles.causeCard}>
        <Text style={styles.causeEmoji}>☀️🥀</Text>
        <Text style={styles.causeText}>Plante exposée sans eau pendant plusieurs jours</Text>
      </View>

      <View style={styles.options}>
        {question.options.map((opt: string) => (
          <TouchableOpacity key={opt} style={styles.effectBtn} onPress={() => onAnswer(opt)}>
            <Text style={styles.effectText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

export const ClassificationLab = LivingClassification;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 15, width: '100%' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12, textAlign: 'center', color: '#1E293B' },
  subtext: { fontSize: 16, color: '#64748B', marginBottom: 20, textAlign: 'center' },

  // Living vs Non-Living
  showcaseCard: { backgroundColor: '#F0FDF4', padding: 20, borderRadius: 24, borderWidth: 4, borderColor: '#86EFAC', alignItems: 'center', width: 170, marginBottom: 25 },
  showcaseEmoji: { fontSize: 75, marginBottom: 8 },
  showcaseLabel: { fontSize: 22, fontWeight: 'bold', color: '#166534' },
  optionsRow: { flexDirection: 'row', gap: 15, justifyContent: 'center', width: '100%', maxWidth: 450 },
  basketVivant: { flex: 1, backgroundColor: '#DCFCE7', borderWidth: 3, borderColor: '#22C55E', borderRadius: 20, padding: 16, alignItems: 'center' },
  basketNonVivant: { flex: 1, backgroundColor: '#F1F5F9', borderWidth: 3, borderColor: '#94A3B8', borderRadius: 20, padding: 16, alignItems: 'center' },
  basketIcon: { fontSize: 40, marginBottom: 6 },
  basketTitle: { fontSize: 18, fontWeight: 'bold', color: '#1E293B', textAlign: 'center' },
  basketDesc: { fontSize: 11, color: '#64748B', textAlign: 'center', marginTop: 4 },

  // Cameroon Habitat
  animalCard: { backgroundColor: '#EFF6FF', padding: 16, borderRadius: 20, borderWidth: 3, borderColor: '#93C5FD', alignItems: 'center', width: 160, marginBottom: 20 },
  animalEmoji: { fontSize: 65 },
  animalName: { fontSize: 20, fontWeight: 'bold', color: '#1E40AF', marginTop: 4 },
  habitatsGrid: { gap: 12, width: '100%', maxWidth: 420 },
  habitatSavane: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FEF3C7', borderWidth: 3, borderColor: '#F59E0B', borderRadius: 16, padding: 14 },
  habitatForet: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#DCFCE7', borderWidth: 3, borderColor: '#16A34A', borderRadius: 16, padding: 14 },
  habitatEau: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#DBEAFE', borderWidth: 3, borderColor: '#2563EB', borderRadius: 16, padding: 14 },
  habitatIcon: { fontSize: 36, marginRight: 15 },
  habitatTitle: { fontSize: 18, fontWeight: 'bold', color: '#1E293B' },
  habitatSubtitle: { fontSize: 13, color: '#64748B' },

  // Plant Growth
  timelineRow: { flexDirection: 'row', gap: 8, marginBottom: 25, justifyContent: 'center' },
  timelineSlot: { width: 90, height: 110, borderRadius: 16, borderWidth: 2, borderColor: '#94A3B8', borderStyle: 'dashed', backgroundColor: '#F8FAFC', alignItems: 'center', padding: 6 },
  timelineStepNumber: { fontSize: 12, fontWeight: 'bold', color: '#94A3B8', marginBottom: 2 },
  timelineFilled: { alignItems: 'center' },
  timelineIcon: { fontSize: 32, marginBottom: 4 },
  timelineText: { fontSize: 10, textAlign: 'center', fontWeight: 'bold', color: '#15803D' },
  timelineEmptyText: { fontSize: 12, color: '#94A3B8', marginTop: 20 },
  stageCard: { width: 130, padding: 12, backgroundColor: '#ECFDF5', borderWidth: 2, borderColor: '#34D399', borderRadius: 16, alignItems: 'center', margin: 6 },
  stageCardUsed: { opacity: 0.3 },
  stageCardIcon: { fontSize: 34, marginBottom: 4 },
  stageCardName: { fontSize: 13, fontWeight: 'bold', color: '#065F46', textAlign: 'center' },

  // Body & Senses
  stimulusCard: { backgroundColor: '#FDF2F8', padding: 16, borderRadius: 20, borderWidth: 3, borderColor: '#F472B6', alignItems: 'center', width: 220, marginBottom: 20 },
  stimulusIcon: { fontSize: 50 },
  stimulusName: { fontSize: 16, fontWeight: 'bold', color: '#9D174D', textAlign: 'center', marginTop: 6 },
  sensesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'center', maxWidth: 420 },
  senseBtn: { width: 140, padding: 14, backgroundColor: '#FFFBEB', borderWidth: 2, borderColor: '#FBBF24', borderRadius: 16, alignItems: 'center' },
  senseEmoji: { fontSize: 40, marginBottom: 4 },
  senseLabel: { fontSize: 14, fontWeight: 'bold', color: '#78350F', textAlign: 'center' },

  // Hygiene & Nutrition
  habitCard: { backgroundColor: '#F0F9FF', padding: 20, borderRadius: 24, borderWidth: 3, borderColor: '#38BDF8', alignItems: 'center', width: 280, marginBottom: 25 },
  habitIcon: { fontSize: 55, marginBottom: 8 },
  habitName: { fontSize: 18, fontWeight: 'bold', color: '#0369A1', textAlign: 'center' },
  goodHabitBtn: { flex: 1, backgroundColor: '#DCFCE7', borderWidth: 3, borderColor: '#16A34A', borderRadius: 20, padding: 16, alignItems: 'center' },
  badHabitBtn: { flex: 1, backgroundColor: '#FEE2E2', borderWidth: 3, borderColor: '#DC2626', borderRadius: 20, padding: 16, alignItems: 'center' },
  goodHabitIcon: { fontSize: 36, marginBottom: 6 },
  goodHabitText: { fontSize: 15, fontWeight: 'bold', color: '#166534', textAlign: 'center' },
  badHabitIcon: { fontSize: 36, marginBottom: 6 },
  badHabitText: { fontSize: 15, fontWeight: 'bold', color: '#991B1B', textAlign: 'center' },

  // Cause and Effect
  causeCard: { backgroundColor: '#FEF3C7', padding: 20, borderRadius: 20, borderWidth: 2, borderColor: '#F59E0B', width: '100%', maxWidth: 380, alignItems: 'center', marginBottom: 25 },
  causeEmoji: { fontSize: 50, marginBottom: 8 },
  causeText: { fontSize: 16, fontWeight: 'bold', color: '#78350F', textAlign: 'center' },
  effectBtn: { padding: 16, backgroundColor: '#EFF6FF', borderRadius: 16, borderWidth: 2, borderColor: '#3B82F6', width: '100%', maxWidth: 420, alignItems: 'center', marginBottom: 12 },
  effectText: { fontSize: 18, fontWeight: 'bold', color: '#1E40AF', textAlign: 'center' },

  // Common UI
  options: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'center', width: '100%', maxWidth: 450 },
  resetBtn: { backgroundColor: '#E2E8F0', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 14, marginTop: 15 },
  resetBtnText: { color: '#475569', fontSize: 16, fontWeight: 'bold' }
});
