import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import * as Speech from 'expo-speech';

interface TutorOverlayProps {
  question: any;
  onClose: () => void;
}

export function TutorOverlay({ question, onClose }: TutorOverlayProps) {
  
  const speakStep = (text: string) => {
    Speech.stop();
    Speech.speak(text, { language: 'fr-FR', rate: 0.85 });
  };

  const renderSteps = () => {
    if (question.type === 'COUNT_AND_TAP') {
      return (
        <View style={styles.stepContainer}>
          <Text style={styles.stepText}>1. Regarde les objets à l'écran.</Text>
          <Text style={styles.stepText}>2. Touche chaque objet avec ton doigt.</Text>
          <Text style={styles.stepText}>3. Compte à voix haute : Un, Deux, Trois...</Text>
          <Text style={styles.stepText}>4. Le dernier nombre est la réponse ! ({question.ans})</Text>
        </View>
      );
    }
    
    // Generic fallback
    return (
      <View style={styles.stepContainer}>
        <Text style={styles.stepText}>Étape 1 : Lis bien la question : "{question.q}"</Text>
        <Text style={styles.stepText}>Étape 2 : L'indice était : "{question.hint}"</Text>
        <Text style={styles.stepText}>Étape 3 : La bonne réponse est {question.ans}.</Text>
      </View>
    );
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.card}>
        <Text style={styles.header}>🦉 Tutoriel / Tutor</Text>
        
        <ScrollView style={styles.scrollArea}>
          {renderSteps()}
        </ScrollView>

        <View style={styles.actions}>
          <TouchableOpacity 
            style={styles.listenBtn} 
            onPress={() => speakStep(`Voici comment trouver la réponse. ${question.hint}. La bonne réponse est ${question.ans}.`)}
          >
            <Text style={styles.listenText}>🔊 Écouter</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeText}>J'ai compris !</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center', alignItems: 'center',
    padding: 20, zIndex: 1000
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 500,
    maxHeight: '80%',
    shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 15, elevation: 10
  },
  header: { fontSize: 28, fontWeight: 'bold', color: '#4F46E5', marginBottom: 20, textAlign: 'center' },
  scrollArea: { marginBottom: 20 },
  stepContainer: { backgroundColor: '#F8FAFC', padding: 20, borderRadius: 16 },
  stepText: { fontSize: 18, color: '#334155', marginBottom: 15, lineHeight: 28 },
  actions: { flexDirection: 'row', justifyContent: 'space-between', gap: 10 },
  listenBtn: { flex: 1, backgroundColor: '#E0E7FF', padding: 16, borderRadius: 16, alignItems: 'center' },
  listenText: { fontSize: 16, fontWeight: 'bold', color: '#4338CA' },
  closeBtn: { flex: 1, backgroundColor: '#10B981', padding: 16, borderRadius: 16, alignItems: 'center' },
  closeText: { fontSize: 16, fontWeight: 'bold', color: 'white' }
});
