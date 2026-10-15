import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { router } from 'expo-router';
import { GAME_CATALOG, GameCatalogItem } from '../../games/GameRegistry';

export default function GameLibraryScreen() {
  const [selectedWorld, setSelectedWorld] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const worlds = [
    { key: 'ALL', label: '🌟 Tous les Mondes' },
    { key: 'WORLD_A', label: '🐣 Monde A : Explorateurs (4-5 ans)' },
    { key: 'WORLD_B', label: '🦁 Monde B : Petits Héros (5-7 ans)' },
    { key: 'WORLD_C', label: '🚀 Monde C : Aventuriers (7-9 ans)' },
    { key: 'WORLD_D', label: '👑 Monde D : Maîtres (9-12 ans)' }
  ];

  const categories = ['ALL', 'Action', 'Adventure', 'Simulation', 'Puzzle', 'Creative', 'Story'];

  const filteredGames = GAME_CATALOG.filter((g) => {
    const matchesWorld = selectedWorld === 'ALL' || g.world === selectedWorld;
    const matchesCategory = selectedCategory === 'ALL' || g.category === selectedCategory;
    const matchesQuery = searchQuery === '' || 
      g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesWorld && matchesCategory && matchesQuery;
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
    // Determine default skill for game
    let defaultSkill = 'math_count_1_10';
    if (game.subject === 'french_reading') defaultSkill = 'fr_syllable_blends';
    else if (game.subject === 'science') defaultSkill = 'sci_living_nonliving';
    else if (game.world === 'WORLD_C' || game.world === 'WORLD_D') defaultSkill = 'math_add_10';

    router.push(`/game/${game.subject}?skillId=${defaultSkill}&gameKey=${game.gameKey}`);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace('/world')} style={styles.backBtn}>
          <Text style={styles.backText}>⬅️ Carte des Mondes</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>🎮 Bibliothèque des 60 Jeux</Text>
        <View style={styles.countBadge}>
          <Text style={styles.countBadgeText}>{filteredGames.length} / 60</Text>
        </View>
      </View>

      {/* World Selection Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
        {worlds.map((w) => (
          <TouchableOpacity 
            key={w.key}
            style={[styles.worldFilterChip, selectedWorld === w.key && styles.worldFilterActive]}
            onPress={() => setSelectedWorld(w.key)}
          >
            <Text style={[styles.worldFilterText, selectedWorld === w.key && styles.worldFilterTextActive]}>{w.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Category Pills */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
        {categories.map((c) => (
          <TouchableOpacity 
            key={c}
            style={[styles.categoryChip, selectedCategory === c && styles.categoryChipActive]}
            onPress={() => setSelectedCategory(c)}
          >
            <Text style={[styles.categoryChipText, selectedCategory === c && styles.categoryChipTextActive]}>{c}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Search Input */}
      <View style={styles.searchBox}>
        <TextInput 
          style={styles.searchInput}
          placeholder="Rechercher un jeu (ex: Racing, Robot, Pêche, Train)..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* 60 Games Grid */}
      <ScrollView contentContainerStyle={styles.gridContainer}>
        {filteredGames.map((game) => (
          <TouchableOpacity 
            key={game.id}
            activeOpacity={0.85}
            style={[styles.gameCard, { borderLeftColor: getCategoryColor(game.category) }]}
            onPress={() => handleLaunchGame(game)}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.gameNumber}>#{game.id}</Text>
              <View style={[styles.categoryPill, { backgroundColor: getCategoryColor(game.category) }]}>
                <Text style={styles.categoryPillText}>{game.category}</Text>
              </View>
            </View>

            <View style={styles.cardBody}>
              <Text style={styles.gameIcon}>{game.icon}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.gameTitle}>{game.title}</Text>
                <Text style={styles.gameDesc}>{game.description}</Text>
                <Text style={styles.gameAge}>{game.recommendedAges} ans • {game.world}</Text>
              </View>
            </View>

            <TouchableOpacity 
              style={[styles.playBtn, { backgroundColor: getCategoryColor(game.category) }]}
              onPress={() => handleLaunchGame(game)}
            >
              <Text style={styles.playBtnText}>Lancer le Jeu ▶️</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, paddingTop: 30, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  backBtn: { paddingVertical: 8, paddingHorizontal: 12, backgroundColor: '#F1F5F9', borderRadius: 12 },
  backText: { fontWeight: 'bold', color: '#475569', fontSize: 13 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#1E293B' },
  countBadge: { backgroundColor: '#EEF2FF', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 14 },
  countBadgeText: { fontWeight: 'bold', color: '#4F46E5', fontSize: 13 },

  filterScroll: { paddingHorizontal: 16, paddingVertical: 10, gap: 8 },
  worldFilterChip: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 18, backgroundColor: '#F1F5F9', borderWidth: 1, borderColor: '#CBD5E1' },
  worldFilterActive: { backgroundColor: '#3B82F6', borderColor: '#2563EB' },
  worldFilterText: { fontSize: 13, fontWeight: 'bold', color: '#475569' },
  worldFilterTextActive: { color: 'white' },

  categoryScroll: { paddingHorizontal: 16, paddingBottom: 10, gap: 8 },
  categoryChip: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 14, backgroundColor: 'white', borderWidth: 1, borderColor: '#E2E8F0' },
  categoryChipActive: { backgroundColor: '#1E293B', borderColor: '#0F172A' },
  categoryChipText: { fontSize: 12, fontWeight: 'bold', color: '#64748B' },
  categoryChipTextActive: { color: 'white' },

  searchBox: { paddingHorizontal: 16, marginBottom: 12 },
  searchInput: { backgroundColor: 'white', borderWidth: 2, borderColor: '#E2E8F0', borderRadius: 16, padding: 12, fontSize: 14 },

  gridContainer: { padding: 16, gap: 14, paddingBottom: 60 },
  gameCard: { backgroundColor: 'white', padding: 16, borderRadius: 20, borderLeftWidth: 6, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, elevation: 3 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  gameNumber: { fontSize: 12, fontWeight: 'bold', color: '#94A3B8' },
  categoryPill: { paddingVertical: 3, paddingHorizontal: 10, borderRadius: 10 },
  categoryPillText: { color: 'white', fontSize: 11, fontWeight: 'bold' },

  cardBody: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 14 },
  gameIcon: { fontSize: 44 },
  gameTitle: { fontSize: 18, fontWeight: 'bold', color: '#1E293B', marginBottom: 2 },
  gameDesc: { fontSize: 13, color: '#64748B', lineHeight: 20, marginBottom: 4 },
  gameAge: { fontSize: 11, color: '#94A3B8', fontWeight: 'bold' },

  playBtn: { paddingVertical: 10, borderRadius: 12, alignItems: 'center' },
  playBtnText: { color: 'white', fontWeight: 'bold', fontSize: 14 }
});
