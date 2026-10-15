import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import * as Speech from 'expo-speech';

// --- GAME 16: MATH CAR RACING ---
export function MathCarRacing({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const [carPos, setCarPos] = useState<number>(10);
  const equation = question.equation || '4 + 3 = ?';

  const handlePickAnswer = (opt: string) => {
    if (opt === question.ans) {
      setCarPos(80); // Zoom forward
      Speech.speak('Vroooom ! En route !', { language: 'fr-FR' });
      setTimeout(() => onAnswer(opt), 900);
    } else {
      onAnswer(opt);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>🏎️ Course de Voitures Mathématiques</Text>
      <Text style={styles.promptText}>Résous l'addition pour propulser ton bolide vers la ligne d'arrivée !</Text>

      {/* Racetrack */}
      <View style={styles.racetrack}>
        <View style={styles.trackLine} />
        <View style={[styles.raceCarWrapper, { left: `${carPos}%` }]}>
          <Text style={styles.raceCar}>🏎️💨</Text>
        </View>
        <Text style={styles.finishFlag}>🏁</Text>
      </View>

      <View style={styles.equationCard}>
        <Text style={styles.equationBig}>{equation}</Text>
      </View>

      <View style={styles.optionsRow}>
        {(question.options || ['5', '6', '7', '8']).map((opt: string) => (
          <TouchableOpacity key={opt} style={styles.choiceBtn} onPress={() => handlePickAnswer(opt)}>
            <Text style={styles.choiceBtnText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// --- GAME 17: TREASURE HUNT ---
export function TreasureHunt({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const islands = question.islands || [
    { id: 'A', name: 'Île aux Palmiers', val: '6' },
    { id: 'B', name: 'Île du Volcan', val: '9' },
    { id: 'C', name: 'Île aux Perles', val: '12' }
  ];
  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>🗺️ Chasse au Trésor</Text>
      <Text style={styles.promptText}>{question.q || 'Sur quelle île est caché le coffre au trésor (Valeur 9) ?'}</Text>

      <View style={styles.treasureMap}>
        {islands.map((island: any) => (
          <TouchableOpacity key={island.id} style={styles.islandBtn} onPress={() => onAnswer(island.val)}>
            <Text style={styles.islandIcon}>🏝️</Text>
            <Text style={styles.islandName}>{island.name}</Text>
            <Text style={styles.islandValBadge}>Nombre: {island.val}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// --- GAME 18: ROBOT FACTORY ---
export function RobotFactory({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const [tens, setTens] = useState(0);
  const [ones, setOnes] = useState(0);
  const target = parseInt(question.ans) || 24;

  const total = tens * 10 + ones;

  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>🤖 L'Usine à Robots</Text>
      <Text style={styles.promptText}>Assemble les pièces de puissance pour fabriquer le robot n° <Text style={{ color: '#2563EB', fontWeight: 'bold' }}>{target}</Text> :</Text>

      <View style={styles.robotAssemblyBox}>
        <Text style={styles.robotHeadIcon}>🤖</Text>
        <Text style={styles.robotEnergyText}>Énergie actuelle : {total} / {target}</Text>
      </View>

      <View style={styles.robotControlsRow}>
        <View style={styles.partCard}>
          <Text style={styles.partLabel}>Piles de Dix (10)</Text>
          <Text style={styles.partCountText}>{tens} ({tens * 10})</Text>
          <View style={styles.miniBtnRow}>
            <TouchableOpacity style={styles.stepBtn} onPress={() => setTens(Math.max(0, tens - 1))}><Text style={styles.stepText}>-</Text></TouchableOpacity>
            <TouchableOpacity style={styles.stepBtn} onPress={() => setTens(tens + 1)}><Text style={styles.stepText}>+</Text></TouchableOpacity>
          </View>
        </View>

        <View style={styles.partCard}>
          <Text style={styles.partLabel}>Boulons d'Unité (1)</Text>
          <Text style={styles.partCountText}>{ones} ({ones})</Text>
          <View style={styles.miniBtnRow}>
            <TouchableOpacity style={styles.stepBtn} onPress={() => setOnes(Math.max(0, ones - 1))}><Text style={styles.stepText}>-</Text></TouchableOpacity>
            <TouchableOpacity style={styles.stepBtn} onPress={() => setOnes(ones + 1)}><Text style={styles.stepText}>+</Text></TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.activateRobotBtn} onPress={() => onAnswer(total.toString())}>
        <Text style={styles.activateRobotText}>⚡ Activer le Robot ! ({total})</Text>
      </TouchableOpacity>
    </View>
  );
}

// --- GAME 19: WORD CASTLE ---
export function WordCastle({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const targetWord = question.targetWord || 'ÉCOLE';
  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>🏰 Le Château des Mots</Text>
      <Text style={styles.promptText}>Prononce la formule magique pour ouvrir la herse :</Text>

      <View style={styles.castleDoor}>
        <Text style={styles.castleGateIcon}>🚪🔒</Text>
        <Text style={styles.castleLockWord}>{targetWord}</Text>
      </View>

      <View style={styles.optionsRow}>
        {(question.options || ['ÉCOLE', 'MAISON', 'LIVRE', 'ARBRE']).map((word: string) => (
          <TouchableOpacity key={word} style={styles.choiceCard} onPress={() => onAnswer(word)}>
            <Text style={styles.choiceCardText}>🔑 {word}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// --- GAME 20: SYLLABLE JUMP ---
export function SyllableJump({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const syllables = question.syllables || ['PA', 'PI', 'LLON'];
  const [jumpIdx, setJumpIdx] = useState(0);

  const handleHop = (syl: string) => {
    Speech.speak(syl, { language: 'fr-FR' });
    if (syl === syllables[jumpIdx]) {
      const next = jumpIdx + 1;
      setJumpIdx(next);
      if (next === syllables.length) {
        setTimeout(() => onAnswer(syllables.join('')), 700);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>🐸 Le Saut des Syllabes</Text>
      <Text style={styles.promptText}>Aide la grenouille à sauter sur les nénuphars pour former : <Text style={{ color: '#16A34A', fontWeight: 'bold' }}>{syllables.join('')}</Text></Text>

      <View style={styles.lilyPadRow}>
        {syllables.map((syl: string, i: number) => {
          const isCurrent = jumpIdx === i;
          const isDone = jumpIdx > i;
          return (
            <View key={i} style={[styles.lilyPad, isDone && styles.lilyPadDone]}>
              {isCurrent && <Text style={styles.frogOnPad}>🐸</Text>}
              <Text style={styles.lilyPadText}>{syl}</Text>
            </View>
          );
        })}
      </View>

      <View style={styles.optionsRow}>
        {(question.options || ['PA', 'PI', 'LLON', 'MA', 'TO']).map((s: string, idx: number) => (
          <TouchableOpacity key={idx} style={styles.choiceBtn} onPress={() => handleHop(s)}>
            <Text style={styles.choiceBtnText}>{s}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// --- GAME 21: SPELLING BEE ADVENTURE ---
export function SpellingBeeAdventure({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const word = question.targetWord || 'MANGUE';
  const [spelled, setSpelled] = useState<string[]>([]);
  const letters = question.letters || ['M', 'A', 'N', 'G', 'U', 'E', 'O', 'S'];

  const addLetter = (l: string) => {
    const next = [...spelled, l];
    setSpelled(next);
    if (next.length === word.length) {
      onAnswer(next.join(''));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>🐝 L'Aventure de l'Abeille Épelle-Tout</Text>
      <Text style={styles.promptText}>Épelle le mot dans la ruche :</Text>

      <View style={styles.honeycombWord}>
        {Array.from({ length: word.length }).map((_, i) => (
          <View key={i} style={styles.honeyCell}>
            <Text style={styles.honeyLetter}>{spelled[i] || '_'}</Text>
          </View>
        ))}
      </View>

      <View style={styles.honeycombGrid}>
        {letters.map((l: string, idx: number) => (
          <TouchableOpacity key={idx} style={styles.honeyKey} onPress={() => addLetter(l)}>
            <Text style={styles.honeyKeyText}>{l}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {spelled.length > 0 && (
        <TouchableOpacity style={styles.resetBtn} onPress={() => setSpelled([])}>
          <Text style={styles.resetBtnText}>Effacer</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// --- GAME 22: NUMBER LINE RUNNER ---
export function NumberLineRunner({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const target = parseInt(question.ans) || 7;
  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>🏃 Le Coureur de la Droite Numérique</Text>
      <Text style={styles.promptText}>{question.q || `Où se trouve le diamant sur la ligne à ${target} ?`}</Text>

      <View style={styles.runnerLine}>
        {Array.from({ length: 11 }).map((_, i) => (
          <TouchableOpacity key={i} style={styles.runnerStop} onPress={() => onAnswer(i.toString())}>
            {i === target && <Text style={styles.runnerGem}>💎</Text>}
            <View style={[styles.stopTick, i === target && { backgroundColor: '#10B981', height: 28 }]} />
            <Text style={styles.stopNum}>{i}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// --- GAME 23: ADDITION BRIDGE ---
export function AdditionBridge({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const parts = (question.equation || '5 + 3 = ?').split(' ');
  const num1 = parts[0] || '5';
  const num2 = parts[2] || '3';
  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>🌉 Le Pont des Additions</Text>
      <Text style={styles.promptText}>Assemble les deux blocs de pierre pour réparer le pont au-dessus du fleuve :</Text>

      <View style={styles.bridgeGraphic}>
        <View style={styles.bridgeBlockLeft}>
          <Text style={styles.bridgeNum}>{num1}</Text>
        </View>
        <Text style={styles.bridgePlus}>➕</Text>
        <View style={styles.bridgeBlockRight}>
          <Text style={styles.bridgeNum}>{num2}</Text>
        </View>
      </View>

      <View style={styles.optionsRow}>
        {(question.options || ['7', '8', '9', '10']).map((opt: string) => (
          <TouchableOpacity key={opt} style={styles.choiceBtn} onPress={() => onAnswer(opt)}>
            <Text style={styles.choiceBtnText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// --- GAME 24: SUBTRACTION NINJA ---
export function SubtractionNinja({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const total = parseInt(question.total) || 6;
  const cut = parseInt(question.cut) || 2;
  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>🥷 Le Ninja de la Soustraction</Text>
      <Text style={styles.promptText}>Le ninja tranche {cut} cibles sur {total} ! Combien en reste-t-il ?</Text>

      <View style={styles.ninjaTargetsRow}>
        {Array.from({ length: total }).map((_, i) => (
          <View key={i} style={[styles.ninjaTarget, i < cut && styles.ninjaTargetCut]}>
            <Text style={{ fontSize: 32 }}>🎯</Text>
            {i < cut && <Text style={styles.swordSlash}>⚔️</Text>}
          </View>
        ))}
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

// --- GAME 25: CFA MARKET ---
export function CFAMarket({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const item = question.item || 'Poisson braisé';
  const price = question.price || 500;
  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>🏪 Grand Marché de Mokolo</Text>
      <Text style={styles.promptText}>Achète {item} au prix de <Text style={{ color: '#059669', fontWeight: 'bold' }}>{price} FCFA</Text> :</Text>

      <View style={styles.marketPlate}>
        <Text style={{ fontSize: 50 }}>🐟</Text>
        <Text style={styles.marketPriceLabel}>{price} Francs CFA</Text>
      </View>

      <View style={styles.optionsRow}>
        {(question.options || ['500', '250', '1000', '100']).map((coin: string) => (
          <TouchableOpacity key={coin} style={styles.cfaCoinBtn} onPress={() => onAnswer(coin)}>
            <Text style={styles.cfaCoinText}>🪙 {coin} F</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// --- GAME 26: CLOCK QUEST ---
export function ClockQuest({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const hour = question.hour || 8;
  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>⏰ La Quête de l'Horloge</Text>
      <Text style={styles.promptText}>À quelle heure commence l'école ? (Regarde l'horloge) :</Text>

      <View style={styles.questClock}>
        <Text style={styles.clockHourBig}>{hour}:00</Text>
        <Text style={styles.clockSub}>Matin</Text>
      </View>

      <View style={styles.optionsRow}>
        {(question.options || ['7h00', '8h00', '9h00', '12h00']).map((opt: string) => (
          <TouchableOpacity key={opt} style={styles.choiceCard} onPress={() => onAnswer(opt)}>
            <Text style={styles.choiceCardText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// --- GAME 27: SENTENCE TRAIN ---
export function SentenceTrain({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const words = question.words || ['Musa', 'lit', 'un', 'livre.'];
  const [selected, setSelected] = useState<string[]>([]);

  const handleAdd = (w: string) => {
    if (!selected.includes(w)) {
      const next = [...selected, w];
      setSelected(next);
      if (next.length === words.length) {
        onAnswer(next.join(' '));
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>🚂 Le Train des Phrases</Text>
      <Text style={styles.promptText}>Accroche les wagons dans le bon ordre :</Text>

      <View style={styles.sentenceTrackBox}>
        <Text style={styles.sentenceTrackText}>
          {selected.length > 0 ? selected.join(' ') : 'Wagons vides...'}
        </Text>
      </View>

      <View style={styles.optionsRow}>
        {words.map((w: string) => {
          const isUsed = selected.includes(w);
          return (
            <TouchableOpacity key={w} disabled={isUsed} style={[styles.wordCarBtn, isUsed && { opacity: 0.3 }]} onPress={() => handleAdd(w)}>
              <Text style={styles.wordCarText}>{w}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {selected.length > 0 && (
        <TouchableOpacity style={styles.resetBtn} onPress={() => setSelected([])}>
          <Text style={styles.resetBtnText}>Dételer le train</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// --- GAME 28: READING RESCUE ---
export function ReadingRescue({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const clue = question.clue || 'Je vis dans l\'eau, j\'ai des écailles et des nageoires. Qui suis-je ?';
  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>🚨 Mission Sauvetage Lecture</Text>
      <Text style={styles.promptText}>Lis l'indice secret pour délivrer l'animal enfermé :</Text>

      <View style={styles.clueCard}>
        <Text style={styles.clueIcon}>📜</Text>
        <Text style={styles.clueBody}>{clue}</Text>
      </View>

      <View style={styles.optionsRow}>
        {(question.options || ['Le Poisson 🐟', 'Le Lion 🦁', 'L\'Oiseau 🦜', 'Le Chien 🐕']).map((opt: string) => (
          <TouchableOpacity key={opt} style={styles.choiceCard} onPress={() => onAnswer(opt)}>
            <Text style={styles.choiceCardText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// --- GAME 29: SCIENCE GARDEN ---
export function ScienceGarden({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>🌱 Le Jardin Botanique</Text>
      <Text style={styles.promptText}>De quoi la jeune pousse de maïs a-t-elle besoin pour grandir ?</Text>

      <View style={styles.gardenCenter}>
        <Text style={{ fontSize: 60 }}>🪴</Text>
      </View>

      <View style={styles.optionsRow}>
        {(question.options || ['Eau et Soleil ☀️💧', 'Chocolat 🍫', 'Téléphone 📱', 'Pierres 🪨']).map((opt: string) => (
          <TouchableOpacity key={opt} style={styles.choiceCard} onPress={() => onAnswer(opt)}>
            <Text style={styles.choiceCardText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// --- GAME 30: PHONICS FISHING ---
export function PhonicsFishing({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const targetSound = question.targetSound || 'B';
  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>🎣 La Pêche aux Sons (Fleuve Wouri)</Text>
      <Text style={styles.promptText}>Pêche le poisson qui porte la lettre du son <Text style={{ color: '#0284C7', fontWeight: 'bold' }}>"{targetSound}"</Text> :</Text>

      <View style={styles.riverArea}>
        {(question.options || ['B', 'D', 'P', 'T']).map((letter: string) => (
          <TouchableOpacity key={letter} style={styles.fishItem} onPress={() => onAnswer(letter)}>
            <Text style={styles.fishIcon}>🐟</Text>
            <Text style={styles.fishLetter}>{letter}</Text>
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

  // Racing
  racetrack: { width: '100%', maxWidth: 440, height: 70, backgroundColor: '#334155', borderRadius: 20, justifyContent: 'center', paddingHorizontal: 15, marginBottom: 20, position: 'relative' },
  trackLine: { height: 2, backgroundColor: '#FDE047', borderStyle: 'dashed', borderWidth: 1, borderColor: '#FDE047', width: '100%' },
  raceCarWrapper: { position: 'absolute', bottom: 10 },
  raceCar: { fontSize: 36 },
  finishFlag: { position: 'absolute', right: 12, fontSize: 30 },
  equationCard: { backgroundColor: '#EFF6FF', paddingVertical: 14, paddingHorizontal: 30, borderRadius: 20, borderWidth: 2, borderColor: '#93C5FD', marginBottom: 20 },
  equationBig: { fontSize: 36, fontWeight: 'bold', color: '#1E40AF' },

  // Treasure Hunt
  treasureMap: { gap: 12, width: '100%', maxWidth: 380 },
  islandBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FEF3C7', padding: 14, borderRadius: 18, borderWidth: 2, borderColor: '#F59E0B' },
  islandIcon: { fontSize: 36, marginRight: 12 },
  islandName: { fontSize: 16, fontWeight: 'bold', color: '#78350F', flex: 1 },
  islandValBadge: { backgroundColor: '#FDE68A', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10, fontWeight: 'bold', color: '#92400E' },

  // Robot Factory
  robotAssemblyBox: { backgroundColor: '#F1F5F9', padding: 16, borderRadius: 24, borderWidth: 3, borderColor: '#CBD5E1', alignItems: 'center', width: 170, marginBottom: 15 },
  robotHeadIcon: { fontSize: 50 },
  robotEnergyText: { fontSize: 13, fontWeight: 'bold', color: '#475569', marginTop: 4 },
  robotControlsRow: { flexDirection: 'row', gap: 15, marginBottom: 15 },
  partCard: { backgroundColor: '#EFF6FF', padding: 12, borderRadius: 16, borderWidth: 2, borderColor: '#BFDBFE', alignItems: 'center', width: 140 },
  partLabel: { fontSize: 12, fontWeight: 'bold', color: '#1E40AF' },
  partCountText: { fontSize: 20, fontWeight: 'bold', color: '#1D4ED8', marginVertical: 4 },
  miniBtnRow: { flexDirection: 'row', gap: 12 },
  stepBtn: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#3B82F6', alignItems: 'center', justifyContent: 'center' },
  stepText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  activateRobotBtn: { backgroundColor: '#10B981', paddingVertical: 14, paddingHorizontal: 26, borderRadius: 16, elevation: 4 },
  activateRobotText: { color: 'white', fontSize: 16, fontWeight: 'bold' },

  // Castle
  castleDoor: { backgroundColor: '#334155', padding: 20, borderRadius: 24, alignItems: 'center', width: 160, marginBottom: 20 },
  castleGateIcon: { fontSize: 40 },
  castleLockWord: { fontSize: 22, fontWeight: 'bold', color: '#FDE047', marginTop: 6 },

  // Syllable Jump
  lilyPadRow: { flexDirection: 'row', gap: 15, justifyContent: 'center', marginVertical: 20 },
  lilyPad: { width: 75, height: 75, borderRadius: 37.5, backgroundColor: '#DCFCE7', borderWidth: 3, borderColor: '#22C55E', alignItems: 'center', justifyContent: 'center' },
  lilyPadDone: { backgroundColor: '#86EFAC' },
  frogOnPad: { position: 'absolute', top: -20, fontSize: 24 },
  lilyPadText: { fontSize: 20, fontWeight: 'bold', color: '#14532D' },

  // Honeycomb
  honeycombWord: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  honeyCell: { width: 45, height: 50, borderBottomWidth: 3, borderBottomColor: '#D97706', alignItems: 'center', justifyContent: 'center' },
  honeyLetter: { fontSize: 28, fontWeight: 'bold', color: '#78350F' },
  honeycombGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, maxWidth: 340, justifyContent: 'center', marginBottom: 15 },
  honeyKey: { width: 50, height: 50, borderRadius: 12, backgroundColor: '#FEF3C7', borderWidth: 2, borderColor: '#F59E0B', alignItems: 'center', justifyContent: 'center' },
  honeyKeyText: { fontSize: 22, fontWeight: 'bold', color: '#92400E' },

  // Runner
  runnerLine: { flexDirection: 'row', alignItems: 'flex-end', gap: 6, backgroundColor: '#F8FAFC', padding: 15, borderRadius: 20, borderWidth: 2, borderColor: '#E2E8F0', maxWidth: 440 },
  runnerStop: { alignItems: 'center', width: 32 },
  runnerGem: { fontSize: 20, marginBottom: 2 },
  stopTick: { width: 4, height: 16, backgroundColor: '#64748B', borderRadius: 2, marginBottom: 4 },
  stopNum: { fontSize: 13, fontWeight: 'bold', color: '#334155' },

  // Bridge
  bridgeGraphic: { flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 20 },
  bridgeBlockLeft: { width: 70, height: 60, backgroundColor: '#94A3B8', borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  bridgeBlockRight: { width: 70, height: 60, backgroundColor: '#64748B', borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  bridgePlus: { fontSize: 24 },
  bridgeNum: { color: 'white', fontSize: 26, fontWeight: 'bold' },

  // Ninja
  ninjaTargetsRow: { flexDirection: 'row', gap: 10, marginVertical: 20 },
  ninjaTarget: { width: 50, height: 50, backgroundColor: '#F1F5F9', borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  ninjaTargetCut: { opacity: 0.4 },
  swordSlash: { position: 'absolute', fontSize: 22 },

  // CFA Market
  marketPlate: { backgroundColor: '#ECFDF5', padding: 16, borderRadius: 24, borderWidth: 3, borderColor: '#A7F3D0', alignItems: 'center', width: 170, marginBottom: 20 },
  marketPriceLabel: { fontSize: 16, fontWeight: 'bold', color: '#047857', marginTop: 4 },
  cfaCoinBtn: { paddingVertical: 14, paddingHorizontal: 20, borderRadius: 20, backgroundColor: '#FEF08A', borderWidth: 2, borderColor: '#CA8A04' },
  cfaCoinText: { fontSize: 18, fontWeight: 'bold', color: '#854D0E' },

  // Clock Quest
  questClock: { width: 140, height: 140, borderRadius: 70, backgroundColor: '#EFF6FF', borderWidth: 4, borderColor: '#3B82F6', alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  clockHourBig: { fontSize: 32, fontWeight: 'bold', color: '#1E40AF' },
  clockSub: { fontSize: 12, color: '#60A5FA', fontWeight: 'bold' },

  // Sentence Train
  sentenceTrackBox: { minHeight: 50, padding: 12, backgroundColor: '#F1F5F9', borderRadius: 14, width: '100%', maxWidth: 420, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  sentenceTrackText: { fontSize: 18, fontWeight: 'bold', color: '#1E293B', textAlign: 'center' },
  wordCarBtn: { backgroundColor: '#EEF2FF', borderWidth: 2, borderColor: '#6366F1', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 14 },
  wordCarText: { fontSize: 18, fontWeight: 'bold', color: '#4338CA' },

  // Clue
  clueCard: { backgroundColor: '#FFFBEB', padding: 18, borderRadius: 20, borderWidth: 2, borderColor: '#FDE68A', maxWidth: 420, alignItems: 'center', marginBottom: 20 },
  clueIcon: { fontSize: 36, marginBottom: 4 },
  clueBody: { fontSize: 16, color: '#78350F', textAlign: 'center', lineHeight: 24 },

  // Science Garden
  gardenCenter: { width: 130, height: 130, borderRadius: 65, backgroundColor: '#DCFCE7', alignItems: 'center', justifyContent: 'center', marginBottom: 20 },

  // Phonics Fishing
  riverArea: { flexDirection: 'row', flexWrap: 'wrap', gap: 15, justifyContent: 'center', maxWidth: 360, marginVertical: 20 },
  fishItem: { width: 75, height: 75, backgroundColor: '#E0F2FE', borderRadius: 20, borderWidth: 2, borderColor: '#38BDF8', alignItems: 'center', justifyContent: 'center' },
  fishIcon: { fontSize: 28 },
  fishLetter: { fontSize: 18, fontWeight: 'bold', color: '#0369A1' },

  // Common UI
  optionsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'center', width: '100%', maxWidth: 450 },
  choiceBtn: { paddingVertical: 14, paddingHorizontal: 24, backgroundColor: '#DBEAFE', borderRadius: 18, borderWidth: 3, borderColor: '#3B82F6', minWidth: 80, alignItems: 'center' },
  choiceBtnText: { fontSize: 26, fontWeight: 'bold', color: '#1E3A8A' },
  choiceCard: { padding: 16, backgroundColor: '#EFF6FF', borderRadius: 16, borderWidth: 2, borderColor: '#93C5FD', width: '100%', maxWidth: 360, alignItems: 'center', marginBottom: 8 },
  choiceCardText: { fontSize: 16, fontWeight: 'bold', color: '#1E40AF' },
  resetBtn: { backgroundColor: '#E2E8F0', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 12, marginTop: 12 },
  resetBtnText: { color: '#475569', fontWeight: 'bold' }
});
