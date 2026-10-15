/**
 * NATEIVA EDUKIDS — DISTINCT INTERACTIVE SCIENCE ENGINES
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AudioManager from '../audio/AudioManager';

// ==========================================
// 1. PLANT GROWTH LAB (Manipulable Variables)
// ==========================================
export function PlantGrowthLab({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const [hasWater, setHasWater] = useState(false);
  const [hasSun, setHasSun] = useState(false);
  const [hasSoil, setHasSoil] = useState(false);

  // Growth Stage: 0 = Seed, 1 = Sprout, 2 = Leafy, 3 = Mature Harvest
  const growthStage = (hasWater ? 1 : 0) + (hasSun ? 1 : 0) + (hasSoil ? 1 : 0);

  const toggleWater = () => {
    AudioManager.play({ text: 'Arrosage de la terre !', contentId: 'sci_water' });
    setHasWater(w => !w);
  };
  const toggleSun = () => {
    AudioManager.play({ text: 'Le soleil brille !', contentId: 'sci_sun' });
    setHasSun(s => !s);
  };
  const toggleSoil = () => {
    AudioManager.play({ text: 'Engrais naturel ajouté !', contentId: 'sci_soil' });
    setHasSoil(s => !s);
  };

  const harvestPlant = () => {
    if (growthStage === 3) {
      AudioManager.play({ text: 'Récolte abondante ! Le cycle végétal est accompli !', contentId: 'sci_harvest' });
      onAnswer('HARVEST_READY');
    }
  };

  const getStageDisplay = () => {
    if (growthStage === 0) return { icon: '🌰', label: 'Graine en dormance' };
    if (growthStage === 1) return { icon: '🌱', label: 'Jeune pousse' };
    if (growthStage === 2) return { icon: '🌿', label: 'Tige feuillue' };
    return { icon: '🌽✨', label: 'Maïs mûr prêt pour la récolte !' };
  };

  const stage = getStageDisplay();

  return (
    <View style={styles.engineCard}>
      <Text style={styles.engineTitle}>🌱 Laboratoire de Botanique • Croissance du Maïs</Text>
      <View style={styles.gardenBox}>
        <Text style={styles.plantVisual}>{stage.icon}</Text>
        <Text style={styles.stageLabel}>{stage.label}</Text>
      </View>
      <View style={styles.variableButtonsRow}>
        <TouchableOpacity style={[styles.varBtn, hasWater && styles.varBtnActive]} onPress={toggleWater}>
          <Text style={styles.varText}>💧 Eau {hasWater ? '✅' : '❌'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.varBtn, hasSun && styles.varBtnActive]} onPress={toggleSun}>
          <Text style={styles.varText}>☀️ Soleil {hasSun ? '✅' : '❌'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.varBtn, hasSoil && styles.varBtnActive]} onPress={toggleSoil}>
          <Text style={styles.varText}>🪴 Terre {hasSoil ? '✅' : '❌'}</Text>
        </TouchableOpacity>
      </View>
      {growthStage === 3 && (
        <TouchableOpacity style={styles.harvestBtn} onPress={harvestPlant}>
          <Text style={styles.harvestBtnText}>🌽 RÉCOLTER LE MAÏS MÛR !</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// ==========================================
// 2. HABITAT TERRARIUM (Biome Classification)
// ==========================================
export function HabitatTerrarium({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const creature = question.creature || 'Gorille du Dja 🦍';
  const targetBiome = question.ans || 'Forêt Équatoriale 🌳';
  const biomes: string[] = question.options || ['Forêt Équatoriale 🌳', 'Savane du Waza 🌾', 'Océan Atlantique 🌊'];

  const placeInBiome = (biome: string) => {
    AudioManager.play({ text: `${creature} placé dans : ${biome}`, contentId: 'sci_habitat' });
    onAnswer(biome);
  };

  return (
    <View style={styles.engineCard}>
      <Text style={styles.engineTitle}>🏞️ Habitat Terrarium • Place l'animal dans son milieu naturel</Text>
      <View style={styles.creatureCard}>
        <Text style={styles.creatureHeader}>{creature}</Text>
      </View>
      <View style={styles.biomesColumn}>
        {biomes.map((b: string) => (
          <TouchableOpacity key={b} style={styles.biomeBtn} onPress={() => placeInBiome(b)}>
            <Text style={styles.biomeBtnText}>{b}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// ==========================================
// 3. WATER CYCLE CLOUD CLIMBER (Thermodynamics)
// ==========================================
export function WaterCycleCloudClimber({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const [phase, setPhase] = useState<'liquid' | 'evaporation' | 'cloud' | 'rain'>('liquid');

  const advancePhase = () => {
    if (phase === 'liquid') {
      AudioManager.play({ text: 'Le soleil chauffe l\'eau : Évaporation !', contentId: 'sci_evap' });
      setPhase('evaporation');
    } else if (phase === 'evaporation') {
      AudioManager.play({ text: 'La vapeur d\'eau se refroidit en altitude : Condensation en nuage !', contentId: 'sci_cloud' });
      setPhase('cloud');
    } else if (phase === 'cloud') {
      AudioManager.play({ text: 'Le nuage devient lourd : Précipitation, il pleut sur le mont Cameroun !', contentId: 'sci_rain' });
      setPhase('rain');
      setTimeout(() => onAnswer('CYCLE_COMPLETE'), 800);
    }
  };

  const getPhaseDisplay = () => {
    if (phase === 'liquid') return { icon: '🌊', title: '1. Océan & Rivière Wouri' };
    if (phase === 'evaporation') return { icon: '♨️', title: '2. Évaporation de la Vapeur' };
    if (phase === 'cloud') return { icon: '☁️', title: '3. Condensation en Nuage' };
    return { icon: '🌧️', title: '4. Précipitation (Pluie) !' };
  };

  const cur = getPhaseDisplay();

  return (
    <View style={styles.engineCard}>
      <Text style={styles.engineTitle}>💧 Cycle de l'Eau • Simulateur Atmosphérique</Text>
      <View style={styles.cycleStage}>
        <Text style={styles.cycleIcon}>{cur.icon}</Text>
        <Text style={styles.cycleTitle}>{cur.title}</Text>
      </View>
      <TouchableOpacity style={styles.advanceCycleBtn} onPress={advancePhase}>
        <Text style={styles.advanceCycleBtnText}>☀️ Réchauffer & Avancer le Cycle ➡️</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  engineCard: { backgroundColor: '#FFFFFF', borderRadius: 24, padding: 16, alignItems: 'center', width: '100%', maxWidth: 460, borderWidth: 2, borderColor: '#E2E8F0', marginVertical: 10, shadowColor: '#17233D', shadowOpacity: 0.08, shadowRadius: 12, elevation: 4 },
  engineTitle: { fontSize: 16, fontWeight: 'bold', color: '#17233D', marginBottom: 12, textAlign: 'center' },

  // Botany
  gardenBox: { width: '100%', backgroundColor: '#ECFDF5', padding: 20, borderRadius: 20, alignItems: 'center', borderWidth: 2, borderColor: '#A7F3D0', marginBottom: 12 },
  plantVisual: { fontSize: 55, marginBottom: 6 },
  stageLabel: { fontSize: 14, fontWeight: 'bold', color: '#065F46' },
  variableButtonsRow: { flexDirection: 'row', gap: 8, justifyContent: 'center', width: '100%', marginBottom: 12 },
  varBtn: { backgroundColor: '#F1F5F9', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 12, borderWidth: 1.5, borderColor: '#CBD5E1' },
  varBtnActive: { backgroundColor: '#BBF7D0', borderColor: '#22C55E' },
  varText: { fontSize: 13, fontWeight: 'bold', color: '#1E293B' },
  harvestBtn: { backgroundColor: '#F59E0B', paddingVertical: 14, paddingHorizontal: 20, borderRadius: 16, width: '100%', alignItems: 'center' },
  harvestBtnText: { color: 'white', fontWeight: '900', fontSize: 15 },

  // Habitat
  creatureCard: { backgroundColor: '#FEF3C7', padding: 14, borderRadius: 16, width: '100%', alignItems: 'center', marginBottom: 14, borderWidth: 2, borderColor: '#FDE68A' },
  creatureHeader: { fontSize: 20, fontWeight: '900', color: '#78350F' },
  biomesColumn: { width: '100%', gap: 10 },
  biomeBtn: { backgroundColor: '#EFF6FF', paddingVertical: 14, paddingHorizontal: 16, borderRadius: 16, borderWidth: 2, borderColor: '#93C5FD', alignItems: 'center' },
  biomeBtnText: { fontSize: 15, fontWeight: 'bold', color: '#1E40AF' },

  // Water Cycle
  cycleStage: { width: '100%', backgroundColor: '#F0F9FF', padding: 20, borderRadius: 20, alignItems: 'center', borderWidth: 2, borderColor: '#BAE6FD', marginBottom: 14 },
  cycleIcon: { fontSize: 50, marginBottom: 6 },
  cycleTitle: { fontSize: 16, fontWeight: 'bold', color: '#0369A1' },
  advanceCycleBtn: { backgroundColor: '#0284C7', paddingVertical: 14, paddingHorizontal: 20, borderRadius: 16, width: '100%', alignItems: 'center' },
  advanceCycleBtnText: { color: 'white', fontWeight: 'bold', fontSize: 15 }
});
