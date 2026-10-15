import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { saveProfile, ChildProfile } from '../storage/db';

export default function CreateProfileScreen() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('6');
  const [avatar, setAvatar] = useState('🦁');
  const [schoolSystem, setSchoolSystem] = useState<'francophone' | 'anglophone'>('francophone');
  const [grade, setGrade] = useState('CP');
  const [learningLanguage, setLearningLanguage] = useState<'fr' | 'en'>('fr');
  const [errorMsg, setErrorMsg] = useState('');

  const avatars = ['🦁', '🐆', '🐘', '🐒', '🦜', '🐢', '🐊', '🦔'];

  const francophoneGrades = ['Maternelle 1', 'Maternelle 2', 'SIL', 'CP', 'CE1', 'CE2', 'CM1', 'CM2'];
  const anglophoneGrades = ['Nursery 1', 'Nursery 2', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6'];

  const handleSystemChange = (system: 'francophone' | 'anglophone') => {
    setSchoolSystem(system);
    setGrade(system === 'francophone' ? 'CP' : 'Class 1');
    setLearningLanguage(system === 'francophone' ? 'fr' : 'en');
  };

  const handleSave = async () => {
    if (!name.trim()) {
      setErrorMsg('Veuillez entrer le prénom de l\'enfant.');
      return;
    }

    const newProfile: ChildProfile = {
      id: Date.now().toString(),
      name: name.trim(),
      avatar,
      age: parseInt(age) || 6,
      schoolSystem,
      grade,
      learningLanguage,
      interfaceLanguage: learningLanguage,
      coins: 50, // Welcome gift coins
      streak: 1
    };

    await saveProfile(newProfile);
    router.replace('/');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>Nouveau Profil Enfant</Text>
      <Text style={styles.subtitle}>Personnalise l'apprentissage selon le système scolaire</Text>
      
      <View style={styles.card}>
        {/* Name input */}
        <Text style={styles.label}>Prénom de l'enfant / Child's Name</Text>
        <TextInput 
          style={styles.input} 
          value={name} 
          onChangeText={(text) => { setName(text); setErrorMsg(''); }} 
          placeholder="Ex: Amina, Junior, Tata" 
        />

        {/* Age Selector */}
        <Text style={styles.label}>Âge ({age} ans)</Text>
        <View style={styles.ageRow}>
          {[4, 5, 6, 7, 8, 9, 10, 11, 12].map((a) => (
            <TouchableOpacity 
              key={a}
              style={[styles.agePill, age === a.toString() && styles.agePillActive]}
              onPress={() => setAge(a.toString())}
            >
              <Text style={[styles.agePillText, age === a.toString() && styles.agePillTextActive]}>{a}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Subsystem Choice */}
        <Text style={styles.label}>Système Scolaire au Cameroun</Text>
        <View style={styles.toggleRow}>
          <TouchableOpacity 
            style={[styles.systemBtn, schoolSystem === 'francophone' && styles.systemBtnActive]}
            onPress={() => handleSystemChange('francophone')}
          >
            <Text style={[styles.systemBtnText, schoolSystem === 'francophone' && styles.systemBtnTextActive]}>
              🇨🇲 Francophone (SIL - CM2)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.systemBtn, schoolSystem === 'anglophone' && styles.systemBtnActive]}
            onPress={() => handleSystemChange('anglophone')}
          >
            <Text style={[styles.systemBtnText, schoolSystem === 'anglophone' && styles.systemBtnTextActive]}>
              🇨🇲 Anglophone (Class 1 - 6)
            </Text>
          </TouchableOpacity>
        </View>

        {/* Grade Choice */}
        <Text style={styles.label}>Classe / Grade</Text>
        <View style={styles.gradesGrid}>
          {(schoolSystem === 'francophone' ? francophoneGrades : anglophoneGrades).map((g) => (
            <TouchableOpacity 
              key={g} 
              style={[styles.gradeChip, grade === g && styles.gradeChipActive]}
              onPress={() => setGrade(g)}
            >
              <Text style={[styles.gradeChipText, grade === g && styles.gradeChipTextActive]}>{g}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Avatar Selection */}
        <Text style={styles.label}>Choisis un Animal Mascotte</Text>
        <View style={styles.avatarGrid}>
          {avatars.map((a) => (
            <TouchableOpacity 
              key={a} 
              style={[styles.avatarBtn, avatar === a && styles.avatarBtnSelected]}
              onPress={() => setAvatar(a)}
            >
              <Text style={styles.avatarText}>{a}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>Créer le Profil et Jouer ! 🚀</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.cancelBtn} onPress={() => router.back()}>
          <Text style={styles.cancelBtnText}>Annuler</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1, backgroundColor: '#F0F4F8', padding: 20, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 26, fontWeight: 'bold', color: '#1E3A8A', textAlign: 'center', marginTop: 10 },
  subtitle: { fontSize: 14, color: '#64748B', textAlign: 'center', marginBottom: 20 },
  card: { backgroundColor: 'white', padding: 24, borderRadius: 24, width: '100%', maxWidth: 480, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 15, elevation: 5 },
  label: { fontSize: 15, fontWeight: 'bold', color: '#334155', marginBottom: 8, marginTop: 16 },
  input: { borderWidth: 2, borderColor: '#CBD5E1', borderRadius: 14, padding: 14, fontSize: 16, backgroundColor: '#F8FAFC' },

  ageRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  agePill: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#F1F5F9', alignItems: 'center', justifyContent: 'center' },
  agePillActive: { backgroundColor: '#3B82F6' },
  agePillText: { fontSize: 15, fontWeight: 'bold', color: '#475569' },
  agePillTextActive: { color: 'white' },

  toggleRow: { flexDirection: 'row', gap: 10 },
  systemBtn: { flex: 1, paddingVertical: 12, borderRadius: 12, borderWidth: 2, borderColor: '#CBD5E1', alignItems: 'center' },
  systemBtnActive: { borderColor: '#3B82F6', backgroundColor: '#EFF6FF' },
  systemBtnText: { fontSize: 13, fontWeight: 'bold', color: '#64748B' },
  systemBtnTextActive: { color: '#1D4ED8' },

  gradesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  gradeChip: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 10, backgroundColor: '#F1F5F9', borderWidth: 1, borderColor: '#E2E8F0' },
  gradeChipActive: { backgroundColor: '#3B82F6', borderColor: '#2563EB' },
  gradeChipText: { fontSize: 13, fontWeight: 'bold', color: '#475569' },
  gradeChipTextActive: { color: 'white' },

  avatarGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 4 },
  avatarBtn: { padding: 10, borderWidth: 2, borderColor: '#E2E8F0', borderRadius: 16, backgroundColor: '#F8FAFC' },
  avatarBtnSelected: { borderColor: '#3B82F6', backgroundColor: '#EFF6FF' },
  avatarText: { fontSize: 32 },

  errorText: { color: '#DC2626', marginTop: 15, textAlign: 'center', fontWeight: 'bold' },
  saveBtn: { backgroundColor: '#10B981', padding: 16, borderRadius: 16, alignItems: 'center', marginTop: 25, elevation: 3 },
  saveBtnText: { color: 'white', fontSize: 17, fontWeight: 'bold' },
  cancelBtn: { padding: 14, alignItems: 'center', marginTop: 8 },
  cancelBtnText: { color: '#64748B', fontSize: 15, fontWeight: 'bold' }
});
