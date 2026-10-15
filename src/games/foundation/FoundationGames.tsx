import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import * as Speech from 'expo-speech';

// --- GAME 16: MATH CAR RACING ---
export function MathCarRacing({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const [carPos, setCarPos] = useState<number>(8);
  const [speed, setSpeed] = useState<number>(45);
  const [isBoosting, setIsBoosting] = useState<boolean>(false);
  const equation = question.equation || '4 + 3 = ?';

  const handlePickAnswer = (opt: string) => {
    if (opt === question.ans) {
      setIsBoosting(true);
      setSpeed(140);
      setCarPos(85); // Zoom forward
      Speech.speak('Vroooom ! Vitesse turbo activée !', { language: 'fr-FR' });
      setTimeout(() => onAnswer(opt), 950);
    } else {
      Speech.speak('Attention au dérapage ! Réessaie.', { language: 'fr-FR' });
      onAnswer(opt);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>🏎️ Course de Voitures Mathématiques</Text>
      <Text style={styles.promptText}>Résous l'addition pour propulser ton bolide vers la ligne d'arrivée !</Text>

      {/* Racetrack with speed markings */}
      <View style={styles.racetrack}>
        <View style={styles.trackLine} />
        
        {/* Scenery checkpoints */}
        <View style={styles.trackSceneryRow}>
          <Text style={styles.sceneryItem}>🌴</Text>
          <Text style={styles.sceneryItem}>🚩 50m</Text>
          <Text style={styles.sceneryItem}>🌴</Text>
          <Text style={styles.finishFlag}>🏁</Text>
        </View>

        {/* Animated Speed Lines */}
        <View style={styles.speedLinesRow}>
          <Text style={styles.speedLineText}>{isBoosting ? '⚡ ═ ═ ═ ⚡ ═ ═ ═ ⚡' : '— — — — — — —'}</Text>
        </View>

        {/* Race Car */}
        <View style={[styles.raceCarWrapper, { left: `${carPos}%` }]}>
          <Text style={styles.raceCar}>{isBoosting ? '🔥🏎️💨' : '🏎️💨'}</Text>
        </View>
      </View>

      {/* Dashboard Speedometer */}
      <View style={styles.speedometerBox}>
        <Text style={styles.speedometerText}>⚡ Vitesse : {speed} km/h {isBoosting ? '🚀 TURBO !' : '🟢'}</Text>
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
  const [gearToggled, setGearToggled] = useState(false);
  const target = parseInt(question.ans) || 24;

  const total = tens * 10 + ones;
  const progressPercent = Math.min(100, Math.round((total / Math.max(1, target)) * 100));

  const handleAddTen = () => {
    setTens(t => t + 1);
    setGearToggled(g => !g);
    Speech.speak('Dix unités ajoutées !', { language: 'fr-FR' });
  };

  const handleSubTen = () => {
    setTens(t => Math.max(0, t - 1));
    setGearToggled(g => !g);
  };

  const handleAddOne = () => {
    setOnes(o => o + 1);
    setGearToggled(g => !g);
    Speech.speak('Une unité !', { language: 'fr-FR' });
  };

  const handleSubOne = () => {
    setOnes(o => Math.max(0, o - 1));
    setGearToggled(g => !g);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>🤖 L'Usine à Robots</Text>
      <Text style={styles.promptText}>Assemble les blocs de base 10 pour fabriquer le robot n° <Text style={{ color: '#2563EB', fontWeight: 'bold' }}>{target}</Text> :</Text>

      {/* Robot Chamber with Rotating Gears & Visual Blocks */}
      <View style={styles.robotAssemblyBox}>
        <View style={styles.robotHeaderRow}>
          <Text style={styles.robotGearIcon}>{gearToggled ? '⚙️ ✨' : '✨ ⚙️'}</Text>
          <Text style={styles.robotHeadIcon}>{total === target ? '🤖 ⚡' : '🤖'}</Text>
          <Text style={styles.robotGearIcon}>{gearToggled ? '⚙️' : '⚙️ 💫'}</Text>
        </View>

        {/* Live Visual Manipulatives (Tens Rods & Ones Cubes) */}
        <View style={styles.manipulativesBox}>
          {/* Tens Rods */}
          <View style={styles.tensRodsArea}>
            {Array.from({ length: tens }).map((_, i) => (
              <View key={`rod_${i}`} style={styles.blueTenRod}>
                {Array.from({ length: 10 }).map((__, seg) => (
                  <View key={`seg_${seg}`} style={styles.rodSegment} />
                ))}
              </View>
            ))}
            {tens === 0 && <Text style={styles.emptyManipText}>0 dizaine</Text>}
          </View>

          {/* Unit Cubes */}
          <View style={styles.onesCubesArea}>
            {Array.from({ length: ones }).map((_, i) => (
              <View key={`cube_${i}`} style={styles.goldUnitCube}>
                <Text style={styles.cubeLabel}>1</Text>
              </View>
            ))}
            {ones === 0 && <Text style={styles.emptyManipText}>0 unité</Text>}
          </View>
        </View>

        {/* Energy Meter Gauge */}
        <View style={styles.gaugeContainer}>
          <View style={[styles.gaugeFill, { width: `${progressPercent}%`, backgroundColor: total === target ? '#10B981' : '#3B82F6' }]} />
        </View>
        <Text style={styles.robotEnergyText}>
          Énergie actuelle : <Text style={{ fontWeight: 'bold', color: total === target ? '#059669' : '#1D4ED8' }}>{total}</Text> / {target} ({progressPercent}%)
        </Text>
      </View>

      <View style={styles.robotControlsRow}>
        <View style={styles.partCard}>
          <Text style={styles.partLabel}>Barres de Dix (10)</Text>
          <Text style={styles.partCountText}>{tens} ({tens * 10})</Text>
          <View style={styles.miniBtnRow}>
            <TouchableOpacity style={styles.stepBtn} onPress={handleSubTen}><Text style={styles.stepText}>-</Text></TouchableOpacity>
            <TouchableOpacity style={styles.stepBtn} onPress={handleAddTen}><Text style={styles.stepText}>+</Text></TouchableOpacity>
          </View>
        </View>

        <View style={styles.partCard}>
          <Text style={styles.partLabel}>Cubes d'Unité (1)</Text>
          <Text style={styles.partCountText}>{ones} ({ones})</Text>
          <View style={styles.miniBtnRow}>
            <TouchableOpacity style={styles.stepBtn} onPress={handleSubOne}><Text style={styles.stepText}>-</Text></TouchableOpacity>
            <TouchableOpacity style={styles.stepBtn} onPress={handleAddOne}><Text style={styles.stepText}>+</Text></TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableOpacity 
        style={[styles.activateRobotBtn, total === target && { backgroundColor: '#059669', transform: [{ scale: 1.04 }] }]} 
        onPress={() => onAnswer(total.toString())}
      >
        <Text style={styles.activateRobotText}>⚡ Activer le Robot ! ({total})</Text>
      </TouchableOpacity>
    </View>
  );
}

// --- GAME 19: WORD CASTLE ---
export function WordCastle({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const targetWord = question.targetWord || 'ÉCOLE';
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handlePickWord = (word: string) => {
    if (word === targetWord || word === question.ans) {
      setIsUnlocked(true);
      Speech.speak('Sésame ouvre-toi ! Le pont-levis s\'abaisse !', { language: 'fr-FR' });
      setTimeout(() => onAnswer(word), 800);
    } else {
      Speech.speak('Ce n\'est pas la bonne formule.', { language: 'fr-FR' });
      onAnswer(word);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>🏰 Le Château des Mots</Text>
      <Text style={styles.promptText}>Trouve la formule magique pour abaisser le pont-levis :</Text>

      {/* Castle Wall & Drawbridge */}
      <View style={styles.castleCardBox}>
        <View style={styles.castleWallTurrets}>
          <Text style={{ fontSize: 24 }}>🛡️ 🏰 🛡️</Text>
        </View>
        <View style={[styles.castleDoor, isUnlocked && { backgroundColor: '#10B981', borderColor: '#FDE047' }]}>
          <Text style={styles.castleGateIcon}>{isUnlocked ? '🚪✨ OUVERT !' : '🚪🔒 FERMÉ'}</Text>
          <Text style={styles.castleLockWord}>{targetWord}</Text>
        </View>
        <Text style={styles.drawbridgeStatus}>
          {isUnlocked ? '🌉 Pont-levis abaissé ! Bravo chevalier !' : '⛓️ Pont-levis relevé'}
        </Text>
      </View>

      <View style={styles.optionsRow}>
        {(question.options || ['ÉCOLE', 'MAISON', 'LIVRE', 'ARBRE']).map((word: string) => (
          <TouchableOpacity key={word} style={styles.choiceCard} onPress={() => handlePickWord(word)}>
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
  const item = question.item || 'Poisson braisé de Kribi';
  const price = parseInt(question.ans) || parseInt(question.price) || 500;
  const [basketCoins, setBasketCoins] = useState<number[]>([]);

  const totalInBasket = basketCoins.reduce((sum, c) => sum + c, 0);

  const handleAddCoin = (amount: number) => {
    setBasketCoins(prev => [...prev, amount]);
    Speech.speak(`${amount} Francs CFA déposés !`, { language: 'fr-FR' });
  };

  const handleClearBasket = () => {
    setBasketCoins([]);
  };

  const handlePay = () => {
    if (totalInBasket === price) {
      Speech.speak('Merci mon grand ! Marché conclu !', { language: 'fr-FR' });
    }
    onAnswer(totalInBasket.toString());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>🏪 Grand Marché de Mokolo</Text>
      <Text style={styles.promptText}>
        Achète <Text style={{ fontWeight: 'bold' }}>{item}</Text> au prix de <Text style={{ color: '#059669', fontWeight: 'bold' }}>{price} FCFA</Text> :
      </Text>

      {/* Market Stall & Merchant Plate */}
      <View style={styles.marketStallBox}>
        <View style={styles.merchantRow}>
          <Text style={{ fontSize: 36 }}>👩🏾‍🍳</Text>
          <View style={styles.merchantSpeechBubble}>
            <Text style={styles.merchantSpeechText}>
              {totalInBasket === 0 && `« Bienvenue ! Le poisson coûte ${price} Francs. »`}
              {totalInBasket > 0 && totalInBasket < price && `« Dépose encore ${price - totalInBasket} F ! »`}
              {totalInBasket === price && '« C\'est la somme exacte ! Bravo ! »'}
              {totalInBasket > price && `« Trop de sous ! Il faut exactement ${price} F ! »`}
            </Text>
          </View>
        </View>

        <View style={styles.marketPlate}>
          <Text style={{ fontSize: 44 }}>🐟</Text>
          <Text style={styles.marketPriceLabel}>Prix : {price} FCFA</Text>
          
          {/* Deposited Coins in Tray */}
          <View style={styles.coinsTray}>
            {basketCoins.map((c, idx) => (
              <View key={idx} style={styles.miniTrayCoin}>
                <Text style={styles.miniTrayCoinText}>🪙 {c}F</Text>
              </View>
            ))}
            {basketCoins.length === 0 && <Text style={styles.emptyTrayText}>Plateau vide...</Text>}
          </View>

          <Text style={styles.totalDepositedText}>
            Total versé : <Text style={{ fontWeight: 'bold', color: totalInBasket === price ? '#059669' : '#D97706' }}>{totalInBasket} FCFA</Text>
          </Text>
        </View>
      </View>

      {/* Interactive Coin Purse */}
      <Text style={styles.purseTitle}>👛 Pièces dans ton porte-monnaie :</Text>
      <View style={styles.optionsRow}>
        {[50, 100, 250, 500].map((coin) => (
          <TouchableOpacity key={coin} style={styles.cfaCoinBtn} onPress={() => handleAddCoin(coin)}>
            <Text style={styles.cfaCoinText}>🪙 +{coin} F</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.marketActionRow}>
        {basketCoins.length > 0 && (
          <TouchableOpacity style={styles.resetBtn} onPress={handleClearBasket}>
            <Text style={styles.resetBtnText}>🔄 Vider le plateau</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity 
          style={[styles.payMerchantBtn, totalInBasket === price && { backgroundColor: '#059669', transform: [{ scale: 1.05 }] }]} 
          onPress={handlePay}
        >
          <Text style={styles.payMerchantBtnText}>🤝 Payer {totalInBasket} F à la marchande</Text>
        </TouchableOpacity>
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
  const [waterCount, setWaterCount] = useState<number>(0);
  const [sunCount, setSunCount] = useState<number>(0);
  const [fertilizerCount, setFertilizerCount] = useState<number>(0);

  const growthStage = Math.min(3, Math.floor((waterCount + sunCount + fertilizerCount) / 2));
  
  const stageIcons = ['🌰', '🌱', '🌿', '🌽✨'];
  const stageNames = [
    'Graine dans la terre fertile',
    'Petite pousse verte qui germe',
    'Tige vigoureuse avec feuilles',
    'Magnifique maïs mûr et prêt !'
  ];

  const handleWater = () => {
    setWaterCount(w => Math.min(3, w + 1));
    Speech.speak('Glou glou ! La terre absorbe l\'eau fraîche !', { language: 'fr-FR' });
  };

  const handleSun = () => {
    setSunCount(s => Math.min(3, s + 1));
    Speech.speak('Le doux soleil illumine les feuilles pour la photosynthèse !', { language: 'fr-FR' });
  };

  const handleFertilize = () => {
    setFertilizerCount(f => Math.min(2, f + 1));
    Speech.speak('Bons nutriments ajoutés !', { language: 'fr-FR' });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>🌱 Le Jardin Botanique</Text>
      <Text style={styles.promptText}>Nourris la graine avec l'eau et le soleil, puis réponds à la question :</Text>

      {/* Interactive Plant Simulation Chamber */}
      <View style={styles.gardenSimBox}>
        <View style={styles.gardenCenter}>
          <Text style={{ fontSize: 65 }}>{stageIcons[growthStage]}</Text>
        </View>
        <Text style={styles.gardenStageLabel}>{stageNames[growthStage]}</Text>

        {/* Meters */}
        <View style={styles.gardenMetersRow}>
          <Text style={styles.meterBadge}>💧 Eau : {waterCount}/2</Text>
          <Text style={styles.meterBadge}>☀️ Soleil : {sunCount}/2</Text>
          <Text style={styles.meterBadge}>🪱 Terreau : {fertilizerCount}/1</Text>
        </View>

        {/* Tactile Care Tools */}
        <View style={styles.gardenToolsRow}>
          <TouchableOpacity style={styles.gardenToolBtn} onPress={handleWater}>
            <Text style={styles.gardenToolBtnText}>💧 Arroser</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gardenToolBtn} onPress={handleSun}>
            <Text style={styles.gardenToolBtnText}>☀️ Ensoleiller</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gardenToolBtn} onPress={handleFertilize}>
            <Text style={styles.gardenToolBtnText}>🪱 Nourrir</Text>
          </TouchableOpacity>
        </View>

        {/* Harvest Button when mature */}
        {growthStage === 3 ? (
          <TouchableOpacity 
            style={styles.harvestActionBtn}
            onPress={() => {
              Speech.speak('Récolte abondante ! Le cycle végétal est accompli avec succès !', { language: 'fr-FR' });
              setTimeout(() => onAnswer(question.ans || 'Eau et Soleil ☀️💧'), 800);
            }}
          >
            <Text style={styles.harvestBtnText}>🌽 RÉCOLTER LE MAÏS MÛR ! ✨</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.gardenHintText}>
            {waterCount === 0 ? '💧 Ajoute de l\'eau pour faire germer la graine !' : sunCount === 0 ? '☀️ Le soleil est nécessaire pour la photosynthèse !' : 'Continue à soigner la plante !'}
          </Text>
        )}
      </View>

      <Text style={styles.curriculumQuestionText}>
        {question.q || 'De quoi la jeune pousse de maïs a-t-elle absolument besoin pour grandir ?'}
      </Text>

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

// --- GAME 30: PHONICS FISHING (INTERACTIVE CAST & REEL ENGINE) ---
export function PhonicsFishing({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const targetSound = question.targetSound || 'B';
  const options = question.options || ['B', 'D', 'P', 'T'];

  // Rod aim position (0 to 3)
  const [aimPosition, setAimPosition] = useState<number>(1);
  const [isCasting, setIsCasting] = useState<boolean>(false);
  const [hookDepth, setHookDepth] = useState<number>(10);
  const [caughtFish, setCaughtFish] = useState<string | null>(null);
  const [fishSwimOffset, setFishSwimOffset] = useState<number>(0);
  const [catchesCount, setCatchesCount] = useState<number>(0);

  // Wiggle fish animation on render
  React.useEffect(() => {
    const timer = setInterval(() => {
      setFishSwimOffset(prev => (prev === 0 ? 8 : prev === 8 ? -8 : 0));
    }, 600);
    return () => clearInterval(timer);
  }, []);

  const handleCastLine = () => {
    if (isCasting) return;
    setIsCasting(true);
    setHookDepth(85); // Drop hook deep into river
    Speech.speak('Lancer de ligne dans le fleuve Wouri !', { language: 'fr-FR' });

    setTimeout(() => {
      const selectedLetter = options[aimPosition] || 'B';
      if (selectedLetter === targetSound || selectedLetter === question.ans) {
        setCaughtFish(selectedLetter);
        setCatchesCount(c => c + 1);
        Speech.speak(`Bravo ! Tu as pêché le poisson ${selectedLetter} !`, { language: 'fr-FR' });
        setTimeout(() => {
          setIsCasting(false);
          setHookDepth(10);
          setCaughtFish(null);
          onAnswer(selectedLetter);
        }, 1200);
      } else {
        Speech.speak(`Ce poisson porte la lettre ${selectedLetter}. Cherche le son ${targetSound} !`, { language: 'fr-FR' });
        setTimeout(() => {
          setIsCasting(false);
          setHookDepth(10);
        }, 1000);
      }
    }, 900);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>🎣 La Pêche aux Sons (Fleuve Wouri)</Text>
      <Text style={styles.promptText}>
        Vise et lance ta canne pour pêcher le poisson du son <Text style={{ color: '#0284C7', fontWeight: 'bold' }}>"{targetSound}"</Text> !
      </Text>

      {/* River Simulation Box */}
      <View style={styles.riverContainer}>
        {/* Riverbank & Fishing Rod */}
        <View style={styles.fishingPier}>
          <Text style={styles.fishermanIcon}>🧒🏾🎣</Text>
          <View style={styles.fishingLineWrapper}>
            <View style={[styles.fishingLine, { height: hookDepth, left: `${20 + aimPosition * 22}%` }]} />
            <Text style={[styles.fishingHook, { top: hookDepth - 4, left: `${16 + aimPosition * 22}%` }]}>
              {caughtFish ? `🐟✨ ${caughtFish}` : '🪝'}
            </Text>
          </View>
        </View>

        {/* River Water Currents with Swimming Fish */}
        <View style={styles.riverWaterBox}>
          <View style={styles.waterWavesRow}>
            <Text style={styles.waveText}>〰️ 〰️ 〰️ 〰️ 〰️ 〰️ 〰️</Text>
          </View>

          {/* Swimming Fish at Distinct Lanes */}
          <View style={styles.fishSchoolRow}>
            {options.map((letter: string, idx: number) => {
              const isTargetLane = aimPosition === idx;
              return (
                <TouchableOpacity
                  key={`fish_${letter}_${idx}`}
                  style={[
                    styles.swimmingFishCard,
                    isTargetLane && styles.targetLaneHighlight,
                    { transform: [{ translateY: (idx % 2 === 0 ? fishSwimOffset : -fishSwimOffset) }] }
                  ]}
                  onPress={() => setAimPosition(idx)}
                >
                  <Text style={styles.fishEmoji}>🐠</Text>
                  <View style={styles.letterBubble}>
                    <Text style={styles.letterBubbleText}>{letter}</Text>
                  </View>
                  <Text style={styles.laneMarkerText}>{isTargetLane ? '🎯 VISE' : '📍'}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>

      {/* Pier Controls */}
      <View style={styles.pierControlsRow}>
        <TouchableOpacity 
          style={styles.aimMoveBtn}
          onPress={() => setAimPosition(p => Math.max(0, p - 1))}
          disabled={isCasting}
        >
          <Text style={styles.aimBtnText}>⬅️ Déplacer Canne</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.castActionBtn, isCasting && styles.castBtnDisabled]}
          onPress={handleCastLine}
          disabled={isCasting}
        >
          <Text style={styles.castBtnText}>{isCasting ? '⏳ Pêche en cours...' : '🎣 LANCER LA LIGNE !'}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.aimMoveBtn}
          onPress={() => setAimPosition(p => Math.min(options.length - 1, p + 1))}
          disabled={isCasting}
        >
          <Text style={styles.aimBtnText}>Déplacer Canne ➡️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 15, width: '100%' },
  gameTitle: { fontSize: 22, fontWeight: 'bold', color: '#1E3A8A', marginBottom: 6 },
  promptText: { fontSize: 16, color: '#334155', textAlign: 'center', marginBottom: 20 },

  // Racing
  racetrack: { width: '100%', maxWidth: 440, height: 75, backgroundColor: '#334155', borderRadius: 20, justifyContent: 'center', paddingHorizontal: 15, marginBottom: 12, position: 'relative', overflow: 'hidden' },
  trackLine: { height: 2, backgroundColor: '#FDE047', borderStyle: 'dashed', borderWidth: 1, borderColor: '#FDE047', width: '100%' },
  trackSceneryRow: { position: 'absolute', top: 4, left: 12, right: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sceneryItem: { fontSize: 14, color: '#94A3B8' },
  speedLinesRow: { position: 'absolute', bottom: 4, width: '100%', alignItems: 'center' },
  speedLineText: { color: '#FCD34D', fontSize: 13, letterSpacing: 3, fontWeight: 'bold' },
  raceCarWrapper: { position: 'absolute', bottom: 12 },
  raceCar: { fontSize: 34 },
  finishFlag: { fontSize: 26 },
  speedometerBox: { backgroundColor: '#1E293B', paddingVertical: 6, paddingHorizontal: 14, borderRadius: 14, marginBottom: 16 },
  speedometerText: { color: '#38BDF8', fontWeight: 'bold', fontSize: 14 },
  equationCard: { backgroundColor: '#EFF6FF', paddingVertical: 14, paddingHorizontal: 30, borderRadius: 20, borderWidth: 2, borderColor: '#93C5FD', marginBottom: 20 },
  equationBig: { fontSize: 36, fontWeight: 'bold', color: '#1E40AF' },

  // Treasure Hunt
  treasureMap: { gap: 12, width: '100%', maxWidth: 380 },
  islandBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FEF3C7', padding: 14, borderRadius: 18, borderWidth: 2, borderColor: '#F59E0B' },
  islandIcon: { fontSize: 36, marginRight: 12 },
  islandName: { fontSize: 16, fontWeight: 'bold', color: '#78350F', flex: 1 },
  islandValBadge: { backgroundColor: '#FDE68A', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10, fontWeight: 'bold', color: '#92400E' },

  // Robot Factory
  robotAssemblyBox: { backgroundColor: '#F8FAFC', padding: 16, borderRadius: 24, borderWidth: 3, borderColor: '#CBD5E1', alignItems: 'center', width: '100%', maxWidth: 380, marginBottom: 15 },
  robotHeaderRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 8 },
  robotGearIcon: { fontSize: 24 },
  robotHeadIcon: { fontSize: 48 },
  manipulativesBox: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', backgroundColor: 'white', padding: 12, borderRadius: 16, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 10, minHeight: 70 },
  tensRodsArea: { flexDirection: 'row', gap: 6, alignItems: 'center', justifyContent: 'center', minWidth: 120 },
  blueTenRod: { width: 14, height: 60, backgroundColor: '#2563EB', borderRadius: 3, justifyContent: 'space-between', paddingVertical: 2 },
  rodSegment: { height: 3, width: '100%', backgroundColor: '#93C5FD' },
  onesCubesArea: { flexDirection: 'row', flexWrap: 'wrap', gap: 4, alignItems: 'center', justifyContent: 'center', maxWidth: 120 },
  goldUnitCube: { width: 18, height: 18, backgroundColor: '#F59E0B', borderRadius: 4, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#B45309' },
  cubeLabel: { fontSize: 9, fontWeight: 'bold', color: 'white' },
  emptyManipText: { fontSize: 12, color: '#94A3B8', fontStyle: 'italic', alignSelf: 'center' },
  gaugeContainer: { width: '100%', height: 10, backgroundColor: '#E2E8F0', borderRadius: 5, overflow: 'hidden', marginVertical: 6 },
  gaugeFill: { height: '100%' },
  robotEnergyText: { fontSize: 13, color: '#475569' },
  robotControlsRow: { flexDirection: 'row', gap: 15, marginBottom: 15 },
  partCard: { backgroundColor: '#EFF6FF', padding: 12, borderRadius: 16, borderWidth: 2, borderColor: '#BFDBFE', alignItems: 'center', width: 150 },
  partLabel: { fontSize: 12, fontWeight: 'bold', color: '#1E40AF' },
  partCountText: { fontSize: 18, fontWeight: 'bold', color: '#1D4ED8', marginVertical: 4 },
  miniBtnRow: { flexDirection: 'row', gap: 12 },
  stepBtn: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#3B82F6', alignItems: 'center', justifyContent: 'center' },
  stepText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  activateRobotBtn: { backgroundColor: '#10B981', paddingVertical: 14, paddingHorizontal: 26, borderRadius: 16, elevation: 4 },
  activateRobotText: { color: 'white', fontSize: 16, fontWeight: 'bold' },

  // Castle
  castleCardBox: { alignItems: 'center', marginBottom: 20 },
  castleWallTurrets: { marginBottom: 6 },
  castleDoor: { backgroundColor: '#334155', padding: 18, borderRadius: 20, borderWidth: 3, borderColor: '#64748B', alignItems: 'center', width: 180, marginBottom: 8 },
  castleGateIcon: { fontSize: 24, fontWeight: 'bold', color: 'white' },
  castleLockWord: { fontSize: 22, fontWeight: 'bold', color: '#FDE047', marginTop: 4 },
  drawbridgeStatus: { fontSize: 13, color: '#475569', fontWeight: 'bold' },

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
  marketStallBox: { width: '100%', maxWidth: 420, alignItems: 'center', marginBottom: 12 },
  merchantRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  merchantSpeechBubble: { backgroundColor: '#FEF3C7', paddingVertical: 8, paddingHorizontal: 14, borderRadius: 16, borderWidth: 1, borderColor: '#FDE68A', flex: 1 },
  merchantSpeechText: { fontSize: 13, color: '#78350F', fontWeight: 'bold' },
  marketPlate: { backgroundColor: '#ECFDF5', padding: 14, borderRadius: 22, borderWidth: 2, borderColor: '#A7F3D0', alignItems: 'center', width: '100%' },
  marketPriceLabel: { fontSize: 14, fontWeight: 'bold', color: '#047857', marginTop: 2 },
  coinsTray: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, justifyContent: 'center', marginVertical: 8, minHeight: 34, alignItems: 'center' },
  miniTrayCoin: { backgroundColor: '#FEF08A', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 10, borderWidth: 1, borderColor: '#CA8A04' },
  miniTrayCoinText: { fontSize: 12, fontWeight: 'bold', color: '#854D0E' },
  emptyTrayText: { fontSize: 12, color: '#94A3B8', fontStyle: 'italic' },
  totalDepositedText: { fontSize: 13, color: '#334155' },
  purseTitle: { fontSize: 13, fontWeight: 'bold', color: '#475569', marginBottom: 6 },
  cfaCoinBtn: { paddingVertical: 10, paddingHorizontal: 16, borderRadius: 18, backgroundColor: '#FEF08A', borderWidth: 2, borderColor: '#CA8A04' },
  cfaCoinText: { fontSize: 15, fontWeight: 'bold', color: '#854D0E' },
  marketActionRow: { flexDirection: 'row', gap: 12, alignItems: 'center', marginTop: 12 },
  payMerchantBtn: { backgroundColor: '#10B981', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 16, elevation: 3 },
  payMerchantBtnText: { color: 'white', fontWeight: 'bold', fontSize: 14 },

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
  gardenSimBox: { backgroundColor: '#F0FDF4', padding: 16, borderRadius: 22, borderWidth: 2, borderColor: '#86EFAC', alignItems: 'center', width: '100%', maxWidth: 400, marginBottom: 14 },
  gardenCenter: { width: 110, height: 110, borderRadius: 55, backgroundColor: '#DCFCE7', alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  gardenStageLabel: { fontSize: 13, fontWeight: 'bold', color: '#166534', marginBottom: 8 },
  gardenMetersRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  meterBadge: { backgroundColor: 'white', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 10, fontSize: 11, fontWeight: 'bold', color: '#15803D', borderWidth: 1, borderColor: '#BBF7D0' },
  gardenToolsRow: { flexDirection: 'row', gap: 10 },
  gardenToolBtn: { backgroundColor: '#DCFCE7', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 12, borderWidth: 1, borderColor: '#4ADE80' },
  gardenToolBtnText: { fontSize: 12, fontWeight: 'bold', color: '#14532D' },
  harvestActionBtn: { backgroundColor: '#15803D', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 16, marginTop: 10, elevation: 4 },
  harvestBtnText: { color: 'white', fontWeight: 'bold', fontSize: 14 },
  gardenHintText: { fontSize: 12, color: '#166534', fontStyle: 'italic', marginTop: 8 },
  curriculumQuestionText: { fontSize: 14, fontWeight: 'bold', color: '#1E293B', textAlign: 'center', marginBottom: 12 },

  // Phonics Fishing (Interactive)
  riverContainer: { width: '100%', maxWidth: 420, backgroundColor: '#0284C7', borderRadius: 24, overflow: 'hidden', borderWidth: 3, borderColor: '#0369A1', marginBottom: 15 },
  fishingPier: { backgroundColor: '#78350F', paddingVertical: 8, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  fishermanIcon: { fontSize: 28 },
  fishingLineWrapper: { flex: 1, height: 20, position: 'relative' },
  fishingLine: { position: 'absolute', top: 0, width: 2, backgroundColor: '#FFFFFF' },
  fishingHook: { position: 'absolute', fontSize: 18 },
  riverWaterBox: { backgroundColor: '#0EA5E9', padding: 12, minHeight: 140, justifyContent: 'space-between' },
  waterWavesRow: { alignItems: 'center', opacity: 0.6 },
  waveText: { color: '#BAE6FD', fontSize: 12, letterSpacing: 4 },
  fishSchoolRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 10 },
  swimmingFishCard: { backgroundColor: '#E0F2FE', padding: 8, borderRadius: 16, alignItems: 'center', minWidth: 60, borderWidth: 2, borderColor: '#38BDF8' },
  targetLaneHighlight: { borderColor: '#FACC15', backgroundColor: '#FEF08A', transform: [{ scale: 1.1 }] },
  fishEmoji: { fontSize: 26 },
  letterBubble: { backgroundColor: '#0284C7', borderRadius: 12, paddingHorizontal: 8, paddingVertical: 2, marginTop: 4 },
  letterBubbleText: { color: 'white', fontWeight: 'bold', fontSize: 14 },
  laneMarkerText: { fontSize: 9, fontWeight: 'bold', color: '#0369A1', marginTop: 2 },
  pierControlsRow: { flexDirection: 'row', gap: 8, alignItems: 'center', justifyContent: 'center', width: '100%', maxWidth: 420 },
  aimMoveBtn: { backgroundColor: '#0369A1', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 12 },
  aimBtnText: { color: 'white', fontSize: 11, fontWeight: 'bold' },
  castActionBtn: { backgroundColor: '#10B981', paddingVertical: 12, paddingHorizontal: 18, borderRadius: 16, elevation: 4 },
  castBtnDisabled: { opacity: 0.6 },
  castBtnText: { color: 'white', fontSize: 13, fontWeight: 'bold' },
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
