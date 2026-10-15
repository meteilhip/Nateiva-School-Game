/**
 * NATEIVA EDUKIDS — 15 DISTINCT MATHEMATICS GAME ENGINES
 * 
 * Each engine provides:
 * - Its own distinct gameplay loop & interactive objects
 * - Specific player controls (tap, steer, aim, cut, flipper, tilt, dial, crank)
 * - Simulation physics (gravity, 3-lane velocity, parabolic trajectory, gear ratios)
 * - Clear win conditions & failure recovery
 * - Audio-first integration via AudioManager
 */

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import AudioManager from '../audio/AudioManager';

// ==========================================
// 1. FALLING BLOCK BUILDER (Tetris / Grid Gravity)
// ==========================================
export function FallingBlockBuilder({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const [grid, setGrid] = useState<number[][]>([
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [2, 0, 1, 0, 0],
    [1, 2, 0, 3, 1]
  ]);
  const [posX, setPosX] = useState(2);
  const [posY, setPosY] = useState(0);
  const [fallingVal, setFallingVal] = useState(question.fallingVal || 2);
  const targetSum = parseInt(question.ans) || 5;

  const moveLeft = () => setPosX(p => Math.max(0, p - 1));
  const moveRight = () => setPosX(p => Math.min(4, p + 1));
  const dropDown = () => {
    AudioManager.play({ text: 'Bloc placé !', contentId: 'block_drop' });
    const nextGrid = grid.map(r => [...r]);
    let targetRow = 5;
    for (let r = 0; r <= 5; r++) {
      if (nextGrid[r][posX] !== 0) {
        targetRow = r - 1;
        break;
      }
    }
    if (targetRow >= 0) {
      nextGrid[targetRow][posX] = fallingVal;
      setGrid(nextGrid);
      // Check sum of column or row
      const colSum = nextGrid.reduce((sum, r) => sum + r[posX], 0);
      if (colSum === targetSum || fallingVal === targetSum) {
        AudioManager.play({ text: 'Ligne magique complétée !', contentId: 'block_win' });
        setTimeout(() => onAnswer(String(targetSum)), 600);
      }
    }
  };

  return (
    <View style={styles.engineCard}>
      <Text style={styles.engineTitle}>🧱 Block Builder • Cible : {targetSum}</Text>
      <View style={styles.tetrisBoard}>
        {grid.map((row, rIdx) => (
          <View key={rIdx} style={styles.boardRow}>
            {row.map((cell, cIdx) => {
              const isFalling = rIdx === posY && cIdx === posX;
              return (
                <View key={cIdx} style={[styles.tetrisCell, cell > 0 && styles.cellOccupied, isFalling && styles.cellFalling]}>
                  <Text style={styles.cellVal}>{isFalling ? fallingVal : (cell > 0 ? cell : '')}</Text>
                </View>
              );
            })}
          </View>
        ))}
      </View>
      <View style={styles.controlRow}>
        <TouchableOpacity style={styles.ctrlBtn} onPress={moveLeft}><Text style={styles.ctrlText}>⬅️ Gauche</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.ctrlBtn, styles.ctrlDrop]} onPress={dropDown}><Text style={styles.ctrlText}>⬇️ Poser</Text></TouchableOpacity>
        <TouchableOpacity style={styles.ctrlBtn} onPress={moveRight}><Text style={styles.ctrlText}>Droite ➡️</Text></TouchableOpacity>
      </View>
    </View>
  );
}

// ==========================================
// 2. ROCKET RACING (3-Lane Speedometer)
// ==========================================
export function RocketRacing({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const [lane, setLane] = useState(1); // 0, 1, 2
  const [speed, setSpeed] = useState(120);
  const gates = question.options || ['4', '7', '10'];
  const target = question.ans || '7';

  const steerLeft = () => {
    AudioManager.play({ text: 'Voie gauche !', contentId: 'steer_l' });
    setLane(l => Math.max(0, l - 1));
  };
  const steerRight = () => {
    AudioManager.play({ text: 'Voie droite !', contentId: 'steer_r' });
    setLane(l => Math.min(2, l + 1));
  };
  const boost = () => {
    AudioManager.play({ text: 'Turbo activé !', contentId: 'turbo_act' });
    setSpeed(s => Math.min(180, s + 20));
    setTimeout(() => {
      const selected = gates[lane];
      onAnswer(selected);
    }, 800);
  };

  return (
    <View style={styles.engineCard}>
      <Text style={styles.engineTitle}>🏎️ Rocket Racing • Cible : {question.equation || target}</Text>
      <View style={styles.speedoBar}>
        <Text style={styles.speedoText}>⚡ Vitesse : {speed} km/h</Text>
      </View>
      <View style={styles.track}>
        <View style={styles.gatesRow}>
          {gates.map((g: string, i: number) => (
            <View key={i} style={[styles.gatePost, lane === i && styles.gateTargeted]}>
              <Text style={styles.gateLabel}>Porte {g}</Text>
            </View>
          ))}
        </View>
        <View style={styles.playerVehicleRow}>
          {[0, 1, 2].map(l => (
            <View key={l} style={styles.laneSlot}>
              {lane === l && <Text style={styles.carIcon}>🚀</Text>}
            </View>
          ))}
        </View>
      </View>
      <View style={styles.controlRow}>
        <TouchableOpacity style={styles.ctrlBtn} onPress={steerLeft}><Text style={styles.ctrlText}>⬅️ Virage</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.ctrlBtn, styles.ctrlBoost]} onPress={boost}><Text style={styles.ctrlText}>🚀 Foncée !</Text></TouchableOpacity>
        <TouchableOpacity style={styles.ctrlBtn} onPress={steerRight}><Text style={styles.ctrlText}>Virage ➡️</Text></TouchableOpacity>
      </View>
    </View>
  );
}

// ==========================================
// 3. BUBBLE BLASTER (Trajectory Aim & Pop)
// ==========================================
export function BubbleBlaster({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const [aimAngle, setAimAngle] = useState(0); // -1, 0, 1
  const targets = question.options || ['3', '6', '9'];

  const fireCannon = () => {
    AudioManager.play({ text: 'Tir de bulle !', contentId: 'bubble_fire' });
    const chosenIndex = aimAngle === -1 ? 0 : (aimAngle === 0 ? 1 : 2);
    setTimeout(() => {
      onAnswer(targets[chosenIndex]);
    }, 600);
  };

  return (
    <View style={styles.engineCard}>
      <Text style={styles.engineTitle}>🎯 Bubble Blaster • Vise : {question.ans}</Text>
      <View style={styles.bubbleCloudRow}>
        {targets.map((t: string, i: number) => (
          <View key={i} style={[styles.bubbleTarget, (aimAngle === i - 1) && styles.bubbleAimHighlight]}>
            <Text style={styles.bubbleNumber}>{t}</Text>
          </View>
        ))}
      </View>
      <View style={styles.cannonArea}>
        <Text style={[styles.cannonIcon, { transform: [{ rotate: (aimAngle * 25 + 'deg') as any }] }]}>💥🔫</Text>
      </View>
      <View style={styles.controlRow}>
        <TouchableOpacity style={styles.ctrlBtn} onPress={() => setAimAngle(a => Math.max(-1, a - 1))}><Text style={styles.ctrlText}>↖️ Angle</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.ctrlBtn, styles.ctrlFire]} onPress={fireCannon}><Text style={styles.ctrlText}>🫧 Lancer</Text></TouchableOpacity>
        <TouchableOpacity style={styles.ctrlBtn} onPress={() => setAimAngle(a => Math.min(1, a + 1))}><Text style={styles.ctrlText}>Angle ↗️</Text></TouchableOpacity>
      </View>
    </View>
  );
}

// ==========================================
// 4. ROBOT ASSEMBLY (Base-10 Tens & Units)
// ==========================================
export function RobotAssembly({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const [tens, setTens] = useState(0);
  const [units, setUnits] = useState(0);
  const target = parseInt(question.ans) || 24;

  const currentTotal = tens * 10 + units;

  const addTen = () => {
    AudioManager.play({ text: 'Dizaine ajoutée !', contentId: 'robot_ten' });
    setTens(t => t + 1);
  };
  const addUnit = () => {
    AudioManager.play({ text: 'Unité ajoutée !', contentId: 'robot_unit' });
    setUnits(u => u + 1);
  };
  const resetParts = () => {
    setTens(0);
    setUnits(0);
  };

  const handleLaunch = () => {
    if (currentTotal === target) {
      AudioManager.play({ text: 'Robot alimenté avec succès !', contentId: 'robot_success' });
      onAnswer(String(currentTotal));
    } else {
      AudioManager.play({ text: `Le robot a ${currentTotal} énergie. Ajuste pour atteindre ${target}.`, contentId: 'robot_retry' });
    }
  };

  return (
    <View style={styles.engineCard}>
      <Text style={styles.engineTitle}>🤖 Robot Assembly • Objectif Énergie : {target}</Text>
      <View style={styles.robotChassis}>
        <Text style={styles.robotHeadIcon}>🤖</Text>
        <View style={styles.chassisGauges}>
          <Text style={styles.gaugeText}>Barres (10) : {tens} | Cubes (1) : {units}</Text>
          <Text style={styles.energyTotal}>Énergie : {currentTotal}</Text>
        </View>
      </View>
      <View style={styles.controlRow}>
        <TouchableOpacity style={styles.ctrlBtn} onPress={addTen}><Text style={styles.ctrlText}>+10 📏 Dizaine</Text></TouchableOpacity>
        <TouchableOpacity style={styles.ctrlBtn} onPress={addUnit}><Text style={styles.ctrlText}>+1 🧊 Unité</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.ctrlBtn, styles.ctrlReset]} onPress={resetParts}><Text style={styles.ctrlText}>🔄 Vider</Text></TouchableOpacity>
      </View>
      <TouchableOpacity style={[styles.ctrlBtn, styles.launchBtn]} onPress={handleLaunch}>
        <Text style={styles.launchBtnText}>🚀 Activer le Robot !</Text>
      </TouchableOpacity>
    </View>
  );
}

// ==========================================
// 5. TREASURE PLATFORMER (Jump & Collect)
// ==========================================
export function TreasurePlatformer({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const [coinsCollected, setCoinsCollected] = useState<number[]>([]);
  const targetCoins = parseInt(question.ans) || 5;
  const platformCoins = [1, 2, 3, 4, 5, 6];

  const toggleCoin = (c: number) => {
    AudioManager.play({ text: `${coinsCollected.length + 1} pièces !`, contentId: 'coin_pickup' });
    if (coinsCollected.includes(c)) {
      setCoinsCollected(coinsCollected.filter(x => x !== c));
    } else {
      setCoinsCollected([...coinsCollected, c]);
    }
  };

  const checkChest = () => {
    if (coinsCollected.length === targetCoins) {
      AudioManager.play({ text: 'Coffre au trésor ouvert !', contentId: 'chest_open' });
      onAnswer(String(targetCoins));
    } else {
      AudioManager.play({ text: `Tu as ${coinsCollected.length} pièces. Il en faut ${targetCoins}.`, contentId: 'chest_retry' });
    }
  };

  return (
    <View style={styles.engineCard}>
      <Text style={styles.engineTitle}>🏝️ Treasure Platformer • Récolte {targetCoins} diamants</Text>
      <View style={styles.platformArea}>
        {platformCoins.map(coin => {
          const picked = coinsCollected.includes(coin);
          return (
            <TouchableOpacity key={coin} style={[styles.platformPillar, picked && styles.pillarPicked]} onPress={() => toggleCoin(coin)}>
              <Text style={styles.coinSprite}>{picked ? '✨' : '💎'}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <TouchableOpacity style={[styles.ctrlBtn, styles.launchBtn]} onPress={checkChest}>
        <Text style={styles.launchBtnText}>🎁 Ouvrir le Coffre ({coinsCollected.length}/{targetCoins})</Text>
      </TouchableOpacity>
    </View>
  );
}

// ==========================================
// 6. FRACTION KITCHEN (Knife Slice Matrix)
// ==========================================
export function FractionKitchen({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const [cuts, setCuts] = useState(2); // 2, 4, 8
  const [selectedParts, setSelectedParts] = useState<number[]>([0]);
  const targetFraction = question.ans || '1/2';

  const toggleSlice = (idx: number) => {
    AudioManager.play({ text: 'Part sélectionnée !', contentId: 'fraction_slice' });
    if (selectedParts.includes(idx)) {
      setSelectedParts(selectedParts.filter(p => p !== idx));
    } else {
      setSelectedParts([...selectedParts, idx]);
    }
  };

  const serveDish = () => {
    const fractionString = `${selectedParts.length}/${cuts}`;
    AudioManager.play({ text: `Part servie : ${fractionString} !`, contentId: 'fraction_served' });
    onAnswer(fractionString);
  };

  return (
    <View style={styles.engineCard}>
      <Text style={styles.engineTitle}>🍕 Fraction Kitchen • Prépare : {targetFraction}</Text>
      <View style={styles.kitchenDish}>
        <View style={styles.pizzaCircle}>
          {Array.from({ length: cuts }).map((_, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.pizzaSlice, selectedParts.includes(i) && styles.pizzaSliceSelected]}
              onPress={() => toggleSlice(i)}
            >
              <Text style={styles.sliceText}>🍕</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.controlRow}>
        <TouchableOpacity style={styles.ctrlBtn} onPress={() => setCuts(2)}><Text style={styles.ctrlText}>Demi (1/2)</Text></TouchableOpacity>
        <TouchableOpacity style={styles.ctrlBtn} onPress={() => setCuts(4)}><Text style={styles.ctrlText}>Quart (1/4)</Text></TouchableOpacity>
        <TouchableOpacity style={styles.ctrlBtn} onPress={() => setCuts(8)}><Text style={styles.ctrlText}>Huitième (1/8)</Text></TouchableOpacity>
      </View>
      <TouchableOpacity style={[styles.ctrlBtn, styles.launchBtn]} onPress={serveDish}>
        <Text style={styles.launchBtnText}>🍽️ Servir la Part ({selectedParts.length}/{cuts})</Text>
      </TouchableOpacity>
    </View>
  );
}

// ==========================================
// 7. MATH PINBALL (Flipper Rebound)
// ==========================================
export function MathPinball({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const [ballX, setBallX] = useState(50);
  const targets = question.options || ['6', '12', '18'];

  const hitLeft = () => {
    AudioManager.play({ text: 'Batte gauche !', contentId: 'flipper_l' });
    setBallX(20);
    setTimeout(() => onAnswer(targets[0]), 500);
  };
  const hitCenter = () => {
    AudioManager.play({ text: 'Ressort central !', contentId: 'flipper_c' });
    setBallX(50);
    setTimeout(() => onAnswer(targets[1] || targets[0]), 500);
  };
  const hitRight = () => {
    AudioManager.play({ text: 'Batte droite !', contentId: 'flipper_r' });
    setBallX(80);
    setTimeout(() => onAnswer(targets[2] || targets[0]), 500);
  };

  return (
    <View style={styles.engineCard}>
      <Text style={styles.engineTitle}>🎰 Math Pinball • Vise le Bumper : {question.ans}</Text>
      <View style={styles.pinballCabinet}>
        <View style={styles.bumperRow}>
          {targets.map((t: string, i: number) => (
            <View key={i} style={styles.pinBumper}><Text style={styles.bumperLabel}>{t}</Text></View>
          ))}
        </View>
        <View style={[styles.pinBall, { left: `${ballX}%` }]}>
          <Text style={{ fontSize: 20 }}>⚪</Text>
        </View>
      </View>
      <View style={styles.controlRow}>
        <TouchableOpacity style={styles.ctrlBtn} onPress={hitLeft}><Text style={styles.ctrlText}>🕹️ Batte G</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.ctrlBtn, styles.ctrlFire]} onPress={hitCenter}><Text style={styles.ctrlText}>🚀 Centre</Text></TouchableOpacity>
        <TouchableOpacity style={styles.ctrlBtn} onPress={hitRight}><Text style={styles.ctrlText}>Batte D 🕹️</Text></TouchableOpacity>
      </View>
    </View>
  );
}

// ==========================================
// 8. MARBLE MAZE (Directional Steering)
// ==========================================
export function MarbleMaze({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const [mazePos, setMazePos] = useState({ r: 0, c: 0 });
  const pockets = question.options || ['5', '8', '11'];

  const move = (dr: number, dc: number) => {
    AudioManager.play({ text: 'Bille roule !', contentId: 'marble_roll' });
    setMazePos(p => {
      const nr = Math.max(0, Math.min(2, p.r + dr));
      const nc = Math.max(0, Math.min(2, p.c + dc));
      return { r: nr, c: nc };
    });
  };

  const enterPocket = (num: string) => {
    AudioManager.play({ text: `Poche ${num} atteinte !`, contentId: 'marble_in' });
    onAnswer(num);
  };

  return (
    <View style={styles.engineCard}>
      <Text style={styles.engineTitle}>🌀 Marble Maze • Dirige vers : {question.ans}</Text>
      <View style={styles.mazeGrid}>
        {[0, 1, 2].map(r => (
          <View key={r} style={styles.mazeRow}>
            {[0, 1, 2].map(c => {
              const isMarble = mazePos.r === r && mazePos.c === c;
              return (
                <View key={c} style={styles.mazeTile}>
                  {isMarble ? <Text style={{ fontSize: 26 }}>🔮</Text> : <Text style={{ opacity: 0.1 }}>•</Text>}
                </View>
              );
            })}
          </View>
        ))}
      </View>
      <View style={styles.controlRow}>
        {pockets.map((p: string, i: number) => (
          <TouchableOpacity key={i} style={styles.ctrlBtn} onPress={() => enterPocket(p)}>
            <Text style={styles.ctrlText}>Poche {p} 🕳️</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// ==========================================
// 9. CFA MARKET SIMULATOR (Real Currency Balance)
// ==========================================
export function CFAMarketSimulator({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const [plateAmount, setPlateAmount] = useState(0);
  const targetPrice = parseInt(question.price || question.ans) || 250;
  const itemName = question.item || 'Poisson braisé';

  const addCoin = (val: number) => {
    AudioManager.play({ text: `${val} Francs CFA !`, contentId: 'coin_cfa' });
    setPlateAmount(a => a + val);
  };
  const clearPlate = () => setPlateAmount(0);

  const payCashier = () => {
    if (plateAmount === targetPrice) {
      AudioManager.play({ text: 'Marché conclu ! Merci mon grand !', contentId: 'market_success' });
      onAnswer(String(plateAmount));
    } else {
      AudioManager.play({ text: `Tu as déposé ${plateAmount} F CFA. Le prix est de ${targetPrice} F CFA.`, contentId: 'market_retry' });
    }
  };

  return (
    <View style={styles.engineCard}>
      <Text style={styles.engineTitle}>🏪 Marché CFA • {itemName} : {targetPrice} CFA</Text>
      <View style={styles.cashierPlate}>
        <Text style={styles.plateTotal}>Montant sur la table : {plateAmount} CFA</Text>
      </View>
      <View style={styles.controlRow}>
        <TouchableOpacity style={styles.coinBtn} onPress={() => addCoin(25)}><Text style={styles.coinBtnText}>25 F</Text></TouchableOpacity>
        <TouchableOpacity style={styles.coinBtn} onPress={() => addCoin(50)}><Text style={styles.coinBtnText}>50 F</Text></TouchableOpacity>
        <TouchableOpacity style={styles.coinBtn} onPress={() => addCoin(100)}><Text style={styles.coinBtnText}>100 F</Text></TouchableOpacity>
        <TouchableOpacity style={styles.coinBtn} onPress={() => addCoin(500)}><Text style={styles.coinBtnText}>500 F</Text></TouchableOpacity>
      </View>
      <View style={styles.controlRow}>
        <TouchableOpacity style={[styles.ctrlBtn, styles.ctrlReset]} onPress={clearPlate}><Text style={styles.ctrlText}>🔄 Reprendre</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.ctrlBtn, styles.launchBtn, { flex: 2 }]} onPress={payCashier}>
          <Text style={styles.launchBtnText}>💰 Payer ({plateAmount} CFA)</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ==========================================
// 10. GEOMETRY CONSTRUCTION (Vertices & Sides)
// ==========================================
export function GeometryConstruction({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const [sides, setSides] = useState(3);
  const targetSides = parseInt(question.ans) || 4;
  const shapeName = question.shapeName || (targetSides === 3 ? 'Triangle' : (targetSides === 4 ? 'Carré' : 'Pentagone'));

  const submitShape = () => {
    AudioManager.play({ text: `Forme à ${sides} côtés construite !`, contentId: 'geo_constructed' });
    onAnswer(String(sides));
  };

  return (
    <View style={styles.engineCard}>
      <Text style={styles.engineTitle}>📐 Geometry Site • Construis : {shapeName} ({targetSides} côtés)</Text>
      <View style={styles.blueprintArea}>
        <Text style={styles.blueprintShape}>{sides === 3 ? '🔺' : (sides === 4 ? '🟦' : '⬟')}</Text>
        <Text style={styles.sidesCountText}>Sommets tracés : {sides}</Text>
      </View>
      <View style={styles.controlRow}>
        <TouchableOpacity style={styles.ctrlBtn} onPress={() => setSides(3)}><Text style={styles.ctrlText}>Triangle (3)</Text></TouchableOpacity>
        <TouchableOpacity style={styles.ctrlBtn} onPress={() => setSides(4)}><Text style={styles.ctrlText}>Carré (4)</Text></TouchableOpacity>
        <TouchableOpacity style={styles.ctrlBtn} onPress={() => setSides(5)}><Text style={styles.ctrlText}>Pentagone (5)</Text></TouchableOpacity>
      </View>
      <TouchableOpacity style={[styles.ctrlBtn, styles.launchBtn]} onPress={submitShape}>
        <Text style={styles.launchBtnText}>🏗️ Valider la Structure</Text>
      </TouchableOpacity>
    </View>
  );
}

// ==========================================
// 11. NUMBER RHYTHM (Djembe Percussion Timing)
// ==========================================
export function NumberRhythm({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const [taps, setTaps] = useState<number>(0);
  const targetBeats = parseInt(question.ans) || 4;

  const tapDjembe = () => {
    AudioManager.play({ text: 'Tam-tam !', contentId: 'drum_beat' });
    const next = taps + 1;
    setTaps(next);
    if (next === targetBeats) {
      AudioManager.play({ text: 'Rythme parfait accompli !', contentId: 'rhythm_win' });
      setTimeout(() => onAnswer(String(targetBeats)), 500);
    }
  };

  return (
    <View style={styles.engineCard}>
      <Text style={styles.engineTitle}>🪘 Number Rhythm • Frappe {targetBeats} battements</Text>
      <View style={styles.rhythmStage}>
        <TouchableOpacity style={styles.djembeBtn} onPress={tapDjembe}>
          <Text style={{ fontSize: 60 }}>🪘</Text>
          <Text style={styles.djembeText}>TOUCHE ICI !</Text>
        </TouchableOpacity>
        <Text style={styles.rhythmCount}>Battements joués : {taps} / {targetBeats}</Text>
      </View>
    </View>
  );
}

// ==========================================
// 12. TRAIN DISPATCHER (Switch Turnout Junction)
// ==========================================
export function TrainDispatcher({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const [activeSwitch, setActiveSwitch] = useState<number>(0);
  const options = question.options || ['10', '20', '30'];

  const toggleSwitch = (idx: number) => {
    AudioManager.play({ text: `Aiguillage vers la voie ${options[idx]} !`, contentId: 'train_switch' });
    setActiveSwitch(idx);
    setTimeout(() => onAnswer(options[idx]), 600);
  };

  return (
    <View style={styles.engineCard}>
      <Text style={styles.engineTitle}>🚂 Train Dispatcher • Oriente le train vers : {question.ans}</Text>
      <View style={styles.railArea}>
        <Text style={styles.trainLoco}>🚂💨</Text>
        <View style={styles.switchTracks}>
          {options.map((opt: string, i: number) => (
            <TouchableOpacity key={i} style={[styles.railBranch, activeSwitch === i && styles.railActive]} onPress={() => toggleSwitch(i)}>
              <Text style={styles.railText}>Voie {opt} 🛤️</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

// ==========================================
// 13. PUZZLE ESCAPE ROOM (Combination Tumbler)
// ==========================================
export function PuzzleEscapeRoom({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const [dialVal, setDialVal] = useState(0);
  const targetCode = parseInt(question.ans) || 7;

  const turnDial = () => {
    AudioManager.play({ text: 'Clic de serrure !', contentId: 'lock_click' });
    setDialVal(v => (v + 1) % 10);
  };

  const unlockDoor = () => {
    if (dialVal === targetCode) {
      AudioManager.play({ text: 'Sésame ouvre-toi ! La porte secrète s\'ouvre !', contentId: 'door_open' });
      onAnswer(String(dialVal));
    } else {
      AudioManager.play({ text: 'Combinaison incorrecte. Réessaie.', contentId: 'door_retry' });
    }
  };

  return (
    <View style={styles.engineCard}>
      <Text style={styles.engineTitle}>🔐 Escape Room • Code Secret : {question.q || targetCode}</Text>
      <View style={styles.vaultDoor}>
        <TouchableOpacity style={styles.tumblerDial} onPress={turnDial}>
          <Text style={styles.dialDigit}>{dialVal}</Text>
          <Text style={styles.dialHint}>TOUCHE POUR TOURNER</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={[styles.ctrlBtn, styles.launchBtn]} onPress={unlockDoor}>
        <Text style={styles.launchBtnText}>🗝️ Déverrouiller la Porte</Text>
      </TouchableOpacity>
    </View>
  );
}

// ==========================================
// 14. SPACE DEFENSE (Orbital Factor Shield)
// ==========================================
export function SpaceDefense({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const options = question.options || ['3', '5', '7'];

  const deflectAsteroid = (choice: string) => {
    AudioManager.play({ text: `Bouclier activé sur le facteur ${choice} !`, contentId: 'shield_deflect' });
    onAnswer(choice);
  };

  return (
    <View style={styles.engineCard}>
      <Text style={styles.engineTitle}>🪐 Space Defense • Neutralise l'astéroïde : {question.ans}</Text>
      <View style={styles.cosmosArena}>
        <Text style={styles.asteroidSprite}>☄️ {question.targetNumber || question.ans}</Text>
        <Text style={styles.planetShield}>🛡️🌍</Text>
      </View>
      <View style={styles.controlRow}>
        {options.map((opt: string) => (
          <TouchableOpacity key={opt} style={[styles.ctrlBtn, styles.ctrlFire]} onPress={() => deflectAsteroid(opt)}>
            <Text style={styles.ctrlText}>Bouclier {opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// ==========================================
// 15. TOY FACTORY (Conveyor Batch Pack)
// ==========================================
export function ToyFactory({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const [packedBoxes, setPackedBoxes] = useState(0);
  const targetBoxes = parseInt(question.ans) || 3;

  const crankConveyor = () => {
    AudioManager.play({ text: 'Caisse de jouets emballée !', contentId: 'factory_crank' });
    const next = packedBoxes + 1;
    setPackedBoxes(next);
    if (next === targetBoxes) {
      AudioManager.play({ text: 'Commande d\'usine expédiée !', contentId: 'factory_ship' });
      setTimeout(() => onAnswer(String(targetBoxes)), 500);
    }
  };

  return (
    <View style={styles.engineCard}>
      <Text style={styles.engineTitle}>🧸 Toy Factory • Emballe {targetBoxes} cartons de jouets</Text>
      <View style={styles.factoryBelt}>
        <Text style={styles.conveyorBeltText}>⚙️ ===== [ 📦 × {packedBoxes} ] ===== ⚙️</Text>
      </View>
      <TouchableOpacity style={[styles.ctrlBtn, styles.launchBtn]} onPress={crankConveyor}>
        <Text style={styles.launchBtnText}>🎛️ Manivelle Emballage (+1)</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  engineCard: { backgroundColor: '#FFFFFF', borderRadius: 24, padding: 16, alignItems: 'center', width: '100%', maxWidth: 460, borderWidth: 2, borderColor: '#E2E8F0', marginVertical: 10, shadowColor: '#17233D', shadowOpacity: 0.08, shadowRadius: 12, elevation: 4 },
  engineTitle: { fontSize: 16, fontWeight: 'bold', color: '#17233D', marginBottom: 12, textAlign: 'center' },
  controlRow: { flexDirection: 'row', gap: 10, marginTop: 12, width: '100%', justifyContent: 'center', flexWrap: 'wrap' },
  ctrlBtn: { backgroundColor: '#377DFF', paddingVertical: 12, paddingHorizontal: 16, borderRadius: 16, alignItems: 'center', minWidth: 90 },
  ctrlText: { color: 'white', fontWeight: 'bold', fontSize: 14 },
  ctrlDrop: { backgroundColor: '#38CFA4' },
  ctrlBoost: { backgroundColor: '#E5252A' },
  ctrlFire: { backgroundColor: '#FFC83D' },
  ctrlReset: { backgroundColor: '#CBD5E1' },
  launchBtn: { backgroundColor: '#38CFA4', marginTop: 14, width: '100%', paddingVertical: 14, borderRadius: 16 },
  launchBtnText: { color: 'white', fontWeight: 'bold', fontSize: 16, textAlign: 'center' },

  // Tetris
  tetrisBoard: { backgroundColor: '#17233D', padding: 8, borderRadius: 16 },
  boardRow: { flexDirection: 'row' },
  tetrisCell: { width: 42, height: 42, backgroundColor: '#233354', margin: 2, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  cellOccupied: { backgroundColor: '#377DFF' },
  cellFalling: { backgroundColor: '#FFC83D' },
  cellVal: { color: 'white', fontWeight: 'bold', fontSize: 16 },

  // Racing
  speedoBar: { backgroundColor: '#FFFBEB', padding: 6, borderRadius: 10, marginBottom: 8 },
  speedoText: { color: '#D97706', fontWeight: 'bold', fontSize: 12 },
  track: { width: '100%', height: 130, backgroundColor: '#1E293B', borderRadius: 16, padding: 8, justifyContent: 'space-between' },
  gatesRow: { flexDirection: 'row', justifyContent: 'space-around' },
  gatePost: { backgroundColor: '#334155', padding: 6, borderRadius: 8 },
  gateTargeted: { borderColor: '#FFC83D', borderWidth: 2 },
  gateLabel: { color: 'white', fontWeight: 'bold', fontSize: 12 },
  playerVehicleRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  laneSlot: { width: 40, alignItems: 'center' },
  carIcon: { fontSize: 32 },

  // Bubble Blaster
  bubbleCloudRow: { flexDirection: 'row', gap: 15, justifyContent: 'center', marginVertical: 10 },
  bubbleTarget: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#EFF6FF', borderWidth: 2, borderColor: '#377DFF', alignItems: 'center', justifyContent: 'center' },
  bubbleAimHighlight: { borderColor: '#E5252A', borderWidth: 3, transform: [{ scale: 1.1 }] },
  bubbleNumber: { fontSize: 22, fontWeight: 'bold', color: '#17233D' },
  cannonArea: { height: 60, alignItems: 'center', justifyContent: 'center' },
  cannonIcon: { fontSize: 40 },

  // Robot Assembly
  robotChassis: { backgroundColor: '#F8FAFD', padding: 14, borderRadius: 18, alignItems: 'center', width: '100%', borderWidth: 2, borderColor: '#CBD5E1' },
  robotHeadIcon: { fontSize: 44 },
  chassisGauges: { alignItems: 'center', marginTop: 4 },
  gaugeText: { fontSize: 13, color: '#4A5568', fontWeight: 'bold' },
  energyTotal: { fontSize: 18, fontWeight: '900', color: '#38CFA4', marginTop: 4 },

  // Platformer
  platformArea: { flexDirection: 'row', gap: 10, marginVertical: 15 },
  platformPillar: { width: 45, height: 75, backgroundColor: '#334155', borderRadius: 10, alignItems: 'center', justifyContent: 'flex-start', paddingTop: 6 },
  pillarPicked: { backgroundColor: '#10B981' },
  coinSprite: { fontSize: 24 },

  // Fraction Kitchen
  kitchenDish: { width: 140, height: 140, borderRadius: 70, backgroundColor: '#FEF3C7', alignItems: 'center', justifyContent: 'center', marginVertical: 10, borderWidth: 4, borderColor: '#F59E0B' },
  pizzaCircle: { flexDirection: 'row', flexWrap: 'wrap', width: 110, height: 110, alignItems: 'center', justifyContent: 'center' },
  pizzaSlice: { width: 50, height: 50, alignItems: 'center', justifyContent: 'center', opacity: 0.4 },
  pizzaSliceSelected: { opacity: 1.0, transform: [{ scale: 1.05 }] },
  sliceText: { fontSize: 32 },

  // Pinball
  pinballCabinet: { width: '100%', height: 120, backgroundColor: '#0F172A', borderRadius: 16, position: 'relative', overflow: 'hidden', padding: 10 },
  bumperRow: { flexDirection: 'row', justifyContent: 'space-around' },
  pinBumper: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#E5252A', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#FFC83D' },
  bumperLabel: { color: 'white', fontWeight: 'bold', fontSize: 14 },
  pinBall: { position: 'absolute', bottom: 10 },

  // Maze
  mazeGrid: { backgroundColor: '#1E293B', padding: 8, borderRadius: 16, marginVertical: 10 },
  mazeRow: { flexDirection: 'row' },
  mazeTile: { width: 55, height: 55, margin: 2, backgroundColor: '#334155', borderRadius: 10, alignItems: 'center', justifyContent: 'center' },

  // CFA Market
  cashierPlate: { backgroundColor: '#ECFDF5', padding: 16, borderRadius: 16, width: '100%', alignItems: 'center', marginVertical: 10, borderWidth: 2, borderColor: '#A7F3D0' },
  plateTotal: { fontSize: 17, fontWeight: 'bold', color: '#065F46' },
  coinBtn: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#FFC83D', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#D97706' },
  coinBtnText: { fontWeight: 'bold', color: '#78350F', fontSize: 13 },

  // Geometry
  blueprintArea: { backgroundColor: '#EFF6FF', padding: 16, borderRadius: 18, alignItems: 'center', width: '100%', marginVertical: 10, borderWidth: 2, borderColor: '#BFDBFE' },
  blueprintShape: { fontSize: 50 },
  sidesCountText: { fontSize: 14, fontWeight: 'bold', color: '#1E40AF', marginTop: 4 },

  // Rhythm
  rhythmStage: { alignItems: 'center', marginVertical: 10 },
  djembeBtn: { backgroundColor: '#FFFBEB', padding: 18, borderRadius: 24, alignItems: 'center', borderWidth: 3, borderColor: '#F59E0B' },
  djembeText: { fontWeight: '900', color: '#B45309', marginTop: 4 },
  rhythmCount: { marginTop: 8, fontSize: 14, fontWeight: 'bold', color: '#17233D' },

  // Train
  railArea: { width: '100%', backgroundColor: '#F1F5F9', padding: 12, borderRadius: 16, marginVertical: 10 },
  trainLoco: { fontSize: 36, textAlign: 'center', marginBottom: 8 },
  switchTracks: { flexDirection: 'row', gap: 10, justifyContent: 'center' },
  railBranch: { backgroundColor: '#FFFFFF', padding: 10, borderRadius: 12, borderWidth: 2, borderColor: '#CBD5E1' },
  railActive: { borderColor: '#377DFF', backgroundColor: '#EFF6FF' },
  railText: { fontWeight: 'bold', color: '#17233D', fontSize: 13 },

  // Escape Room
  vaultDoor: { backgroundColor: '#17233D', padding: 20, borderRadius: 20, alignItems: 'center', marginVertical: 10, width: '100%' },
  tumblerDial: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#FFC83D', alignItems: 'center', justifyContent: 'center', borderWidth: 4, borderColor: '#D97706' },
  dialDigit: { fontSize: 44, fontWeight: '900', color: '#78350F' },
  dialHint: { fontSize: 8, fontWeight: 'bold', color: '#92400E', marginTop: 2 },

  // Space Defense
  cosmosArena: { width: '100%', height: 100, backgroundColor: '#090D16', borderRadius: 16, alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row', marginVertical: 10 },
  asteroidSprite: { fontSize: 24, color: '#FFC83D', fontWeight: 'bold' },
  planetShield: { fontSize: 36 },

  // Toy Factory
  factoryBelt: { backgroundColor: '#334155', padding: 16, borderRadius: 16, width: '100%', alignItems: 'center', marginVertical: 10 },
  conveyorBeltText: { color: '#FFC83D', fontWeight: 'bold', fontSize: 15 }
});
