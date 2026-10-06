// src/storage/db.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SkillMastery } from '../adaptive/engine';

const KEYS = {
  PROFILES: '@nateiva_profiles',
  MASTERY: '@nateiva_mastery',
};

export interface ChildProfile {
  id: string;
  name: string;
  avatar: string;
  age: number;
  schoolSystem: 'francophone' | 'anglophone';
  grade: string;
  learningLanguage: 'fr' | 'en';
  interfaceLanguage: 'fr' | 'en';
  coins: number;
  streak: number;
}

export async function getProfiles(): Promise<ChildProfile[]> {
  try {
    const data = await AsyncStorage.getItem(KEYS.PROFILES);
    if (!data) return [];
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error("Error reading profiles", e);
    return [];
  }
}

export async function saveProfile(profile: ChildProfile): Promise<void> {
  try {
    const profiles = await getProfiles();
    const index = profiles.findIndex(p => p.id === profile.id);
    if (index >= 0) profiles[index] = profile;
    else profiles.push(profile);
    await AsyncStorage.setItem(KEYS.PROFILES, JSON.stringify(profiles));
  } catch (e) {
    console.error("Error saving profile", e);
  }
}

export async function getMastery(learnerId: string): Promise<Record<string, SkillMastery>> {
  try {
    const data = await AsyncStorage.getItem(`${KEYS.MASTERY}_${learnerId}`);
    return data ? JSON.parse(data) : {};
  } catch (e) {
    console.error("Error reading mastery", e);
    return {};
  }
}

export async function saveMastery(learnerId: string, mastery: Record<string, SkillMastery>): Promise<void> {
  try {
    await AsyncStorage.setItem(`${KEYS.MASTERY}_${learnerId}`, JSON.stringify(mastery));
  } catch (e) {
    console.error("Error saving mastery", e);
  }
}
