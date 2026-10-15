import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import * as Speech from 'expo-speech';
import { TutorMode } from '../games/types';
import { StrategyLibrary } from '../games/strategies';

interface TutorOverlayProps {
  question: any;
  onClose: () => void;
  onPracticeSimilar?: () => void;
}

export function TutorOverlay({ question, onClose, onPracticeSimilar }: TutorOverlayProps) {
  const [activeMode, setActiveMode] = useState<TutorMode>('WATCH_ME');
  const [regroupStep, setRegroupStep] = useState<number>(0);
  const [isSlowSpeech, setIsSlowSpeech] = useState(false);

  const speak = (text: string) => {
    Speech.stop();
    Speech.speak(text, { 
      language: 'fr-FR', 
      rate: isSlowSpeech ? 0.65 : 0.85 
    });
  };

  // 1. Math Regrouping Tutor (47 + 28 model)
  const renderMathContent = () => {
    return (
      <View style={styles.tutorBody}>
        {/* Mode Selector */}
        <View style={styles.modeTabsRow}>
          <TouchableOpacity 
            style={[styles.modeTab, activeMode === 'WATCH_ME' && styles.modeTabActive]} 
            onPress={() => { setActiveMode('WATCH_ME'); speak('Regarde bien la démonstration des barres de dix et des petits cubes.'); }}
          >
            <Text style={[styles.modeTabText, activeMode === 'WATCH_ME' && styles.modeTabTextActive]}>👀 Regarde-moi</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.modeTab, activeMode === 'LETS_DO_IT' && styles.modeTabActive]} 
            onPress={() => { setActiveMode('LETS_DO_IT'); speak('À toi de jouer : touche pour fusionner les 10 cubes en une barre de dix.'); }}
          >
            <Text style={[styles.modeTabText, activeMode === 'LETS_DO_IT' && styles.modeTabTextActive]}>🤝 Ensemble</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.modeTab, activeMode === 'YOUR_TURN' && styles.modeTabActive]} 
            onPress={() => { setActiveMode('YOUR_TURN'); speak('À ton tour maintenant ! Résous ce problème tout seul.'); }}
          >
            <Text style={[styles.modeTabText, activeMode === 'YOUR_TURN' && styles.modeTabTextActive]}>🎯 À ton tour</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.modeTab, activeMode === 'ANOTHER_WAY' && styles.modeTabActive]} 
            onPress={() => { setActiveMode('ANOTHER_WAY'); speak('Voici l\'astuce magique des amis de dix.'); }}
          >
            <Text style={[styles.modeTabText, activeMode === 'ANOTHER_WAY' && styles.modeTabTextActive]}>✨ Autre Façon</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.modeTab, activeMode === 'WHY_IT_WORKS' && styles.modeTabActive]} 
            onPress={() => { setActiveMode('WHY_IT_WORKS'); speak('Pourquoi ça marche ? C\'est le principe de la base dix.'); }}
          >
            <Text style={[styles.modeTabText, activeMode === 'WHY_IT_WORKS' && styles.modeTabTextActive]}>🧠 Pourquoi ?</Text>
          </TouchableOpacity>
        </View>

        {activeMode === 'WATCH_ME' && (
          <View style={styles.modeCard}>
            <Text style={styles.stepHeader}>Exemple concret : 47 + 28</Text>
            
            {/* Base 10 visual blocks */}
            <View style={styles.concreteBlocksRow}>
              <View style={styles.numberDecomp}>
                <Text style={styles.numberDecompLabel}>47</Text>
                <View style={styles.rodsContainer}>
                  {Array.from({ length: 4 }).map((_, i) => <View key={i} style={styles.tenRodVisual} />)}
                  <View style={styles.cubesGrid}>
                    {Array.from({ length: 7 }).map((_, i) => <View key={i} style={styles.unitCubeVisual} />)}
                  </View>
                </View>
                <Text style={styles.decompText}>4 dizaines + 7 unités</Text>
              </View>

              <Text style={styles.plusSymbol}>➕</Text>

              <View style={styles.numberDecomp}>
                <Text style={styles.numberDecompLabel}>28</Text>
                <View style={styles.rodsContainer}>
                  {Array.from({ length: 2 }).map((_, i) => <View key={i} style={styles.tenRodVisual} />)}
                  <View style={styles.cubesGrid}>
                    {Array.from({ length: 8 }).map((_, i) => <View key={i} style={styles.unitCubeVisual} />)}
                  </View>
                </View>
                <Text style={styles.decompText}>2 dizaines + 8 unités</Text>
              </View>
            </View>

            <View style={styles.explanationBox}>
              <Text style={styles.explanationTitle}>Étape 1 : On rassemble les unités</Text>
              <Text style={styles.explanationDesc}>
                7 unités + 8 unités = 15 unités. Comme 15 dépasse 10, on fabrique 1 NOUVELLE barre de dix, et il reste 5 unités !
              </Text>
            </View>
          </View>
        )}

        {activeMode === 'LETS_DO_IT' && (
          <View style={styles.modeCard}>
            <Text style={styles.stepHeader}>Interactive : Fabrique la dizaine !</Text>
            <Text style={styles.instructionText}>Touche les 10 cubes pour les transformer en barre de dix :</Text>

            <View style={styles.interactiveRegroupArea}>
              {regroupStep === 0 ? (
                <TouchableOpacity style={styles.fusionButton} onPress={() => setRegroupStep(1)}>
                  <Text style={{ fontSize: 40 }}>📦 10 Petits Cubes</Text>
                  <Text style={styles.fusionBtnText}>⚡ Toucher pour Fusionner !</Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.fusedResultBox}>
                  <Text style={{ fontSize: 40 }}>🟦 1 Nouvelle Barre de 10 !</Text>
                  <Text style={styles.fusedResultText}>+ 5 petits cubes restants = 15 unités</Text>
                </View>
              )}
            </View>

            <Text style={styles.finalTotalBig}>
              Total des dizaines : 4 + 2 + 1 (retenue) = 7 dizaines. Total final = <Text style={{ color: '#16A34A' }}>75</Text> !
            </Text>
          </View>
        )}

        {activeMode === 'YOUR_TURN' && (
          <View style={styles.modeCard}>
            <Text style={styles.stepHeader}>Problème de Transfert Indépendant : 36 + 19</Text>
            <Text style={styles.instructionText}>
              Pour valider ta maîtrise, résous ce problème similaire avec de nouveaux nombres sans aide !
            </Text>

            <View style={styles.concreteBlocksRow}>
              <View style={styles.numberDecomp}>
                <Text style={styles.numberDecompLabel}>36</Text>
                <Text style={styles.decompText}>3 barres + 6 cubes</Text>
              </View>
              <Text style={styles.plusSymbol}>➕</Text>
              <View style={styles.numberDecomp}>
                <Text style={styles.numberDecompLabel}>19</Text>
                <Text style={styles.decompText}>1 barre + 9 cubes</Text>
              </View>
            </View>

            <View style={styles.explanationBox}>
              <Text style={styles.explanationTitle}>🎯 Indice de transfert :</Text>
              <Text style={styles.explanationDesc}>
                6 + 9 = 15 unités. On échange 10 unités contre 1 barre de 10. Il reste 5 unités.
                Dizaines : 3 + 1 + 1 (retenue) = 5 dizaines. Total = 55 !
              </Text>
            </View>

            {onPracticeSimilar && (
              <TouchableOpacity style={styles.practiceTransferBtn} onPress={onPracticeSimilar}>
                <Text style={styles.practiceTransferBtnText}>🚀 Valider en mode Jeu Indépendant</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {activeMode === 'ANOTHER_WAY' && (
          <View style={styles.modeCard}>
            <Text style={styles.stepHeader}>L'Astuce des Amis de Dix :</Text>
            <View style={styles.trickBox}>
              <Text style={styles.trickFormula}>47 + 3 = 50 (Nombre rond !)</Text>
              <Text style={styles.trickFormula}>Il reste 25 à ajouter (28 - 3 = 25)</Text>
              <Text style={styles.trickFormulaFinal}>50 + 25 = 75 ! 🚀</Text>
            </View>
            <Text style={styles.trickExplain}>
              Au lieu de poser l'opération, avance d'abord jusqu'à la dizaine suivante (50), puis ajoute le reste facilement de tête !
            </Text>
          </View>
        )}

        {activeMode === 'WHY_IT_WORKS' && (
          <View style={styles.modeCard}>
            <Text style={styles.stepHeader}>Le Principe Fondamental de la Base 10 :</Text>
            <Text style={styles.explanationDesc}>
              Notre système d'écriture des nombres ne peut contenir qu'un seul chiffre (0 à 9) dans la colonne des unités.
              Dès qu'on atteint 10 unités, elles doivent obligatoirement changer de colonne et devenir 1 dizaine !
            </Text>
          </View>
        )}
      </View>
    );
  };

  // 2. Reading Tutor (Phonemes, Syllable Chunks, Stories)
  const renderReadingContent = () => (
    <View style={styles.tutorBody}>
      <View style={styles.modeCard}>
        <Text style={styles.stepHeader}>Décodage Pas à Pas des Syllabes :</Text>
        
        <View style={styles.syllableDemoRow}>
          <View style={styles.syllableBubble}><Text style={styles.syllableBubbleText}>BA</Text></View>
          <Text style={styles.plusSymbol}>➕</Text>
          <View style={styles.syllableBubble}><Text style={styles.syllableBubbleText}>NA</Text></View>
          <Text style={styles.plusSymbol}>➕</Text>
          <View style={styles.syllableBubble}><Text style={styles.syllableBubbleText}>NE</Text></View>
        </View>

        <TouchableOpacity 
          style={styles.listenTutorBtn}
          onPress={() => speak("B. A. fait Ba. N. A. fait Na. N. E. fait Ne. Ba-na-ne !")}
        >
          <Text style={styles.listenTutorBtnText}>🔊 Écouter le découpage syllabique lent</Text>
        </TouchableOpacity>

        <View style={styles.readingTrickBox}>
          <Text style={styles.trickTitle}>💡 Règle de lecture :</Text>
          <Text style={styles.trickText}>
            Chaque syllabe commence par la consonne qui guide la bouche, suivie de la voyelle qui fait sonner la voix !
          </Text>
        </View>
      </View>
    </View>
  );

  // 3. Science Tutor (Controlled Experiments, Cause & Effect)
  const renderScienceContent = () => (
    <View style={styles.tutorBody}>
      <View style={styles.modeCard}>
        <Text style={styles.stepHeader}>Méthode Scientifique : Plante avec ou sans Lumière</Text>
        
        <View style={styles.scienceSimulationBox}>
          <View style={styles.simPlantItem}>
            <Text style={{ fontSize: 45 }}>☀️🪴</Text>
            <Text style={styles.simPlantLabel}>Avec Soleil : Plante verte et forte</Text>
          </View>

          <View style={styles.simPlantItem}>
            <Text style={{ fontSize: 45 }}>🌑🥀</Text>
            <Text style={styles.simPlantLabel}>Dans le noir : Feuilles jaunes et flétries</Text>
          </View>
        </View>

        <Text style={styles.explanationDesc}>
          La plante utilise la lumière du soleil pour fabriquer sa propre sève verte (la chlorophylle). Sans soleil, elle ne peut pas se nourrir !
        </Text>
      </View>
    </View>
  );

  const isMath = question.type?.includes('ADD') || question.type?.includes('MATH') || question.type?.includes('COUNT') || question.type?.includes('ROBOT');
  const isScience = question.type?.includes('SCI') || question.type?.includes('HABITAT') || question.type?.includes('GARDEN') || question.type?.includes('LIVING');

  return (
    <View style={styles.overlay}>
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Text style={{ fontSize: 32 }}>🦉</Text>
            <View>
              <Text style={styles.headerTitle}>Le Hibou Tuteur Pédagogique</Text>
              <Text style={styles.headerSubtitle}>Explication animée étape par étape</Text>
            </View>
          </View>

          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Text style={styles.closeBtnText}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Speed toggle */}
        <View style={styles.speedRow}>
          <TouchableOpacity 
            style={[styles.speedToggle, isSlowSpeech && styles.speedToggleActive]} 
            onPress={() => setIsSlowSpeech(!isSlowSpeech)}
          >
            <Text style={styles.speedToggleText}>🐢 Voix lente {isSlowSpeech ? 'ACTIVÉE' : 'DÉSACTIVÉE'}</Text>
          </TouchableOpacity>
        </View>

        {/* Scrollable pedagogical body */}
        <ScrollView style={styles.scrollArea}>
          {isMath ? renderMathContent() : isScience ? renderScienceContent() : renderReadingContent()}
        </ScrollView>

        {/* Action Buttons */}
        <View style={styles.actionsFooter}>
          <TouchableOpacity 
            style={styles.practiceTransferBtn}
            onPress={() => {
              onClose();
              if (onPracticeSimilar) onPracticeSimilar();
            }}
          >
            <Text style={styles.practiceTransferBtnText}>🎯 Pratiquer un NOUVEL exercice similaire !</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.8)', justifyContent: 'center', alignItems: 'center', padding: 16, zIndex: 1000 },
  card: { backgroundColor: 'white', borderRadius: 28, padding: 22, width: '100%', maxWidth: 540, maxHeight: '90%', elevation: 12 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  headerTitle: { fontSize: 19, fontWeight: 'bold', color: '#1E3A8A' },
  headerSubtitle: { fontSize: 12, color: '#64748B' },
  closeBtn: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#F1F5F9', alignItems: 'center', justifyContent: 'center' },
  closeBtnText: { fontSize: 16, fontWeight: 'bold', color: '#64748B' },

  speedRow: { flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 10 },
  speedToggle: { paddingVertical: 4, paddingHorizontal: 10, borderRadius: 12, backgroundColor: '#F1F5F9', borderWidth: 1, borderColor: '#CBD5E1' },
  speedToggleActive: { backgroundColor: '#FEF3C7', borderColor: '#F59E0B' },
  speedToggleText: { fontSize: 11, fontWeight: 'bold', color: '#78350F' },

  scrollArea: { marginBottom: 15 },
  tutorBody: { gap: 14 },

  modeTabsRow: { flexDirection: 'row', gap: 6, flexWrap: 'wrap', marginBottom: 10 },
  modeTab: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 14, backgroundColor: '#F1F5F9' },
  modeTabActive: { backgroundColor: '#3B82F6' },
  modeTabText: { fontSize: 12, fontWeight: 'bold', color: '#475569' },
  modeTabTextActive: { color: 'white' },

  modeCard: { backgroundColor: '#F8FAFC', padding: 16, borderRadius: 20, borderWidth: 2, borderColor: '#E2E8F0' },
  stepHeader: { fontSize: 16, fontWeight: 'bold', color: '#0F172A', marginBottom: 12 },

  // Base 10 visual blocks
  concreteBlocksRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 16 },
  numberDecomp: { alignItems: 'center', backgroundColor: 'white', padding: 10, borderRadius: 14, borderWidth: 1, borderColor: '#E2E8F0', width: 140 },
  numberDecompLabel: { fontSize: 24, fontWeight: 'bold', color: '#1E40AF', marginBottom: 6 },
  rodsContainer: { flexDirection: 'row', gap: 4, alignItems: 'flex-end', minHeight: 60, marginBottom: 6 },
  tenRodVisual: { width: 10, height: 50, backgroundColor: '#3B82F6', borderRadius: 3 },
  cubesGrid: { flexDirection: 'row', flexWrap: 'wrap', width: 35, gap: 3 },
  unitCubeVisual: { width: 9, height: 9, backgroundColor: '#F59E0B', borderRadius: 2 },
  decompText: { fontSize: 11, color: '#64748B', fontWeight: 'bold' },
  plusSymbol: { fontSize: 24 },

  explanationBox: { backgroundColor: '#EFF6FF', padding: 12, borderRadius: 14, borderWidth: 1, borderColor: '#BFDBFE' },
  explanationTitle: { fontSize: 14, fontWeight: 'bold', color: '#1E40AF', marginBottom: 4 },
  explanationDesc: { fontSize: 13, color: '#334155', lineHeight: 20 },

  // Interactive Regrouping
  instructionText: { fontSize: 13, color: '#475569', marginBottom: 12 },
  interactiveRegroupArea: { alignItems: 'center', marginVertical: 12 },
  fusionButton: { backgroundColor: '#FEF3C7', padding: 18, borderRadius: 20, borderWidth: 2, borderColor: '#F59E0B', alignItems: 'center' },
  fusionBtnText: { color: '#B45309', fontWeight: 'bold', fontSize: 15, marginTop: 6 },
  fusedResultBox: { backgroundColor: '#DCFCE7', padding: 16, borderRadius: 20, borderWidth: 2, borderColor: '#22C55E', alignItems: 'center' },
  fusedResultText: { color: '#15803D', fontWeight: 'bold', fontSize: 14, marginTop: 4 },
  finalTotalBig: { fontSize: 15, fontWeight: 'bold', color: '#1E293B', textAlign: 'center', marginTop: 12 },

  // Tricks
  trickBox: { backgroundColor: '#FFFBEB', padding: 14, borderRadius: 16, borderWidth: 2, borderColor: '#FDE68A', marginBottom: 10 },
  trickFormula: { fontSize: 16, fontWeight: 'bold', color: '#B45309', marginVertical: 2 },
  trickFormulaFinal: { fontSize: 18, fontWeight: 'bold', color: '#15803D', marginTop: 4 },
  trickExplain: { fontSize: 13, color: '#64748B', lineHeight: 20 },

  // Reading
  syllableDemoRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, marginVertical: 12 },
  syllableBubble: { backgroundColor: '#EEF2FF', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 16, borderWidth: 2, borderColor: '#6366F1' },
  syllableBubbleText: { fontSize: 24, fontWeight: 'bold', color: '#4338CA' },
  listenTutorBtn: { backgroundColor: '#FEF3C7', padding: 12, borderRadius: 14, alignItems: 'center', borderWidth: 1, borderColor: '#F59E0B', marginVertical: 10 },
  listenTutorBtnText: { color: '#92400E', fontWeight: 'bold', fontSize: 13 },
  readingTrickBox: { backgroundColor: '#F0FDF4', padding: 12, borderRadius: 14, borderWidth: 1, borderColor: '#86EFAC' },
  trickTitle: { fontSize: 13, fontWeight: 'bold', color: '#166534', marginBottom: 2 },
  trickText: { fontSize: 12, color: '#14532D', lineHeight: 18 },

  // Science
  scienceSimulationBox: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 12 },
  simPlantItem: { alignItems: 'center', width: 140, backgroundColor: 'white', padding: 10, borderRadius: 14, borderWidth: 1, borderColor: '#CBD5E1' },
  simPlantLabel: { fontSize: 11, fontWeight: 'bold', color: '#334155', textAlign: 'center', marginTop: 6 },

  // Actions
  actionsFooter: { gap: 10 },
  practiceTransferBtn: { backgroundColor: '#10B981', paddingVertical: 14, borderRadius: 16, alignItems: 'center', elevation: 3 },
  practiceTransferBtnText: { color: 'white', fontWeight: 'bold', fontSize: 15 }
});
