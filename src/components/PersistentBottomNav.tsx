import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router, usePathname } from 'expo-router';

export function PersistentBottomNav() {
  const pathname = usePathname();

  const isHome = pathname === '/world' || pathname === '/';
  const isGames = pathname === '/library' || pathname.startsWith('/game-choice');
  const isProgress = pathname === '/parent';

  return (
    <View style={styles.navBar}>
      <TouchableOpacity 
        style={[styles.navItem, isHome && styles.navItemActive]} 
        onPress={() => router.replace('/world')}
      >
        <Text style={styles.navIcon}>🏠</Text>
        <Text style={[styles.navLabel, isHome && styles.navLabelActive]}>Accueil</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.navItem, isGames && styles.navItemActive]} 
        onPress={() => router.replace('/library')}
      >
        <Text style={styles.navIcon}>🎮</Text>
        <Text style={[styles.navLabel, isGames && styles.navLabelActive]}>60 Jeux</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.navItem, isProgress && styles.navItemActive]} 
        onPress={() => router.push('/parent')}
      >
        <Text style={styles.navIcon}>📊</Text>
        <Text style={[styles.navLabel, isProgress && styles.navLabelActive]}>Progrès</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.navItem} 
        onPress={() => router.push('/world')}
      >
        <Text style={styles.navIcon}>⭐</Text>
        <Text style={styles.navLabel}>Trophées</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingVertical: 10,
    paddingBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 8
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 14
  },
  navItemActive: {
    backgroundColor: '#EEF2FF'
  },
  navIcon: {
    fontSize: 22,
    marginBottom: 2
  },
  navLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#64748B'
  },
  navLabelActive: {
    color: '#4F46E5'
  }
});
