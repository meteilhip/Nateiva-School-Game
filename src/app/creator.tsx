import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, withSequence } from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { saveAvatar } from '@/db';

const BODIES = ["🐱", "🐶", "🐉", "🦊", "🐢", "🦉", "🐙"];
const HATS   = ["🎩", "👑", "🧢", "🎓", "⛑️", "🪖"];
const COLORS = ["#FFB6C1", "#B0E0E6", "#FFD700", "#98FB98", "#DDA0DD"];

export default function CreatorScreen() {
  const [body, setBody] = useState(BODIES[0]);
  const [hat, setHat] = useState<string | null>(null);
  const [color, setColor] = useState(COLORS[0]);
  const [name, setName] = useState("");
  const router = useRouter();

  // Floating animation for the creature preview
  const translateY = useSharedValue(0);
  React.useEffect(() => {
    translateY.value = withRepeat(
      withSequence(
        withTiming(-10, { duration: 1000 }),
        withTiming(0, { duration: 1000 })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const handleSave = () => {
    if (!name.trim()) return;
    saveAvatar({
      body,
      hat,
      color,
      name,
    });
    router.replace('/map');
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <ThemedText style={styles.title}>Create Your Creature!</ThemedText>

        <Animated.View style={[styles.previewContainer, { backgroundColor: color }, animatedStyle]}>
          <ThemedText style={styles.previewBody}>{body}</ThemedText>
          {hat && <ThemedText style={styles.previewHat}>{hat}</ThemedText>}
        </Animated.View>

        <TextInput
          style={styles.input}
          placeholder="Name your creature..."
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
          maxLength={15}
        />

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Body:</ThemedText>
          <View style={styles.row}>
            {BODIES.map(b => (
              <TouchableOpacity key={b} onPress={() => setBody(b)} style={[styles.selectBtn, body === b && styles.selected]}>
                <ThemedText style={styles.selectText}>{b}</ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Hat:</ThemedText>
          <View style={styles.row}>
            {HATS.map(h => (
              <TouchableOpacity key={h} onPress={() => setHat(h)} style={[styles.selectBtn, hat === h && styles.selected]}>
                <ThemedText style={styles.selectText}>{h}</ThemedText>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={() => setHat(null)} style={[styles.selectBtn, hat === null && styles.selected]}>
              <ThemedText style={styles.selectText}>🚫</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Color:</ThemedText>
          <View style={styles.row}>
            {COLORS.map(c => (
              <TouchableOpacity 
                key={c} 
                onPress={() => setColor(c)} 
                style={[styles.colorBtn, { backgroundColor: c }, color === c && styles.selectedColor]} 
              />
            ))}
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.saveBtn, !name.trim() && styles.disabledBtn]} 
          disabled={!name.trim()} 
          onPress={handleSave}
        >
          <ThemedText style={styles.saveBtnText}>Hatch! 🥚</ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' }, // White
  scroll: { padding: 24, paddingBottom: 60, alignItems: 'center' },
  title: { fontSize: 32, fontWeight: 'bold', marginTop: 40, marginBottom: 20, color: '#000000' }, // Black
  previewContainer: {
    width: 160, height: 160, borderRadius: 80,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 30,
    borderWidth: 4, borderColor: '#333333', // Grey
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 5,
  },
  previewBody: { fontSize: 80 },
  previewHat: { fontSize: 40, position: 'absolute', top: 10, right: 20, transform: [{ rotate: '15deg' }] },
  input: {
    width: '100%', backgroundColor: '#F5F5F5', padding: 16, borderRadius: 16,
    fontSize: 20, fontWeight: 'bold', color: '#000', textAlign: 'center',
    borderWidth: 2, borderColor: '#CCCCCC', marginBottom: 30,
  },
  section: { width: '100%', marginBottom: 24 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 12, color: '#333333' },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  selectBtn: {
    padding: 12, backgroundColor: '#FFF', borderRadius: 16,
    borderWidth: 2, borderColor: '#CCCCCC',
  },
  selected: { borderColor: '#FF0000', backgroundColor: '#FFEBEB' }, // Red accent
  selectText: { fontSize: 32 },
  colorBtn: { width: 48, height: 48, borderRadius: 24, borderWidth: 3, borderColor: '#FFF', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  selectedColor: { borderColor: '#FF0000' },
  saveBtn: { width: '100%', backgroundColor: '#FF0000', padding: 20, borderRadius: 20, alignItems: 'center', marginTop: 10, shadowColor: '#FF0000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5 },
  disabledBtn: { opacity: 0.5 },
  saveBtnText: { color: '#FFF', fontSize: 24, fontWeight: 'bold' },
});