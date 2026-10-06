import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useRouter, Link } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

export default function ReadingLevelsScreen() {
  const { t } = useTranslation();
  const router = useRouter();

  const levels = [
    { id: 1, key: 'level_1', locked: false, stars: 0 },
    { id: 2, key: 'level_2', locked: true, stars: 0 },
    { id: 3, key: 'level_3', locked: true, stars: 0 },
    { id: 4, key: 'level_4', locked: true, stars: 0 },
    { id: 5, key: 'level_5', locked: true, stars: 0 },
    { id: 6, key: 'level_6', locked: true, stars: 0 },
  ];

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ThemedText>⬅️</ThemedText>
          </TouchableOpacity>
          <ThemedText style={styles.title}>{t('reading')} - {t('choose_level')}</ThemedText>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView contentContainerStyle={styles.mapContainer}>
          {levels.map((level, index) => {
            const isLeft = index % 2 === 0;
            return (
              <View key={level.id} style={[styles.levelRow, isLeft ? styles.leftAlign : styles.rightAlign]}>
                <Link href={`/reading/${level.id}` as any} asChild>
                  <TouchableOpacity
                    style={StyleSheet.flatten([styles.levelNode, level.locked ? styles.lockedNode : styles.unlockedNode])}
                    disabled={level.locked}
                  >
                    <ThemedText style={styles.levelText}>
                      {level.locked ? '🔒' : (level.stars > 0 ? `⭐ ${level.stars}` : '📖')}
                    </ThemedText>
                    <ThemedText style={styles.levelName}>{t(level.key)}</ThemedText>
                  </TouchableOpacity>
                </Link>
              </View>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7FA', // Different background for reading
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.four,
    paddingBottom: Spacing.two,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  backButton: {
    padding: Spacing.two,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  mapContainer: {
    padding: Spacing.four,
    paddingBottom: 100,
  },
  levelRow: {
    width: '100%',
    marginBottom: Spacing.four,
  },
  leftAlign: {
    alignItems: 'flex-start',
    paddingLeft: '10%',
  },
  rightAlign: {
    alignItems: 'flex-end',
    paddingRight: '10%',
  },
  levelNode: {
    width: 140,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  unlockedNode: {
    backgroundColor: '#4ECDC4',
  },
  lockedNode: {
    backgroundColor: '#BDBDBD',
  },
  levelText: {
    fontSize: 24,
  },
  levelName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 4,
    textAlign: 'center',
  },
});
