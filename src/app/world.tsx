import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { getProfiles, ChildProfile } from '../storage/db';
import { DESIGN_TOKENS } from '../constants/designTokens';
import AudioManager from '../audio/AudioManager';

export default function WorldScreen() {
  const [profile, setProfile] = useState<ChildProfile | null>(null);

  useFocusEffect(
    useCallback(() => {
      loadProfile();
      AudioManager.play({
        text: 'Bienvenue dans ton monde d\'aventure ! Choisis une matière ou un niveau.',
        contentId: 'welcome_world'
      });
      return () => {
        AudioManager.stop();
      };
    }, [])
  );

  const loadProfile = async () => {
    const profiles = await getProfiles();
    if (profiles.length > 0) {
      setProfile(profiles[0]);
    }
  };

  const subjectPortals = [
    { key: 'math', name: 'Math Arcade', icon: '🧮', color: '#377DFF', bg: '#EFF6FF', desc: '15 jeux de calcul, blocs, courses et marché' },
    { key: 'reading', name: 'Lecture & Sons', icon: '📖', color: '#D97706', bg: '#FFFBEB', desc: 'Pêche aux phonèmes, safari et train des lettres' },
    { key: 'comprehension', name: 'Compréhension', icon: '📜', color: '#E5252A', bg: '#FEE2E2', desc: 'Enquêtes, ordre d\'histoire et déductions' },
    { key: 'pronunciation', name: 'Prononciation', icon: '🗣️', color: '#9A78F2', bg: '#F5F3FF', desc: 'Studio de répétition orale et rythme' },
    { key: 'science', name: 'Sciences & Nature', icon: '🔬', color: '#38CFA4', bg: '#ECFDF5', desc: 'Labo de botanique, habitats et cycle de l\'eau' },
    { key: 'logic', name: 'Logique & Puzzles', icon: '🧩', color: '#FFC83D', bg: '#FFFBEB', desc: 'Labyrinthes, suites et énigmes' },
    { key: 'creative', name: 'Jeu Créatif', icon: '🎨', color: '#EC4899', bg: '#FDF2F8', desc: 'Atelier de construction et expériences' }
  ];

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.replace('/')} 
          style={styles.backBtn}
        >
          <Text style={styles.backText}>🔄 Profil</Text>
        </TouchableOpacity>

        <View style={styles.profileInfo}>
          <Text style={styles.avatarIcon}>{profile?.avatar || '🦁'}</Text>
          <View>
            <Text style={styles.profileName}>{profile?.name || 'Élève'}</Text>
            <Text style={styles.profileSub}>
              {profile?.schoolSystem === 'anglophone' ? 'Anglophone' : 'Francophone'} • {profile?.grade || 'Nursery'}
            </Text>
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
        {/* Banner with signature red warmth */}
        <View style={styles.heroBanner}>
          <Text style={styles.heroTitle}>Mondes d'Apprentissage Nateiva</Text>
          <Text style={styles.heroSubtitle}>
            15 jeux mathématiques distincts et univers complets par niveau scolaire !
          </Text>
        </View>

        {/* Global Library Shortcut */}
        <TouchableOpacity 
          style={styles.libraryBanner}
          onPress={() => router.push('/library' as any)}
        >
          <Text style={styles.libraryIcon}>🎮</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.libraryTitle}>Bibliothèque des Jeux Éducatifs</Text>
            <Text style={styles.librarySubtitle}>Courses, usines, marché CFA, labo et aventures</Text>
          </View>
          <View style={styles.libraryBadge}>
            <Text style={styles.libraryAction}>Ouvrir 🚀</Text>
          </View>
        </TouchableOpacity>

        {/* --- SECTION 1: MATIÈRES & SUJETS --- */}
        <Text style={styles.sectionHeading}>🌟 Choisis ta Matière</Text>
        <View style={styles.subjectsGrid}>
          {subjectPortals.map(subj => (
            <TouchableOpacity
              key={subj.key}
              style={[styles.subjectCard, { backgroundColor: subj.bg, borderColor: subj.color }]}
              onPress={() => router.push(`/levels/${subj.key}` as any)}
            >
              <Text style={styles.subjIcon}>{subj.icon}</Text>
              <View style={{ flex: 1 }}>
                <Text style={[styles.subjTitle, { color: subj.color }]}>{subj.name}</Text>
                <Text style={styles.subjDesc}>{subj.desc}</Text>
              </View>
              <Text style={styles.arrowIcon}>➡️</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* --- SECTION 2: LES 4 GRANDS NIVEAUX SCOLAIRES --- */}
        <Text style={[styles.sectionHeading, { marginTop: 24 }]}>🎒 Ou Choisis par Niveau Scolaire</Text>

        {/* WORLD A: EARLY EXPLORERS (4-5 yrs) */}
        <TouchableOpacity 
          style={[styles.worldCard, { backgroundColor: '#EFF6FF', borderColor: '#377DFF' }]} 
          onPress={() => router.push('/library?grade=WORLD_A' as any)}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.worldIcon}>🐣</Text>
            <View style={styles.cardInfo}>
              <View style={styles.worldPill}><Text style={styles.worldPillText}>MONDE A • 4-5 ANS</Text></View>
              <Text style={styles.worldTitle}>Early Explorers</Text>
              <Text style={styles.worldSubtitle}>Maternelle 1-2 / Nursery 1-2</Text>
            </View>
            <Text style={styles.arrowIcon}>➡️</Text>
          </View>
          <Text style={styles.worldDesc}>
            Dénombrement 1-10, safari des formes, puzzle de blocs, sons d'animaux et marionnettes.
          </Text>
        </TouchableOpacity>

        {/* WORLD B: LITTLE HEROES (5-7 yrs) */}
        <TouchableOpacity 
          style={[styles.worldCard, { backgroundColor: '#FFFBEB', borderColor: '#FFC83D' }]} 
          onPress={() => router.push('/library?grade=WORLD_B' as any)}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.worldIcon}>🦁</Text>
            <View style={styles.cardInfo}>
              <View style={[styles.worldPill, { backgroundColor: '#FEF3C7' }]}><Text style={[styles.worldPillText, { color: '#B45309' }]}>MONDE B • 5-7 ANS</Text></View>
              <Text style={styles.worldTitle}>Little Heroes</Text>
              <Text style={styles.worldSubtitle}>SIL / CP / Class 1-2</Text>
            </View>
            <Text style={styles.arrowIcon}>➡️</Text>
          </View>
          <Text style={styles.worldDesc}>
            Course turbo, usine à robots, marché CFA, pêche aux phonèmes et chronologie d'histoire.
          </Text>
        </TouchableOpacity>

        {/* WORLD C: SKILL ADVENTURERS (7-9 yrs) */}
        <TouchableOpacity 
          style={[styles.worldCard, { backgroundColor: '#ECFDF5', borderColor: '#38CFA4' }]} 
          onPress={() => router.push('/library?grade=WORLD_C' as any)}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.worldIcon}>🚀</Text>
            <View style={styles.cardInfo}>
              <View style={[styles.worldPill, { backgroundColor: '#D1FAE5' }]}><Text style={[styles.worldPillText, { color: '#047857' }]}>MONDE C • 7-9 ANS</Text></View>
              <Text style={styles.worldTitle}>Skill Adventurers</Text>
              <Text style={styles.worldSubtitle}>CE1 / CE2 / Class 3-4</Text>
            </View>
            <Text style={styles.arrowIcon}>➡️</Text>
          </View>
          <Text style={styles.worldDesc}>
            Multiplications, chef des fractions, escape room math, labo de cause à effet et cycle de l'eau.
          </Text>
        </TouchableOpacity>

        {/* WORLD D: MASTER EXPLORERS (9-12 yrs) */}
        <TouchableOpacity 
          style={[styles.worldCard, { backgroundColor: '#FDF2F8', borderColor: '#E5252A' }]} 
          onPress={() => router.push('/library?grade=WORLD_D' as any)}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.worldIcon}>👑</Text>
            <View style={styles.cardInfo}>
              <View style={[styles.worldPill, { backgroundColor: '#FEE2E2' }]}><Text style={[styles.worldPillText, { color: '#E5252A' }]}>MONDE D • 9-12 ANS</Text></View>
              <Text style={styles.worldTitle}>Master Explorers</Text>
              <Text style={styles.worldSubtitle}>CM1 / CM2 / Class 5-6</Text>
            </View>
            <Text style={styles.arrowIcon}>➡️</Text>
          </View>
          <Text style={styles.worldDesc}>
            Rallye des décimaux, budget CFA tycoon, agence de détective du Mont Cameroun et simulateurs.
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: DESIGN_TOKENS.colors.canvas },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 16, 
    paddingTop: 30, 
    backgroundColor: 'white', 
    borderBottomWidth: 1, 
    borderBottomColor: DESIGN_TOKENS.colors.borderSubtle 
  },
  backBtn: { paddingVertical: 8, paddingHorizontal: 12, backgroundColor: '#F1F5F9', borderRadius: 12 },
  backText: { fontWeight: 'bold', color: DESIGN_TOKENS.colors.inkSecondary, fontSize: 13 },
  profileInfo: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  avatarIcon: { fontSize: 32 },
  profileName: { fontSize: 16, fontWeight: 'bold', color: DESIGN_TOKENS.colors.ink },
  profileSub: { fontSize: 12, color: DESIGN_TOKENS.colors.inkMuted },
  stats: { flexDirection: 'row', gap: 8 },
  statPillCoins: { backgroundColor: '#FEF3C7', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 16, borderWidth: 1, borderColor: '#FDE68A' },
  statPillStreak: { backgroundColor: '#FEE2E2', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 16, borderWidth: 1, borderColor: '#FECACA' },
  statPillText: { fontSize: 13, fontWeight: 'bold', color: DESIGN_TOKENS.colors.ink },

  scroll: { 
    padding: 18, 
    paddingBottom: 60,
    maxWidth: 900,
    width: '100%',
    alignSelf: 'center'
  },
  heroBanner: { marginBottom: 16, alignItems: 'center' },
  heroTitle: { fontSize: 24, fontWeight: '900', color: DESIGN_TOKENS.colors.ink, textAlign: 'center' },
  heroSubtitle: { fontSize: 13, color: DESIGN_TOKENS.colors.inkSecondary, textAlign: 'center', marginTop: 4, maxWidth: 420 },

  libraryBanner: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#FFFFFF', 
    borderWidth: 2.5, 
    borderColor: DESIGN_TOKENS.colors.primaryRed, 
    padding: 16, 
    borderRadius: 24, 
    marginBottom: 20, 
    gap: 12, 
    elevation: 4,
    shadowColor: DESIGN_TOKENS.colors.primaryRed,
    shadowOpacity: 0.12,
    shadowRadius: 10
  },
  libraryIcon: { fontSize: 40 },
  libraryTitle: { fontSize: 16, fontWeight: 'bold', color: DESIGN_TOKENS.colors.ink },
  librarySubtitle: { fontSize: 11, color: DESIGN_TOKENS.colors.inkSecondary, marginTop: 2 },
  libraryBadge: { backgroundColor: DESIGN_TOKENS.colors.primaryRed, paddingVertical: 8, paddingHorizontal: 12, borderRadius: 12 },
  libraryAction: { color: 'white', fontWeight: 'bold', fontSize: 13 },

  sectionHeading: { fontSize: 18, fontWeight: 'bold', color: DESIGN_TOKENS.colors.ink, marginBottom: 12 },
  subjectsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  subjectCard: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 14, 
    borderRadius: 20, 
    borderWidth: 2, 
    gap: 12, 
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6
  },
  subjIcon: { fontSize: 32 },
  subjTitle: { fontSize: 16, fontWeight: 'bold' },
  subjDesc: { fontSize: 11, color: DESIGN_TOKENS.colors.inkSecondary, marginTop: 2 },

  worldCard: { padding: 18, borderRadius: 24, borderWidth: 2.5, marginBottom: 14, elevation: 2, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 8 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  worldIcon: { fontSize: 40, marginRight: 12 },
  cardInfo: { flex: 1 },
  worldPill: { alignSelf: 'flex-start', backgroundColor: '#DBEAFE', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8, marginBottom: 4 },
  worldPillText: { fontSize: 10, fontWeight: 'bold', color: '#1D4ED8' },
  worldTitle: { fontSize: 18, fontWeight: 'bold', color: DESIGN_TOKENS.colors.ink },
  worldSubtitle: { fontSize: 12, color: DESIGN_TOKENS.colors.inkSecondary, fontWeight: '600' },
  arrowIcon: { fontSize: 18 },
  worldDesc: { fontSize: 12, color: DESIGN_TOKENS.colors.inkSecondary, lineHeight: 18 }
});
