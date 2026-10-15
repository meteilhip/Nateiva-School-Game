import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

// 1. COUNT AND TAP (Interactive 1-to-1 counting)
export function CountAndTap({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const targetCount = parseInt(question.ans) || 5;
  const [tapped, setTapped] = useState<number[]>([]);

  const handleTap = (index: number) => {
    if (!tapped.includes(index)) {
      setTapped([...tapped, index]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{question.q}</Text>
      <Text style={styles.subtext}>Touche chaque objet pour compter !</Text>
      
      <View style={styles.objectsGrid}>
        {Array.from({ length: targetCount }).map((_, i) => {
          const isTapped = tapped.includes(i);
          const tapOrder = tapped.indexOf(i) + 1;
          return (
            <TouchableOpacity 
              key={i} 
              onPress={() => handleTap(i)}
              activeOpacity={0.8}
              style={[styles.tappableObject, isTapped && styles.tappedObject]}
            >
              <Text style={styles.objectIcon}>{question.icon || '🥭'}</Text>
              {isTapped && (
                <View style={styles.tappedBadge}>
                  <Text style={styles.tappedNumber}>{tapOrder}</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={styles.counterStatus}>Objets comptés : {tapped.length} / {targetCount}</Text>

      <View style={styles.options}>
        {question.options.map((opt: string) => (
          <TouchableOpacity key={opt} style={styles.optionBtn} onPress={() => onAnswer(opt)}>
            <Text style={styles.optionText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// 2. NUMBER MATCH
export function NumberMatch({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{question.q}</Text>
      <View style={styles.bigNumberCircle}>
        <Text style={styles.bigNumberText}>{question.displayNumber || question.ans}</Text>
      </View>
      <View style={styles.options}>
        {question.options.map((opt: string) => (
          <TouchableOpacity key={opt} style={styles.optionBtn} onPress={() => onAnswer(opt)}>
            <Text style={styles.optionText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// 3. NUMBER ORDER (Ascending train or stepping stones)
export function NumberOrder({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const [selectedSequence, setSelectedSequence] = useState<string[]>([]);
  const candidates: string[] = question.options || ['3', '1', '4', '2'];

  const handleSelect = (num: string) => {
    if (!selectedSequence.includes(num)) {
      const next = [...selectedSequence, num];
      setSelectedSequence(next);
      if (next.length === candidates.length) {
        onAnswer(next.join(', '));
      }
    }
  };

  const handleReset = () => setSelectedSequence([]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{question.q || 'Range les nombres du plus petit au plus grand :'}</Text>
      
      {/* Train track / Slot preview */}
      <View style={styles.slotRow}>
        {candidates.map((_, i) => (
          <View key={i} style={styles.slotBox}>
            <Text style={styles.slotNumber}>{selectedSequence[i] || '?'}</Text>
          </View>
        ))}
      </View>

      {/* Available tiles */}
      <View style={styles.options}>
        {candidates.map((num) => {
          const used = selectedSequence.includes(num);
          return (
            <TouchableOpacity 
              key={num} 
              disabled={used}
              style={[styles.tileBtn, used && styles.tileUsed]} 
              onPress={() => handleSelect(num)}
            >
              <Text style={[styles.tileText, used && styles.tileTextUsed]}>{num}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {selectedSequence.length > 0 && (
        <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
          <Text style={styles.resetBtnText}>🔄 Recommencer</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// 4. NUMBER LINE (Frog jumping on a graduated line)
export function NumberLine({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const min = question.min || 0;
  const max = question.max || 10;
  const target = parseInt(question.target) || 6;
  const [frogPos, setFrogPos] = useState<number>(min);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{question.q || `Aide la grenouille à sauter jusqu'à ${target} !`}</Text>
      
      <View style={styles.numberLineContainer}>
        <View style={styles.lineBar} />
        <View style={styles.ticksRow}>
          {Array.from({ length: max - min + 1 }).map((_, i) => {
            const val = min + i;
            const isFrog = frogPos === val;
            return (
              <TouchableOpacity key={val} style={styles.tickItem} onPress={() => setFrogPos(val)}>
                {isFrog && <Text style={styles.frogIcon}>🐸</Text>}
                <View style={[styles.tickMark, isFrog && styles.tickMarkActive]} />
                <Text style={styles.tickLabel}>{val}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <TouchableOpacity 
        style={styles.confirmBtn} 
        onPress={() => onAnswer(frogPos.toString())}
      >
        <Text style={styles.confirmBtnText}>Valider le saut ({frogPos})</Text>
      </TouchableOpacity>
    </View>
  );
}

// 5. TEN FRAME (Visual 10-grid)
export function TenFrame({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const filledCount = parseInt(question.displayCount || question.ans) || 7;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{question.q}</Text>
      <View style={styles.tenFrameBorder}>
        {Array.from({ length: 10 }).map((_, i) => (
          <View key={i} style={styles.tenFrameCell}>
            {i < filledCount && <View style={styles.tenFrameDot} />}
          </View>
        ))}
      </View>
      <View style={styles.options}>
        {question.options.map((opt: string) => (
          <TouchableOpacity key={opt} style={styles.optionBtn} onPress={() => onAnswer(opt)}>
            <Text style={styles.optionText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// 6. PLACE VALUE BUILDER (Hundreds, Tens Rods, Units Cubes)
export function PlaceValueBuilder({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const [tens, setTens] = useState(0);
  const [ones, setOnes] = useState(0);

  const total = tens * 10 + ones;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{question.q || 'Construis le nombre avec les dizaines et unités :'}</Text>
      
      <View style={styles.blocksShowcase}>
        {/* Tens column */}
        <View style={styles.columnBox}>
          <Text style={styles.columnHeader}>Dizaines (10)</Text>
          <View style={styles.rodsContainer}>
            {Array.from({ length: tens }).map((_, i) => (
              <View key={i} style={styles.tenRod}>
                {Array.from({ length: 10 }).map((_, j) => <View key={j} style={styles.rodSegment} />)}
              </View>
            ))}
          </View>
          <View style={styles.controlRow}>
            <TouchableOpacity style={styles.stepBtn} onPress={() => setTens(Math.max(0, tens - 1))}><Text style={styles.stepBtnText}>-</Text></TouchableOpacity>
            <Text style={styles.columnCount}>{tens}</Text>
            <TouchableOpacity style={styles.stepBtn} onPress={() => setTens(Math.min(9, tens + 1))}><Text style={styles.stepBtnText}>+</Text></TouchableOpacity>
          </View>
        </View>

        {/* Ones column */}
        <View style={styles.columnBox}>
          <Text style={styles.columnHeader}>Unités (1)</Text>
          <View style={styles.unitsGrid}>
            {Array.from({ length: ones }).map((_, i) => (
              <View key={i} style={styles.unitCube} />
            ))}
          </View>
          <View style={styles.controlRow}>
            <TouchableOpacity style={styles.stepBtn} onPress={() => setOnes(Math.max(0, ones - 1))}><Text style={styles.stepBtnText}>-</Text></TouchableOpacity>
            <Text style={styles.columnCount}>{ones}</Text>
            <TouchableOpacity style={styles.stepBtn} onPress={() => setOnes(Math.min(9, ones + 1))}><Text style={styles.stepBtnText}>+</Text></TouchableOpacity>
          </View>
        </View>
      </View>

      <Text style={styles.totalDisplay}>Total construit = <Text style={{ color: '#2563EB', fontWeight: 'bold' }}>{total}</Text></Text>

      <TouchableOpacity style={styles.confirmBtn} onPress={() => onAnswer(total.toString())}>
        <Text style={styles.confirmBtnText}>Valider ma réponse</Text>
      </TouchableOpacity>
    </View>
  );
}

// 7. ADDITION BUILDER
export function AdditionBuilder({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const parts = (question.equation || '3 + 2 = ?').split(' ');
  const num1 = parseInt(parts[0]) || 3;
  const num2 = parseInt(parts[2]) || 2;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{question.q}</Text>
      
      <View style={styles.visualEquationCard}>
        <View style={styles.eqGroup}>
          <Text style={styles.eqNumber}>{num1}</Text>
          <View style={styles.dotsWrap}>
            {Array.from({ length: num1 }).map((_, i) => <View key={i} style={styles.blueDot} />)}
          </View>
        </View>
        <Text style={styles.eqOp}>+</Text>
        <View style={styles.eqGroup}>
          <Text style={styles.eqNumber}>{num2}</Text>
          <View style={styles.dotsWrap}>
            {Array.from({ length: num2 }).map((_, i) => <View key={i} style={styles.greenDot} />)}
          </View>
        </View>
        <Text style={styles.eqOp}>=</Text>
        <Text style={styles.eqUnknown}>?</Text>
      </View>

      <View style={styles.options}>
        {question.options.map((opt: string) => (
          <TouchableOpacity key={opt} style={styles.optionBtn} onPress={() => onAnswer(opt)}>
            <Text style={styles.optionText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// 8. SUBTRACTION BUILDER (Take away with cross-out)
export function SubtractionBuilder({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const parts = (question.equation || '7 - 3 = ?').split(' ');
  const start = parseInt(parts[0]) || 7;
  const takeAway = parseInt(parts[2]) || 3;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{question.q || 'Soustraction : Retirer les objets'}</Text>
      <Text style={styles.subtext}>{question.equation || `${start} - ${takeAway} = ?`}</Text>
      
      <View style={styles.objectsGrid}>
        {Array.from({ length: start }).map((_, i) => {
          const isCrossed = i >= (start - takeAway);
          return (
            <View key={i} style={[styles.subObject, isCrossed && styles.subObjectCrossed]}>
              <Text style={styles.objectIcon}>🍌</Text>
              {isCrossed && <Text style={styles.crossMark}>❌</Text>}
            </View>
          );
        })}
      </View>

      <View style={styles.options}>
        {question.options.map((opt: string) => (
          <TouchableOpacity key={opt} style={styles.optionBtn} onPress={() => onAnswer(opt)}>
            <Text style={styles.optionText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// 9. MULTIPLICATION ARRAYS (Rows x Columns of Cameroon items)
export function MultiplicationArrays({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const rows = question.rows || 3;
  const cols = question.cols || 4;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{question.q || `${rows} rangées de ${cols} mangues :`}</Text>
      
      <View style={styles.arrayGrid}>
        {Array.from({ length: rows }).map((_, r) => (
          <View key={r} style={styles.arrayRow}>
            {Array.from({ length: cols }).map((_, c) => (
              <Text key={c} style={styles.arrayItem}>🥭</Text>
            ))}
          </View>
        ))}
      </View>
      <Text style={styles.subtext}>{rows} × {cols} = ?</Text>

      <View style={styles.options}>
        {question.options.map((opt: string) => (
          <TouchableOpacity key={opt} style={styles.optionBtn} onPress={() => onAnswer(opt)}>
            <Text style={styles.optionText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// 10. DIVISION SHARING (Distribute fish/bananas equally to plates)
export function DivisionSharing({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const totalItems = question.total || 8;
  const numPlates = question.plates || 2;
  const [distributed, setDistributed] = useState<number[]>(Array(numPlates).fill(0));
  const remaining = totalItems - distributed.reduce((a, b) => a + b, 0);

  const giveToPlate = (idx: number) => {
    if (remaining > 0) {
      const next = [...distributed];
      next[idx] += 1;
      setDistributed(next);
    }
  };

  const resetSharing = () => setDistributed(Array(numPlates).fill(0));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{question.q || `Partage ${totalItems} poissons équitablement dans ${numPlates} assiettes :`}</Text>
      
      <View style={styles.sharingTop}>
        <Text style={styles.subtext}>Poissons restants dans le panier : {remaining}</Text>
        <View style={styles.fishBasket}>
          {Array.from({ length: remaining }).map((_, i) => <Text key={i} style={styles.smallFish}>🐟</Text>)}
        </View>
      </View>

      <View style={styles.platesRow}>
        {distributed.map((count, idx) => (
          <TouchableOpacity key={idx} style={styles.plateCard} onPress={() => giveToPlate(idx)}>
            <Text style={styles.plateTitle}>Assiette {idx + 1}</Text>
            <View style={styles.plateItems}>
              {Array.from({ length: count }).map((_, i) => <Text key={i} style={styles.smallFish}>🐟</Text>)}
            </View>
            <Text style={styles.plateCountBadge}>{count}</Text>
            <Text style={styles.plateInstruction}>+ Toucher pour ajouter</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.resetBtn} onPress={resetSharing}><Text style={styles.resetBtnText}>🔄 Réinitialiser</Text></TouchableOpacity>
        <TouchableOpacity 
          style={[styles.confirmBtn, remaining !== 0 && { opacity: 0.5 }]} 
          onPress={() => onAnswer(distributed[0].toString())}
        >
          <Text style={styles.confirmBtnText}>Valider ({distributed[0]} par assiette)</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// 11. FRACTION BUILDER (Visual pizza / cake slices)
export function FractionBuilder({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const totalSlices = question.slices || 4;
  const [selectedSlices, setSelectedSlices] = useState<number[]>([]);

  const toggleSlice = (i: number) => {
    if (selectedSlices.includes(i)) {
      setSelectedSlices(selectedSlices.filter(s => s !== i));
    } else {
      setSelectedSlices([...selectedSlices, i]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{question.q || 'Sélectionne les parts pour former la fraction :'}</Text>
      <Text style={styles.subtext}>Partage du gâteau : {selectedSlices.length} / {totalSlices}</Text>

      <View style={styles.pieContainer}>
        {Array.from({ length: totalSlices }).map((_, i) => {
          const isSelected = selectedSlices.includes(i);
          return (
            <TouchableOpacity 
              key={i} 
              onPress={() => toggleSlice(i)}
              style={[styles.pieSlice, isSelected && styles.pieSliceActive]}
            >
              <Text style={styles.sliceText}>{isSelected ? '🍰 Miam !' : 'Part'}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.options}>
        {question.options.map((opt: string) => (
          <TouchableOpacity key={opt} style={styles.optionBtn} onPress={() => onAnswer(opt)}>
            <Text style={styles.optionText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// 12. CAMEROON MONEY SHOP (CFA Franc Shopping Market)
export function MoneyShop({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const price = question.price || 350; // FCFA
  const item = question.item || 'Beignets-Haricots';
  const itemIcon = question.itemIcon || '🥯';

  const [walletPaid, setWalletPaid] = useState<number>(0);

  const addCoin = (val: number) => setWalletPaid(walletPaid + val);
  const resetWallet = () => setWalletPaid(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Le Marché Camerounais</Text>
      
      <View style={styles.marketStallCard}>
        <Text style={styles.marketIcon}>{itemIcon}</Text>
        <Text style={styles.marketItemName}>{item}</Text>
        <Text style={styles.marketPrice}>Prix : {price} FCFA</Text>
      </View>

      <Text style={styles.subtext}>Tu as donné : <Text style={{ color: '#059669', fontWeight: 'bold' }}>{walletPaid} FCFA</Text></Text>

      {/* Cameroon Coins & Notes */}
      <View style={styles.currencyRow}>
        <TouchableOpacity style={styles.coin25} onPress={() => addCoin(25)}><Text style={styles.coinText}>25F</Text></TouchableOpacity>
        <TouchableOpacity style={styles.coin50} onPress={() => addCoin(50)}><Text style={styles.coinText}>50F</Text></TouchableOpacity>
        <TouchableOpacity style={styles.coin100} onPress={() => addCoin(100)}><Text style={styles.coinText}>100F</Text></TouchableOpacity>
        <TouchableOpacity style={styles.coin500} onPress={() => addCoin(500)}><Text style={styles.coinText}>500F</Text></TouchableOpacity>
        <TouchableOpacity style={styles.bill1000} onPress={() => addCoin(1000)}><Text style={styles.billText}>1000F</Text></TouchableOpacity>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.resetBtn} onPress={resetWallet}><Text style={styles.resetBtnText}>Effacer</Text></TouchableOpacity>
        <TouchableOpacity 
          style={styles.confirmBtn} 
          onPress={() => onAnswer(walletPaid.toString())}
        >
          <Text style={styles.confirmBtnText}>Payer {walletPaid} FCFA</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// 13. CLOCK GAME (Analog time telling)
export function ClockGame({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const targetHour = question.hour || 3;
  const targetMin = question.minute || 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{question.q || 'Quelle heure est-il sur l\'horloge ?'}</Text>
      
      <View style={styles.clockCircle}>
        <Text style={[styles.clockNum, { top: 10, alignSelf: 'center' }]}>12</Text>
        <Text style={[styles.clockNum, { right: 15, top: '42%' }]}>3</Text>
        <Text style={[styles.clockNum, { bottom: 10, alignSelf: 'center' }]}>6</Text>
        <Text style={[styles.clockNum, { left: 15, top: '42%' }]}>9</Text>

        {/* Center pivot */}
        <View style={styles.clockCenter} />
        {/* Hour Hand */}
        <View style={[styles.hourHand, { transform: [{ rotate: `${targetHour * 30}deg` }] }]} />
        {/* Minute Hand */}
        <View style={[styles.minHand, { transform: [{ rotate: `${targetMin * 6}deg` }] }]} />
      </View>

      <View style={styles.options}>
        {question.options.map((opt: string) => (
          <TouchableOpacity key={opt} style={styles.optionBtn} onPress={() => onAnswer(opt)}>
            <Text style={styles.optionText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// 14. MEASUREMENT LAB (Measuring length with a cm ruler)
export function MeasurementLab({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const itemLength = question.lengthCm || 6;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{question.q || 'Mesure la longueur du crayon :'}</Text>
      
      {/* Object to measure */}
      <View style={[styles.measuringObject, { width: itemLength * 35 }]}>
        <Text style={styles.pencilIcon}>✏️</Text>
      </View>

      {/* Graduated Ruler */}
      <View style={styles.rulerContainer}>
        {Array.from({ length: 11 }).map((_, cm) => (
          <View key={cm} style={styles.rulerCm}>
            <View style={styles.rulerMark} />
            <Text style={styles.rulerText}>{cm}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.subtext}>Graduations en centimètres (cm)</Text>

      <View style={styles.options}>
        {question.options.map((opt: string) => (
          <TouchableOpacity key={opt} style={styles.optionBtn} onPress={() => onAnswer(opt)}>
            <Text style={styles.optionText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// 15. SHAPE PUZZLE (2D Geometry)
export function ShapePuzzle({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const shape = question.shape || 'triangle';
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{question.q || 'Touche la forme demandée :'}</Text>
      
      <View style={styles.shapeDisplayArea}>
        {shape === 'circle' && <View style={styles.geomCircle} />}
        {shape === 'square' && <View style={styles.geomSquare} />}
        {shape === 'triangle' && <View style={styles.geomTriangle} />}
        {shape === 'rectangle' && <View style={styles.geomRectangle} />}
      </View>

      <View style={styles.options}>
        {question.options.map((opt: string) => (
          <TouchableOpacity key={opt} style={styles.optionBtn} onPress={() => onAnswer(opt)}>
            <Text style={styles.optionText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 15, width: '100%' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15, textAlign: 'center', color: '#1E293B' },
  subtext: { fontSize: 16, color: '#64748B', marginBottom: 20, textAlign: 'center' },
  
  // CountAndTap
  objectsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 15, marginBottom: 20, justifyContent: 'center', maxWidth: 420 },
  tappableObject: { padding: 12, backgroundColor: '#FEF3C7', borderRadius: 20, borderWidth: 3, borderColor: '#F59E0B', width: 80, height: 80, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 6, elevation: 4 },
  tappedObject: { backgroundColor: '#BBF7D0', borderColor: '#10B981', transform: [{ scale: 0.95 }] },
  objectIcon: { fontSize: 40 },
  tappedBadge: { position: 'absolute', top: -8, right: -8, backgroundColor: '#10B981', width: 26, height: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  tappedNumber: { color: 'white', fontWeight: 'bold', fontSize: 14 },
  counterStatus: { fontSize: 18, fontWeight: 'bold', color: '#4F46E5', marginBottom: 20 },

  // Big Number Match
  bigNumberCircle: { width: 140, height: 140, borderRadius: 70, backgroundColor: '#EFF6FF', borderWidth: 4, borderColor: '#3B82F6', alignItems: 'center', justifyContent: 'center', marginBottom: 25 },
  bigNumberText: { fontSize: 75, fontWeight: 'bold', color: '#1D4ED8' },

  // Number Order
  slotRow: { flexDirection: 'row', gap: 12, marginBottom: 25 },
  slotBox: { width: 60, height: 60, borderRadius: 15, borderWidth: 3, borderColor: '#94A3B8', borderStyle: 'dashed', backgroundColor: '#F8FAFC', alignItems: 'center', justifyContent: 'center' },
  slotNumber: { fontSize: 28, fontWeight: 'bold', color: '#1E293B' },
  tileBtn: { width: 65, height: 65, borderRadius: 15, backgroundColor: '#3B82F6', alignItems: 'center', justifyContent: 'center', margin: 6, elevation: 4 },
  tileUsed: { backgroundColor: '#CBD5E1', elevation: 0 },
  tileText: { fontSize: 30, fontWeight: 'bold', color: 'white' },
  tileTextUsed: { color: '#94A3B8' },

  // Number Line
  numberLineContainer: { width: '100%', maxWidth: 460, paddingVertical: 30, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  lineBar: { position: 'absolute', width: '90%', height: 6, backgroundColor: '#475569', borderRadius: 3, top: 45 },
  ticksRow: { flexDirection: 'row', justifyContent: 'space-between', width: '95%' },
  tickItem: { alignItems: 'center', width: 35 },
  frogIcon: { fontSize: 26, position: 'absolute', top: -30 },
  tickMark: { width: 4, height: 24, backgroundColor: '#475569', borderRadius: 2, marginBottom: 6 },
  tickMarkActive: { backgroundColor: '#10B981', height: 32 },
  tickLabel: { fontSize: 16, fontWeight: 'bold', color: '#1E293B' },

  // Ten Frame
  tenFrameBorder: { flexDirection: 'row', flexWrap: 'wrap', width: 310, borderWidth: 4, borderColor: '#1E3A8A', borderRadius: 12, backgroundColor: 'white', marginBottom: 25 },
  tenFrameCell: { width: 60, height: 60, borderWidth: 2, borderColor: '#1E3A8A', alignItems: 'center', justifyContent: 'center' },
  tenFrameDot: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#EF4444' },

  // Place Value
  blocksShowcase: { flexDirection: 'row', gap: 20, marginBottom: 20, justifyContent: 'center' },
  columnBox: { backgroundColor: '#F1F5F9', padding: 15, borderRadius: 16, alignItems: 'center', minWidth: 140 },
  columnHeader: { fontSize: 16, fontWeight: 'bold', color: '#334155', marginBottom: 10 },
  rodsContainer: { flexDirection: 'row', gap: 6, minHeight: 90, alignItems: 'flex-end', marginBottom: 10 },
  tenRod: { width: 14, height: 80, backgroundColor: '#3B82F6', borderRadius: 4, borderWidth: 1, borderColor: '#1D4ED8' },
  rodSegment: { height: 7, borderBottomWidth: 1, borderBottomColor: '#60A5FA' },
  unitsGrid: { flexDirection: 'row', flexWrap: 'wrap', width: 80, gap: 5, minHeight: 90, alignItems: 'flex-end', marginBottom: 10 },
  unitCube: { width: 14, height: 14, backgroundColor: '#F59E0B', borderRadius: 3, borderWidth: 1, borderColor: '#D97706' },
  controlRow: { flexDirection: 'row', alignItems: 'center', gap: 15 },
  stepBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#475569', alignItems: 'center', justifyContent: 'center' },
  stepBtnText: { color: 'white', fontSize: 22, fontWeight: 'bold' },
  columnCount: { fontSize: 22, fontWeight: 'bold', color: '#0F172A' },
  totalDisplay: { fontSize: 22, marginBottom: 15 },

  // Addition Builder
  visualEquationCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8FAFC', padding: 16, borderRadius: 20, borderWidth: 2, borderColor: '#E2E8F0', marginBottom: 25 },
  eqGroup: { alignItems: 'center', gap: 6 },
  eqNumber: { fontSize: 40, fontWeight: 'bold', color: '#1E3A8A' },
  dotsWrap: { flexDirection: 'row', flexWrap: 'wrap', width: 60, justifyContent: 'center', gap: 4 },
  blueDot: { width: 14, height: 14, borderRadius: 7, backgroundColor: '#3B82F6' },
  greenDot: { width: 14, height: 14, borderRadius: 7, backgroundColor: '#10B981' },
  eqOp: { fontSize: 32, fontWeight: 'bold', color: '#64748B', marginHorizontal: 15 },
  eqUnknown: { fontSize: 48, fontWeight: 'bold', color: '#F59E0B' },

  // Subtraction
  subObject: { padding: 10, backgroundColor: '#FEF3C7', borderRadius: 16, width: 70, height: 70, alignItems: 'center', justifyContent: 'center' },
  subObjectCrossed: { backgroundColor: '#FEE2E2', opacity: 0.6 },
  crossMark: { position: 'absolute', fontSize: 34 },

  // Multiplication Arrays
  arrayGrid: { backgroundColor: '#FFFBEB', padding: 15, borderRadius: 16, borderWidth: 2, borderColor: '#FDE68A', marginBottom: 20 },
  arrayRow: { flexDirection: 'row', gap: 12, marginVertical: 4 },
  arrayItem: { fontSize: 34 },

  // Division Sharing
  sharingTop: { alignItems: 'center', marginBottom: 15 },
  fishBasket: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, maxWidth: 300, justifyContent: 'center' },
  smallFish: { fontSize: 26 },
  platesRow: { flexDirection: 'row', gap: 15, marginBottom: 20, justifyContent: 'center' },
  plateCard: { width: 130, padding: 12, backgroundColor: '#EFF6FF', borderRadius: 20, borderWidth: 2, borderColor: '#BFDBFE', alignItems: 'center' },
  plateTitle: { fontSize: 14, fontWeight: 'bold', color: '#1E40AF', marginBottom: 6 },
  plateItems: { minHeight: 60, flexDirection: 'row', flexWrap: 'wrap', gap: 4, justifyContent: 'center', marginBottom: 6 },
  plateCountBadge: { fontSize: 18, fontWeight: 'bold', color: '#2563EB' },
  plateInstruction: { fontSize: 11, color: '#64748B', marginTop: 4 },

  // Fractions
  pieContainer: { flexDirection: 'row', flexWrap: 'wrap', width: 200, height: 200, borderRadius: 100, overflow: 'hidden', borderWidth: 4, borderColor: '#D97706', marginBottom: 25 },
  pieSlice: { width: '50%', height: '50%', backgroundColor: '#FEF3C7', borderWidth: 1, borderColor: '#F59E0B', alignItems: 'center', justifyContent: 'center' },
  pieSliceActive: { backgroundColor: '#F59E0B' },
  sliceText: { fontSize: 12, fontWeight: 'bold', color: '#78350F' },

  // Cameroon Money Shop
  marketStallCard: { backgroundColor: '#ECFDF5', padding: 16, borderRadius: 20, borderWidth: 2, borderColor: '#A7F3D0', alignItems: 'center', width: '100%', maxWidth: 320, marginBottom: 15 },
  marketIcon: { fontSize: 50, marginBottom: 6 },
  marketItemName: { fontSize: 20, fontWeight: 'bold', color: '#065F46' },
  marketPrice: { fontSize: 18, fontWeight: 'bold', color: '#059669', marginTop: 4 },
  currencyRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginBottom: 20 },
  coin25: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#E2E8F0', borderWidth: 2, borderColor: '#94A3B8', alignItems: 'center', justifyContent: 'center' },
  coin50: { width: 55, height: 55, borderRadius: 27.5, backgroundColor: '#FEF08A', borderWidth: 2, borderColor: '#CA8A04', alignItems: 'center', justifyContent: 'center' },
  coin100: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#CBD5E1', borderWidth: 3, borderColor: '#64748B', alignItems: 'center', justifyContent: 'center' },
  coin500: { width: 65, height: 65, borderRadius: 32.5, backgroundColor: '#FDE047', borderWidth: 3, borderColor: '#A16207', alignItems: 'center', justifyContent: 'center' },
  bill1000: { width: 90, height: 55, borderRadius: 10, backgroundColor: '#BBF7D0', borderWidth: 2, borderColor: '#16A34A', alignItems: 'center', justifyContent: 'center' },
  coinText: { fontWeight: 'bold', fontSize: 15, color: '#1E293B' },
  billText: { fontWeight: 'bold', fontSize: 15, color: '#14532D' },

  // Analog Clock
  clockCircle: { width: 200, height: 200, borderRadius: 100, borderWidth: 6, borderColor: '#1E3A8A', backgroundColor: 'white', position: 'relative', justifyContent: 'center', alignItems: 'center', marginBottom: 25 },
  clockNum: { position: 'absolute', fontSize: 20, fontWeight: 'bold', color: '#1E3A8A' },
  clockCenter: { width: 14, height: 14, borderRadius: 7, backgroundColor: '#EF4444', zIndex: 10 },
  hourHand: { position: 'absolute', width: 6, height: 50, backgroundColor: '#1E3A8A', borderRadius: 3, bottom: 95, transformOrigin: 'bottom' },
  minHand: { position: 'absolute', width: 4, height: 75, backgroundColor: '#3B82F6', borderRadius: 2, bottom: 95, transformOrigin: 'bottom' },

  // Measurement Lab
  measuringObject: { height: 35, backgroundColor: '#FEF08A', borderRadius: 8, borderWidth: 2, borderColor: '#EAB308', alignItems: 'flex-start', justifyContent: 'center', paddingLeft: 6, marginBottom: 8 },
  pencilIcon: { fontSize: 22 },
  rulerContainer: { flexDirection: 'row', backgroundColor: '#FDE68A', borderWidth: 2, borderColor: '#D97706', borderRadius: 6, paddingVertical: 6, marginBottom: 20 },
  rulerCm: { width: 35, alignItems: 'flex-start', borderLeftWidth: 1, borderLeftColor: '#78350F', paddingLeft: 3 },
  rulerMark: { width: 1, height: 8, backgroundColor: '#78350F', marginBottom: 4 },
  rulerText: { fontSize: 12, fontWeight: 'bold', color: '#78350F' },

  // Geometry
  shapeDisplayArea: { width: 150, height: 150, alignItems: 'center', justifyContent: 'center', marginBottom: 25 },
  geomCircle: { width: 110, height: 110, borderRadius: 55, backgroundColor: '#EF4444' },
  geomSquare: { width: 100, height: 100, backgroundColor: '#3B82F6' },
  geomRectangle: { width: 140, height: 80, backgroundColor: '#10B981' },
  geomTriangle: { width: 0, height: 0, borderLeftWidth: 60, borderRightWidth: 60, borderBottomWidth: 100, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: '#F59E0B' },

  // Common UI Buttons
  options: { flexDirection: 'row', flexWrap: 'wrap', gap: 15, justifyContent: 'center', width: '100%', maxWidth: 450 },
  optionBtn: { paddingVertical: 14, paddingHorizontal: 28, backgroundColor: '#DBEAFE', borderRadius: 18, borderWidth: 3, borderColor: '#3B82F6', minWidth: 90, alignItems: 'center', elevation: 4 },
  optionText: { fontSize: 26, fontWeight: 'bold', color: '#1E3A8A' },
  confirmBtn: { backgroundColor: '#10B981', paddingVertical: 14, paddingHorizontal: 28, borderRadius: 16, alignItems: 'center', elevation: 4 },
  confirmBtnText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  resetBtn: { backgroundColor: '#E2E8F0', paddingVertical: 14, paddingHorizontal: 20, borderRadius: 16, alignItems: 'center' },
  resetBtnText: { color: '#475569', fontSize: 16, fontWeight: 'bold' },
  actionsRow: { flexDirection: 'row', gap: 15, alignItems: 'center', justifyContent: 'center', marginTop: 10 }
});
