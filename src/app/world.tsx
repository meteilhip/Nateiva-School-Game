import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';

export default function WorldScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace('/')} style={styles.backBtn}>
          <Text style={styles.backText}>⬅️ Changer de Profil</Text>
        </TouchableOpacity>
        <View style={styles.stats}>
          <Text style={styles.statText}>⭐ 120</Text>
          <Text style={styles.statText}>🔥 3 Jours</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Choisis ton monde !</Text>
        <Text style={styles.subtitle}>Choose your world!</Text>

        <TouchableOpacity style={[styles.worldCard, { backgroundColor: '#DBEAFE', borderColor: '#3B82F6' }]} onPress={() => router.push('/levels/math')}>
          <Text style={styles.worldIcon}>🧮</Text>
          <Text style={styles.worldTitle}>Math Kingdom</Text>
          <Text style={styles.worldDesc}>Calcul, géométrie, logique</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.worldCard, { backgroundColor: '#FEF3C7', borderColor: '#F59E0B' }]} onPress={() => router.push('/levels/reading')}>
          <Text style={styles.worldIcon}>📚</Text>
          <Text style={styles.worldTitle}>Reading Forest</Text>
          <Text style={styles.worldDesc}>Lecture et compréhension</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.worldCard, { backgroundColor: '#D1FAE5', borderColor: '#10B981' }]} onPress={() => router.push('/levels/science')}>
          <Text style={styles.worldIcon}>🌿</Text>
          <Text style={styles.worldTitle}>Science Lab</Text>
          <Text style={styles.worldDesc}>Éveil, nature et corps humain</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, paddingTop: 40, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  backBtn: { padding: 10, backgroundColor: '#F1F5F9', borderRadius: 10 },
  backText: { fontWeight: 'bold', color: '#475569' },
  stats: { flexDirection: 'row', gap: 15, alignItems: 'center' },
  statText: { fontSize: 16, fontWeight: 'bold' },
  scroll: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#1E293B', textAlign: 'center', marginTop: 10 },
  subtitle: { fontSize: 16, color: '#64748B', textAlign: 'center', marginBottom: 30 },
  worldCard: { padding: 30, borderRadius: 24, borderWidth: 3, marginBottom: 20, alignItems: 'center' },
  worldIcon: { fontSize: 60, marginBottom: 10 },
  worldTitle: { fontSize: 24, fontWeight: 'bold', color: '#1E293B' },
  worldDesc: { fontSize: 16, color: '#475569', marginTop: 5 }
});
