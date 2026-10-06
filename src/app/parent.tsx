import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';
import { getProfiles, ChildProfile, getMastery } from '../storage/db';
import { SkillMastery } from '../adaptive/engine';

export default function ParentDashboardScreen() {
  const [pin, setPin] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [profiles, setProfiles] = useState<ChildProfile[]>([]);
  const [masteries, setMasteries] = useState<Record<string, Record<string, SkillMastery>>>({});

  useEffect(() => {
    if (unlocked) {
      loadData();
    }
  }, [unlocked]);

  const loadData = async () => {
    const loadedProfiles = await getProfiles();
    setProfiles(loadedProfiles);
    
    const masteryData: Record<string, Record<string, SkillMastery>> = {};
    for (const p of loadedProfiles) {
      masteryData[p.id] = await getMastery(p.id);
    }
    setMasteries(masteryData);
  };

  const verifyPin = () => {
    if (pin === '144') { // 12 x 12
      setUnlocked(true);
    } else {
      Alert.alert("Erreur", "Code incorrect.");
      setPin('');
    }
  };

  const renderMasteryLevel = (m: SkillMastery) => {
    if (m.isMastered) return <Text style={{color: 'green'}}>SECURE ({Math.round(m.probabilityMastered * 100)}%)</Text>;
    if (m.probabilityMastered > 0.6) return <Text style={{color: 'orange'}}>DEVELOPING ({Math.round(m.probabilityMastered * 100)}%)</Text>;
    return <Text style={{color: 'red'}}>LEARNING ({Math.round(m.probabilityMastered * 100)}%)</Text>;
  };

  if (!unlocked) {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>⚙️ Espace Parent</Text>
          <Text style={styles.label}>Pour accéder, résolvez : 12 × 12 = ?</Text>
          <TextInput 
            style={styles.input} 
            value={pin} 
            onChangeText={setPin} 
            keyboardType="numeric" 
            placeholder="Réponse"
          />
          <TouchableOpacity style={styles.primaryBtn} onPress={verifyPin}>
            <Text style={styles.primaryBtnText}>Déverrouiller</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelBtn} onPress={() => router.back()}>
            <Text style={styles.cancelBtnText}>Retour</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📊 Tableau de bord Parent</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
          <Text style={styles.closeText}>Fermer</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        
        {profiles.length === 0 ? (
          <View style={styles.card}>
            <Text style={styles.label}>Aucun profil enfant n'a été créé.</Text>
          </View>
        ) : (
          profiles.map(profile => {
            const profileMastery = masteries[profile.id] || {};
            const skillKeys = Object.keys(profileMastery);

            return (
              <View key={profile.id} style={styles.card}>
                <Text style={styles.title}>{profile.avatar} {profile.name} (Âge {profile.age})</Text>
                <Text style={styles.statLine}>Système: {profile.schoolSystem} - Classe: {profile.grade}</Text>
                
                <View style={styles.divider} />
                <Text style={styles.sectionTitle}>Maîtrise des Compétences</Text>
                
                {skillKeys.length === 0 ? (
                  <Text style={styles.statLine}>Aucune donnée de jeu pour l'instant.</Text>
                ) : (
                  skillKeys.map(skillId => (
                    <Text key={skillId} style={styles.statLine}>
                      • {skillId}: {renderMasteryLevel(profileMastery[skillId])}
                    </Text>
                  ))
                )}
              </View>
            );
          })
        )}

        <TouchableOpacity style={[styles.primaryBtn, { backgroundColor: '#EF4444', marginHorizontal: 20 }]}>
          <Text style={styles.primaryBtnText}>Réinitialiser toutes les données</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F1F5F9', justifyContent: 'center' },
  card: { backgroundColor: 'white', padding: 24, borderRadius: 20, margin: 20, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 40, backgroundColor: 'white' },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  closeBtn: { padding: 10, backgroundColor: '#E2E8F0', borderRadius: 10 },
  closeText: { fontWeight: 'bold' },
  scroll: { paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 5, color: '#334155' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 10, marginBottom: 10, color: '#4F46E5' },
  label: { fontSize: 16, color: '#475569', marginBottom: 10 },
  input: { borderWidth: 2, borderColor: '#E2E8F0', borderRadius: 12, padding: 15, fontSize: 18, textAlign: 'center', marginBottom: 20 },
  primaryBtn: { backgroundColor: '#4F46E5', padding: 16, borderRadius: 16, alignItems: 'center' },
  primaryBtnText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  cancelBtn: { padding: 16, alignItems: 'center', marginTop: 5 },
  cancelBtnText: { color: '#64748B', fontSize: 16, fontWeight: 'bold' },
  statLine: { fontSize: 16, color: '#475569', marginBottom: 5 },
  divider: { height: 1, backgroundColor: '#E2E8F0', marginVertical: 15 }
});
