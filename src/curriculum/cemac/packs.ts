// src/curriculum/cemac/packs.ts
import { CurriculumSkill } from '../models';
import { CameroonMathSkills, CameroonReadingSkills, CameroonScienceSkills } from '../cameroon/data';

export interface CountryCurriculumPack {
  countryCode: 'CM' | 'GA' | 'CG' | 'CF' | 'TD' | 'GQ';
  countryNameEnglish: string;
  countryNameFrench: string;
  flagEmoji: string;
  currencyCode: 'XAF';
  currencyName: string;
  officialLanguages: string[];
  status: 'COMPLETE_AND_VERIFIED' | 'PROVISIONAL_FOUNDATION' | 'PLANNED';
  mathSkills: CurriculumSkill[];
  readingSkills: CurriculumSkill[];
  scienceSkills: CurriculumSkill[];
}

export const CemacCurriculumRegistry: Record<string, CountryCurriculumPack> = {
  CM: {
    countryCode: 'CM',
    countryNameEnglish: 'Cameroon',
    countryNameFrench: 'Cameroun',
    flagEmoji: '🇨🇲',
    currencyCode: 'XAF',
    currencyName: 'Franc CFA (BEAC)',
    officialLanguages: ['French', 'English'],
    status: 'COMPLETE_AND_VERIFIED',
    mathSkills: CameroonMathSkills,
    readingSkills: CameroonReadingSkills,
    scienceSkills: CameroonScienceSkills
  },
  GA: {
    countryCode: 'GA',
    countryNameEnglish: 'Gabon',
    countryNameFrench: 'Gabon',
    flagEmoji: '🇬🇦',
    currencyCode: 'XAF',
    currencyName: 'Franc CFA (BEAC)',
    officialLanguages: ['French'],
    status: 'PROVISIONAL_FOUNDATION',
    mathSkills: [],
    readingSkills: [],
    scienceSkills: []
  },
  CG: {
    countryCode: 'CG',
    countryNameEnglish: 'Republic of the Congo',
    countryNameFrench: 'République du Congo',
    flagEmoji: '🇨🇬',
    currencyCode: 'XAF',
    currencyName: 'Franc CFA (BEAC)',
    officialLanguages: ['French', 'Lingala', 'Kituba'],
    status: 'PLANNED',
    mathSkills: [],
    readingSkills: [],
    scienceSkills: []
  },
  CF: {
    countryCode: 'CF',
    countryNameEnglish: 'Central African Republic',
    countryNameFrench: 'République Centrafricaine',
    flagEmoji: '🇨🇫',
    currencyCode: 'XAF',
    currencyName: 'Franc CFA (BEAC)',
    officialLanguages: ['French', 'Sango'],
    status: 'PLANNED',
    mathSkills: [],
    readingSkills: [],
    scienceSkills: []
  },
  TD: {
    countryCode: 'TD',
    countryNameEnglish: 'Chad',
    countryNameFrench: 'Tchad',
    flagEmoji: '🇹🇩',
    currencyCode: 'XAF',
    currencyName: 'Franc CFA (BEAC)',
    officialLanguages: ['French', 'Arabic'],
    status: 'PLANNED',
    mathSkills: [],
    readingSkills: [],
    scienceSkills: []
  },
  GQ: {
    countryCode: 'GQ',
    countryNameEnglish: 'Equatorial Guinea',
    countryNameFrench: 'Guinée Équatoriale',
    flagEmoji: '🇬🇶',
    currencyCode: 'XAF',
    currencyName: 'Franc CFA (BEAC)',
    officialLanguages: ['Spanish', 'French', 'Portuguese'],
    status: 'PLANNED',
    mathSkills: [],
    readingSkills: [],
    scienceSkills: []
  }
};
