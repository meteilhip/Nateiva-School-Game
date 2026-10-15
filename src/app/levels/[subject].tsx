import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, router, useFocusEffect } from 'expo-router';
import { CameroonMathSkills, CameroonReadingSkills, CameroonScienceSkills } from '../../curriculum/cameroon/data';
import { CurriculumSkill } from '../../curriculum/models';
import { getProfiles, getMastery, ChildProfile } from '../../storage/db';
import { SkillMastery } from '../../adaptive/engine';
import { getGamesForSkill } from '../../games/GameRegistry';

export default function LevelSelectionScreen() {
  const { subject } = useLocalSearchParams();
  const [skills, setSkills] = useState<CurriculumSkill[]>([]);
  const [profile, setProfile] = useState<ChildProfile | null>(null);
  const [mastery, setMastery] = useState<Record<string, SkillMastery>>({});
  const [selectedStrand, setSelectedStrand] = useState<string>('ALL');

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [subject])
  );

  const loadData = async () => {
    const profiles = await getProfiles();
    const currentProfile = profiles.length > 0 ? profiles[0] : null;
    setProfile(currentProfile);

    if (currentProfile) {
      const userMastery = await getMastery(currentProfile.id);
      setMastery(userMastery);
    }

    let allSkills: CurriculumSkill[] = [];
    if (subject === 'math') allSkills = CameroonMathSkills;
    else if (subject === 'reading') allSkills = CameroonReadingSkills;
    else if (subject === 'science') allSkills = CameroonScienceSkills;
    else if (subject === 'memory') {
      allSkills = [
        {
          curriculumId: 'cm_mem_001',
          country: 'Cameroon',
          schoolSystem: 'francophone',
          level: 'Tous niveaux',
          subject: 'mathematics',
          strand: 'memory',
          subStrand: 'pairs',
          skillId: 'mem_cards',
          skillNameEnglish: 'Memory Pairs Challenge',
          skillNameFrench: 'Jeu des Paires de Mémoire',
          descriptionEnglish: 'Flip cards and find matching pairs of Cameroon animals and items.',
          descriptionFrench: 'Retourne les cartes et trouve les paires d\'animaux et objets camerounais.',
          prerequisiteSkillIds: [],
          recommendedAgeMin: 4,
          recommendedAgeMax: 12,
          difficultyRange: [0.1, 0.5],
          activityTypes: ['MEMORY_CARD_GAME'],
          masteryThreshold: 0.85,
          reviewSchedule: 'daily',
          tags: ['memory', 'matching']
        }
      ];
    }
    
    setSkills(allSkills);
  };

  const getSubjectColor = () => {
    if (subject === 'math') return '#2563EB';
    if (subject === 'reading') return '#D97706';
    if (subject === 'science') return '#059669';
    if (subject === 'memory') return '#7C3AED';
    return '#4F46E5';
  };

  const getSubjectTitle = () => {
    if (subject === 'math') return '🧮 Math Kingdom';
    if (subject === 'reading') return '📖 Reading Forest';
    if (subject === 'science') return '🔬 Science Lab';
    if (subject === 'memory') return '🧩 Memory Village';
    return 'Niveaux d\'Apprentissage';
  };

  const strands = ['ALL', ...Array.from(new Set(skills.map(s => s.strand)))];

  const filteredSkills = selectedStrand === 'ALL' 
    ? skills 
    : skills.filter(s => s.strand === selectedStrand);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace('/world')} style={styles.backBtn}>
          <Text style={styles.backText}>⬅️ Carte des Mondes</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: getSubjectColor() }]}>{getSubjectTitle()}</Text>
        <View style={styles.profileBadge}>
          <Text style={styles.profileBadgeText}>{profile?.avatar || '🦁'} {profile?.name || 'Élève'} ({profile?.grade || 'CP'})</Text>
        </View>
      </View>

      {/* Strand Filter Tabs */}
      {strands.length > 2 && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.strandsScroll}>
          {strands.map((strand) => (
            <TouchableOpacity 
              key={strand} 
              onPress={() => setSelectedStrand(strand)}
              style={[
                styles.strandChip, 
                selectedStrand === strand && { backgroundColor: getSubjectColor(), borderColor: getSubjectColor() }
              ]}
            >
              <Text style={[styles.strandChipText, selectedStrand === strand && { color: 'white' }]}>
                {strand === 'ALL' ? '🌟 Tous les Niveaux' : strand.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* Level List */}
      <ScrollView contentContainerStyle={styles.scrollList}>
        {filteredSkills.map((skill) => {
          const userMastery = mastery[skill.skillId];
          const masteryScore = userMastery ? Math.round(userMastery.masteryValue * 100) : 0;
          const isMastered = userMastery?.state === 'SECURE' || masteryScore >= 80;
          const gameChoices = getGamesForSkill(skill.skillId);

          return (
            <View key={skill.skillId} style={[styles.levelCard, { borderLeftColor: getSubjectColor() }]}>
              <View style={styles.cardTopRow}>
                <View style={styles.levelBadge}>
                  <Text style={styles.levelBadgeText}>{skill.level} • Âge {skill.recommendedAgeMin}-{skill.recommendedAgeMax}</Text>
                </View>
                {isMastered ? (
                  <View style={styles.masteredBadge}>
                    <Text style={styles.masteredText}>⭐ MAÎTRISÉ ({masteryScore}%)</Text>
                  </View>
                ) : masteryScore > 0 ? (
                  <View style={styles.learningBadge}>
                    <Text style={styles.learningText}>En Progrès : {masteryScore}%</Text>
                  </View>
                ) : null}
              </View>

              <Text style={styles.skillTitleFrench}>{skill.skillNameFrench}</Text>
              <Text style={styles.skillTitleEnglish}>{skill.skillNameEnglish}</Text>
              <Text style={styles.skillDesc}>{skill.descriptionFrench}</Text>

              {/* Game Mechanics Available */}
              <View style={styles.mechanicsRow}>
                <Text style={styles.mechanicsLabel}>Jeux disponibles :</Text>
                {gameChoices.map((g) => (
                  <Text key={g.id} style={styles.gameChoiceChip}>{g.icon} {g.title}</Text>
                ))}
              </View>

              <View style={styles.cardFooter}>
                <View style={styles.tagsRow}>
                  {skill.tags.slice(0, 3).map((tag) => (
                    <Text key={tag} style={styles.tagPill}>#{tag}</Text>
                  ))}
                </View>

                {/* Direct link to choose between multiple games for this skill */}
                <TouchableOpacity 
                  style={[styles.playBtn, { backgroundColor: getSubjectColor() }]}
                  onPress={() => router.push(`/game-choice/${skill.skillId}?subject=${subject}`)}
                >
                  <Text style={styles.playBtnText}>Choisir un Jeu 🎮</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}

        {filteredSkills.length === 0 && (
          <Text style={styles.emptyText}>Aucun niveau disponible pour ce filtre.</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, paddingTop: 30, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  backBtn: { paddingVertical: 8, paddingHorizontal: 12, backgroundColor: '#F1F5F9', borderRadius: 12 },
  backText: { fontWeight: 'bold', color: '#475569', fontSize: 13 },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  profileBadge: { backgroundColor: '#EEF2FF', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 16 },
  profileBadgeText: { fontSize: 14, fontWeight: 'bold', color: '#4338CA' },

  strandsScroll: { paddingHorizontal: 16, paddingVertical: 12, gap: 8 },
  strandChip: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, borderWidth: 1.5, borderColor: '#CBD5E1', backgroundColor: 'white' },
  strandChipText: { fontSize: 13, fontWeight: 'bold', color: '#475569' },

  scrollList: { padding: 16, gap: 16, paddingBottom: 40 },
  levelCard: { backgroundColor: 'white', padding: 20, borderRadius: 20, borderLeftWidth: 6, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 },
  cardTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  levelBadge: { backgroundColor: '#F1F5F9', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 10 },
  levelBadgeText: { fontSize: 12, fontWeight: 'bold', color: '#475569' },
  masteredBadge: { backgroundColor: '#FEF08A', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 10 },
  masteredText: { fontSize: 12, fontWeight: 'bold', color: '#854D0E' },
  learningBadge: { backgroundColor: '#E0E7FF', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 10 },
  learningText: { fontSize: 12, fontWeight: 'bold', color: '#3730A3' },

  skillTitleFrench: { fontSize: 20, fontWeight: 'bold', color: '#1E293B', marginBottom: 2 },
  skillTitleEnglish: { fontSize: 14, color: '#64748B', fontStyle: 'italic', marginBottom: 8 },
  skillDesc: { fontSize: 14, color: '#334155', lineHeight: 22, marginBottom: 12 },

  mechanicsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, alignItems: 'center', marginBottom: 16, backgroundColor: '#F8FAFC', padding: 8, borderRadius: 12 },
  mechanicsLabel: { fontSize: 12, fontWeight: 'bold', color: '#64748B' },
  gameChoiceChip: { fontSize: 12, color: '#334155', backgroundColor: '#E2E8F0', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, fontWeight: '500' },

  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  tagsRow: { flexDirection: 'row', gap: 6, flexWrap: 'wrap', flex: 1 },
  tagPill: { fontSize: 11, color: '#94A3B8', backgroundColor: '#F8FAFC', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  playBtn: { paddingVertical: 12, paddingHorizontal: 20, borderRadius: 14, elevation: 3 },
  playBtnText: { color: 'white', fontWeight: 'bold', fontSize: 14 },
  emptyText: { textAlign: 'center', marginTop: 40, color: '#64748B', fontSize: 16 }
});
