import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { getProfiles, ChildProfile } from '../storage/db';

export default function WorldScreen() {
  const [profile, setProfile] = useState<ChildProfile | null>(null);

  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, [])
  );

  const loadProfile = async () => {
    const profiles = await getProfiles();
    if (profiles.length > 0) {
      setProfile(profiles[0]);
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace('/')} style={styles.backBtn}>
          <Text style={styles.backText}>🔄 Changer de Profil</Text>
        </TouchableOpacity>

        <View style={styles.profileInfo}>
          <Text style={styles.avatarIcon}>{profile?.avatar || '🦁'}</Text>
          <View>
            <Text style={styles.profileName}>{profile?.name || 'Musa'}</Text>
            <Text style={styles.profileSub}>{profile?.schoolSystem === 'anglophone' ? 'Anglophone' : 'Francophone'} • {profile?.grade || 'CP'}</Text>
          </View>
        </View>

        <View style={styles.stats}>
          <View style={styles.statPillCoins}>
            <Text style={styles.statPillText}>🪙 {profile?.coins || 0}</Text>
          </View>
          <View style={styles.statPillStreak}>
            <Text style={styles.statPillText}>🔥 {profile?.streak || 1} j</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.heroTitle}>Choisis ton Monde d'Apprentissage !</Text>
        <Text style={styles.heroSubtitle}>Programme officiel du Cameroun • En français et anglais</Text>

        {/* 1. Math Kingdom */}
        <TouchableOpacity 
          style={[styles.worldCard, { backgroundColor: '#EFF6FF', borderColor: '#3B82F6' }]} 
          onPress={() => router.push('/levels/math')}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.worldIcon}>🧮</Text>
            <View style={styles.cardInfo}>
              <Text style={styles.worldTitle}>Math Kingdom</Text>
              <Text style={styles.worldSubtitle}>Royaume des Mathématiques</Text>
            </View>
            <Text style={styles.arrowIcon}>➡️</Text>
          </View>
          <Text style={styles.worldDesc}>
            Dénombrement, barres de 10, additions, soustractions avec retenue, monnaie FCFA au marché et géométrie !
          </Text>
        </TouchableOpacity>

        {/* 2. Reading Forest */}
        <TouchableOpacity 
          style={[styles.worldCard, { backgroundColor: '#FFFBEB', borderColor: '#F59E0B' }]} 
          onPress={() => router.push('/levels/reading')}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.worldIcon}>📖</Text>
            <View style={styles.cardInfo}>
              <Text style={styles.worldTitle}>Reading Forest</Text>
              <Text style={styles.worldSubtitle}>Forêt de la Lecture & Langues</Text>
            </View>
            <Text style={styles.arrowIcon}>➡️</Text>
          </View>
          <Text style={styles.worldDesc}>
            Sons, syllabes (BA, MA, PA), dictée interactive, lecture à voix haute et contes camerounais illustrés !
          </Text>
        </TouchableOpacity>

        {/* 3. Science Lab */}
        <TouchableOpacity 
          style={[styles.worldCard, { backgroundColor: '#ECFDF5', borderColor: '#10B981' }]} 
          onPress={() => router.push('/levels/science')}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.worldIcon}>🔬</Text>
            <View style={styles.cardInfo}>
              <Text style={styles.worldTitle}>Science Lab</Text>
              <Text style={styles.worldSubtitle}>Laboratoire d'Éveil & Nature</Text>
            </View>
            <Text style={styles.arrowIcon}>➡️</Text>
          </View>
          <Text style={styles.worldDesc}>
            Faune du Cameroun (Waza, Dja, Wouri), germination des plantes, 5 sens et prévention du paludisme.
          </Text>
        </TouchableOpacity>

        {/* 4. Memory Village */}
        <TouchableOpacity 
          style={[styles.worldCard, { backgroundColor: '#F5F3FF', borderColor: '#8B5CF6' }]} 
          onPress={() => router.push('/levels/memory')}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.worldIcon}>🧩</Text>
            <View style={styles.cardInfo}>
              <Text style={styles.worldTitle}>Memory Village</Text>
              <Text style={styles.worldSubtitle}>Village de la Mémoire & Paires</Text>
            </View>
            <Text style={styles.arrowIcon}>➡️</Text>
          </View>
          <Text style={styles.worldDesc}>
            Cartes mémoire, paniers de tri et associations logiques pour stimuler la concentration !
          </Text>
        </TouchableOpacity>

        {/* Quick Diagnostic Assessment */}
        <TouchableOpacity 
          style={styles.diagnosticBanner}
          onPress={() => router.push('/game/math?skillId=math_count_1_5')}
        >
          <Text style={styles.diagnosticIcon}>🧭</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.diagnosticTitle}>Test de Positionnement Rapide</Text>
            <Text style={styles.diagnosticText}>Évalue le niveau exact de l'enfant pour adapter les exercices.</Text>
          </View>
          <Text style={styles.diagnosticAction}>Commencer</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, paddingTop: 30, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  backBtn: { paddingVertical: 8, paddingHorizontal: 12, backgroundColor: '#F1F5F9', borderRadius: 12 },
  backText: { fontWeight: 'bold', color: '#475569', fontSize: 13 },
  profileInfo: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  avatarIcon: { fontSize: 32 },
  profileName: { fontSize: 16, fontWeight: 'bold', color: '#1E293B' },
  profileSub: { fontSize: 12, color: '#64748B' },
  stats: { flexDirection: 'row', gap: 8 },
  statPillCoins: { backgroundColor: '#FEF3C7', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 16, borderWidth: 1, borderColor: '#FDE68A' },
  statPillStreak: { backgroundColor: '#FEE2E2', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 16, borderWidth: 1, borderColor: '#FECACA' },
  statPillText: { fontSize: 13, fontWeight: 'bold', color: '#1E293B' },

  scroll: { padding: 20, paddingBottom: 50 },
  heroTitle: { fontSize: 24, fontWeight: 'bold', color: '#1E293B', textAlign: 'center', marginTop: 6 },
  heroSubtitle: { fontSize: 14, color: '#64748B', textAlign: 'center', marginBottom: 25 },

  worldCard: { padding: 20, borderRadius: 24, borderWidth: 3, marginBottom: 16, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 10, elevation: 3 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  worldIcon: { fontSize: 44, marginRight: 15 },
  cardInfo: { flex: 1 },
  worldTitle: { fontSize: 22, fontWeight: 'bold', color: '#1E293B' },
  worldSubtitle: { fontSize: 13, color: '#64748B', fontWeight: '500' },
  arrowIcon: { fontSize: 20 },
  worldDesc: { fontSize: 14, color: '#475569', lineHeight: 22 },

  diagnosticBanner: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#EEF2FF', padding: 18, borderRadius: 20, borderWidth: 2, borderColor: '#C7D2FE', marginTop: 10, gap: 12 },
  diagnosticIcon: { fontSize: 36 },
  diagnosticTitle: { fontSize: 16, fontWeight: 'bold', color: '#3730A3' },
  diagnosticText: { fontSize: 13, color: '#4F46E5', marginTop: 2 },
  diagnosticAction: { backgroundColor: '#4F46E5', color: 'white', paddingVertical: 8, paddingHorizontal: 14, borderRadius: 12, fontWeight: 'bold', fontSize: 13, overflow: 'hidden' }
});
