import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { CameroonMathSkills, CameroonReadingSkills, CameroonScienceSkills } from '../../curriculum/cameroon/data';
import { CurriculumSkill } from '../../curriculum/models';

export default function LevelSelectionScreen() {
  const { subject } = useLocalSearchParams();
  const [skills, setSkills] = useState<CurriculumSkill[]>([]);

  useEffect(() => {
    if (subject === 'math') setSkills(CameroonMathSkills);
    if (subject === 'reading') setSkills(CameroonReadingSkills);
    if (subject === 'science') setSkills(CameroonScienceSkills);
  }, [subject]);

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
          <Text style={styles.backText}>⬅️ Retour / Back</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: getSubjectColor() }]}>{getSubjectTitle()}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.grid}>
        {skills.map((skill) => (
          <TouchableOpacity 
            key={skill.skillId} 
            style={[styles.card, { borderColor: getSubjectColor() }]}
            onPress={() => router.push(`/game/${subject}?skillId=${skill.skillId}`)}
          >
            <Text style={styles.levelBadge}>{skill.level}</Text>
            <Text style={styles.skillName}>{skill.skillNameFrench}</Text>
            <Text style={styles.skillDesc}>{skill.descriptionFrench}</Text>
            <TouchableOpacity 
              style={[styles.playBtn, { backgroundColor: getSubjectColor() }]}
              onPress={() => router.push(`/game/${subject}?skillId=${skill.skillId}`)}
            >
              <Text style={styles.playText}>▶️ Jouer / Play</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}

        {skills.length === 0 && (
          <Text style={styles.empty}>Plus de niveaux à venir bientôt !</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, paddingTop: 40, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  backBtn: { padding: 10, backgroundColor: '#F1F5F9', borderRadius: 10, marginRight: 20 },
  backText: { fontWeight: 'bold', color: '#475569' },
  title: { fontSize: 24, fontWeight: 'bold' },
  grid: { padding: 20, gap: 15 },
  card: { backgroundColor: 'white', padding: 20, borderRadius: 16, borderWidth: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  levelBadge: { alignSelf: 'flex-start', backgroundColor: '#E2E8F0', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10, fontWeight: 'bold', color: '#475569', marginBottom: 10 },
  skillName: { fontSize: 20, fontWeight: 'bold', color: '#1E293B', marginBottom: 5 },
  skillDesc: { fontSize: 14, color: '#64748B', marginBottom: 20 },
  playBtn: { padding: 15, borderRadius: 12, alignItems: 'center' },
  playText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  empty: { textAlign: 'center', marginTop: 50, color: '#64748B', fontSize: 16 }
});
