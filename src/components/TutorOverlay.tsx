import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import * as Speech from 'expo-speech';

interface TutorOverlayProps {
  question: any;
  onClose: () => void;
  onPracticeSimilar?: () => void;
}

export function TutorOverlay({ question, onClose, onPracticeSimilar }: TutorOverlayProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const speakStep = (text: string) => {
    Speech.stop();
    Speech.speak(text, { language: 'fr-FR', rate: 0.85 });
  };

  // Build specialized step-by-step pedagogy based on activity type
  const getTutorialContent = () => {
    const qType = question.type;

    if (qType === 'ADDITION_BUILDER' || qType === 'ANIMATED_REGROUPING') {
      const parts = (question.equation || '47 + 28 = ?').replace('?', '').split('+');
      const a = parseInt(parts[0]) || 47;
      const b = parseInt(parts[1]) || 28;
      const aTens = Math.floor(a / 10);
      const aOnes = a % 10;
      const bTens = Math.floor(b / 10);
      const bOnes = b % 10;
      const sumOnes = aOnes + bOnes;
      const total = a + b;

      return {
        title: '🧮 L\'Addition pas à pas avec Retenue',
        steps: [
          {
            title: 'Étape 1 : Séparer les Dizaines et les Unités',
            desc: `On décompose chaque nombre :\n• ${a} = ${aTens} dizaines et ${aOnes} unités\n• ${b} = ${bTens} dizaines et ${bOnes} unités`,
            visual: (
              <View style={styles.tutorVisualBox}>
                <Text style={styles.visualMathHighlight}>Dizaines : {aTens} + {bTens}  |  Unités : {aOnes} + {bOnes}</Text>
              </View>
            )
          },
          {
            title: 'Étape 2 : Additionner d\'abord les Unités',
            desc: `${aOnes} unités + ${bOnes} unités = ${sumOnes} unités.\n${sumOnes >= 10 ? `Attention ! ${sumOnes} dépasse 10 : on fabrique 1 NOUVELLE dizaine avec 10 unités, et il reste ${sumOnes % 10} unités !` : `Il reste ${sumOnes} unités.`}`,
            visual: (
              <View style={styles.tutorVisualBox}>
                <Text style={styles.visualRegroupText}>10 unités ➔ 1 Barre de Dix (Retenue = 1)</Text>
              </View>
            )
          },
          {
            title: 'Étape 3 : Additionner toutes les Dizaines',
            desc: `${aTens} dizaines + ${bTens} dizaines + 1 dizaine de retenue = ${Math.floor(total / 10)} dizaines.\nRésultat final : ${total} !`,
            visual: (
              <View style={[styles.tutorVisualBox, { backgroundColor: '#DCFCE7' }]}>
                <Text style={styles.visualAnswerBig}>Réponse : {total}</Text>
              </View>
            )
          }
        ]
      };
    }

    if (qType === 'MONEY_SHOP') {
      const price = question.price || 350;
      return {
        title: '🛒 Comment payer au Marché Camerounais',
        steps: [
          {
            title: 'Étape 1 : Regarde le prix demandé',
            desc: `L'article coûte ${price} Francs CFA. On doit rassembler la somme exacte ou donner un billet plus grand.`,
            visual: <Text style={styles.visualBigEmoji}>🏷️ {price} FCFA</Text>
          },
          {
            title: 'Étape 2 : Choisis les grosses pièces et billets',
            desc: `Pour faire ${price} FCFA, commence par les plus grandes valeurs : par exemple une pièce de 500F ou plusieurs pièces de 100F.`,
            visual: <Text style={styles.visualCoinsHighlight}>🪙 100F + 🪙 100F + 🪙 100F + 🪙 50F = {price}F</Text>
          },
          {
            title: 'Étape 3 : Vérifie la monnaie',
            desc: `Si tu donnes 500 FCFA pour un achat de ${price} FCFA, la vendeuse te rendra 500 - ${price} = ${500 - price} FCFA !`,
            visual: <Text style={styles.visualAnswerBig}>Monnaie rendue = {Math.max(0, 500 - price)} FCFA</Text>
          }
        ]
      };
    }

    if (qType === 'SYLLABLE_BUILDER' || qType === 'PHONEME_MATCH') {
      return {
        title: '📖 Décodage Phonétique des Syllabes',
        steps: [
          {
            title: 'Étape 1 : Écoute le premier son (Consonne)',
            desc: `La consonne donne le départ du son (Exemple : "Mmm" ou "Ppp").`,
            visual: <Text style={styles.visualBigEmoji}>👂 M...</Text>
          },
          {
            title: 'Étape 2 : Fais glisser la voyelle',
            desc: `En associant la voyelle (A, E, I, O, U), la bouche change de forme et forme la syllabe : M + A = MA !`,
            visual: <Text style={styles.visualAnswerBig}>M + A = MA</Text>
          },
          {
            title: 'Étape 3 : Réunis les syllabes pour lire le mot',
            desc: `MA + MAN = MAMAN. Bravo, tu sais lire le mot entier !`,
            visual: <Text style={styles.visualAnswerBig}>MAMAN ❤️</Text>
          }
        ]
      };
    }

    if (qType === 'LIVING_CLASSIFICATION' || qType === 'HABITAT_EXPLORER') {
      return {
        title: '🔬 Méthode d\'Observation Scientifique',
        steps: [
          {
            title: 'Étape 1 : Pose-toi les 3 questions magiques',
            desc: `1. Est-ce que ça respire ?\n2. Est-ce que ça grandit ?\n3. Est-ce que ça a besoin de manger ?`,
            visual: <Text style={styles.visualBigEmoji}>❓🌱🐕</Text>
          },
          {
            title: 'Étape 2 : Conclusion scientifique',
            desc: `Si oui, c'est un ÊTRE VIVANT ! Si c'est un objet fabriqué par l'humain ou un minéral, c'est NON-VIVANT.`,
            visual: <Text style={styles.visualAnswerBig}>Vivant vs Non-Vivant</Text>
          }
        ]
      };
    }

    // Default universal tutor
    return {
      title: '🦉 Le Hibou Tuteur t\'aide !',
      steps: [
        {
          title: 'Étape 1 : Bien comprendre la consigne',
          desc: question.q || 'Lis attentivement la question posée.',
          visual: <Text style={styles.visualBigEmoji}>💡</Text>
        },
        {
          title: 'Étape 2 : L\'indice secret',
          desc: question.hint || 'Prends ton temps et compte avec les doigts.',
          visual: <Text style={styles.visualAnswerBig}>Indice : {question.hint || 'Regarde les détails'}</Text>
        },
        {
          title: 'Étape 3 : La solution expliquée',
          desc: `La bonne réponse est : "${question.ans}". Retiens bien cette méthode pour la prochaine question !`,
          visual: <Text style={styles.visualAnswerBig}>Réponse : {question.ans}</Text>
        }
      ]
    };
  };

  const tutorial = getTutorialContent();
  const currentStep = tutorial.steps[currentStepIndex] || tutorial.steps[0];

  return (
    <View style={styles.overlay}>
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>{tutorial.title}</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeIconBtn}>
            <Text style={styles.closeIconText}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Step Indicator */}
        <View style={styles.stepIndicatorRow}>
          {tutorial.steps.map((_, i) => (
            <View 
              key={i} 
              style={[
                styles.stepDot, 
                i === currentStepIndex ? styles.stepDotActive : i < currentStepIndex ? styles.stepDotCompleted : styles.stepDotPending
              ]} 
            />
          ))}
        </View>

        <ScrollView style={styles.scrollContent}>
          <Text style={styles.stepTitle}>{currentStep.title}</Text>
          
          <View style={styles.visualContainer}>
            {currentStep.visual}
          </View>

          <Text style={styles.stepDescription}>{currentStep.desc}</Text>
        </ScrollView>

        <View style={styles.actionsFooter}>
          <TouchableOpacity 
            style={styles.listenBtn} 
            onPress={() => speakStep(`${currentStep.title}. ${currentStep.desc}`)}
          >
            <Text style={styles.listenBtnText}>🔊 Écouter l'explication</Text>
          </TouchableOpacity>

          <View style={styles.navRow}>
            {currentStepIndex > 0 && (
              <TouchableOpacity 
                style={styles.navPrevBtn} 
                onPress={() => setCurrentStepIndex(currentStepIndex - 1)}
              >
                <Text style={styles.navBtnText}>⬅️ Précédent</Text>
              </TouchableOpacity>
            )}

            {currentStepIndex < tutorial.steps.length - 1 ? (
              <TouchableOpacity 
                style={styles.navNextBtn} 
                onPress={() => setCurrentStepIndex(currentStepIndex + 1)}
              >
                <Text style={styles.navBtnText}>Suivant ➡️</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity 
                style={styles.finishBtn} 
                onPress={onPracticeSimilar || onClose}
              >
                <Text style={styles.finishBtnText}>🚀 Pratiquer un exercice similaire !</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    justifyContent: 'center', alignItems: 'center',
    padding: 16, zIndex: 1000
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 520,
    maxHeight: '85%',
    shadowColor: '#000', shadowOpacity: 0.25, shadowRadius: 20, elevation: 12
  },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#1E3A8A', flex: 1 },
  closeIconBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#F1F5F9', alignItems: 'center', justifyContent: 'center' },
  closeIconText: { fontSize: 18, fontWeight: 'bold', color: '#64748B' },

  stepIndicatorRow: { flexDirection: 'row', gap: 8, justifyContent: 'center', marginBottom: 20 },
  stepDot: { height: 6, borderRadius: 3, flex: 1 },
  stepDotActive: { backgroundColor: '#3B82F6' },
  stepDotCompleted: { backgroundColor: '#10B981' },
  stepDotPending: { backgroundColor: '#E2E8F0' },

  scrollContent: { marginBottom: 15 },
  stepTitle: { fontSize: 18, fontWeight: 'bold', color: '#0F172A', marginBottom: 12 },
  stepDescription: { fontSize: 16, color: '#334155', lineHeight: 26 },

  visualContainer: { marginVertical: 15, alignItems: 'center', justifyContent: 'center' },
  tutorVisualBox: { padding: 16, backgroundColor: '#EFF6FF', borderRadius: 16, borderWidth: 2, borderColor: '#93C5FD', width: '100%', alignItems: 'center' },
  visualMathHighlight: { fontSize: 17, fontWeight: 'bold', color: '#1E40AF' },
  visualRegroupText: { fontSize: 18, fontWeight: 'bold', color: '#B45309' },
  visualAnswerBig: { fontSize: 26, fontWeight: 'bold', color: '#15803D' },
  visualBigEmoji: { fontSize: 50 },
  visualCoinsHighlight: { fontSize: 18, fontWeight: 'bold', color: '#065F46' },

  actionsFooter: { gap: 10 },
  listenBtn: { backgroundColor: '#FEF3C7', paddingVertical: 12, borderRadius: 14, alignItems: 'center', borderWidth: 1, borderColor: '#F59E0B' },
  listenBtnText: { color: '#92400E', fontWeight: 'bold', fontSize: 15 },
  navRow: { flexDirection: 'row', gap: 10, marginTop: 4 },
  navPrevBtn: { flex: 1, backgroundColor: '#F1F5F9', paddingVertical: 14, borderRadius: 14, alignItems: 'center' },
  navNextBtn: { flex: 1, backgroundColor: '#3B82F6', paddingVertical: 14, borderRadius: 14, alignItems: 'center' },
  navBtnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  finishBtn: { flex: 2, backgroundColor: '#10B981', paddingVertical: 14, borderRadius: 14, alignItems: 'center' },
  finishBtnText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});
