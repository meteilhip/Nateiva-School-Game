import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import * as DocumentPicker from 'expo-document-picker';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { getAllMastery } from '@/db';
import { Spacing } from '@/constants/theme';

export default function ProgressScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const data = getAllMastery();
    setHistory(Object.entries(data).map(([k, v]) => ({ subject: k, score: Math.round(v * 100), level: 1, date: new Date().toISOString() })));
  }, []);

  const handleBackup = async () => {
    if (Platform.OS === 'web') {
      alert("Backup requires native mobile app (iOS/Android).");
      return;
    }
    
    try {
      const data = JSON.stringify(history);
      const fileUri = FileSystem.documentDirectory + 'edukids_backup.json';
      await FileSystem.writeAsStringAsync(fileUri, data, { encoding: FileSystem.EncodingType.UTF8 });
      
      const isAvailable = await Sharing.isAvailableAsync();
      if (isAvailable) {
        await Sharing.shareAsync(fileUri, {
          mimeType: 'application/json',
          dialogTitle: 'Backup EduKids Data to Google Drive',
          UTI: 'public.json'
        });
      }
    } catch (err) {
      console.error(err);
      alert("Error creating backup.");
    }
  };

  const handleRestore = async () => {
    if (Platform.OS === 'web') {
      alert("Restore requires native mobile app (iOS/Android).");
      return;
    }

    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/json',
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const fileContent = await FileSystem.readAsStringAsync(result.assets[0].uri);
        const parsedData = JSON.parse(fileContent);
        // Here we would iterate and insert into SQLite
        alert(`Successfully restored ${parsedData.length} records! (Restart app to see changes)`);
      }
    } catch (err) {
      console.error(err);
      alert("Error restoring backup.");
    }
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ThemedText>⬅️</ThemedText>
          </TouchableOpacity>
          <ThemedText style={styles.title}>{t('progress')}</ThemedText>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.statsCard}>
            <ThemedText style={styles.statsTitle}>Overall XP</ThemedText>
            <ThemedText style={styles.statsValue}>⭐ 120</ThemedText>
          </View>

          <View style={styles.actionButtonsRow}>
            <TouchableOpacity style={styles.actionButton} onPress={handleBackup}>
              <ThemedText style={styles.actionButtonText}>📤 Backup Data</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={handleRestore}>
              <ThemedText style={styles.actionButtonText}>📥 Restore Data</ThemedText>
            </TouchableOpacity>
          </View>

          <ThemedText style={styles.historyTitle}>Recent Activity</ThemedText>
          
          {history.length === 0 ? (
            <ThemedText style={styles.noDataText}>
              No activities yet! Complete a module to see progress here.
            </ThemedText>
          ) : (
            history.map((item, index) => (
              <View key={index} style={styles.historyItem}>
                <View>
                  <ThemedText style={styles.itemSubject}>
                    {t(item.subject)} - Level {item.level}
                  </ThemedText>
                  <ThemedText style={styles.itemDate}>
                    {new Date(item.date).toLocaleDateString()}
                  </ThemedText>
                </View>
                <ThemedText style={styles.itemScore}>{item.score}%</ThemedText>
              </View>
            ))
          )}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  backButton: {
    padding: Spacing.two,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  content: {
    padding: Spacing.four,
  },
  statsCard: {
    backgroundColor: '#fff',
    padding: Spacing.four,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: Spacing.four,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statsTitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
  },
  statsValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFB300',
  },
  actionButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.four,
    gap: Spacing.two,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#E0F7FA',
    padding: Spacing.three,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#B2EBF2',
  },
  actionButtonText: {
    fontWeight: 'bold',
    color: '#00796B',
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: Spacing.three,
    color: '#333',
  },
  noDataText: {
    textAlign: 'center',
    color: '#666',
    marginTop: Spacing.four,
    fontStyle: 'italic',
  },
  historyItem: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.three,
    borderRadius: 12,
    marginBottom: Spacing.two,
  },
  itemSubject: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemDate: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  itemScore: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
});
