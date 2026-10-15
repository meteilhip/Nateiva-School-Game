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
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace('/')} style={styles.backBtn}>
          <Text style={styles.backText}>🔄 Profil</Text>
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
            <Text style={styles.statPillText}>🪙 {profile?.coins || 50}</Text>
          </View>
          <View style={styles.statPillStreak}>
            <Text style={styles.statPillText}>🔥 {profile?.streak || 1} j</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.heroTitle}>Les Mondes d'Apprentissage Nateiva</Text>
        <Text style={styles.heroSubtitle}>Chaque niveau propose différents types de jeux animés au choix !</Text>

        {/* Global 60-Game Library Banner */}
        <TouchableOpacity 
          style={styles.libraryBanner}
          onPress={() => router.push('/library' as any)}
        >
          <Text style={styles.libraryIcon}>🎮</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.libraryTitle}>Bibliothèque des 60 Jeux Éducatifs</Text>
            <Text style={styles.librarySubtitle}>Course de voitures, usine de robots, marché CFA, ninjas...</Text>
          </View>
          <Text style={styles.libraryAction}>Ouvrir 🚀</Text>
        </TouchableOpacity>

        {/* --- 4 MAJOR WORLDS --- */}

        {/* WORLD A: EARLY EXPLORERS (4-5 yrs) */}
        <TouchableOpacity 
          style={[styles.worldCard, { backgroundColor: '#EFF6FF', borderColor: '#3B82F6' }]} 
          onPress={() => router.push('/levels/math')}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.worldIcon}>🐣</Text>
            <View style={styles.cardInfo}>
              <View style={styles.worldPill}><Text style={styles.worldPillText}>MONDE A • ÂGE 4-5 ANS</Text></View>
              <Text style={styles.worldTitle}>Early Explorers</Text>
              <Text style={styles.worldSubtitle}>Maternelle 1-2 / Nursery 1-2</Text>
            </View>
            <Text style={styles.arrowIcon}>➡️</Text>
          </View>
          <Text style={styles.worldDesc}>
            Color Splash, Safari des Formes, Chenille logique, Bulles à éclater, Train de l'alphabet et Puzzles.
          </Text>
        </TouchableOpacity>

        {/* WORLD B: LITTLE HEROES (5-7 yrs) */}
        <TouchableOpacity 
          style={[styles.worldCard, { backgroundColor: '#FFFBEB', borderColor: '#F59E0B' }]} 
          onPress={() => router.push('/levels/math')}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.worldIcon}>🦁</Text>
            <View style={styles.cardInfo}>
              <View style={[styles.worldPill, { backgroundColor: '#FEF3C7' }]}><Text style={[styles.worldPillText, { color: '#B45309' }]}>MONDE B • ÂGE 5-7 ANS</Text></View>
              <Text style={styles.worldTitle}>Little Heroes</Text>
              <Text style={styles.worldSubtitle}>SIL / CP / Class 1-2</Text>
            </View>
            <Text style={styles.arrowIcon}>➡️</Text>
          </View>
          <Text style={styles.worldDesc}>
            Course de voitures mathématiques, Usine à robots, Chasse au trésor, Marché en FCFA, Ninja soustraction.
          </Text>
        </TouchableOpacity>

        {/* WORLD C: SKILL ADVENTURERS (7-9 yrs) */}
        <TouchableOpacity 
          style={[styles.worldCard, { backgroundColor: '#ECFDF5', borderColor: '#10B981' }]} 
          onPress={() => router.push('/levels/reading')}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.worldIcon}>🚀</Text>
            <View style={styles.cardInfo}>
              <View style={[styles.worldPill, { backgroundColor: '#D1FAE5' }]}><Text style={[styles.worldPillText, { color: '#047857' }]}>MONDE C • ÂGE 7-9 ANS</Text></View>
              <Text style={styles.worldTitle}>Skill Adventurers</Text>
              <Text style={styles.worldSubtitle}>CE1 / CE2 / Class 3-4</Text>
            </View>
            <Text style={styles.arrowIcon}>➡️</Text>
          </View>
          <Text style={styles.worldDesc}>
            Bataille de multiplication, Pizzeria du partage, Chef des fractions, Escape Room et Détective de grammaire.
          </Text>
        </TouchableOpacity>

        {/* WORLD D: MASTER EXPLORERS (9-12 yrs) */}
        <TouchableOpacity 
          style={[styles.worldCard, { backgroundColor: '#FDF2F8', borderColor: '#EC4899' }]} 
          onPress={() => router.push('/levels/science')}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.worldIcon}>👑</Text>
            <View style={styles.cardInfo}>
              <View style={[styles.worldPill, { backgroundColor: '#FCE7F3' }]}><Text style={[styles.worldPillText, { color: '#BE185D' }]}>MONDE D • ÂGE 9-12 ANS</Text></View>
              <Text style={styles.worldTitle}>Master Explorers</Text>
              <Text style={styles.worldSubtitle}>CM1 / CM2 / Class 5-6</Text>
            </View>
            <Text style={styles.arrowIcon}>➡️</Text>
          </View>
          <Text style={styles.worldDesc}>
            Mission spatiale des fractions, Grand Prix des décimaux, Budget Tycoon en FCFA, Enquêtes et Grand Trophée !
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
          <Text style={styles.diagnosticAction}>Tester</Text>
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

  scroll: { padding: 20, paddingBottom: 60 },
  heroTitle: { fontSize: 24, fontWeight: 'bold', color: '#1E293B', textAlign: 'center', marginTop: 4 },
  heroSubtitle: { fontSize: 14, color: '#64748B', textAlign: 'center', marginBottom: 20 },

  libraryBanner: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F3FF', borderWidth: 2.5, borderColor: '#8B5CF6', padding: 18, borderRadius: 24, marginBottom: 20, gap: 14, elevation: 3 },
  libraryIcon: { fontSize: 44 },
  libraryTitle: { fontSize: 17, fontWeight: 'bold', color: '#4C1D95' },
  librarySubtitle: { fontSize: 12, color: '#6D28D9', marginTop: 2 },
  libraryAction: { backgroundColor: '#7C3AED', color: 'white', paddingVertical: 8, paddingHorizontal: 14, borderRadius: 14, fontWeight: 'bold', fontSize: 13, overflow: 'hidden' },

  worldCard: { padding: 20, borderRadius: 24, borderWidth: 3, marginBottom: 16, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 10, elevation: 3 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  worldIcon: { fontSize: 44, marginRight: 15 },
  cardInfo: { flex: 1 },
  worldPill: { alignSelf: 'flex-start', backgroundColor: '#DBEAFE', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8, marginBottom: 4 },
  worldPillText: { fontSize: 10, fontWeight: 'bold', color: '#1D4ED8' },
  worldTitle: { fontSize: 20, fontWeight: 'bold', color: '#1E293B' },
  worldSubtitle: { fontSize: 13, color: '#64748B', fontWeight: '500' },
  arrowIcon: { fontSize: 20 },
  worldDesc: { fontSize: 13, color: '#475569', lineHeight: 20 },

  diagnosticBanner: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#EEF2FF', padding: 18, borderRadius: 20, borderWidth: 2, borderColor: '#C7D2FE', marginTop: 10, gap: 12 },
  diagnosticIcon: { fontSize: 36 },
  diagnosticTitle: { fontSize: 16, fontWeight: 'bold', color: '#3730A3' },
  diagnosticText: { fontSize: 13, color: '#4F46E5', marginTop: 2 },
  diagnosticAction: { backgroundColor: '#4F46E5', color: 'white', paddingVertical: 8, paddingHorizontal: 14, borderRadius: 12, fontWeight: 'bold', fontSize: 13, overflow: 'hidden' }
});
