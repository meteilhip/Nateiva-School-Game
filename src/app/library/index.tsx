import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Platform } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import * as Speech from 'expo-speech';
import { GAME_CATALOG, GameCatalogItem } from '../../games/GameRegistry';
import { getProfiles, ChildProfile } from '../../storage/db';
import { PersistentBottomNav } from '../../components/PersistentBottomNav';

export default function GameLibraryScreen() {
  const [profile, setProfile] = useState<ChildProfile | null>(null);
  const [lang, setLang] = useState<'fr' | 'en'>('fr');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [entryMode, setEntryMode] = useState<'ALL' | 'RECOMMENDED' | 'PRACTICE'>('ALL');
  
  // Grade-band filter (4 required bands)
  const [selectedGradeBand, setSelectedGradeBand] = useState<string>('ALL');
  // 7 Subject tabs filter
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

  const speakText = (text: string) => {
    if (!soundEnabled) return;
    Speech.stop();
    Speech.speak(text, { language: lang === 'fr' ? 'fr-FR' : 'en-US', rate: 0.85 });
  };

  const gradeBands = [
    { key: 'ALL', labelFr: 'Tous Niveaux', labelEn: 'All Grades' },
    { key: 'WORLD_A', labelFr: '🐣 Nursery 1–2 (4-5 ans)', labelEn: '🐣 Nursery 1–2 (Ages 4-5)' },
    { key: 'WORLD_B', labelFr: '🦁 SIL / CP (5-7 ans)', labelEn: '🦁 Class 1–2 (Ages 5-7)' },
    { key: 'WORLD_C', labelFr: '🚀 CE1 / CE2 (7-9 ans)', labelEn: '🚀 Class 3–4 (Ages 7-9)' },
    { key: 'WORLD_D', labelFr: '👑 CM1 / CM2 (9-12 ans)', labelEn: '👑 Class 5–6 (Ages 9-12)' }
  ];

  // 7 Required Subject Tabs
  const subjectTabs = [
    { key: 'ALL', labelFr: '🌟 Tous', labelEn: '🌟 All' },
    { key: 'math', labelFr: '🧮 Math', labelEn: '🧮 Math' },
    { key: 'reading', labelFr: '📖 Reading', labelEn: '📖 Reading' },
    { key: 'comprehension', labelFr: '📜 Comprehension', labelEn: '📜 Comprehension' },
    { key: 'pronunciation', labelFr: '🗣️ Pronunciation', labelEn: '🗣️ Pronunciation' },
    { key: 'science', labelFr: '🔬 Science', labelEn: '🔬 Science' },
    { key: 'logic', labelFr: '🧩 Logic', labelEn: '🧩 Logic' },
    { key: 'creative', labelFr: '🎨 Creative Play', labelEn: '🎨 Creative Play' }
  ];

  const categories = [
    { key: 'ALL', labelFr: 'Toutes Mécaniques', labelEn: 'All Mechanics' },
    { key: 'Action', labelFr: '⚡ Arcade & Course', labelEn: '⚡ Arcade & Racing' },
    { key: 'Adventure', labelFr: '🗺️ Aventure & Quête', labelEn: '🗺️ Adventure & Quest' },
    { key: 'Simulation', labelFr: '🛠️ Simulation & Atelier', labelEn: '🛠️ Simulation & Workshop' },
    { key: 'Puzzle', labelFr: '🧩 Réflexion & Énigmes', labelEn: '🧩 Logic & Puzzles' },
    { key: 'Story', labelFr: '📜 Histoires Narrées', labelEn: '📜 Illustrated Stories' }
  ];

  // 28-Cell Master Matrix Mapping
  const MATRIX_TOPIC_LOOKUP: Record<string, Record<string, { fr: string, en: string }>> = {
    'math': {
      'WORLD_A': { en: 'Counting', fr: 'Dénombrement' },
      'WORLD_B': { en: 'Add/subtract', fr: 'Addition & Soustraction' },
      'WORLD_C': { en: 'Multiply/divide', fr: 'Multiplication & Division' },
      'WORLD_D': { en: 'Fractions/decimals', fr: 'Fractions & Décimaux' }
    },
    'reading': {
      'WORLD_A': { en: 'Letters/pictures', fr: 'Lettres & Images' },
      'WORLD_B': { en: 'Phonics/words', fr: 'Phonèmes & Mots' },
      'WORLD_C': { en: 'Fluency', fr: 'Fluidité de Lecture' },
      'WORLD_D': { en: 'Advanced reading', fr: 'Lecture Approfondie' }
    },
    'comprehension': {
      'WORLD_A': { en: 'Spoken stories', fr: 'Histoires Racontées' },
      'WORLD_B': { en: 'Story sequence', fr: 'Ordre Chronologique' },
      'WORLD_C': { en: 'Cause/effect', fr: 'Cause & Conséquence' },
      'WORLD_D': { en: 'Inference/evidence', fr: 'Inférence & Indices' }
    },
    'pronunciation': {
      'WORLD_A': { en: 'Sounds', fr: 'Sons & Articulation' },
      'WORLD_B': { en: 'Syllables', fr: 'Rythme des Syllabes' },
      'WORLD_C': { en: 'Words/phrases', fr: 'Mots & Phrases' },
      'WORLD_D': { en: 'Oral reading', fr: 'Lecture Orale Expressive' }
    },
    'science': {
      'WORLD_A': { en: 'Animals/plants', fr: 'Animaux & Plantes' },
      'WORLD_B': { en: 'Habitats', fr: 'Habitats & Milieux' },
      'WORLD_C': { en: 'Water/materials', fr: 'L\'Eau & Matériaux' },
      'WORLD_D': { en: 'Forces/energy', fr: 'Forces & Énergie' }
    },
    'logic': {
      'WORLD_A': { en: 'Sorting', fr: 'Tri & Catégories' },
      'WORLD_B': { en: 'Patterns', fr: 'Suites & Motifs' },
      'WORLD_C': { en: 'Mazes', fr: 'Labyrinthes & Chemins' },
      'WORLD_D': { en: 'Strategy', fr: 'Stratégie & Déduction' }
    },
    'creative': {
      'WORLD_A': { en: 'Shapes/toys', fr: 'Formes & Jouets' },
      'WORLD_B': { en: 'Construction', fr: 'Atelier Construction' },
      'WORLD_C': { en: 'Experiments', fr: 'Expérimentations' },
      'WORLD_D': { en: 'Engineering', fr: 'Ingénierie & Mécanismes' }
    }
  };

  const matchesSubjectTab = (g: GameCatalogItem, tab: string) => {
    if (tab === 'ALL') return true;
    if (tab === 'math') return g.subject === 'mathematics';
    if (tab === 'reading') return g.subject === 'french_reading' || g.subject === 'english_reading';
    if (tab === 'comprehension') return g.category === 'Story' || ['12', '28', '36', '50', '58'].includes(g.id);
    if (tab === 'pronunciation') return ['06', '11', '19', '20', '21', '30', '42', '54'].includes(g.id);
    if (tab === 'science') return g.subject === 'science' || ['07', '14', '29', '37', '38', '43', '49', '57'].includes(g.id);
    if (tab === 'logic') return g.category === 'Puzzle' || ['08', '10', '13', '41', '44', '51', '55'].includes(g.id);
    if (tab === 'creative') return g.category === 'Creative' || g.category === 'Simulation' || ['01', '15', '18', '25', '33', '39', '48', '52'].includes(g.id);
    return true;
  };

  const filteredGames = GAME_CATALOG.filter((g) => {
    if (entryMode === 'RECOMMENDED') {
      const isRec = ['16', '18', '20', '25', '29', '31', '33'].includes(g.id);
      if (!isRec) return false;
    }
    const matchesGrade = selectedGradeBand === 'ALL' || g.world === selectedGradeBand;
    const matchesSubject = matchesSubjectTab(g, selectedSubject);
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

    speakText(game.title + ' ! ' + game.description);
    router.push(`/game/${game.subject}?skillId=${defaultSkill}&gameKey=${game.gameKey}`);
  };

  return (
    <View style={styles.container}>
      {/* Top Header with Profile Avatar, Stars, Progress & Audio Control */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.headerMascotRow}
          onPress={() => speakText('Bonjour ! Choisis ton jeu préféré !')}
        >
          <Text style={styles.mascotAnimation}>{profile?.avatar || '🦁'}</Text>
          <View>
            <Text style={styles.headerTitle}>
              {lang === 'fr' ? 'Bibliothèque de Jeux' : 'Game Library'}
            </Text>
            <Text style={styles.headerSubtitle}>
              {profile ? `${profile.name} • ${profile.coins || 50} 🪙` : 'Élève Explorateur'}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Stars, Progress Gauge, Sound & Language */}
        <View style={styles.headerActions}>
          <View style={styles.statChip}>
            <Text style={styles.statChipText}>⭐ {profile?.coins ? Math.floor(profile.coins / 3) : 24}</Text>
          </View>

          <TouchableOpacity 
            style={[styles.actionIconBtn, !soundEnabled && { backgroundColor: '#FEE2E2' }]} 
            onPress={() => {
              const next = !soundEnabled;
              setSoundEnabled(next);
              if (!next) Speech.stop();
            }}
          >
            <Text style={{ fontSize: 16 }}>{soundEnabled ? '🔊' : '🔇'}</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.langSwitchBtn} 
            onPress={() => {
              const nextLang = lang === 'fr' ? 'en' : 'fr';
              setLang(nextLang);
              speakText(nextLang === 'fr' ? 'Français activé' : 'English enabled');
            }}
          >
            <Text style={styles.langSwitchText}>{lang === 'fr' ? '🇨🇲 FR' : '🇬🇧 EN'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Entry Paths: Recommended, Free Choice, Practice, and Non-Reader Arcade */}
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
          style={[styles.entryPathTab, { backgroundColor: '#FDE047', borderColor: '#EAB308' }]} 
          onPress={() => router.push('/arcade')}
        >
          <Text style={[styles.entryPathText, { color: '#713F12', fontWeight: '900' }]}>
            {lang === 'fr' ? '🕹️ Arcade Sans Lecture' : '🕹️ Voice Arcade'}
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

      {/* Active 28-Cell Matrix Curriculum Topic Banner */}
      {selectedSubject !== 'ALL' && selectedGradeBand !== 'ALL' && MATRIX_TOPIC_LOOKUP[selectedSubject]?.[selectedGradeBand] && (
        <View style={styles.matrixTopicCard}>
          <Text style={styles.matrixTopicTitle}>
            🎯 {lang === 'fr' ? 'Thème du Programme :' : 'Curriculum Focus :'} <Text style={{ color: '#D97706', fontWeight: 'bold' }}>
              {lang === 'fr' 
                ? MATRIX_TOPIC_LOOKUP[selectedSubject][selectedGradeBand].fr 
                : MATRIX_TOPIC_LOOKUP[selectedSubject][selectedGradeBand].en}
            </Text>
          </Text>
        </View>
      )}

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
                {/* Card Top: Number badge, Voice read-out & Category */}
                <View style={styles.cardTopRow}>
                  <Text style={styles.cardIdBadge}>#{game.id}</Text>
                  
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <TouchableOpacity 
                      style={styles.voiceCardBtn}
                      onPress={() => speakText(game.title + ' : ' + game.description)}
                    >
                      <Text style={{ fontSize: 13 }}>🔊</Text>
                    </TouchableOpacity>

                    <View style={[styles.cardCatBadge, { backgroundColor: accentColor }]}>
                      <Text style={styles.cardCatText}>{game.category}</Text>
                    </View>
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
                  <Text style={[styles.diffBadge, { color: accentColor }]}>Maîtrise ★★★</Text>
                </View>

                {/* Card Buttons: Replay & Play */}
                <View style={styles.cardButtonRow}>
                  <TouchableOpacity 
                    style={styles.replayButton}
                    onPress={() => {
                      speakText('Recommençons ' + game.title);
                      handleLaunchGame(game);
                    }}
                    title="Rejouer"
                  >
                    <Text style={styles.replayButtonText}>🔄</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={[styles.playButton, { backgroundColor: accentColor, flex: 1 }]}
                    onPress={() => handleLaunchGame(game)}
                  >
                    <Text style={styles.playButtonText}>
                      {lang === 'fr' ? 'JOUER 🚀' : 'PLAY 🚀'}
                    </Text>
                  </TouchableOpacity>
                </View>
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

  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 14, paddingTop: 20, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  headerMascotRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  mascotAnimation: { fontSize: 34 },
  headerTitle: { fontSize: 17, fontWeight: 'bold', color: '#1E293B' },
  headerSubtitle: { fontSize: 11, color: '#64748B', fontWeight: 'bold' },
  headerActions: { flexDirection: 'row', gap: 6, alignItems: 'center' },
  statChip: { backgroundColor: '#FEF3C7', paddingVertical: 5, paddingHorizontal: 9, borderRadius: 12, borderWidth: 1, borderColor: '#FDE68A' },
  statChipText: { fontSize: 12, fontWeight: 'bold', color: '#92400E' },
  actionIconBtn: { backgroundColor: '#F1F5F9', padding: 6, borderRadius: 12, borderWidth: 1, borderColor: '#CBD5E1' },
  langSwitchBtn: { backgroundColor: '#F1F5F9', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 12, borderWidth: 1, borderColor: '#CBD5E1' },
  langSwitchText: { fontSize: 11, fontWeight: 'bold', color: '#334155' },

  voiceCardBtn: { backgroundColor: '#F1F5F9', padding: 4, borderRadius: 8, borderWidth: 1, borderColor: '#CBD5E1' },
  cardButtonRow: { flexDirection: 'row', gap: 6, alignItems: 'center' },
  replayButton: { backgroundColor: '#F1F5F9', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 12, borderWidth: 1, borderColor: '#CBD5E1', alignItems: 'center', justifyContent: 'center' },
  replayButtonText: { fontSize: 14 },

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

  matrixTopicCard: { marginHorizontal: 16, marginTop: 4, marginBottom: 6, backgroundColor: '#FEF3C7', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 14, borderWidth: 1.5, borderColor: '#F59E0B' },
  matrixTopicTitle: { fontSize: 12, fontWeight: 'bold', color: '#92400E' },

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
