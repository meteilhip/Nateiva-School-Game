import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// 1. MEMORY CARD FLIP GAME (Find pairs of matching cards)
export function MemoryCardGame({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const pairs = question.pairs || [
    { id: '1', label: '🦁 Lion', matchId: '1' },
    { id: '2', label: '🦁 Lion', matchId: '1' },
    { id: '3', label: '🥭 Mangue', matchId: '2' },
    { id: '4', label: '🥭 Mangue', matchId: '2' },
    { id: '5', label: '⚽ Ballon', matchId: '3' },
    { id: '6', label: '⚽ Ballon', matchId: '3' },
  ];

  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<string[]>([]);

  const handleCardClick = (idx: number) => {
    if (flipped.includes(idx) || matched.includes(pairs[idx].matchId)) return;
    if (flipped.length === 2) return; // Wait for evaluate

    const newFlipped = [...flipped, idx];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const cardA = pairs[newFlipped[0]];
      const cardB = pairs[newFlipped[1]];
      if (cardA.matchId === cardB.matchId) {
        const nextMatched = [...matched, cardA.matchId];
        setMatched(nextMatched);
        setFlipped([]);
        if (nextMatched.length === pairs.length / 2) {
          setTimeout(() => onAnswer('COMPLETED'), 800);
        }
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jeu de Mémoire : Trouve les paires !</Text>
      <Text style={styles.subtext}>Paires trouvées : {matched.length} / {pairs.length / 2}</Text>

      <View style={styles.memoryGrid}>
        {pairs.map((card: any, idx: number) => {
          const isFlipped = flipped.includes(idx) || matched.includes(card.matchId);
          return (
            <TouchableOpacity 
              key={idx} 
              activeOpacity={0.8}
              style={[styles.memoryCard, isFlipped ? styles.memoryCardFlipped : styles.memoryCardBack]} 
              onPress={() => handleCardClick(idx)}
            >
              <Text style={styles.memoryCardText}>
                {isFlipped ? card.label : '❓'}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

// 2. TAP-TO-PAIR (Pair left items to right items)
export function TapToPair({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const leftItems: { id: string, label: string }[] = question.left || [
    { id: '1', label: '5' },
    { id: '2', label: '3' },
    { id: '3', label: '8' }
  ];
  const rightItems: { id: string, label: string, matchId: string }[] = question.right || [
    { id: 'a', label: '🍎🍎🍎 (3)', matchId: '2' },
    { id: 'b', label: '🍎🍎🍎🍎🍎 (5)', matchId: '1' },
    { id: 'c', label: '🍎🍎🍎🍎🍎🍎🍎🍎 (8)', matchId: '3' }
  ];

  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [completedPairs, setCompletedPairs] = useState<string[]>([]);

  const handleSelectLeft = (id: string) => {
    if (!completedPairs.includes(id)) setSelectedLeft(id);
  };

  const handleSelectRight = (item: any) => {
    if (!selectedLeft) return;
    if (item.matchId === selectedLeft) {
      const next = [...completedPairs, selectedLeft];
      setCompletedPairs(next);
      setSelectedLeft(null);
      if (next.length === leftItems.length) {
        setTimeout(() => onAnswer('COMPLETED'), 800);
      }
    } else {
      setSelectedLeft(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{question.q || 'Relie chaque nombre à sa quantité :'}</Text>
      <Text style={styles.subtext}>Touche un élément à gauche, puis sa correspondance à droite !</Text>

      <View style={styles.pairColumnsRow}>
        {/* Left Column */}
        <View style={styles.column}>
          {leftItems.map((item) => {
            const isDone = completedPairs.includes(item.id);
            const isSelected = selectedLeft === item.id;
            return (
              <TouchableOpacity 
                key={item.id} 
                disabled={isDone}
                style={[styles.pairBox, isSelected && styles.pairBoxSelected, isDone && styles.pairBoxDone]} 
                onPress={() => handleSelectLeft(item.id)}
              >
                <Text style={styles.pairBoxText}>{item.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Right Column */}
        <View style={styles.column}>
          {rightItems.map((item) => {
            const isDone = completedPairs.includes(item.matchId);
            return (
              <TouchableOpacity 
                key={item.id} 
                disabled={isDone}
                style={[styles.pairBox, isDone && styles.pairBoxDone]} 
                onPress={() => handleSelectRight(item)}
              >
                <Text style={styles.pairBoxText}>{item.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}

// 3. SORTING BASKETS (Categorize items into containers)
export function SortingBaskets({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const currentItem = question.currentItem || { name: 'Mangue', icon: '🥭', targetBasket: 'FRUITS' };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{question.q || 'Dans quel panier ranger cet aliment ?'}</Text>

      <View style={styles.floatingItemCard}>
        <Text style={styles.floatingIcon}>{currentItem.icon}</Text>
        <Text style={styles.floatingName}>{currentItem.name}</Text>
      </View>

      <View style={styles.basketsRow}>
        <TouchableOpacity style={styles.basketCard1} onPress={() => onAnswer('FRUITS')}>
          <Text style={styles.basketEmoji}>🧺</Text>
          <Text style={styles.basketName}>Fruits & Légumes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.basketCard2} onPress={() => onAnswer('VIANDES')}>
          <Text style={styles.basketEmoji}>🥩</Text>
          <Text style={styles.basketName}>Viandes & Poissons</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 15, width: '100%' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12, textAlign: 'center', color: '#1E293B' },
  subtext: { fontSize: 16, color: '#64748B', marginBottom: 20, textAlign: 'center' },

  // Memory Card Game
  memoryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, width: 320, justifyContent: 'center' },
  memoryCard: { width: 90, height: 110, borderRadius: 16, alignItems: 'center', justifyContent: 'center', elevation: 4 },
  memoryCardBack: { backgroundColor: '#3B82F6', borderWidth: 3, borderColor: '#1D4ED8' },
  memoryCardFlipped: { backgroundColor: '#FEF08A', borderWidth: 3, borderColor: '#EAB308' },
  memoryCardText: { fontSize: 16, fontWeight: 'bold', textAlign: 'center' },

  // Tap-to-Pair
  pairColumnsRow: { flexDirection: 'row', gap: 25, width: '100%', maxWidth: 450, justifyContent: 'center' },
  column: { flex: 1, gap: 15 },
  pairBox: { padding: 16, backgroundColor: '#EFF6FF', borderRadius: 16, borderWidth: 3, borderColor: '#93C5FD', alignItems: 'center' },
  pairBoxSelected: { borderColor: '#F59E0B', backgroundColor: '#FEF3C7' },
  pairBoxDone: { borderColor: '#10B981', backgroundColor: '#DCFCE7', opacity: 0.7 },
  pairBoxText: { fontSize: 18, fontWeight: 'bold', color: '#1E3A8A' },

  // Sorting Baskets
  floatingItemCard: { backgroundColor: '#FFFBEB', padding: 20, borderRadius: 24, borderWidth: 3, borderColor: '#FDE68A', alignItems: 'center', marginBottom: 25, width: 160 },
  floatingIcon: { fontSize: 60, marginBottom: 6 },
  floatingName: { fontSize: 20, fontWeight: 'bold', color: '#78350F' },
  basketsRow: { flexDirection: 'row', gap: 15, width: '100%', maxWidth: 420 },
  basketCard1: { flex: 1, backgroundColor: '#DCFCE7', padding: 16, borderRadius: 20, borderWidth: 3, borderColor: '#22C55E', alignItems: 'center' },
  basketCard2: { flex: 1, backgroundColor: '#FEE2E2', padding: 16, borderRadius: 20, borderWidth: 3, borderColor: '#EF4444', alignItems: 'center' },
  basketEmoji: { fontSize: 40, marginBottom: 8 },
  basketName: { fontSize: 15, fontWeight: 'bold', color: '#1E293B', textAlign: 'center' }
});
