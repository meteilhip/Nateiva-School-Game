import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInUp, ZoomIn } from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { getAvatar, getXp, getAssignedTasks, Task } from '@/db';

const ZONES = [
  { id: "forest", name: "Forest of Numbers", emoji: "🌲", grade: "Math" },
  { id: "castle", name: "Castle of Stories", emoji: "🏰", grade: "Reading" },
  { id: "space",  name: "Space Lab",          emoji: "🚀", grade: "Science" },
  { id: "time",   name: "Time Traveler's Map",emoji: "⏳", grade: "History" },
  { id: "puzzle", name: "Puzzle Peaks",       emoji: "🧩", grade: "Logic" },
];

export default function MapScreen() {
  const [avatar, setAvatar] = useState<any>(null);
  const [xp, setXp] = useState(0);
  const [tasks, setTasks] = useState<Task[]>([]);
  const router = useRouter();

  useEffect(() => {
    setAvatar(getAvatar());
    setXp(getXp());
    setTasks(getAssignedTasks());
  }, []);

  if (!avatar) return null;

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        
        <Animated.View entering={ZoomIn} style={styles.header}>
          <View style={[styles.avatarCircle, { backgroundColor: avatar.color }]}>
            <ThemedText style={styles.avatarBody}>{avatar.body}</ThemedText>
            {avatar.hat ? <ThemedText style={styles.avatarHat}>{avatar.hat}</ThemedText> : null}
          </View>
          <View style={styles.headerTextInfo}>
            <ThemedText style={styles.title}>{avatar.name}'s Adventure</ThemedText>
            <ThemedText style={styles.xpText}>XP: {xp} 🌟</ThemedText>
          </View>
        </Animated.View>

        <View style={styles.zonesContainer}>
          {ZONES.map((z, index) => {
            const assignedTask = tasks.find(t => t.zone === z.id && !t.isCompleted);
            return (
              <Animated.View key={z.id} entering={FadeInUp.delay(index * 150)}>
                <TouchableOpacity 
                  style={[styles.zoneCard, assignedTask && styles.zoneCardAssigned]}
                  onPress={() => router.push(`/battle/${z.id}` as any)}
                >
                  {assignedTask && (
                    <View style={styles.taskBadge}>
                      <ThemedText style={styles.taskBadgeText}>📋 ASSIGNED TASK: {assignedTask.description}</ThemedText>
                    </View>
                  )}
                  <ThemedText style={styles.zoneEmoji}>{z.emoji}</ThemedText>
                  <ThemedText style={styles.zoneName}>{z.name}</ThemedText>
                  <ThemedText style={styles.zoneGrade}>{z.grade}</ThemedText>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>

        <TouchableOpacity 
          style={styles.parentBtn}
          onPress={() => router.push('/parent' as any)}
        >
          <ThemedText style={styles.parentBtnText}>👨‍👩‍👧 Parent Dashboard</ThemedText>
        </TouchableOpacity>

      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' }, // White
  scroll: { padding: 20, paddingTop: 60, paddingBottom: 60 },
  header: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#333333', padding: 20, borderRadius: 24, // Grey
    marginBottom: 30,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4,
  },
  avatarCircle: {
    width: 80, height: 80, borderRadius: 40,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 3, borderColor: '#FFF',
    marginRight: 20,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 3,
  },
  avatarBody: { fontSize: 40 },
  avatarHat: { fontSize: 24, position: 'absolute', top: -5, right: 0, transform: [{ rotate: '15deg' }] },
  headerTextInfo: { flex: 1 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 4 }, // White
  xpText: { fontSize: 18, fontWeight: 'bold', color: '#FF0000' }, // Red
  zonesContainer: { gap: 20 },
  zoneCard: {
    backgroundColor: '#F5F5F5', padding: 24, borderRadius: 24, // Light Grey
    alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2,
    borderWidth: 2, borderColor: '#333333', // Grey
  },
  zoneEmoji: { fontSize: 60, marginBottom: 12 },
  zoneName: { fontSize: 22, fontWeight: 'bold', color: '#000000', textAlign: 'center' }, // Black
  zoneGrade: { fontSize: 16, color: '#333333', marginTop: 4, fontWeight: 'bold' }, // Grey
  zoneCardAssigned: { borderColor: '#FF0000', borderWidth: 3, backgroundColor: '#FFF0F0' },
  taskBadge: { position: 'absolute', top: -10, left: 10, backgroundColor: '#FF0000', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  taskBadgeText: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },
  parentBtn: { marginTop: 30, backgroundColor: '#333333', padding: 16, borderRadius: 16, alignItems: 'center' },
  parentBtnText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' }
});