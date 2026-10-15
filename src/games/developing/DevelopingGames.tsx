import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import * as Speech from 'expo-speech';

// --- GAME 31: MULTIPLICATION BATTLE ---
export function MultiplicationBattle({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const rows = question.rows || 4;
  const cols = question.cols || 3;
  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>⚔️ La Bataille des Multiplications</Text>
      <Text style={styles.promptText}>Lance l'attaque en calculant l'armée de {rows} rangées de {cols} guerriers :</Text>

      <View style={styles.armyGrid}>
        {Array.from({ length: rows }).map((_, r) => (
          <View key={r} style={styles.armyRow}>
            {Array.from({ length: cols }).map((_, c) => (
              <Text key={c} style={{ fontSize: 28 }}>🛡️</Text>
            ))}
          </View>
        ))}
      </View>
      <Text style={styles.battleEquation}>{rows} × {cols} = ?</Text>

      <View style={styles.optionsRow}>
        {(question.options || ['10', '12', '14', '16']).map((opt: string) => (
          <TouchableOpacity key={opt} style={styles.choiceBtn} onPress={() => onAnswer(opt)}>
            <Text style={styles.choiceBtnText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// --- GAME 32: DIVISION PIZZA SHOP ---
export function DivisionPizzaShop({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const slices = question.slices || 12;
  const friends = question.friends || 3;
  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>🍕 La Pizzeria du Partage</Text>
      <Text style={styles.promptText}>Partage équitablement {slices} parts de pizza entre {friends} amis :</Text>

      <View style={styles.pizzaBoxCard}>
        <Text style={{ fontSize: 60 }}>🍕</Text>
        <Text style={styles.pizzaSub}>{slices} parts ÷ {friends} enfants</Text>
      </View>

      <View style={styles.optionsRow}>
        {(question.options || ['3', '4', '5', '6']).map((opt: string) => (
          <TouchableOpacity key={opt} style={styles.choiceBtn} onPress={() => onAnswer(opt)}>
            <Text style={styles.choiceBtnText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// --- GAME 33: FRACTION CHEF ---
export function FractionChef({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const targetFraction = question.targetFraction || question.ans || '1/2';
  const [totalSlices, setTotalSlices] = useState<number>(4);
  const [selectedSlices, setSelectedSlices] = useState<number[]>([]);
  const [knifeActive, setKnifeActive] = useState<boolean>(false);

  const handleCutCake = (cuts: number) => {
    setTotalSlices(cuts);
    setSelectedSlices([]);
    setKnifeActive(true);
    Speech.speak(`Gâteau découpé en ${cuts} parts égales !`, { language: 'fr-FR' });
    setTimeout(() => setKnifeActive(false), 500);
  };

  const toggleSlice = (idx: number) => {
    if (selectedSlices.includes(idx)) {
      setSelectedSlices(selectedSlices.filter(i => i !== idx));
    } else {
      setSelectedSlices([...selectedSlices, idx]);
    }
  };

  const handleServe = () => {
    const fractionStr = `${selectedSlices.length}/${totalSlices}`;
    Speech.speak(`Part servie : ${selectedSlices.length} sur ${totalSlices} !`, { language: 'fr-FR' });
    onAnswer(fractionStr);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>👨‍🍳 Le Chef des Fractions</Text>
      <Text style={styles.promptText}>
        Prépare la commande du client en servant la fraction <Text style={{ color: '#D97706', fontWeight: 'bold' }}>{targetFraction}</Text> :
      </Text>

      {/* Bakery Kitchen Table & Cake Slicing Plate */}
      <View style={styles.bakeryTable}>
        <View style={styles.chefHeaderRow}>
          <Text style={{ fontSize: 36 }}>👨‍🍳</Text>
          <View style={styles.chefOrderBadge}>
            <Text style={styles.chefOrderText}>Commande : {targetFraction}</Text>
          </View>
          <Text style={{ fontSize: 24 }}>{knifeActive ? '🔪 ✨' : '🥧'}</Text>
        </View>

        {/* Tactile Cake with Clickable Slices */}
        <View style={styles.cakeDisplayArea}>
          <View style={styles.cakePieContainer}>
            {Array.from({ length: totalSlices }).map((_, idx) => {
              const isSelected = selectedSlices.includes(idx);
              return (
                <TouchableOpacity
                  key={`slice_${idx}`}
                  style={[
                    styles.cakeSliceItem,
                    { width: `${Math.floor(100 / (totalSlices / 2)) - 4}%` },
                    isSelected && styles.cakeSliceItemSelected
                  ]}
                  onPress={() => toggleSlice(idx)}
                >
                  <Text style={styles.sliceNumberText}>{isSelected ? '🍰' : '🥧'}</Text>
                  <Text style={[styles.sliceFractionLabel, isSelected && { color: '#047857' }]}>
                    1/{totalSlices}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Interactive Knife Cutting Controls */}
        <View style={styles.cutToolsRow}>
          <Text style={styles.cutToolPrompt}>Couper en :</Text>
          {[2, 3, 4, 6].map(num => (
            <TouchableOpacity 
              key={num} 
              style={[styles.cutToolBtn, totalSlices === num && styles.cutToolBtnActive]}
              onPress={() => handleCutCake(num)}
            >
              <Text style={[styles.cutToolBtnText, totalSlices === num && styles.cutToolBtnTextActive]}>
                {num} parts
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Live Fraction Formula Display */}
        <View style={styles.fractionFormulaBox}>
          <Text style={styles.fractionNumeratorText}>
            Parts choisies : <Text style={{ fontWeight: 'bold', color: '#D97706' }}>{selectedSlices.length}</Text>
          </Text>
          <View style={styles.fractionBarDivider} />
          <Text style={styles.fractionDenominatorText}>
            Nombre total de parts : <Text style={{ fontWeight: 'bold', color: '#1E40AF' }}>{totalSlices}</Text>
          </Text>
        </View>

        <TouchableOpacity 
          style={[styles.servePlateBtn, selectedSlices.length > 0 && { backgroundColor: '#10B981' }]}
          onPress={handleServe}
        >
          <Text style={styles.servePlateBtnText}>
            🍽️ Servir la part ({selectedSlices.length}/{totalSlices})
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.directChoicePrompt}>Ou choisis directement la fraction correspondante :</Text>
      <View style={styles.optionsRow}>
        {(question.options || ['1/2', '1/3', '1/4', '3/4']).map((f: string) => (
          <TouchableOpacity key={f} style={styles.choiceBtn} onPress={() => onAnswer(f)}>
            <Text style={styles.choiceBtnText}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// --- GAME 34: GRAMMAR DETECTIVE ---
export function GrammarDetective({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const sentence = question.sentence || 'Les enfant joue dans la cour.';
  const errorWord = question.errorWord || 'joue';
  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>🕵️ Détective de Grammaire</Text>
      <Text style={styles.promptText}>Trouve l'erreur d'accord dans cette phrase :</Text>

      <View style={styles.caseFileCard}>
        <Text style={styles.caseSentence}>"{sentence}"</Text>
      </View>

      <View style={styles.optionsRow}>
        {(question.options || ['enfant (doit prendre un s)', 'joue (doit être jouent)', 'cour (mal orthographié)']).map((opt: string) => (
          <TouchableOpacity key={opt} style={styles.choiceCard} onPress={() => onAnswer(opt)}>
            <Text style={styles.choiceCardText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// --- GAME 35: VOCABULARY EXPLORER ---
export function VocabularyExplorer({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const word = question.word || 'Vigoureux';
  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>🧭 L'Explorateur de Vocabulaire</Text>
      <Text style={styles.promptText}>Quel est le synonyme du mot : <Text style={{ color: '#059669', fontWeight: 'bold' }}>"{word}"</Text> ?</Text>

      <View style={styles.vocabBadgeCard}>
        <Text style={styles.vocabBigText}>{word}</Text>
      </View>

      <View style={styles.optionsRow}>
        {(question.options || ['Fort et plein d\'énergie', 'Fatigué', 'Petit', 'Lent']).map((opt: string) => (
          <TouchableOpacity key={opt} style={styles.choiceCard} onPress={() => onAnswer(opt)}>
            <Text style={styles.choiceCardText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// --- GAME 36: READING MYSTERY ---
export function ReadingMystery({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const story = question.story || 'La nuit dernière à Bafoussam, un animal a laissé de grandes empreintes de griffes près de la plantation de bananes.';
  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>📜 Le Mystère de la Plantation</Text>
      <Text style={styles.promptText}>Déduis la réponse d'après le texte d'enquête :</Text>

      <View style={styles.mysteryScroll}>
        <Text style={styles.mysteryStoryText}>{story}</Text>
      </View>

      <Text style={styles.subtext}>Qui a pu laisser ces traces ?</Text>

      <View style={styles.optionsRow}>
        {(question.options || ['Une panthère / Léopard 🐆', 'Un poisson 🐟', 'Une colombe 🕊️', 'Un escargot 🐌']).map((opt: string) => (
          <TouchableOpacity key={opt} style={styles.choiceCard} onPress={() => onAnswer(opt)}>
            <Text style={styles.choiceCardText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// --- GAME 37: SCIENCE EXPERIMENT LAB ---
export function ScienceExperimentLab({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>🧪 Laboratoire d'Expériences</Text>
      <Text style={styles.promptText}>Expérience : Lequel de ces objets FLOTTE sur l'eau ?</Text>

      <View style={styles.waterTank}>
        <Text style={styles.waterSurface}>~~~~~~~~ Bassine d'Eau ~~~~~~~~</Text>
      </View>

      <View style={styles.optionsRow}>
        {(question.options || ['Un bouchon de liège / bois 🪵', 'Une pierre lourde 🪨', 'Une clé en fer 🔑', 'Une bille de verre 🔮']).map((opt: string) => (
          <TouchableOpacity key={opt} style={styles.choiceCard} onPress={() => onAnswer(opt)}>
            <Text style={styles.choiceCardText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// --- GAME 38: ECOSYSTEM BUILDER ---
export function EcosystemBuilder({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>🌿 Bâtisseur d'Écosystème</Text>
      <Text style={styles.promptText}>Complète la chaîne alimentaire de la savane :</Text>

      <View style={styles.chainRow}>
        <Text style={styles.chainLink}>🌱 Herbe</Text>
        <Text style={styles.chainArrow}>➔</Text>
        <Text style={styles.chainLink}>🦓 Gazelle</Text>
        <Text style={styles.chainArrow}>➔</Text>
        <Text style={[styles.chainLink, { borderColor: '#EF4444' }]}>❓</Text>
      </View>

      <View style={styles.optionsRow}>
        {(question.options || ['Lion 🦁', 'Papillon 🦋', 'Arbre 🌳', 'Chenille 🐛']).map((opt: string) => (
          <TouchableOpacity key={opt} style={styles.choiceBtn} onPress={() => onAnswer(opt)}>
            <Text style={styles.choiceBtnText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// --- GAME 39: GEOMETRY ARCHITECT ---
export function GeometryArchitect({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>📐 L'Architecte Géomètre</Text>
      <Text style={styles.promptText}>Quel solide géométrique a 6 faces carrées égales ?</Text>

      <View style={styles.architectSolidBox}>
        <Text style={{ fontSize: 60 }}>🎲</Text>
      </View>

      <View style={styles.optionsRow}>
        {(question.options || ['Le Cube', 'La Sphère', 'Le Cylindre', 'La Pyramide']).map((opt: string) => (
          <TouchableOpacity key={opt} style={styles.choiceCard} onPress={() => onAnswer(opt)}>
            <Text style={styles.choiceCardText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// --- GAME 40: MEASUREMENT CHALLENGE ---
export function MeasurementChallenge({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>⚖️ Le Défi des Mesures</Text>
      <Text style={styles.promptText}>Combien pèse environ un sac de manioc au marché ?</Text>

      <View style={styles.scaleCard}>
        <Text style={{ fontSize: 50 }}>⚖️🥔</Text>
      </View>

      <View style={styles.optionsRow}>
        {(question.options || ['50 Kilogrammes (kg)', '50 Grammes (g)', '50 Milligrammes (mg)']).map((opt: string) => (
          <TouchableOpacity key={opt} style={styles.choiceCard} onPress={() => onAnswer(opt)}>
            <Text style={styles.choiceCardText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// --- GAME 41: MEMORY MAZE ---
export function MemoryMaze({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const steps = question.steps || ['⬆️ Nord', '➡️ Est', '⬆️ Nord'];
  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>🌀 Le Labyrinthe de la Mémoire</Text>
      <Text style={styles.promptText}>Mémorise le chemin magique pour traverser le labyrinthe :</Text>

      <View style={styles.mazePathBox}>
        <Text style={styles.mazePathText}>{steps.join('  ➔  ')}</Text>
      </View>

      <View style={styles.optionsRow}>
        {(question.options || ['⬆️, ➡️, ⬆️', '⬇️, ⬅️, ⬇️', '➡️, ➡️, ⬆️']).map((opt: string) => (
          <TouchableOpacity key={opt} style={styles.choiceCard} onPress={() => onAnswer(opt)}>
            <Text style={styles.choiceCardText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// --- GAME 42: WORD SCRAMBLE ADVENTURE ---
export function WordScrambleAdventure({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const scrambled = question.scrambled || 'B A O B A B';
  const ans = question.ans || 'BAOBAB';
  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>🔤 Les Lettres en Pagaille</Text>
      <Text style={styles.promptText}>Remets les lettres dans le bon ordre pour trouver le grand arbre d'Afrique :</Text>

      <View style={styles.scrambleBox}>
        <Text style={styles.scrambleText}>{scrambled}</Text>
      </View>

      <View style={styles.optionsRow}>
        {(question.options || ['BAOBAB', 'BANANE', 'BATEAU', 'BALLON']).map((opt: string) => (
          <TouchableOpacity key={opt} style={styles.choiceCard} onPress={() => onAnswer(opt)}>
            <Text style={styles.choiceCardText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// --- GAME 43: WATER CYCLE JOURNEY ---
export function WaterCycleJourney({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>💧 Le Voyage de la Goutte d'Eau</Text>
      <Text style={styles.promptText}>Sous la chaleur du soleil, l'eau du fleuve Wouri se transforme en vapeur : c'est...</Text>

      <View style={styles.waterCycleBox}>
        <Text style={{ fontSize: 50 }}>☀️🌊➔☁️</Text>
      </View>

      <View style={styles.optionsRow}>
        {(question.options || ['L\'Évaporation', 'La Précipitation', 'La Congélation', 'L\'Infiltration']).map((opt: string) => (
          <TouchableOpacity key={opt} style={styles.choiceCard} onPress={() => onAnswer(opt)}>
            <Text style={styles.choiceCardText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// --- GAME 44: MATH ESCAPE ROOM ---
export function MathEscapeRoom({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const codeClue = question.clue || 'Le double de 15, plus 10 = ?';
  const targetCode = question.ans || '40';
  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>🔐 L'Escape Room Mathématique</Text>
      <Text style={styles.promptText}>Trouve le code secret pour déverrouiller la porte blindée :</Text>

      <View style={styles.escapePadCard}>
        <Text style={styles.escapeClueText}>{codeClue}</Text>
      </View>

      <View style={styles.optionsRow}>
        {(question.options || ['30', '40', '50', '25']).map((code: string) => (
          <TouchableOpacity key={code} style={styles.choiceBtn} onPress={() => onAnswer(code)}>
            <Text style={styles.choiceBtnText}>{code}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// --- GAME 45: MAP EXPLORER ---
export function MapExplorer({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>🧭 L'Explorateur de la Carte</Text>
      <Text style={styles.promptText}>La ville de Maroua et le parc de Waza se trouvent dans quelle direction du Cameroun ?</Text>

      <View style={styles.compassBox}>
        <Text style={{ fontSize: 45 }}>🧭 NORD</Text>
      </View>

      <View style={styles.optionsRow}>
        {(question.options || ['Au Grand Nord', 'Au Sud vers la mer', 'À l\'Ouest', 'À l\'Est']).map((opt: string) => (
          <TouchableOpacity key={opt} style={styles.choiceCard} onPress={() => onAnswer(opt)}>
            <Text style={styles.choiceCardText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 15, width: '100%' },
  gameTitle: { fontSize: 22, fontWeight: 'bold', color: '#1E3A8A', marginBottom: 6 },
  promptText: { fontSize: 16, color: '#334155', textAlign: 'center', marginBottom: 20 },
  subtext: { fontSize: 14, color: '#64748B', marginBottom: 12 },

  // Battle
  armyGrid: { backgroundColor: '#EFF6FF', padding: 15, borderRadius: 20, borderWidth: 2, borderColor: '#BFDBFE', marginBottom: 15 },
  armyRow: { flexDirection: 'row', gap: 10, marginVertical: 3 },
  battleEquation: { fontSize: 26, fontWeight: 'bold', color: '#1E40AF', marginBottom: 20 },

  // Pizza Shop
  pizzaBoxCard: { backgroundColor: '#FFFBEB', padding: 16, borderRadius: 24, borderWidth: 3, borderColor: '#FDE68A', alignItems: 'center', width: 170, marginBottom: 20 },
  pizzaSub: { fontSize: 14, fontWeight: 'bold', color: '#78350F', marginTop: 4 },

  // Fraction Chef
  bakeryTable: { backgroundColor: '#F0FDF4', padding: 16, borderRadius: 24, borderWidth: 3, borderColor: '#86EFAC', width: '100%', maxWidth: 420, alignItems: 'center', marginBottom: 16 },
  chefHeaderRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: 10 },
  chefOrderBadge: { backgroundColor: '#FEF3C7', paddingVertical: 6, paddingHorizontal: 14, borderRadius: 14, borderWidth: 1, borderColor: '#F59E0B' },
  chefOrderText: { fontSize: 13, fontWeight: 'bold', color: '#92400E' },
  cakeDisplayArea: { width: '100%', backgroundColor: 'white', padding: 12, borderRadius: 18, borderWidth: 1, borderColor: '#DCFCE7', marginVertical: 8, alignItems: 'center' },
  cakePieContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, justifyContent: 'center', width: '100%' },
  cakeSliceItem: { backgroundColor: '#FEF08A', borderWidth: 2, borderColor: '#CA8A04', paddingVertical: 10, paddingHorizontal: 4, borderRadius: 12, alignItems: 'center', justifyContent: 'center', minHeight: 65 },
  cakeSliceItemSelected: { backgroundColor: '#BBF7D0', borderColor: '#16A34A', transform: [{ scale: 1.05 }] },
  sliceNumberText: { fontSize: 24 },
  sliceFractionLabel: { fontSize: 11, fontWeight: 'bold', color: '#78350F', marginTop: 2 },
  cutToolsRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginVertical: 10, flexWrap: 'wrap', justifyContent: 'center' },
  cutToolPrompt: { fontSize: 12, fontWeight: 'bold', color: '#166534' },
  cutToolBtn: { paddingVertical: 6, paddingHorizontal: 10, backgroundColor: 'white', borderRadius: 10, borderWidth: 1, borderColor: '#86EFAC' },
  cutToolBtnActive: { backgroundColor: '#16A34A', borderColor: '#15803D' },
  cutToolBtnText: { fontSize: 12, fontWeight: 'bold', color: '#166534' },
  cutToolBtnTextActive: { color: 'white' },
  fractionFormulaBox: { backgroundColor: '#EFF6FF', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 12, borderWidth: 1, borderColor: '#BFDBFE', alignItems: 'center', width: '100%', marginVertical: 8 },
  fractionNumeratorText: { fontSize: 13, color: '#1E293B' },
  fractionBarDivider: { height: 2, backgroundColor: '#94A3B8', width: '80%', marginVertical: 4 },
  fractionDenominatorText: { fontSize: 13, color: '#1E293B' },
  servePlateBtn: { backgroundColor: '#94A3B8', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 16, elevation: 3, marginTop: 4 },
  servePlateBtnText: { color: 'white', fontWeight: 'bold', fontSize: 14 },
  directChoicePrompt: { fontSize: 13, color: '#475569', fontWeight: 'bold', marginVertical: 8 },

  // Grammar Detective
  caseFileCard: { backgroundColor: '#FEF2F2', padding: 16, borderRadius: 20, borderWidth: 2, borderColor: '#FECACA', width: '100%', maxWidth: 420, alignItems: 'center', marginBottom: 20 },
  caseSentence: { fontSize: 18, fontWeight: 'bold', color: '#991B1B', textAlign: 'center' },

  // Vocab Explorer
  vocabBadgeCard: { backgroundColor: '#ECFDF5', paddingVertical: 18, paddingHorizontal: 36, borderRadius: 20, borderWidth: 3, borderColor: '#34D399', marginBottom: 20 },
  vocabBigText: { fontSize: 28, fontWeight: 'bold', color: '#065F46' },

  // Reading Mystery
  mysteryScroll: { backgroundColor: '#FFFBEB', padding: 16, borderRadius: 16, borderWidth: 2, borderColor: '#FDE68A', width: '100%', maxWidth: 440, marginBottom: 15 },
  mysteryStoryText: { fontSize: 15, color: '#78350F', lineHeight: 24 },

  // Science Lab
  waterTank: { width: '100%', maxWidth: 360, height: 70, backgroundColor: '#E0F2FE', borderRadius: 16, borderWidth: 2, borderColor: '#38BDF8', alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  waterSurface: { color: '#0284C7', fontWeight: 'bold' },

  // Ecosystem
  chainRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 20 },
  chainLink: { paddingVertical: 10, paddingHorizontal: 16, backgroundColor: '#F1F5F9', borderRadius: 14, borderWidth: 2, borderColor: '#CBD5E1', fontSize: 16, fontWeight: 'bold', color: '#1E293B' },
  chainArrow: { fontSize: 20, color: '#64748B' },

  // Architect
  architectSolidBox: { width: 130, height: 130, borderRadius: 24, backgroundColor: '#EFF6FF', alignItems: 'center', justifyContent: 'center', marginBottom: 20 },

  // Measurement
  scaleCard: { backgroundColor: '#F8FAFC', padding: 16, borderRadius: 20, borderWidth: 2, borderColor: '#E2E8F0', width: 140, alignItems: 'center', marginBottom: 20 },

  // Maze
  mazePathBox: { backgroundColor: '#EEF2FF', padding: 16, borderRadius: 16, borderWidth: 2, borderColor: '#C7D2FE', marginBottom: 20 },
  mazePathText: { fontSize: 20, fontWeight: 'bold', color: '#4338CA' },

  // Scramble
  scrambleBox: { backgroundColor: '#FEF3C7', paddingVertical: 16, paddingHorizontal: 32, borderRadius: 18, borderWidth: 2, borderColor: '#F59E0B', marginBottom: 20 },
  scrambleText: { fontSize: 26, fontWeight: 'bold', color: '#78350F', letterSpacing: 4 },

  // Water Cycle
  waterCycleBox: { backgroundColor: '#EFF6FF', padding: 16, borderRadius: 20, alignItems: 'center', width: 170, marginBottom: 20 },

  // Escape Room
  escapePadCard: { backgroundColor: '#0F172A', padding: 20, borderRadius: 20, width: '100%', maxWidth: 360, alignItems: 'center', marginBottom: 20 },
  escapeClueText: { color: '#22C55E', fontSize: 20, fontWeight: 'bold', fontFamily: 'monospace', textAlign: 'center' },

  // Compass
  compassBox: { backgroundColor: '#F8FAFC', padding: 16, borderRadius: 20, borderWidth: 2, borderColor: '#CBD5E1', width: 160, alignItems: 'center', marginBottom: 20 },

  // Common UI
  optionsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'center', width: '100%', maxWidth: 450 },
  choiceBtn: { paddingVertical: 14, paddingHorizontal: 24, backgroundColor: '#DBEAFE', borderRadius: 18, borderWidth: 3, borderColor: '#3B82F6', minWidth: 80, alignItems: 'center' },
  choiceBtnText: { fontSize: 26, fontWeight: 'bold', color: '#1E3A8A' },
  choiceCard: { padding: 16, backgroundColor: '#EFF6FF', borderRadius: 16, borderWidth: 2, borderColor: '#93C5FD', width: '100%', maxWidth: 380, alignItems: 'center', marginBottom: 8 },
  choiceCardText: { fontSize: 16, fontWeight: 'bold', color: '#1E40AF', textAlign: 'center' }
});
