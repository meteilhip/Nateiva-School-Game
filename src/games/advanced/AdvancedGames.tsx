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
// --- GAME 47: DECIMAL RACING (3-LANE GRAND PRIX SIMULATION) ---
export function DecimalRacing({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const options = question.options || ['4,75', '4,8', '4,09'];
  const targetGate = question.ans || '4,8';
  
  const [currentLane, setCurrentLane] = useState<number>(1); // 0: Left, 1: Center, 2: Right
  const [speed, setSpeed] = useState<number>(85);
  const [isBoosting, setIsBoosting] = useState<boolean>(false);
  const [distanceToCheckpoint, setDistanceToCheckpoint] = useState<number>(60);
  const [lapCompleted, setLapCompleted] = useState<boolean>(false);

  // Steer left
  const handleSteerLeft = () => {
    setCurrentLane(lane => Math.max(0, lane - 1));
    Speech.speak('Virage à gauche !', { language: 'fr-FR' });
  };

  // Steer right
  const handleSteerRight = () => {
    setCurrentLane(lane => Math.min(2, lane + 1));
    Speech.speak('Virage à droite !', { language: 'fr-FR' });
  };

  // Turbo boost
  const handleTurbo = () => {
    setIsBoosting(true);
    setSpeed(175);
    Speech.speak('Accélération maximale ! Vroum !', { language: 'fr-FR' });
    setDistanceToCheckpoint(0);

    setTimeout(() => {
      const selectedOption = options[currentLane] || options[0];
      if (selectedOption === targetGate) {
        setLapCompleted(true);
        Speech.speak(`Porte ${selectedOption} franchie ! Victoire du Grand Prix !`, { language: 'fr-FR' });
        setTimeout(() => onAnswer(selectedOption), 1000);
      } else {
        Speech.speak(`Porte ${selectedOption} touchée. Réessaie la porte ${targetGate} !`, { language: 'fr-FR' });
        setIsBoosting(false);
        setSpeed(85);
        setDistanceToCheckpoint(60);
      }
    }, 1100);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>🏎️ Grand Prix des Décimaux (Rallye)</Text>
      <Text style={styles.promptText}>
        Pilote ton bolide dans la bonne voie pour franchir la porte du plus grand nombre décimal : <Text style={{ color: '#E11D48', fontWeight: 'bold' }}>{targetGate}</Text> !
      </Text>

      {/* Speedometer & HUD */}
      <View style={styles.raceHudRow}>
        <View style={styles.speedometerPill}>
          <Text style={styles.speedometerLabel}>⚡ Compteur : {speed} km/h</Text>
          {isBoosting && <Text style={styles.turboTag}>🔥 TURBO</Text>}
        </View>
        <View style={styles.checkpointPill}>
          <Text style={styles.checkpointLabel}>🚩 Porte dans : {distanceToCheckpoint}m</Text>
        </View>
      </View>

      {/* 3-Lane Race Track */}
      <View style={styles.grandPrixTrack}>
        {/* Overhead Decimal Toll Gates */}
        <View style={styles.gatesRow}>
          {options.slice(0, 3).map((opt: string, idx: number) => (
            <View 
              key={`gate_${idx}`} 
              style={[
                styles.gateBanner,
                currentLane === idx && styles.gateHighlighted
              ]}
            >
              <Text style={styles.gateNumber}>{opt}</Text>
              <Text style={styles.gateLaneText}>Voie {idx + 1}</Text>
            </View>
          ))}
        </View>

        {/* Lane Markings */}
        <View style={styles.lanesGrid}>
          {[0, 1, 2].map((laneIdx) => (
            <View key={`lane_${laneIdx}`} style={styles.trackLaneStrip}>
              <View style={styles.laneStripeDashed} />
              {currentLane === laneIdx && (
                <View style={styles.carInLane}>
                  <Text style={styles.formulaCarEmoji}>{isBoosting ? '🔥🏎️💨' : '🏎️'}</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </View>

      {/* Steering & Acceleration Controls */}
      <View style={styles.racingControlsRow}>
        <TouchableOpacity 
          style={styles.steerBtn} 
          onPress={handleSteerLeft}
          disabled={isBoosting}
        >
          <Text style={styles.steerBtnText}>⬅️ Voie Gauche</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.turboPedalBtn, isBoosting && styles.pedalActive]} 
          onPress={handleTurbo}
          disabled={isBoosting}
        >
          <Text style={styles.pedalBtnText}>🚀 FRANCHIR LA PORTE</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.steerBtn} 
          onPress={handleSteerRight}
          disabled={isBoosting}
        >
          <Text style={styles.steerBtnText}>Voie Droite ➡️</Text>
        </TouchableOpacity>
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
// --- GAME 50: READING DETECTIVE AGENCY (INVESTIGATION & EVIDENCE LEDGER) ---
export function ReadingDetectiveAgency({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const [activeWitness, setActiveWitness] = useState<number>(0);
  const [magnifierOn, setMagnifierOn] = useState<boolean>(false);
  const [cluesFound, setCluesFound] = useState<string[]>([]);
  const [selectedDeduction, setSelectedDeduction] = useState<string | null>(null);

  const witnesses = [
    {
      id: 0,
      name: 'M. Epie (Guide de Montagne)',
      avatar: '🧗🏾‍♂️',
      quote: '« Sur les pentes humides à 1 500m, les feuilles de thé vert s\'étendent à perte de vue ! »',
      clue: 'Plantation de thé confirmée'
    },
    {
      id: 1,
      name: 'Dr. Ngassa (Botaniste de Buea)',
      avatar: '👩🏾‍🔬',
      quote: '« La terre volcanique riche et les brumes quotidiennes font du thé du mont Cameroun un trésor national ! »',
      clue: 'Climat parfait pour le thé'
    }
  ];

  const handleInspectScene = () => {
    setMagnifierOn(m => !m);
    Speech.speak('La loupe de détective révèle un indice crucial !', { language: 'fr-FR' });
    const clue = witnesses[activeWitness].clue;
    if (!cluesFound.includes(clue)) {
      setCluesFound(prev => [...prev, clue]);
    }
  };

  const handleNextWitness = () => {
    setActiveWitness(w => (w + 1) % witnesses.length);
    Speech.speak(witnesses[(activeWitness + 1) % witnesses.length].quote, { language: 'fr-FR' });
  };

  const handleStampDeduction = (choice: string) => {
    setSelectedDeduction(choice);
    Speech.speak(`Sceau de déduction apposé sur : ${choice} !`, { language: 'fr-FR' });
    setTimeout(() => {
      onAnswer(choice);
    }, 900);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>🔍 Agence des Détectives Littéraires</Text>
      <Text style={styles.promptText}>
        Explore la scène du Mont Cameroun, interroge les témoins et appose ton sceau de déduction !
      </Text>

      {/* Investigation Dossier & Scene */}
      <View style={styles.detectiveDossierBox}>
        {/* Active Witness Speech Bubble */}
        <View style={styles.witnessCard}>
          <Text style={styles.witnessAvatar}>{witnesses[activeWitness].avatar}</Text>
          <View style={styles.witnessSpeechBubble}>
            <Text style={styles.witnessName}>{witnesses[activeWitness].name}</Text>
            <Text style={styles.witnessQuoteText}>{witnesses[activeWitness].quote}</Text>
          </View>
        </View>

        {/* Scene Magnifier Viewport */}
        <View style={[styles.magnifierViewport, magnifierOn && styles.magnifierActive]}>
          <Text style={styles.magnifierIcon}>{magnifierOn ? '🔎✨' : '🌄'}</Text>
          <Text style={styles.magnifierCaption}>
            {magnifierOn 
              ? `INDICE DÉCOUVERT : « ${witnesses[activeWitness].clue} »` 
              : 'Appuie sur la loupe pour analyser le terrain volcanique.'}
          </Text>
        </View>

        {/* Evidence Ledger */}
        <View style={styles.evidenceLedgerRow}>
          <Text style={styles.ledgerHeader}>📋 Indices dans le carnet :</Text>
          {cluesFound.length === 0 ? (
            <Text style={styles.emptyLedgerText}>Aucun indice recueilli pour l'instant.</Text>
          ) : (
            cluesFound.map((clue, idx) => (
              <Text key={idx} style={styles.clueBadge}>✅ {clue}</Text>
            ))
          )}
        </View>
      </View>

      {/* Detective Tools Action Bar */}
      <View style={styles.detectiveToolsRow}>
        <TouchableOpacity style={styles.detectiveToolBtn} onPress={handleNextWitness}>
          <Text style={styles.toolBtnText}>🗣️ Autre Témoin</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.detectiveToolBtn, styles.inspectBtn]} 
          onPress={handleInspectScene}
        >
          <Text style={styles.toolBtnText}>🔍 Inspecter Terrain</Text>
        </TouchableOpacity>
      </View>

      {/* Deduction Stamping Cards */}
      <Text style={styles.subtext}>Quelle culture majeure est identifiée par tes preuves ?</Text>
      <View style={styles.optionsRow}>
        {(question.options || ['Le Thé ☕', 'Le Blé 🌾', 'Le Pommier 🍏', 'Le Coton 👕']).map((opt: string) => (
          <TouchableOpacity 
            key={opt} 
            style={[styles.choiceCard, selectedDeduction === opt && styles.stampedChoice]} 
            onPress={() => handleStampDeduction(opt)}
          >
            <Text style={styles.choiceCardText}>
              {selectedDeduction === opt ? `🔖 DÉDUIT : ${opt}` : opt}
            </Text>
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
  choiceCardText: { fontSize: 16, fontWeight: 'bold', color: '#1E40AF', textAlign: 'center' },

  // Decimal Racing (Interactive Grand Prix)
  raceHudRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', maxWidth: 420, marginBottom: 12 },
  speedometerPill: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#1E293B', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 14 },
  speedometerLabel: { color: '#38BDF8', fontWeight: 'bold', fontSize: 13 },
  turboTag: { color: '#F43F5E', fontWeight: 'bold', fontSize: 11, backgroundColor: '#4C0519', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  checkpointPill: { backgroundColor: '#1E293B', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 14 },
  checkpointLabel: { color: '#FCD34D', fontWeight: 'bold', fontSize: 13 },
  grandPrixTrack: { width: '100%', maxWidth: 420, height: 160, backgroundColor: '#334155', borderRadius: 20, overflow: 'hidden', borderWidth: 3, borderColor: '#475569', justifyContent: 'space-between' },
  gatesRow: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#1E293B', paddingVertical: 6 },
  gateBanner: { backgroundColor: '#0F172A', paddingVertical: 4, paddingHorizontal: 12, borderRadius: 10, borderWidth: 2, borderColor: '#64748B', alignItems: 'center', minWidth: 85 },
  gateHighlighted: { borderColor: '#E11D48', backgroundColor: '#881337' },
  gateNumber: { color: '#F8FAFC', fontWeight: 'bold', fontSize: 16 },
  gateLaneText: { color: '#94A3B8', fontSize: 10 },
  lanesGrid: { flexDirection: 'row', flex: 1 },
  trackLaneStrip: { flex: 1, borderRightWidth: 1, borderColor: '#64748B', borderStyle: 'dashed', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 10 },
  laneStripeDashed: { position: 'absolute', top: 0, bottom: 0, width: 2, backgroundColor: 'transparent' },
  carInLane: { alignItems: 'center' },
  formulaCarEmoji: { fontSize: 36 },
  racingControlsRow: { flexDirection: 'row', gap: 10, alignItems: 'center', justifyContent: 'center', marginTop: 14, width: '100%', maxWidth: 420 },
  steerBtn: { backgroundColor: '#0284C7', paddingVertical: 12, paddingHorizontal: 14, borderRadius: 14 },
  steerBtnText: { color: 'white', fontWeight: 'bold', fontSize: 12 },
  turboPedalBtn: { backgroundColor: '#E11D48', paddingVertical: 14, paddingHorizontal: 18, borderRadius: 16, elevation: 5 },
  pedalActive: { backgroundColor: '#9F1239' },
  pedalBtnText: { color: 'white', fontWeight: 'bold', fontSize: 13 },

  // Detective Stories (Interactive Evidence Dossier)
  detectiveDossierBox: { width: '100%', maxWidth: 430, backgroundColor: '#FFFBEB', borderRadius: 22, borderWidth: 2, borderColor: '#FDE68A', padding: 14, marginBottom: 14 },
  witnessCard: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#FEF3C7', padding: 10, borderRadius: 16, marginBottom: 10 },
  witnessAvatar: { fontSize: 36 },
  witnessSpeechBubble: { flex: 1 },
  witnessName: { fontWeight: 'bold', color: '#78350F', fontSize: 12 },
  witnessQuoteText: { color: '#92400E', fontSize: 13, fontStyle: 'italic', marginTop: 2 },
  magnifierViewport: { backgroundColor: '#FEF9C3', padding: 12, borderRadius: 16, borderWidth: 2, borderColor: '#F59E0B', alignItems: 'center', marginBottom: 10 },
  magnifierActive: { backgroundColor: '#DCFCE7', borderColor: '#22C55E' },
  magnifierIcon: { fontSize: 32 },
  magnifierCaption: { fontSize: 12, fontWeight: 'bold', color: '#713F12', textAlign: 'center', marginTop: 4 },
  evidenceLedgerRow: { backgroundColor: 'white', padding: 10, borderRadius: 14, borderWidth: 1, borderColor: '#E5E7EB' },
  ledgerHeader: { fontSize: 12, fontWeight: 'bold', color: '#374151', marginBottom: 4 },
  emptyLedgerText: { fontSize: 11, color: '#9CA3AF', fontStyle: 'italic' },
  clueBadge: { fontSize: 12, color: '#047857', fontWeight: 'bold', marginVertical: 1 },
  detectiveToolsRow: { flexDirection: 'row', gap: 12, marginBottom: 14 },
  detectiveToolBtn: { backgroundColor: '#475569', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 14 },
  inspectBtn: { backgroundColor: '#D97706' },
  toolBtnText: { color: 'white', fontWeight: 'bold', fontSize: 13 },
  stampedChoice: { borderColor: '#10B981', backgroundColor: '#D1FAE5' }
});
