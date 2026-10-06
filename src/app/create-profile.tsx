import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { router } from 'expo-router';
import { saveProfile, ChildProfile } from '../storage/db';

export default function CreateProfileScreen() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [avatar, setAvatar] = useState('🦊');
  const [errorMsg, setErrorMsg] = useState('');

  const avatars = ['🦊', '🦁', '🐶', '🐱', '🐸', '🐼'];

  const handleSave = async () => {
    if (!name.trim()) {
      setErrorMsg('Veuillez entrer un nom / Please enter a name');
      return;
    }
    
    setErrorMsg('Sauvegarde en cours...'); // Loading state

    const newProfile: ChildProfile = {
      id: Date.now().toString(),
      name,
      avatar,
      age: parseInt(age) || 6,
      schoolSystem: 'francophone',
      grade: 'CP',
      learningLanguage: 'fr',
      interfaceLanguage: 'fr',
      coins: 0,
      streak: 0
    };

    await saveProfile(newProfile);
    // Use dismissAll to clear stack or replace to force re-render
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Créer un profil / Create Profile</Text>
      
      <View style={styles.card}>
        <Text style={styles.label}>Nom / Name</Text>
        <TextInput 
          style={styles.input} 
          value={name} 
          onChangeText={(text) => { setName(text); setErrorMsg(''); }} 
          placeholder="Musa" 
        />

        <Text style={styles.label}>Âge / Age</Text>
        <TextInput 
          style={styles.input} 
          value={age} 
          onChangeText={setAge} 
          placeholder="6" 
          keyboardType="numeric" 
        />

        <Text style={styles.label}>Avatar</Text>
        <View style={styles.avatarGrid}>
          {avatars.map(a => (
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
          <Text style={styles.saveBtnText}>Sauvegarder / Save</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.cancelBtn} onPress={() => router.back()}>
          <Text style={styles.cancelBtnText}>Annuler / Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EEF2FF', padding: 20, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#3730A3' },
  card: { backgroundColor: 'white', padding: 24, borderRadius: 20, width: '100%', maxWidth: 400, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
  label: { fontSize: 16, fontWeight: 'bold', color: '#475569', marginBottom: 8, marginTop: 16 },
  input: { borderWidth: 2, borderColor: '#E2E8F0', borderRadius: 12, padding: 12, fontSize: 16 },
  avatarGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 10 },
  avatarBtn: { padding: 10, borderWidth: 2, borderColor: '#E2E8F0', borderRadius: 16 },
  avatarBtnSelected: { borderColor: '#4F46E5', backgroundColor: '#EEF2FF' },
  avatarText: { fontSize: 32 },
  errorText: { color: 'red', marginTop: 15, textAlign: 'center', fontWeight: 'bold' },
  saveBtn: { backgroundColor: '#10B981', padding: 16, borderRadius: 16, alignItems: 'center', marginTop: 20 },
  saveBtnText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  cancelBtn: { padding: 16, alignItems: 'center', marginTop: 10 },
  cancelBtnText: { color: '#64748B', fontSize: 16, fontWeight: 'bold' }
});
