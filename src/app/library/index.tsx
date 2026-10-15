import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Platform } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { GAME_CATALOG, GameCatalogItem } from '../../games/GameRegistry';
import { getProfiles, ChildProfile } from '../../storage/db';
import { PersistentBottomNav } from '../../components/PersistentBottomNav';

export default function GameLibraryScreen() {
  const [profile, setProfile] = useState<ChildProfile | null>(null);
  const [lang, setLang] = useState<'fr' | 'en'>('fr');
  const [entryMode, setEntryMode] = useState<'ALL' | 'RECOMMENDED' | 'PRACTICE'>('ALL');
  
  // Grade-band filter
  const [selectedGradeBand, setSelectedGradeBand] = useState<string>('ALL');
  // Subject tab filter
  const [selectedSubject, setSelectedSubject] = useState<string>('ALL');
  // Category filter
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  // Selected Card for highlighting
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

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

  const gradeBands = [
    { key: 'ALL', labelFr: 'Tous Niveaux', labelEn: 'All Grades' },
    { key: 'WORLD_A', labelFr: '🐣 Maternelle 1-2 (4-5 ans)', labelEn: '🐣 Nursery 1-2 (Ages 4-5)' },
    { key: 'WORLD_B', labelFr: '🦁 SIL / CP (5-7 ans)', labelEn: '🦁 Class 1-2 (Ages 5-7)' },
    { key: 'WORLD_C', labelFr: '🚀 CE1 / CE2 (7-9 ans)', labelEn: '🚀 Class 3-4 (Ages 7-9)' },
    { key: 'WORLD_D', labelFr: '👑 CM1 / CM2 (9-12 ans)', labelEn: '👑 Class 5-6 (Ages 9-12)' }
  ];

  const subjectTabs = [
    { key: 'ALL', labelFr: '🌟 Tous les Sujets', labelEn: '🌟 All Subjects' },
    { key: 'mathematics', labelFr: '🧮 Mathématiques', labelEn: '🧮 Mathematics' },
    { key: 'french_reading', labelFr: '📖 Lecture & Langues', labelEn: '📖 Reading & Phonics' },
    { key: 'science', labelFr: '🔬 Sciences & Nature', labelEn: '🔬 Science & Nature' }
  ];

  const categories = [
    { key: 'ALL', labelFr: 'Toutes Catégories', labelEn: 'All Categories' },
    { key: 'Action', labelFr: '⚡ Action & Arcade', labelEn: '⚡ Action & Arcade' },
    { key: 'Adventure', labelFr: '🗺️ Aventure & Quête', labelEn: '🗺️ Adventure & Quest' },
    { key: 'Simulation', labelFr: '🛠️ Créativité & Simulation', labelEn: '🛠️ Creative & Simulation' },
    { key: 'Puzzle', labelFr: '🧩 Mémoire & Réflexion', labelEn: '🧩 Memory & Logic' },
    { key: 'Story', labelFr: '📜 Histoires Narratives', labelEn: '📜 Illustrated Stories' }
  ];

  const filteredGames = GAME_CATALOG.filter((g) => {
    // Mode filter
    if (entryMode === 'RECOMMENDED') {
      const isRec = ['16', '18', '20', '25', '29', '31', '33'].includes(g.id);
      if (!isRec) return false;
    }
    const matchesGrade = selectedGradeBand === 'ALL' || g.world === selectedGradeBand;
    const matchesSubject = selectedSubject === 'ALL' || g.subject === selectedSubject;
    const matchesCategory = selectedCategory === 'ALL' || g.category === selectedCategory;
    const matchesQuery = searchQuery === '' || 
      g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGrade && matchesSubject && matchesCategory && matchesQuery;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Action': return '#EF4444';
      case 'Adventure': return '#3B82F6';
      case 'Simulation': return '#10B981';
      case 'Puzzle': return '#8B5CF6';
      case 'Creative': return '#F59E0B';
      default: return '#6366F1';
    }
  };

  const handleLaunchGame = (game: GameCatalogItem) => {
    let defaultSkill = 'math_count_1_10';
    if (game.subject === 'french_reading') defaultSkill = 'fr_syllable_blends';
    else if (game.subject === 'science') defaultSkill = 'sci_living_nonliving';
    else if (game.world === 'WORLD_C' || game.world === 'WORLD_D') defaultSkill = 'math_add_10';

    router.push(`/game/${game.subject}?skillId=${defaultSkill}&gameKey=${game.gameKey}`);
  };

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.headerMascotRow}>
          <Text style={styles.mascotAnimation}>🦁✨</Text>
          <View>
            <Text style={styles.headerTitle}>
              {lang === 'fr' ? 'Choisis ton Aventure !' : 'Choose Your Adventure!'}
            </Text>
            <Text style={styles.headerSubtitle}>
              {profile ? `${profile.avatar} ${profile.name} • ${profile.coins || 50} 🪙` : 'Élève Explorateur'}
            </Text>
          </View>
        </View>

        {/* Language & Parent Gate Switches */}
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.langSwitchBtn} 
            onPress={() => setLang(lang === 'fr' ? 'en' : 'fr')}
          >
            <Text style={styles.langSwitchText}>{lang === 'fr' ? '🇫🇷 FR' : '🇬🇧 EN'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Entry Paths: Recommended, Free Choice, Practice */}
      <View style={styles.entryPathsRow}>
        <TouchableOpacity 
          style={[styles.entryPathTab, entryMode === 'ALL' && styles.entryPathActive]} 
          onPress={() => setEntryMode('ALL')}
        >
          <Text style={[styles.entryPathText, entryMode === 'ALL' && styles.entryPathTextActive]}>
            {lang === 'fr' ? '🎮 Tous les 60 Jeux' : '🎮 All 60 Games'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.entryPathTab, entryMode === 'RECOMMENDED' && styles.entryPathActive]} 
          onPress={() => setEntryMode('RECOMMENDED')}
        >
          <Text style={[styles.entryPathText, entryMode === 'RECOMMENDED' && styles.entryPathTextActive]}>
            {lang === 'fr' ? '⭐ Recommandés' : '⭐ Recommended'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.entryPathTab} 
          onPress={() => router.push('/levels/math')}
        >
          <Text style={styles.entryPathText}>
            {lang === 'fr' ? '🎯 Par Compétence' : '🎯 By Skill'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Grade-Band Choices */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.gradeBandScroll}>
        {gradeBands.map((band) => (
          <TouchableOpacity 
            key={band.key}
            style={[styles.gradeBandChip, selectedGradeBand === band.key && styles.gradeBandChipActive]}
            onPress={() => setSelectedGradeBand(band.key)}
          >
            <Text style={[styles.gradeBandText, selectedGradeBand === band.key && styles.gradeBandTextActive]}>
              {lang === 'fr' ? band.labelFr : band.labelEn}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Top Subject Tabs */}
      <View style={styles.subjectTabsRow}>
        {subjectTabs.map((tab) => (
          <TouchableOpacity 
            key={tab.key}
            style={[styles.subjectTab, selectedSubject === tab.key && styles.subjectTabActive]}
            onPress={() => setSelectedSubject(tab.key)}
          >
            <Text style={[styles.subjectTabText, selectedSubject === tab.key && styles.subjectTabTextActive]}>
              {lang === 'fr' ? tab.labelFr : tab.labelEn}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Category Pills Filter */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
        {categories.map((cat) => (
          <TouchableOpacity 
            key={cat.key}
            style={[styles.categoryPill, selectedCategory === cat.key && styles.categoryPillActive]}
            onPress={() => setSelectedCategory(cat.key)}
          >
            <Text style={[styles.categoryPillText, selectedCategory === cat.key && styles.categoryPillTextActive]}>
              {lang === 'fr' ? cat.labelFr : cat.labelEn}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <TextInput 
          style={styles.searchInput}
          placeholder={lang === 'fr' ? "🔍 Rechercher par nom de jeu..." : "🔍 Search by game name..."}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Responsive 2-Column (Mobile) / 3-Column (Tablet/Web) Game Cards Grid */}
      <ScrollView contentContainerStyle={styles.gridContainer}>
        <View style={styles.responsiveGrid}>
          {filteredGames.map((game) => {
            const isSelected = selectedGameId === game.id;
            const accentColor = getCategoryColor(game.category);

            return (
              <TouchableOpacity 
                key={game.id}
                activeOpacity={0.88}
                style={[
                  styles.gameCard, 
                  { borderColor: isSelected ? accentColor : '#E2E8F0' },
                  isSelected && styles.gameCardSelected
                ]}
                onPress={() => setSelectedGameId(game.id)}
              >
                {/* Card Top: Number badge & Category */}
                <View style={styles.cardTopRow}>
                  <Text style={styles.cardIdBadge}>#{game.id}</Text>
                  <View style={[styles.cardCatBadge, { backgroundColor: accentColor }]}>
                    <Text style={styles.cardCatText}>{game.category}</Text>
                  </View>
                </View>

                {/* Animated Unique Illustration Preview */}
                <View style={[styles.gameIllustrationPreview, { backgroundColor: isSelected ? '#EFF6FF' : '#F8FAFC' }]}>
                  <Text style={styles.illustrationBigEmoji}>{game.icon}</Text>
                  <View style={styles.starsPreviewRow}>
                    <Text style={{ fontSize: 13 }}>⭐⭐⭐</Text>
                  </View>
                </View>

                {/* Game Title & Curriculum Info */}
                <Text style={styles.cardGameTitle} numberOfLines={1}>{game.title}</Text>
                <Text style={styles.cardGameDesc} numberOfLines={2}>{game.description}</Text>
                
                <View style={styles.skillDifficultyRow}>
                  <Text style={styles.skillTagText}>Âge {game.recommendedAges}</Text>
                  <Text style={[styles.diffBadge, { color: accentColor }]}>Niveau ★★★</Text>
                </View>

                {/* Play Button */}
                <TouchableOpacity 
                  style={[styles.playButton, { backgroundColor: accentColor }]}
                  onPress={() => handleLaunchGame(game)}
                >
                  <Text style={styles.playButtonText}>
                    {lang === 'fr' ? 'JOUER ▶️' : 'PLAY ▶️'}
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>
            );
          })}
        </View>

        {filteredGames.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={{ fontSize: 40 }}>🔍</Text>
            <Text style={styles.emptyTitle}>Aucun jeu ne correspond à ce filtre.</Text>
            <TouchableOpacity onPress={() => { setSelectedGradeBand('ALL'); setSelectedSubject('ALL'); setSelectedCategory('ALL'); setSearchQuery(''); }}>
              <Text style={styles.resetFiltersLink}>Réinitialiser tous les filtres</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Persistent Bottom Navigation */}
      <PersistentBottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },

  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, paddingTop: 24, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  headerMascotRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  mascotAnimation: { fontSize: 36 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#1E293B' },
  headerSubtitle: { fontSize: 12, color: '#64748B', fontWeight: 'bold' },
  headerActions: { flexDirection: 'row', gap: 8 },
  langSwitchBtn: { backgroundColor: '#F1F5F9', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 12, borderWidth: 1, borderColor: '#CBD5E1' },
  langSwitchText: { fontSize: 12, fontWeight: 'bold', color: '#334155' },

  entryPathsRow: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 10, gap: 8, backgroundColor: 'white' },
  entryPathTab: { flex: 1, paddingVertical: 8, borderRadius: 12, backgroundColor: '#F1F5F9', alignItems: 'center' },
  entryPathActive: { backgroundColor: '#4F46E5' },
  entryPathText: { fontSize: 12, fontWeight: 'bold', color: '#475569' },
  entryPathTextActive: { color: 'white' },

  gradeBandScroll: { paddingHorizontal: 16, paddingVertical: 8, gap: 8 },
  gradeBandChip: { paddingVertical: 7, paddingHorizontal: 14, borderRadius: 16, backgroundColor: '#FFFFFF', borderWidth: 1.5, borderColor: '#CBD5E1' },
  gradeBandChipActive: { backgroundColor: '#3B82F6', borderColor: '#2563EB' },
  gradeBandText: { fontSize: 12, fontWeight: 'bold', color: '#475569' },
  gradeBandTextActive: { color: 'white' },

  subjectTabsRow: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 6, gap: 8 },
  subjectTab: { flex: 1, paddingVertical: 8, borderRadius: 12, backgroundColor: 'white', borderWidth: 1, borderColor: '#E2E8F0', alignItems: 'center' },
  subjectTabActive: { backgroundColor: '#1E293B', borderColor: '#0F172A' },
  subjectTabText: { fontSize: 11, fontWeight: 'bold', color: '#64748B' },
  subjectTabTextActive: { color: 'white' },

  categoryScroll: { paddingHorizontal: 16, paddingVertical: 6, gap: 8 },
  categoryPill: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 14, backgroundColor: 'white', borderWidth: 1, borderColor: '#E2E8F0' },
  categoryPillActive: { backgroundColor: '#F59E0B', borderColor: '#D97706' },
  categoryPillText: { fontSize: 11, fontWeight: 'bold', color: '#64748B' },
  categoryPillTextActive: { color: 'white' },

  searchContainer: { paddingHorizontal: 16, paddingVertical: 6 },
  searchInput: { backgroundColor: 'white', borderWidth: 1.5, borderColor: '#CBD5E1', borderRadius: 14, padding: 10, fontSize: 13 },

  gridContainer: { padding: 14, paddingBottom: 30 },
  responsiveGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between' },
  
  // 2-column mobile card styling (~48% width)
  gameCard: { width: '48%', backgroundColor: 'white', borderRadius: 20, borderWidth: 2, padding: 12, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 8, elevation: 3, marginBottom: 4 },
  gameCardSelected: { shadowOpacity: 0.15, transform: [{ scale: 1.02 }] },
  
  cardTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  cardIdBadge: { fontSize: 11, fontWeight: 'bold', color: '#94A3B8' },
  cardCatBadge: { paddingVertical: 2, paddingHorizontal: 8, borderRadius: 8 },
  cardCatText: { fontSize: 9, fontWeight: 'bold', color: 'white' },

  gameIllustrationPreview: { width: '100%', height: 75, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  illustrationBigEmoji: { fontSize: 36 },
  starsPreviewRow: { position: 'absolute', bottom: 4, right: 6 },

  cardGameTitle: { fontSize: 14, fontWeight: 'bold', color: '#1E293B', marginBottom: 3 },
  cardGameDesc: { fontSize: 11, color: '#64748B', lineHeight: 16, height: 32, marginBottom: 8 },
  
  skillDifficultyRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  skillTagText: { fontSize: 10, fontWeight: 'bold', color: '#94A3B8' },
  diffBadge: { fontSize: 10, fontWeight: 'bold' },

  playButton: { paddingVertical: 10, borderRadius: 12, alignItems: 'center', elevation: 2 },
  playButtonText: { color: 'white', fontWeight: 'bold', fontSize: 13 },

  emptyContainer: { alignItems: 'center', padding: 40, width: '100%' },
  emptyTitle: { fontSize: 15, fontWeight: 'bold', color: '#64748B', marginVertical: 8 },
  resetFiltersLink: { color: '#4F46E5', fontWeight: 'bold', fontSize: 14 }
});
