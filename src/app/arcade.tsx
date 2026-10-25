import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { router } from 'expo-router';

export default function ArcadeScreen() {
  return (
    <View style={styles.container}>
      {/* Top Navigation */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>⬅️ Retour Bibliothèque</Text>
        </TouchableOpacity>
        <Text style={styles.title}>🕹️ Nateiva School Game</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Web Iframe or Mobile Viewport */}
      {Platform.OS === 'web' ? (
        <View style={styles.iframeContainer}>
          <iframe
            src="/arcade.html"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              borderRadius: 20
            }}
            title="Nateiva School Game"
          />
        </View>
      ) : (
        <View style={styles.mobileFallback}>
          <Text style={styles.fallbackTitle}>Arcade Éducative Animée</Text>
          <Text style={styles.fallbackText}>
            L'arcade interactive sans lecture requise est optimisée pour le jeu tactile et vocal.
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: 12
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#1e293b',
    borderRadius: 18,
    marginBottom: 10
  },
  backBtn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: '#334155',
    borderRadius: 14
  },
  backBtnText: {
    color: '#f8fafc',
    fontWeight: 'bold',
    fontSize: 14
  },
  title: {
    color: '#fde047',
    fontSize: 18,
    fontWeight: '900'
  },
  iframeContainer: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#090d16'
  },
  mobileFallback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24
  },
  fallbackTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fde047',
    marginBottom: 10
  },
  fallbackText: {
    fontSize: 16,
    color: '#cbd5e1',
    textAlign: 'center'
  }
});
