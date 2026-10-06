import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { getProfiles, ChildProfile } from '../storage/db';

export default function ProfileSelectionScreen() {
  const [profiles, setProfiles] = useState<ChildProfile[]>([]);

  useEffect(() => {
    // Refresh profiles whenever the screen is focused (for now, just on mount)
    getProfiles().then(setProfiles);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Qui es-tu ? / Who are you?</Text>
      
      <ScrollView contentContainerStyle={styles.grid}>
        {profiles.map(p => (
          <TouchableOpacity 
            key={p.id} 
            style={styles.card}
            onPress={() => router.push('/world')}
          >
            <Text style={styles.avatar}>{p.avatar}</Text>
            <Text style={styles.name}>{p.name}</Text>
          </TouchableOpacity>
        ))}
        
        <TouchableOpacity 
          style={[styles.card, styles.addCard]}
          onPress={() => router.push('/create-profile')}
        >
          <Text style={styles.avatar}>➕</Text>
          <Text style={styles.name}>Nouveau / New</Text>
        </TouchableOpacity>
      </ScrollView>

      <TouchableOpacity 
        style={styles.parentBtn}
        onPress={() => router.push('/parent')}
      >
        <Text style={styles.parentText}>🔒 Parent Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EEF2FF', padding: 20, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 40, color: '#3730A3' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 20 },
  card: { backgroundColor: 'white', padding: 20, borderRadius: 20, alignItems: 'center', minWidth: 140, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
  addCard: { backgroundColor: '#E0E7FF', borderWidth: 2, borderColor: '#C7D2FE', borderStyle: 'dashed' },
  avatar: { fontSize: 50, marginBottom: 10 },
  name: { fontSize: 18, fontWeight: 'bold', color: '#1E293B' },
  parentBtn: { position: 'absolute', bottom: 20, right: 20, backgroundColor: 'rgba(0,0,0,0.05)', padding: 15, borderRadius: 15 },
  parentText: { fontSize: 16, color: '#64748B' }
});
