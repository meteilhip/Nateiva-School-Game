import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { getGamesForSkill, GameCatalogItem } from '../../games/GameRegistry';
import { CameroonMathSkills, CameroonReadingSkills, CameroonScienceSkills } from '../../curriculum/cameroon/data';

export default function GameChoiceScreen() {
  const { skillId, subject } = useLocalSearchParams();

  // Find the skill details
  const allSkills = [...CameroonMathSkills, ...CameroonReadingSkills, ...CameroonScienceSkills];
  const skill = allSkills.find(s => s.skillId === skillId) || {
    skillNameFrench: 'Compétence Pédagogique',
    skillNameEnglish: 'Learning Skill',
    descriptionFrench: 'Pratique cette notion à travers ton type de jeu préféré !'
  };

  const availableGames: GameCatalogItem[] = getGamesForSkill(skillId as string || 'math_add_10');

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
    router.push(`/game/${subject || 'math'}?skillId=${skillId}&gameKey=${game.gameKey}`);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>⬅️ Retour aux Niveaux</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>🎮 Choisis ton Jeu Préféré !</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Skill Banner */}
        <View style={styles.skillBanner}>
          <Text style={styles.skillBadge}>Notion à Maîtriser</Text>
          <Text style={styles.skillTitle}>{skill.skillNameFrench}</Text>
          <Text style={styles.skillSub}>{skill.descriptionFrench}</Text>
          <Text style={styles.instructionText}>
            💡 Tu peux apprendre cette notion en jouant à n'importe lequel de ces {availableGames.length} jeux différents :
          </Text>
        </View>

        {/* Game Choices Grid */}
        <View style={styles.gamesGrid}>
          {availableGames.map((game) => (
            <TouchableOpacity 
              key={game.id} 
              activeOpacity={0.85}
              style={[styles.gameCard, { borderColor: getCategoryColor(game.category) }]}
              onPress={() => handleLaunchGame(game)}
            >
              <View style={styles.gameCardTop}>
                <Text style={styles.gameIcon}>{game.icon}</Text>
                <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(game.category) }]}>
                  <Text style={styles.categoryText}>{game.category}</Text>
                </View>
              </View>

              <Text style={styles.gameTitle}>{game.title}</Text>
              <Text style={styles.gameDesc}>{game.description}</Text>

              <View style={styles.gameCardFooter}>
                <Text style={styles.ageBadge}>Âge {game.recommendedAges} ans</Text>
                <TouchableOpacity 
                  style={[styles.playBtn, { backgroundColor: getCategoryColor(game.category) }]}
                  onPress={() => handleLaunchGame(game)}
                >
                  <Text style={styles.playBtnText}>Jouer 🚀</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
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

  scroll: { padding: 20, paddingBottom: 50 },
  skillBanner: { backgroundColor: '#EEF2FF', padding: 20, borderRadius: 24, borderWidth: 2, borderColor: '#C7D2FE', marginBottom: 25 },
  skillBadge: { alignSelf: 'flex-start', backgroundColor: '#4F46E5', color: 'white', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 10, fontSize: 11, fontWeight: 'bold', overflow: 'hidden', marginBottom: 8 },
  skillTitle: { fontSize: 22, fontWeight: 'bold', color: '#1E1B4B', marginBottom: 4 },
  skillSub: { fontSize: 14, color: '#4338CA', marginBottom: 12 },
  instructionText: { fontSize: 13, color: '#475569', fontStyle: 'italic', borderTopWidth: 1, borderTopColor: '#E0E7FF', paddingTop: 10 },

  gamesGrid: { gap: 16 },
  gameCard: { backgroundColor: 'white', padding: 20, borderRadius: 24, borderWidth: 3, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 10, elevation: 3 },
  gameCardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  gameIcon: { fontSize: 48 },
  categoryBadge: { paddingVertical: 4, paddingHorizontal: 12, borderRadius: 12 },
  categoryText: { color: 'white', fontWeight: 'bold', fontSize: 12 },

  gameTitle: { fontSize: 20, fontWeight: 'bold', color: '#1E293B', marginBottom: 6 },
  gameDesc: { fontSize: 14, color: '#64748B', lineHeight: 22, marginBottom: 16 },

  gameCardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#F1F5F9', paddingTop: 14 },
  ageBadge: { fontSize: 12, fontWeight: 'bold', color: '#94A3B8' },
  playBtn: { paddingVertical: 10, paddingHorizontal: 22, borderRadius: 14 },
  playBtnText: { color: 'white', fontWeight: 'bold', fontSize: 15 }
});
