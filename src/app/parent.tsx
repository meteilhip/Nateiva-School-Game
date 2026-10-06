import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';

export default function ParentDashboardScreen() {
  const [pin, setPin] = useState('');
  const [unlocked, setUnlocked] = useState(false);

  const verifyPin = () => {
    if (pin === '144') { // 12 x 12
      setUnlocked(true);
    } else {
      Alert.alert("Erreur", "Code incorrect.");
      setPin('');
    }
  };

  if (!unlocked) {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>🔒 Espace Parent</Text>
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
        <View style={styles.card}>
          <Text style={styles.title}>Vue Générale</Text>
          <Text style={styles.statLine}>Temps d'apprentissage: 45 min</Text>
          <Text style={styles.statLine}>Dernière session: Aujourd'hui</Text>
          <Text style={styles.statLine}>Matière forte: Mathématiques</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Maîtrise (Adaptive Engine)</Text>
          <Text style={styles.statLine}>Addition <10: SECURE (95%)</Text>
          <Text style={styles.statLine}>Addition >10: LEARNING (40%)</Text>
          <Text style={styles.statLine}>Lecture Syllabes: DEVELOPING (65%)</Text>
        </View>

        <TouchableOpacity style={[styles.primaryBtn, { backgroundColor: '#EF4444' }]}>
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
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15, color: '#334155' },
  label: { fontSize: 16, color: '#475569', marginBottom: 10 },
  input: { borderWidth: 2, borderColor: '#E2E8F0', borderRadius: 12, padding: 15, fontSize: 18, textAlign: 'center', marginBottom: 20 },
  primaryBtn: { backgroundColor: '#4F46E5', padding: 16, borderRadius: 16, alignItems: 'center' },
  primaryBtnText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  cancelBtn: { padding: 16, alignItems: 'center', marginTop: 5 },
  cancelBtnText: { color: '#64748B', fontSize: 16, fontWeight: 'bold' },
  statLine: { fontSize: 16, color: '#475569', marginBottom: 10 }
});
