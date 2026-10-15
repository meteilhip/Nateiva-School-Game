import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import * as Speech from 'expo-speech';

// --- GAME 01: COLOR SPLASH ---
export function ColorSplash({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const targetColor = question.targetColor || 'Jaune';
  const targetCode = question.targetCode || '#EAB308';
  const [coloredItem, setColoredItem] = useState<string | null>(null);

  const colors = [
    { name: 'Rouge', code: '#EF4444' },
    { name: 'Bleu', code: '#3B82F6' },
    { name: 'Vert', code: '#10B981' },
    { name: 'Jaune', code: '#EAB308' },
    { name: 'Orange', code: '#F97316' }
  ];

  const handlePickColor = (color: any) => {
    setColoredItem(color.code);
    Speech.speak(`Couleur ${color.name}`, { language: 'fr-FR' });
    if (color.name.toLowerCase() === targetColor.toLowerCase()) {
      setTimeout(() => onAnswer(color.name), 800);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>🎨 Color Splash</Text>
      <Text style={styles.promptText}>{question.q || `Peins l'objet en ${targetColor} !`}</Text>
      
      {/* Object to Paint */}
      <View style={[styles.canvasObject, { backgroundColor: coloredItem || '#F1F5F9', borderColor: coloredItem ? '#0F172A' : '#CBD5E1' }]}>
        <Text style={styles.bigObjectIcon}>{question.itemIcon || '🥭'}</Text>
        <Text style={styles.objectLabel}>{question.itemName || 'Mangue'}</Text>
      </View>

      {/* Paint Palette */}
      <Text style={styles.subtext}>Choisis la bonne couleur dans la palette :</Text>
      <View style={styles.paletteRow}>
        {colors.map((c) => (
          <TouchableOpacity 
            key={c.name}
            style={[styles.paintBlob, { backgroundColor: c.code }]} 
            onPress={() => handlePickColor(c)}
          >
            <Text style={styles.paletteColorName}>{c.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// --- GAME 02: SHAPE SAFARI ---
export function ShapeSafari({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const targetShape = question.targetShape || 'Cercle';
  const safariItems = question.items || [
    { id: '1', shape: 'Cercle', icon: '🟡', label: 'Soleil' },
    { id: '2', shape: 'Triangle', icon: '📐', label: 'Montagne' },
    { id: '3', shape: 'Carré', icon: '🟧', label: 'Case' },
    { id: '4', shape: 'Cercle', icon: '⚽', label: 'Ballon' }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>🦁 Safari des Formes</Text>
      <Text style={styles.promptText}>Trouve tous les objets en forme de <Text style={{ color: '#E11D48', fontWeight: 'bold' }}>{targetShape}</Text> !</Text>
      
      <View style={styles.safariGrid}>
        {safariItems.map((item: any) => (
          <TouchableOpacity 
            key={item.id} 
            style={styles.safariCard}
            onPress={() => onAnswer(item.shape)}
          >
            <Text style={styles.safariEmoji}>{item.icon}</Text>
            <Text style={styles.safariLabel}>{item.label}</Text>
            <Text style={styles.safariShapeType}>({item.shape})</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// --- GAME 03: COUNT THE ANIMALS ---
export function CountTheAnimals({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const count = parseInt(question.ans) || 4;
  const animalIcon = question.animalIcon || '🐘';
  const [counted, setCounted] = useState<number[]>([]);

  const handleTap = (i: number) => {
    if (!counted.includes(i)) {
      setCounted([...counted, i]);
      Speech.speak(`${counted.length + 1}`, { language: 'fr-FR' });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>🐾 Compte les Animaux</Text>
      <Text style={styles.promptText}>{question.q || 'Touche chaque éléphant pour le faire barrir et compter !'}</Text>
      
      <View style={styles.animalsSavanna}>
        {Array.from({ length: count }).map((_, i) => {
          const isDone = counted.includes(i);
          return (
            <TouchableOpacity 
              key={i} 
              activeOpacity={0.8}
              style={[styles.animatedAnimal, isDone && styles.animalCounted]}
              onPress={() => handleTap(i)}
            >
              <Text style={styles.animalBigIcon}>{animalIcon}</Text>
              {isDone && <View style={styles.countBadge}><Text style={styles.countBadgeText}>{counted.indexOf(i) + 1}</Text></View>}
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.optionsRow}>
        {(question.options || ['2', '3', '4', '5']).map((opt: string) => (
          <TouchableOpacity key={opt} style={styles.choiceBtn} onPress={() => onAnswer(opt)}>
            <Text style={styles.choiceBtnText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// --- GAME 04: BUBBLE NUMBERS ---
export function BubbleNumbers({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const targetNum = question.ans || '5';
  const bubbles = question.options || ['2', '5', '8', '3'];

  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>🫧 Bulles Magiques</Text>
      <Text style={styles.promptText}>Éclate la bulle avec le nombre <Text style={{ color: '#2563EB', fontWeight: 'bold' }}>{targetNum}</Text> !</Text>
      
      <View style={styles.bubblesPond}>
        {bubbles.map((b: string) => (
          <TouchableOpacity 
            key={b} 
            activeOpacity={0.7}
            style={styles.floatingBubble}
            onPress={() => onAnswer(b)}
          >
            <Text style={styles.bubbleNumberText}>{b}</Text>
            <Text style={styles.bubbleShine}>✨</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// --- GAME 05: LETTER TRAIN ---
export function LetterTrain({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const sequence = question.sequence || ['A', 'B', 'C', '?'];
  const missing = question.ans || 'D';

  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>🚂 Le Train de l'Alphabet</Text>
      <Text style={styles.promptText}>Accroche le bon wagon pour continuer le train !</Text>

      {/* Train Cars */}
      <View style={styles.trainTrack}>
        <Text style={styles.trainEngine}>🚂💨</Text>
        {sequence.map((letter: string, idx: number) => (
          <View key={idx} style={[styles.trainCar, letter === '?' && styles.trainCarMissing]}>
            <Text style={styles.trainCarLetter}>{letter}</Text>
          </View>
        ))}
      </View>

      <View style={styles.optionsRow}>
        {(question.options || ['D', 'F', 'M', 'P']).map((opt: string) => (
          <TouchableOpacity key={opt} style={styles.choiceBtn} onPress={() => onAnswer(opt)}>
            <Text style={styles.choiceBtnText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// --- GAME 06: SOUND DETECTIVE ---
export function SoundDetective({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const soundName = question.soundName || 'Le rugissement du Lion';
  const soundPrompt = question.soundPrompt || 'Roooaaar !';

  const playSound = () => {
    Speech.speak(soundPrompt, { language: 'fr-FR', pitch: 0.8 });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>🔍 Détective des Sons</Text>
      <Text style={styles.promptText}>Écoute bien et devine quel animal fait ce bruit !</Text>

      <TouchableOpacity style={styles.bigSoundSpeaker} onPress={playSound}>
        <Text style={styles.speakerIcon}>📢</Text>
        <Text style={styles.speakerHint}>Touche pour écouter le son</Text>
      </TouchableOpacity>

      <View style={styles.optionsRow}>
        {(question.options || ['Lion 🦁', 'Oiseau 🦜', 'Grenouille 🐸', 'Mouton 🐑']).map((opt: string) => (
          <TouchableOpacity key={opt} style={styles.choiceCard} onPress={() => onAnswer(opt)}>
            <Text style={styles.choiceCardText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// --- GAME 07: ANIMAL HOMES ---
export function AnimalHomes({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const animal = question.animal || { name: 'Chimpanzé', icon: '🐒' };
  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>🏡 La Maison des Animaux</Text>
      <Text style={styles.promptText}>Où dort le {animal.name} ?</Text>

      <View style={styles.spotlightCard}>
        <Text style={styles.spotlightIcon}>{animal.icon}</Text>
        <Text style={styles.spotlightLabel}>{animal.name}</Text>
      </View>

      <View style={styles.optionsRow}>
        {(question.options || ['Dans les arbres 🌳', 'Dans l\'eau 🌊', 'Sous terre 🕳️']).map((home: string) => (
          <TouchableOpacity key={home} style={styles.homeChoiceBtn} onPress={() => onAnswer(home)}>
            <Text style={styles.homeChoiceText}>{home}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// --- GAME 08: PATTERN CATERPILLAR ---
export function PatternCaterpillar({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const segments = question.segments || ['🔴', '🟡', '🔴', '🟡', '❓'];
  const expected = question.ans || '🔴';

  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>🐛 La Chenille des Motifs</Text>
      <Text style={styles.promptText}>Complète la suite logique de la chenille :</Text>

      <View style={styles.caterpillarBody}>
        <Text style={styles.caterpillarHead}>👀🟢</Text>
        {segments.map((seg: string, i: number) => (
          <View key={i} style={styles.caterpillarSegment}>
            <Text style={styles.segmentText}>{seg}</Text>
          </View>
        ))}
      </View>

      <View style={styles.optionsRow}>
        {(question.options || ['🔴', '🟡', '🔵', '🟢']).map((opt: string) => (
          <TouchableOpacity key={opt} style={styles.choiceBtn} onPress={() => onAnswer(opt)}>
            <Text style={styles.choiceBtnText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// --- GAME 09: FRUIT BASKET ---
export function FruitBasket({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const targetQty = parseInt(question.ans) || 3;
  const fruitIcon = question.fruitIcon || '🍌';
  const [basketItems, setBasketItems] = useState<number>(0);

  const addItem = () => {
    if (basketItems < 6) {
      const next = basketItems + 1;
      setBasketItems(next);
      Speech.speak(`${next} banane${next > 1 ? 's' : ''}`, { language: 'fr-FR' });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>🧺 Le Panier de Fruits</Text>
      <Text style={styles.promptText}>Mets exactement <Text style={{ color: '#D97706', fontWeight: 'bold' }}>{targetQty}</Text> bananes dans le panier :</Text>

      <TouchableOpacity style={styles.bigBasketCard} onPress={addItem}>
        <Text style={styles.basketTopIcon}>🧺</Text>
        <View style={styles.basketContentsRow}>
          {Array.from({ length: basketItems }).map((_, i) => (
            <Text key={i} style={styles.insideFruit}>{fruitIcon}</Text>
          ))}
        </View>
        <Text style={styles.basketBadgeCount}>{basketItems} / {targetQty}</Text>
        <Text style={styles.tapInstruction}>+ Touche pour ajouter des bananes</Text>
      </TouchableOpacity>

      <View style={styles.buttonActionsRow}>
        <TouchableOpacity style={styles.resetMiniBtn} onPress={() => setBasketItems(0)}>
          <Text style={styles.resetMiniText}>Vider</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.confirmMiniBtn} onPress={() => onAnswer(basketItems.toString())}>
          <Text style={styles.confirmMiniText}>Donner le panier !</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// --- GAME 10: PICTURE MEMORY ---
export function PictureMemory({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const cards = question.cards || [
    { id: '1', match: 'A', icon: '🦁' },
    { id: '2', match: 'A', icon: '🦁' },
    { id: '3', match: 'B', icon: '🥭' },
    { id: '4', match: 'B', icon: '🥭' }
  ];
  const [flipped, setFlipped] = useState<number[]>([]);
  const [solved, setSolved] = useState<string[]>([]);

  const handleFlip = (i: number) => {
    if (flipped.includes(i) || solved.includes(cards[i].match)) return;
    const nextFlipped = [...flipped, i];
    setFlipped(nextFlipped);

    if (nextFlipped.length === 2) {
      if (cards[nextFlipped[0]].match === cards[nextFlipped[1]].match) {
        const nextSolved = [...solved, cards[nextFlipped[0]].match];
        setSolved(nextSolved);
        setFlipped([]);
        if (nextSolved.length === cards.length / 2) {
          setTimeout(() => onAnswer('COMPLETED'), 700);
        }
      } else {
        setTimeout(() => setFlipped([]), 900);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>🃏 Mémoire en Images</Text>
      <Text style={styles.promptText}>Retrouve les 2 paires cachées !</Text>

      <View style={styles.memoryGrid}>
        {cards.map((card: any, idx: number) => {
          const isOpen = flipped.includes(idx) || solved.includes(card.match);
          return (
            <TouchableOpacity 
              key={idx} 
              style={[styles.memCardBox, isOpen ? styles.memCardOpen : styles.memCardClosed]}
              onPress={() => handleFlip(idx)}
            >
              <Text style={styles.memCardEmoji}>{isOpen ? card.icon : '❓'}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

// --- GAME 11: DANCING LETTERS ---
export function DancingLetters({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const targetLetter = question.targetLetter || 'A';
  const options = question.options || ['A', 'E', 'I', 'O'];

  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>💃 Les Lettres Dansantes</Text>
      <Text style={styles.promptText}>Attrape la lettre qui danse : <Text style={{ color: '#7C3AED', fontWeight: 'bold' }}>{targetLetter}</Text> !</Text>

      <View style={styles.dancingStage}>
        {options.map((lettr: string) => (
          <TouchableOpacity 
            key={lettr} 
            style={styles.dancingLetterBtn}
            onPress={() => onAnswer(lettr)}
          >
            <Text style={styles.dancingLetterText}>{lettr}</Text>
            <Text style={styles.dancingMusicNotes}>🎵</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// --- GAME 12: STORY PUPPET SHOW ---
export function StoryPuppetShow({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const storyLine = question.storyLine || 'Le petit singe Kiki a très faim. Que doit-il cueillir sur l\'arbre ?';
  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>🎭 Le Théâtre de Marionnettes</Text>
      <Text style={styles.puppetNarrative}>{storyLine}</Text>

      <View style={styles.puppetStageBox}>
        <Text style={styles.puppetIcon}>🐒</Text>
        <Text style={styles.puppetSpeech}>"J'ai un petit creux..."</Text>
      </View>

      <View style={styles.optionsRow}>
        {(question.options || ['Des bananes sucrées 🍌', 'Des cailloux 🪨', 'Une chaussure 👟']).map((opt: string) => (
          <TouchableOpacity key={opt} style={styles.choiceCard} onPress={() => onAnswer(opt)}>
            <Text style={styles.choiceCardText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// --- GAME 13: SIZE SORTING ---
export function SizeSorting({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const prompt = question.q || 'Touche le PLUS GRAND éléphant :';
  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>📏 Du Petit au Grand</Text>
      <Text style={styles.promptText}>{prompt}</Text>

      <View style={styles.sizeCompareRow}>
        <TouchableOpacity style={styles.sizeBox} onPress={() => onAnswer('PETIT')}>
          <Text style={{ fontSize: 30 }}>🐘</Text>
          <Text style={styles.sizeLabel}>Petit</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sizeBox} onPress={() => onAnswer('MOYEN')}>
          <Text style={{ fontSize: 50 }}>🐘</Text>
          <Text style={styles.sizeLabel}>Moyen</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sizeBox} onPress={() => onAnswer('GRAND')}>
          <Text style={{ fontSize: 75 }}>🐘</Text>
          <Text style={styles.sizeLabel}>Grand</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// --- GAME 14: SHADOW MATCH ---
export function ShadowMatch({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const targetShadow = question.targetShadow || '🦒';
  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>👥 L'Ombre Mystère</Text>
      <Text style={styles.promptText}>À quel animal appartient cette silhouette ?</Text>

      <View style={styles.silhouetteCard}>
        <Text style={styles.silhouetteEmoji}>⬛ {targetShadow}</Text>
      </View>

      <View style={styles.optionsRow}>
        {(question.options || ['Girafe 🦒', 'Lion 🦁', 'Zèbre 🦓', 'Hippopotame 🦛']).map((opt: string) => (
          <TouchableOpacity key={opt} style={styles.choiceCard} onPress={() => onAnswer(opt)}>
            <Text style={styles.choiceCardText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// --- GAME 15: RAINBOW BRIDGE ---
export function RainbowBridge({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const bridgeColors = question.colors || ['🟥', '🟧', '🟨', '🟩', '❓'];
  const ans = question.ans || '🟦';

  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>🌈 Le Pont Arc-en-Ciel</Text>
      <Text style={styles.promptText}>Place la bonne pierre magique pour terminer le pont !</Text>

      <View style={styles.rainbowRow}>
        {bridgeColors.map((c: string, idx: number) => (
          <View key={idx} style={styles.rainbowStone}>
            <Text style={{ fontSize: 32 }}>{c}</Text>
          </View>
        ))}
      </View>

      <View style={styles.optionsRow}>
        {(question.options || ['🟦', '🟫', '⬛', '⬜']).map((opt: string) => (
          <TouchableOpacity key={opt} style={styles.choiceBtn} onPress={() => onAnswer(opt)}>
            <Text style={{ fontSize: 32 }}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// --- GAME: BLOCK STACK (FALLING-BLOCK ARITHMETIC PUZZLE) ---
export function BlockStack({ question, onAnswer }: { question?: any, onAnswer: (ans: string) => void }) {
  const targetSum = (question && question.ans) ? parseInt(question.ans) : 6;
  const COLS = 5;
  const ROWS = 6;

  // Grid represented as 2D array of numbers or null
  const [grid, setGrid] = useState<(number | null)[][]>(() => 
    Array.from({ length: ROWS }, () => Array(COLS).fill(null))
  );

  // Active falling piece: shape offsets relative to anchor [r, c]
  const [pieceCol, setPieceCol] = useState(2);
  const [pieceRow, setPieceRow] = useState(0);
  const [pieceVal, setPieceVal] = useState(2);
  const [orientation, setOrientation] = useState(0); // 0: horizontal, 1: vertical
  const [clearedCount, setClearedCount] = useState(0);
  const [comboSparkle, setComboSparkle] = useState(false);

  // Get current cells occupied by active piece
  const getPieceCells = (r: number, c: number, ori: number) => {
    if (ori === 0) {
      return [{ r, c }, { r, c: c + 1 }];
    } else {
      return [{ r, c }, { r: r + 1, c }];
    }
  };

  const isCollision = (r: number, c: number, ori: number, currentGrid: (number | null)[][]) => {
    const cells = getPieceCells(r, c, ori);
    for (const cell of cells) {
      if (cell.c < 0 || cell.c >= COLS || cell.r >= ROWS) return true;
      if (cell.r >= 0 && currentGrid[cell.r][cell.c] !== null) return true;
    }
    return false;
  };

  // Move Left
  const handleMoveLeft = () => {
    if (!isCollision(pieceRow, pieceCol - 1, orientation, grid)) {
      setPieceCol(c => c - 1);
    }
  };

  // Move Right
  const handleMoveRight = () => {
    if (!isCollision(pieceRow, pieceCol + 1, orientation, grid)) {
      setPieceCol(c => c + 1);
    }
  };

  // Rotate 90 degrees
  const handleRotate = () => {
    const nextOri = orientation === 0 ? 1 : 0;
    if (!isCollision(pieceRow, pieceCol, nextOri, grid)) {
      setOrientation(nextOri);
      Speech.speak('Rotation !', { language: 'fr-FR' });
    }
  };

  // Drop down by 1 row or lock
  const handleDropStep = () => {
    if (!isCollision(pieceRow + 1, pieceCol, orientation, grid)) {
      setPieceRow(r => r + 1);
    } else {
      // Lock piece into grid
      const newGrid = grid.map(row => [...row]);
      const cells = getPieceCells(pieceRow, pieceCol, orientation);
      cells.forEach(cell => {
        if (cell.r >= 0 && cell.r < ROWS && cell.c >= 0 && cell.c < COLS) {
          newGrid[cell.r][cell.c] = pieceVal;
        }
      });

      // Check line clears or sum matches
      let clears = 0;
      for (let r = 0; r < ROWS; r++) {
        const rowSum = newGrid[r].reduce((sum: number, val) => sum + (val || 0), 0);
        const rowFull = newGrid[r].every(val => val !== null);
        if (rowFull || rowSum === targetSum) {
          newGrid.splice(r, 1);
          newGrid.unshift(Array(COLS).fill(null));
          clears++;
        }
      }

      if (clears > 0) {
        setComboSparkle(true);
        const newTotal = clearedCount + clears;
        setClearedCount(newTotal);
        Speech.speak('Ligne complétée ! Bravo !', { language: 'fr-FR' });
        setTimeout(() => setComboSparkle(false), 800);
        if (newTotal >= 2) {
          Speech.speak('Victoire Tetris Math !', { language: 'fr-FR' });
          setTimeout(() => onAnswer(String(targetSum)), 900);
          return;
        }
      }

      // Spawn next piece
      setGrid(newGrid);
      setPieceRow(0);
      setPieceCol(2);
      setOrientation(0);
      setPieceVal(Math.floor(Math.random() * 3) + 1);
    }
  };

  const activeCells = getPieceCells(pieceRow, pieceCol, orientation);

  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>🧱 Block Stack (Tetris Math)</Text>
      <Text style={styles.promptText}>
        Fais pivoter et empile les blocs pour atteindre la somme <Text style={{ color: '#2563EB', fontWeight: 'bold' }}>{targetSum}</Text> ou compléter une ligne !
      </Text>

      {/* Tetris Board */}
      <View style={styles.tetrisContainer}>
        <View style={styles.tetrisHeader}>
          <Text style={styles.tetrisStat}>Cible : 🎯 {targetSum}</Text>
          <Text style={styles.tetrisStat}>Lignes : ⭐ {clearedCount}/2</Text>
          {comboSparkle && <Text style={styles.sparkleBadge}>✨ COMBO ! ✨</Text>}
        </View>

        <View style={styles.tetrisGrid}>
          {grid.map((row, r) => (
            <View key={`row_${r}`} style={styles.tetrisRow}>
              {row.map((cellVal, c) => {
                const isActive = activeCells.some(cell => cell.r === r && cell.c === c);
                const displayVal = isActive ? pieceVal : cellVal;
                return (
                  <View 
                    key={`cell_${r}_${c}`} 
                    style={[
                      styles.tetrisCell,
                      cellVal !== null && styles.tetrisCellOccupied,
                      isActive && styles.tetrisCellFalling
                    ]}
                  >
                    {displayVal !== null && (
                      <Text style={styles.tetrisCellText}>{displayVal}</Text>
                    )}
                  </View>
                );
              })}
            </View>
          ))}
        </View>

        {/* Player Controls */}
        <View style={styles.tetrisControlsRow}>
          <TouchableOpacity style={styles.tetrisBtn} onPress={handleMoveLeft}>
            <Text style={styles.tetrisBtnIcon}>⬅️</Text>
            <Text style={styles.tetrisBtnLabel}>Gauche</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.tetrisBtn, styles.tetrisRotateBtn]} onPress={handleRotate}>
            <Text style={styles.tetrisBtnIcon}>🔄</Text>
            <Text style={styles.tetrisBtnLabel}>Tourner</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tetrisBtn} onPress={handleMoveRight}>
            <Text style={styles.tetrisBtnIcon}>➡️</Text>
            <Text style={styles.tetrisBtnLabel}>Droite</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.tetrisBtn, styles.tetrisDropBtn]} onPress={handleDropStep}>
            <Text style={styles.tetrisBtnIcon}>⬇️</Text>
            <Text style={styles.tetrisBtnLabel}>Descendre</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 15, width: '100%' },
  gameTitle: { fontSize: 22, fontWeight: 'bold', color: '#1E3A8A', marginBottom: 6 },
  promptText: { fontSize: 16, color: '#334155', textAlign: 'center', marginBottom: 20 },
  subtext: { fontSize: 14, color: '#64748B', marginBottom: 12 },

  // Color Splash
  canvasObject: { width: 140, height: 140, borderRadius: 30, borderWidth: 4, alignItems: 'center', justifyContent: 'center', marginBottom: 25 },
  bigObjectIcon: { fontSize: 65 },
  objectLabel: { fontSize: 14, fontWeight: 'bold', color: '#1E293B', marginTop: 4 },
  paletteRow: { flexDirection: 'row', gap: 12, justifyContent: 'center' },
  paintBlob: { width: 65, height: 65, borderRadius: 32.5, alignItems: 'center', justifyContent: 'center', elevation: 4 },
  paletteColorName: { fontSize: 11, fontWeight: 'bold', color: 'white' },

  // Shape Safari
  safariGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 15, justifyContent: 'center', maxWidth: 400 },
  safariCard: { width: 120, padding: 16, backgroundColor: '#FFFBEB', borderWidth: 2, borderColor: '#FDE68A', borderRadius: 20, alignItems: 'center' },
  safariEmoji: { fontSize: 45, marginBottom: 4 },
  safariLabel: { fontSize: 14, fontWeight: 'bold', color: '#78350F' },
  safariShapeType: { fontSize: 11, color: '#B45309' },

  // Count Animals
  animalsSavanna: { flexDirection: 'row', flexWrap: 'wrap', gap: 15, justifyContent: 'center', maxWidth: 420, marginBottom: 25 },
  animatedAnimal: { width: 80, height: 80, backgroundColor: '#DCFCE7', borderRadius: 20, borderWidth: 3, borderColor: '#22C55E', alignItems: 'center', justifyContent: 'center' },
  animalCounted: { backgroundColor: '#BBF7D0', borderColor: '#15803D', transform: [{ scale: 0.95 }] },
  animalBigIcon: { fontSize: 42 },
  countBadge: { position: 'absolute', top: -8, right: -8, backgroundColor: '#16A34A', width: 26, height: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  countBadgeText: { color: 'white', fontWeight: 'bold', fontSize: 13 },

  // Bubble Numbers
  bubblesPond: { flexDirection: 'row', flexWrap: 'wrap', gap: 20, justifyContent: 'center', maxWidth: 360 },
  floatingBubble: { width: 85, height: 85, borderRadius: 42.5, backgroundColor: '#DBEAFE', borderWidth: 3, borderColor: '#3B82F6', alignItems: 'center', justifyContent: 'center', elevation: 4 },
  bubbleNumberText: { fontSize: 36, fontWeight: 'bold', color: '#1E40AF' },
  bubbleShine: { position: 'absolute', top: 8, right: 12, fontSize: 12 },

  // Train
  trainTrack: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 25, backgroundColor: '#F1F5F9', padding: 12, borderRadius: 16 },
  trainEngine: { fontSize: 36 },
  trainCar: { width: 50, height: 50, backgroundColor: '#3B82F6', borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  trainCarMissing: { backgroundColor: '#CBD5E1', borderStyle: 'dashed', borderWidth: 2, borderColor: '#94A3B8' },
  trainCarLetter: { fontSize: 24, fontWeight: 'bold', color: 'white' },

  // Sound Detective
  bigSoundSpeaker: { width: 140, height: 140, borderRadius: 70, backgroundColor: '#FEF3C7', borderWidth: 4, borderColor: '#F59E0B', alignItems: 'center', justifyContent: 'center', marginBottom: 25 },
  speakerIcon: { fontSize: 60 },
  speakerHint: { fontSize: 10, color: '#B45309', fontWeight: 'bold', marginTop: 4 },

  // Animal Homes
  spotlightCard: { backgroundColor: '#EFF6FF', padding: 16, borderRadius: 24, borderWidth: 3, borderColor: '#93C5FD', alignItems: 'center', width: 150, marginBottom: 20 },
  spotlightIcon: { fontSize: 60 },
  spotlightLabel: { fontSize: 18, fontWeight: 'bold', color: '#1E40AF', marginTop: 4 },
  homeChoiceBtn: { backgroundColor: '#F8FAFC', paddingVertical: 14, paddingHorizontal: 20, borderRadius: 16, borderWidth: 2, borderColor: '#CBD5E1', marginBottom: 10, width: '100%', maxWidth: 360, alignItems: 'center' },
  homeChoiceText: { fontSize: 16, fontWeight: 'bold', color: '#1E293B' },

  // Caterpillar
  caterpillarBody: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 25 },
  caterpillarHead: { fontSize: 32 },
  caterpillarSegment: { width: 45, height: 45, borderRadius: 22.5, backgroundColor: '#F1F5F9', alignItems: 'center', justifyContent: 'center' },
  segmentText: { fontSize: 24 },

  // Fruit Basket
  bigBasketCard: { backgroundColor: '#FFFBEB', padding: 20, borderRadius: 24, borderWidth: 3, borderColor: '#FDE68A', alignItems: 'center', width: 220, marginBottom: 20 },
  basketTopIcon: { fontSize: 45 },
  basketContentsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, minHeight: 40, justifyContent: 'center', marginVertical: 8 },
  insideFruit: { fontSize: 32 },
  basketBadgeCount: { fontSize: 18, fontWeight: 'bold', color: '#D97706' },
  tapInstruction: { fontSize: 11, color: '#B45309', marginTop: 4 },
  buttonActionsRow: { flexDirection: 'row', gap: 15 },
  resetMiniBtn: { backgroundColor: '#E2E8F0', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 12 },
  resetMiniText: { color: '#475569', fontWeight: 'bold' },
  // Tetris Block Stack
  tetrisContainer: { width: '100%', maxWidth: 360, backgroundColor: '#1E293B', padding: 14, borderRadius: 24, alignItems: 'center', borderWidth: 3, borderColor: '#334155' },
  tetrisHeader: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 10, paddingHorizontal: 6, alignItems: 'center' },
  tetrisStat: { color: '#F8FAFC', fontWeight: 'bold', fontSize: 14 },
  sparkleBadge: { color: '#FACC15', fontWeight: 'bold', fontSize: 14 },
  tetrisGrid: { backgroundColor: '#0F172A', padding: 6, borderRadius: 16, borderWidth: 2, borderColor: '#475569' },
  tetrisRow: { flexDirection: 'row' },
  tetrisCell: { width: 44, height: 44, margin: 2, backgroundColor: '#1E293B', borderRadius: 8, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#334155' },
  tetrisCellOccupied: { backgroundColor: '#3B82F6', borderColor: '#60A5FA' },
  tetrisCellFalling: { backgroundColor: '#F59E0B', borderColor: '#FDE047' },
  tetrisCellText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
  tetrisControlsRow: { flexDirection: 'row', gap: 10, marginTop: 14, justifyContent: 'center' },
  tetrisBtn: { backgroundColor: '#334155', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 14, alignItems: 'center', minWidth: 64 },
  tetrisRotateBtn: { backgroundColor: '#8B5CF6' },
  tetrisDropBtn: { backgroundColor: '#10B981' },
  tetrisBtnIcon: { fontSize: 20 },
  tetrisBtnLabel: { color: 'white', fontSize: 10, fontWeight: 'bold', marginTop: 2 },

  // Story Puppet, Size, Shadow & Rainbow Styles
  puppetNarrative: { fontSize: 15, color: '#475569', textAlign: 'center', marginBottom: 15, paddingHorizontal: 12 },
  puppetStageBox: { backgroundColor: '#FEF3C7', padding: 20, borderRadius: 20, borderWidth: 2, borderColor: '#FDE68A', alignItems: 'center', marginBottom: 20, width: '100%', maxWidth: 320 },
  puppetIcon: { fontSize: 50, marginBottom: 8 },
  puppetSpeech: { fontSize: 15, fontStyle: 'italic', color: '#92400E', fontWeight: 'bold' },
  optionsRow: { flexDirection: 'column', gap: 10, width: '100%', maxWidth: 340 },
  choiceCard: { backgroundColor: '#F8FAFC', padding: 14, borderRadius: 16, borderWidth: 2, borderColor: '#CBD5E1', alignItems: 'center' },
  choiceCardText: { fontSize: 15, fontWeight: 'bold', color: '#1E293B' },
  sizeCompareRow: { flexDirection: 'row', gap: 15, alignItems: 'flex-end', justifyContent: 'center', marginTop: 20 },
  sizeBox: { backgroundColor: '#F1F5F9', padding: 12, borderRadius: 16, alignItems: 'center', borderWidth: 2, borderColor: '#CBD5E1' },
  sizeLabel: { fontSize: 13, fontWeight: 'bold', color: '#475569', marginTop: 6 },
  silhouetteCard: { backgroundColor: '#1E293B', padding: 25, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginBottom: 20, width: 140, height: 140 },
  silhouetteEmoji: { fontSize: 60, opacity: 0.2 },
  rainbowRow: { flexDirection: 'row', gap: 8, justifyContent: 'center', marginBottom: 20 },
  rainbowStone: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  choiceBtn: { backgroundColor: '#F8FAFC', paddingVertical: 12, paddingHorizontal: 16, borderRadius: 14, borderWidth: 2, borderColor: '#CBD5E1', alignItems: 'center' },
  choiceBtnText: { fontSize: 16, fontWeight: 'bold', color: '#1E293B' },
  confirmMiniBtn: { backgroundColor: '#10B981', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 12, alignItems: 'center' },
  confirmMiniText: { color: 'white', fontWeight: 'bold', fontSize: 14 },
  memoryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'center', maxWidth: 320, marginVertical: 15 },
  memCardBox: { width: 68, height: 68, borderRadius: 16, alignItems: 'center', justifyContent: 'center', elevation: 3 },
  memCardOpen: { backgroundColor: '#FEF08A', borderWidth: 2, borderColor: '#FACC15' },
  memCardClosed: { backgroundColor: '#3B82F6', borderWidth: 2, borderColor: '#2563EB' },
  memCardEmoji: { fontSize: 32 },
  dancingStage: { width: '100%', maxWidth: 320, backgroundColor: '#FEF3C7', padding: 20, borderRadius: 24, alignItems: 'center', marginVertical: 15, borderWidth: 2, borderColor: '#FDE68A' },
  dancingLetterBtn: { backgroundColor: '#F59E0B', width: 90, height: 90, borderRadius: 45, alignItems: 'center', justifyContent: 'center', elevation: 4 },
  dancingLetterText: { fontSize: 44, fontWeight: '900', color: 'white' },
  dancingMusicNotes: { fontSize: 24, marginTop: 10 }
});
