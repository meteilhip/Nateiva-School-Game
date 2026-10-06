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
  const data = await AsyncStorage.getItem(KEYS.PROFILES);
  return data ? JSON.parse(data) : [];
}

export async function saveProfile(profile: ChildProfile): Promise<void> {
  const profiles = await getProfiles();
  const index = profiles.findIndex(p => p.id === profile.id);
  if (index >= 0) profiles[index] = profile;
  else profiles.push(profile);
  await AsyncStorage.setItem(KEYS.PROFILES, JSON.stringify(profiles));
}

export async function getMastery(learnerId: string): Promise<Record<string, SkillMastery>> {
  const data = await AsyncStorage.getItem(`${KEYS.MASTERY}_${learnerId}`);
  return data ? JSON.parse(data) : {};
}

export async function saveMastery(learnerId: string, mastery: Record<string, SkillMastery>): Promise<void> {
  await AsyncStorage.setItem(`${KEYS.MASTERY}_${learnerId}`, JSON.stringify(mastery));
}
