import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import * as Speech from 'expo-speech';

// --- GAME 46: FRACTION SPACE MISSION ---
export function FractionSpaceMission({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const problem = question.problem || '2/5 + 1/5 = ?';
  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>🚀 Mission Spatiale des Fractions</Text>
      <Text style={styles.promptText}>Calcule le carburant de la fusée spatiale pour décoller :</Text>

      <View style={styles.rocketCard}>
        <Text style={{ fontSize: 60 }}>🚀✨</Text>
        <Text style={styles.fuelEquation}>{problem}</Text>
      </View>

      <View style={styles.optionsRow}>
        {(question.options || ['3/5', '3/10', '2/5', '1/5']).map((opt: string) => (
          <TouchableOpacity key={opt} style={styles.choiceBtn} onPress={() => onAnswer(opt)}>
            <Text style={styles.choiceBtnText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// --- GAME 47: DECIMAL RACING ---
export function DecimalRacing({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>🏎️ Grand Prix des Décimaux</Text>
      <Text style={styles.promptText}>Quel est le plus GRAND nombre décimal ?</Text>

      <View style={styles.optionsRow}>
        {(question.options || ['4,75', '4,8', '4,09', '4,65']).map((num: string) => (
          <TouchableOpacity key={num} style={styles.choiceCard} onPress={() => onAnswer(num)}>
            <Text style={styles.choiceCardText}>⚡ {num}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// --- GAME 48: BUDGET TYCOON ---
export function BudgetTycoon({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const budget = question.budget || '50 000 FCFA';
  const expense = question.expense || 'Dépenses : 32 000 FCFA';
  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>💼 Gestionnaire de Budget (CFA)</Text>
      <Text style={styles.promptText}>Revenu : {budget}. {expense}. Combien reste-t-il pour l'épargne ?</Text>

      <View style={styles.tycoonCard}>
        <Text style={{ fontSize: 50 }}>🏦💰</Text>
        <Text style={styles.tycoonBalance}>Budget familial mensuel</Text>
      </View>

      <View style={styles.optionsRow}>
        {(question.options || ['18 000 FCFA', '15 000 FCFA', '22 000 FCFA', '12 000 FCFA']).map((opt: string) => (
          <TouchableOpacity key={opt} style={styles.choiceCard} onPress={() => onAnswer(opt)}>
            <Text style={styles.choiceCardText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// --- GAME 49: SCIENCE DISCOVERY QUEST ---
export function ScienceDiscoveryQuest({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>🔬 Grande Enquête Scientifique</Text>
      <Text style={styles.promptText}>Comment appelle-t-on la fabrication de nourriture par les feuilles vertes grâce au soleil ?</Text>

      <View style={styles.scienceBadge}>
        <Text style={{ fontSize: 55 }}>🌿☀️🧬</Text>
      </View>

      <View style={styles.optionsRow}>
        {(question.options || ['La Photosynthèse', 'La Respiration', 'La Fermentation', 'La Digestion']).map((opt: string) => (
          <TouchableOpacity key={opt} style={styles.choiceCard} onPress={() => onAnswer(opt)}>
            <Text style={styles.choiceCardText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// --- GAME 50: READING DETECTIVE AGENCY ---
export function ReadingDetectiveAgency({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const passage = question.passage || 'Le mont Cameroun culmine à 4 095 mètres d\'altitude au-dessus du golfe de Guinée. Ses pentes fertiles abritent des plantations de thé et des forêts luxuriantes.';
  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>🔍 Agence des Détectives Littéraires</Text>
      <Text style={styles.promptText}>Analyse ce passage géographique :</Text>

      <View style={styles.readingPassageBox}>
        <Text style={styles.passageContent}>{passage}</Text>
      </View>

      <Text style={styles.subtext}>{question.q || 'Quelle culture importante pousse sur les pentes du mont Cameroun ?'}</Text>

      <View style={styles.optionsRow}>
        {(question.options || ['Le Thé ☕', 'Le Blé 🌾', 'Le Pommier 🍏', 'Le Coton 👕']).map((opt: string) => (
          <TouchableOpacity key={opt} style={styles.choiceCard} onPress={() => onAnswer(opt)}>
            <Text style={styles.choiceCardText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// --- GAME 51: LOGIC LABYRINTH ---
export function LogicLabyrinth({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>🧩 Le Labyrinthe Logique</Text>
      <Text style={styles.promptText}>Musa est plus âgé que Junior. Junior est plus âgé que Paul. Qui est le plus jeune ?</Text>

      <View style={styles.logicCard}>
        <Text style={styles.logicDeduction}>Musa &gt; Junior &gt; Paul</Text>
      </View>

      <View style={styles.optionsRow}>
        {(question.options || ['Paul', 'Junior', 'Musa', 'Ils ont le même âge']).map((opt: string) => (
          <TouchableOpacity key={opt} style={styles.choiceCard} onPress={() => onAnswer(opt)}>
            <Text style={styles.choiceCardText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// --- GAME 52: GEOMETRY CONSTRUCTION SITE ---
export function GeometryConstructionSite({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const l = question.length || 10;
  const w = question.width || 6;
  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>🏗️ Chantier de Construction Géométrique</Text>
      <Text style={styles.promptText}>Un terrain rectangulaire mesure {l} m de long et {w} m de large. Quel est son périmètre ?</Text>

      <View style={styles.geoBlueprint}>
        <Text style={styles.blueprintText}>P = 2 × ({l} + {w})</Text>
      </View>

      <View style={styles.optionsRow}>
        {(question.options || ['32 mètres', '60 mètres', '16 mètres', '40 mètres']).map((opt: string) => (
          <TouchableOpacity key={opt} style={styles.choiceCard} onPress={() => onAnswer(opt)}>
            <Text style={styles.choiceCardText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// --- GAME 53: GRAMMAR KINGDOM ---
export function GrammarKingdom({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>👑 Le Royaume de la Grammaire</Text>
      <Text style={styles.promptText}>Conjugue au passé composé : "Hier, nous (visiter) les chutes de la Lobé à Kribi."</Text>

      <View style={styles.grammarKingdomCard}>
        <Text style={styles.grammarTargetVerb}>Verbe : VISITER</Text>
      </View>

      <View style={styles.optionsRow}>
        {(question.options || ['avons visité', 'sommes visité', 'visitions', 'visiterons']).map((opt: string) => (
          <TouchableOpacity key={opt} style={styles.choiceCard} onPress={() => onAnswer(opt)}>
            <Text style={styles.choiceCardText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// --- GAME 54: WORD MEANING DUEL ---
export function WordMeaningDuel({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>⚔️ Le Duel du Sens des Mots</Text>
      <Text style={styles.promptText}>Que signifie l'expression : "Avoir le cœur sur la main" ?</Text>

      <View style={styles.idiomCard}>
        <Text style={{ fontSize: 50 }}>🤲❤️</Text>
      </View>

      <View style={styles.optionsRow}>
        {(question.options || ['Être très généreux et bienveillant', 'Avoir une blessure à la main', 'Avoir peur', 'Être en colère']).map((opt: string) => (
          <TouchableOpacity key={opt} style={styles.choiceCard} onPress={() => onAnswer(opt)}>
            <Text style={styles.choiceCardText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// --- GAME 55: DATA DETECTIVE ---
export function DataDetective({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>📊 Détective des Graphiques & Données</Text>
      <Text style={styles.promptText}>Pluviométrie annuelle : Douala (4 000 mm) vs Garoua (1 000 mm). Combien de pluie Douala reçoit-elle en plus ?</Text>

      <View style={styles.chartPreview}>
        <View style={styles.barItem}><Text style={styles.barLabel}>Douala</Text><View style={[styles.barVisual, { height: 70, backgroundColor: '#3B82F6' }]} /></View>
        <View style={styles.barItem}><Text style={styles.barLabel}>Garoua</Text><View style={[styles.barVisual, { height: 25, backgroundColor: '#F59E0B' }]} /></View>
      </View>

      <View style={styles.optionsRow}>
        {(question.options || ['3 000 mm de plus', '2 000 mm de plus', '4 000 mm de plus', '5 000 mm']).map((opt: string) => (
          <TouchableOpacity key={opt} style={styles.choiceCard} onPress={() => onAnswer(opt)}>
            <Text style={styles.choiceCardText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// --- GAME 56: MATH STRATEGY TOWER ---
export function MathStrategyTower({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const challenge = question.challenge || '25 × 4 + 50 = ?';
  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>🗼 La Tour des Mages Mathématiciens</Text>
      <Text style={styles.promptText}>Résous cette chaîne de calcul mental pour monter au sommet :</Text>

      <View style={styles.towerCard}>
        <Text style={styles.towerEquation}>{challenge}</Text>
      </View>

      <View style={styles.optionsRow}>
        {(question.options || ['150', '125', '100', '200']).map((opt: string) => (
          <TouchableOpacity key={opt} style={styles.choiceBtn} onPress={() => onAnswer(opt)}>
            <Text style={styles.choiceBtnText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// --- GAME 57: PLANET EXPLORER ---
export function PlanetExplorer({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>🪐 Explorateur du Système Solaire</Text>
      <Text style={styles.promptText}>Quelle planète est la plus proche du Soleil ?</Text>

      <View style={styles.planetCard}>
        <Text style={{ fontSize: 60 }}>☀️🪐</Text>
      </View>

      <View style={styles.optionsRow}>
        {(question.options || ['Mercure', 'Vénus', 'La Terre', 'Jupiter']).map((opt: string) => (
          <TouchableOpacity key={opt} style={styles.choiceCard} onPress={() => onAnswer(opt)}>
            <Text style={styles.choiceCardText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// --- GAME 58: STORY CREATOR ---
export function StoryCreator({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>✍️ Le Créateur d'Histoires</Text>
      <Text style={styles.promptText}>Choisis la conclusion morale idéale pour ce conte de la Tortue et du Lièvre :</Text>

      <View style={styles.storyMoralBox}>
        <Text style={styles.storyMoralText}>"Le lièvre s'était endormi confiant dans sa vitesse, tandis que la tortue avançait sans jamais s'arrêter..."</Text>
      </View>

      <View style={styles.optionsRow}>
        {(question.options || ['Rien ne sert de courir, il faut partir à point.', 'Il faut toujours dormir sous un arbre.', 'Les lièvres gagnent toujours.']).map((opt: string) => (
          <TouchableOpacity key={opt} style={styles.choiceCard} onPress={() => onAnswer(opt)}>
            <Text style={styles.choiceCardText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// --- GAME 59: VIRTUAL CLASSROOM CHALLENGE ---
export function VirtualClassroomChallenge({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>🎓 Défi de la Classe Virtuelle</Text>
      <Text style={styles.promptText}>Quelle est la capitale politique du Cameroun ?</Text>

      <View style={styles.quizPodium}>
        <Text style={{ fontSize: 50 }}>🇨🇲🏛️</Text>
      </View>

      <View style={styles.optionsRow}>
        {(question.options || ['Yaoundé', 'Douala', 'Garoua', 'Bafoussam']).map((opt: string) => (
          <TouchableOpacity key={opt} style={styles.choiceCard} onPress={() => onAnswer(opt)}>
            <Text style={styles.choiceCardText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// --- GAME 60: GRAND ADVENTURE ---
export function GrandAdventure({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>⭐ La Grande Aventure de Nateiva</Text>
      <Text style={styles.promptText}>Étape Finale : Combine Mathématiques, Lecture et Sciences pour remporter le Trophée d'Or d'Afrique Centrale !</Text>

      <View style={styles.trophyHero}>
        <Text style={{ fontSize: 75 }}>🏆✨</Text>
        <Text style={styles.trophyText}>Champion de l'Éducation CEMAC</Text>
      </View>

      <View style={styles.optionsRow}>
        {(question.options || ['Débloquer le Trophée d\'Or ! 🥇', 'Revoir mes leçons 📚']).map((opt: string) => (
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
  subtext: { fontSize: 14, color: '#64748B', marginBottom: 12, textAlign: 'center' },

  // Space
  rocketCard: { backgroundColor: '#0F172A', padding: 20, borderRadius: 24, alignItems: 'center', width: 220, marginBottom: 20 },
  fuelEquation: { color: '#38BDF8', fontSize: 24, fontWeight: 'bold', marginTop: 8 },

  // Tycoon
  tycoonCard: { backgroundColor: '#ECFDF5', padding: 16, borderRadius: 20, borderWidth: 3, borderColor: '#A7F3D0', alignItems: 'center', width: 180, marginBottom: 20 },
  tycoonBalance: { fontSize: 13, fontWeight: 'bold', color: '#047857', marginTop: 4 },

  // Science Quest
  scienceBadge: { width: 140, height: 140, borderRadius: 70, backgroundColor: '#F0FDF4', alignItems: 'center', justifyContent: 'center', marginBottom: 20 },

  // Reading Passage
  readingPassageBox: { backgroundColor: '#FFFBEB', padding: 16, borderRadius: 16, borderWidth: 2, borderColor: '#FDE68A', width: '100%', maxWidth: 450, marginBottom: 15 },
  passageContent: { fontSize: 15, color: '#78350F', lineHeight: 24 },

  // Logic
  logicCard: { backgroundColor: '#EEF2FF', padding: 16, borderRadius: 18, borderWidth: 2, borderColor: '#C7D2FE', marginBottom: 20 },
  logicDeduction: { fontSize: 22, fontWeight: 'bold', color: '#4338CA' },

  // Geometry Blueprint
  geoBlueprint: { backgroundColor: '#1E3A8A', paddingVertical: 16, paddingHorizontal: 32, borderRadius: 16, marginBottom: 20 },
  blueprintText: { color: 'white', fontSize: 22, fontWeight: 'bold', fontFamily: 'monospace' },

  // Grammar Kingdom
  grammarKingdomCard: { backgroundColor: '#FDF2F8', padding: 16, borderRadius: 18, borderWidth: 2, borderColor: '#F472B6', marginBottom: 20 },
  grammarTargetVerb: { fontSize: 20, fontWeight: 'bold', color: '#9D174D' },

  // Idiom
  idiomCard: { backgroundColor: '#EFF6FF', padding: 16, borderRadius: 20, alignItems: 'center', width: 140, marginBottom: 20 },

  // Chart
  chartPreview: { flexDirection: 'row', alignItems: 'flex-end', gap: 30, height: 100, backgroundColor: '#F8FAFC', padding: 15, borderRadius: 16, borderWidth: 2, borderColor: '#E2E8F0', marginBottom: 20 },
  barItem: { alignItems: 'center' },
  barVisual: { width: 45, borderRadius: 8, marginTop: 6 },
  barLabel: { fontSize: 12, fontWeight: 'bold', color: '#475569' },

  // Tower
  towerCard: { backgroundColor: '#7C3AED', paddingVertical: 18, paddingHorizontal: 36, borderRadius: 20, marginBottom: 20 },
  towerEquation: { color: 'white', fontSize: 28, fontWeight: 'bold' },

  // Planet
  planetCard: { width: 140, height: 140, borderRadius: 70, backgroundColor: '#020617', alignItems: 'center', justifyContent: 'center', marginBottom: 20 },

  // Moral
  storyMoralBox: { backgroundColor: '#F8FAFC', padding: 16, borderRadius: 18, borderWidth: 2, borderColor: '#CBD5E1', width: '100%', maxWidth: 440, marginBottom: 18 },
  storyMoralText: { fontSize: 15, color: '#334155', fontStyle: 'italic', lineHeight: 24 },

  // Podium
  quizPodium: { backgroundColor: '#EFF6FF', padding: 16, borderRadius: 20, alignItems: 'center', width: 140, marginBottom: 20 },

  // Trophy Hero
  trophyHero: { backgroundColor: '#FFFBEB', padding: 24, borderRadius: 28, borderWidth: 3, borderColor: '#FDE68A', alignItems: 'center', marginBottom: 20 },
  trophyText: { fontSize: 16, fontWeight: 'bold', color: '#B45309', marginTop: 8 },

  // Common UI
  optionsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'center', width: '100%', maxWidth: 450 },
  choiceBtn: { paddingVertical: 14, paddingHorizontal: 24, backgroundColor: '#DBEAFE', borderRadius: 18, borderWidth: 3, borderColor: '#3B82F6', minWidth: 80, alignItems: 'center' },
  choiceBtnText: { fontSize: 26, fontWeight: 'bold', color: '#1E3A8A' },
  choiceCard: { padding: 16, backgroundColor: '#EFF6FF', borderRadius: 16, borderWidth: 2, borderColor: '#93C5FD', width: '100%', maxWidth: 380, alignItems: 'center', marginBottom: 8 },
  choiceCardText: { fontSize: 16, fontWeight: 'bold', color: '#1E40AF', textAlign: 'center' }
});
