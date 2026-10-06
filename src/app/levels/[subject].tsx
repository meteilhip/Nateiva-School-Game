import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, router, useFocusEffect } from 'expo-router';
import { CameroonMathSkills, CameroonReadingSkills, CameroonScienceSkills } from '../../curriculum/cameroon/data';
import { CurriculumSkill } from '../../curriculum/models';
import { getProfiles, getMastery, ChildProfile } from '../../storage/db';
import { SkillMastery } from '../../adaptive/engine';

export default function LevelSelectionScreen() {
  const { subject } = useLocalSearchParams();
  const [skills, setSkills] = useState<CurriculumSkill[]>([]);
  const [profile, setProfile] = useState<ChildProfile | null>(null);
  const [mastery, setMastery] = useState<Record<string, SkillMastery>>({});

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [subject])
  );

  const loadData = async () => {
    // For simplicity, just use the first profile or a mock profile if none selected
    const profiles = await getProfiles();
    const currentProfile = profiles.length > 0 ? profiles[0] : null;
    setProfile(currentProfile);

    if (currentProfile) {
      const userMastery = await getMastery(currentProfile.id);
      setMastery(userMastery);
    }

    let allSkills: CurriculumSkill[] = [];
    if (subject === 'math') allSkills = CameroonMathSkills;
    if (subject === 'reading') allSkills = CameroonReadingSkills;
    if (subject === 'science') allSkills = CameroonScienceSkills;
    
    // Sort by age and difficulty
    allSkills.sort((a, b) => a.recommendedAgeMin - b.recommendedAgeMin || a.difficultyRange[0] - b.difficultyRange[0]);
    setSkills(allSkills);
  };

  const isSkillUnlocked = (skill: CurriculumSkill) => {
    // If no prerequisites, it's unlocked
    if (!skill.prerequisiteSkillIds || skill.prerequisiteSkillIds.length === 0) return true;
    
    // Check if all prerequisites are mastered
    for (const prereqId of skill.prerequisiteSkillIds) {
      const prereqMastery = mastery[prereqId];
      if (!prereqMastery || !prereqMastery.isMastered) {
        return false;
      }
    }
    return true;
  };

  const getSubjectColor = () => {
    if (subject === 'math') return '#3B82F6';
    if (subject === 'reading') return '#F59E0B';
    if (subject === 'science') return '#10B981';
    return '#4F46E5';
  };

  const getSubjectTitle = () => {
    if (subject === 'math') return 'Math Kingdom';
    if (subject === 'reading') return 'Reading Forest';
    if (subject === 'science') return 'Science Lab';
    return 'Niveaux';
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>⬅️ Retour</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: getSubjectColor() }]}>{getSubjectTitle()}</Text>
        {profile && <Text style={styles.profileAge}>Âge: {profile.age}</Text>}
      </View>

      <ScrollView contentContainerStyle={styles.grid}>
        {skills.map((skill) => {
          const unlocked = isSkillUnlocked(skill);
          const skillMastery = mastery[skill.skillId];
          const isMastered = skillMastery?.isMastered;
          
          return (
            <View 
              key={skill.skillId} 
              style={[
                styles.card, 
                { borderColor: unlocked ? getSubjectColor() : '#CBD5E1', opacity: unlocked ? 1 : 0.6 }
              ]}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.levelBadge}>{skill.level} (Âge {skill.recommendedAgeMin}-{skill.recommendedAgeMax})</Text>
                {isMastered && <Text style={styles.masteredBadge}>⭐ MAÎTRISÉ</Text>}
                {!unlocked && <Text style={styles.lockedBadge}>🔒 VERROUILLÉ</Text>}
              </View>
              
              <Text style={styles.skillName}>{skill.skillNameFrench}</Text>
              <Text style={styles.skillDesc}>{skill.descriptionFrench}</Text>
              
              <TouchableOpacity 
                style={[styles.playBtn, { backgroundColor: unlocked ? getSubjectColor() : '#94A3B8' }]}
                disabled={!unlocked}
                onPress={() => router.push(`/game/${subject}?skillId=${skill.skillId}`)}
              >
                <Text style={styles.playText}>{unlocked ? '▶️ Jouer' : '🔒 Terminer les niveaux précédents'}</Text>
              </TouchableOpacity>
            </View>
          );
        })}

        {skills.length === 0 && (
          <Text style={styles.empty}>Chargement des niveaux...</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 40, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  backBtn: { padding: 10, backgroundColor: '#F1F5F9', borderRadius: 10 },
  backText: { fontWeight: 'bold', color: '#475569' },
  title: { fontSize: 24, fontWeight: 'bold' },
  profileAge: { fontSize: 16, fontWeight: 'bold', color: '#64748B' },
  grid: { padding: 20, gap: 15 },
  card: { backgroundColor: 'white', padding: 20, borderRadius: 16, borderWidth: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  levelBadge: { backgroundColor: '#E2E8F0', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10, fontWeight: 'bold', color: '#475569' },
  masteredBadge: { backgroundColor: '#FEF08A', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10, fontWeight: 'bold', color: '#854D0E' },
  lockedBadge: { backgroundColor: '#FEE2E2', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10, fontWeight: 'bold', color: '#991B1B' },
  skillName: { fontSize: 20, fontWeight: 'bold', color: '#1E293B', marginBottom: 5 },
  skillDesc: { fontSize: 14, color: '#64748B', marginBottom: 20 },
  playBtn: { padding: 15, borderRadius: 12, alignItems: 'center' },
  playText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  empty: { textAlign: 'center', marginTop: 50, color: '#64748B', fontSize: 16 }
});
