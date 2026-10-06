import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PlaceholderEngine = ({ name, question, onAnswer }: { name: string, question: any, onAnswer: (ans: string) => void }) => (
  <View style={styles.container}>
    <Text style={styles.title}>[ENGINE: {name}]</Text>
    <Text style={styles.subtitle}>En cours de développement / In Development</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#EF4444' },
  subtitle: { fontSize: 16, color: '#64748B', marginTop: 10 }
});

// Math Games
export const NumberOrder = (props: any) => <PlaceholderEngine name="NUMBER_ORDER" {...props} />;
export const NumberLine = (props: any) => <PlaceholderEngine name="NUMBER_LINE" {...props} />;
export { TenFrame } from './MathEngines';
export const PlaceValueBuilder = (props: any) => <PlaceholderEngine name="PLACE_VALUE_BUILDER" {...props} />;
export { AdditionBuilder } from './MathEngines';
export const SubtractionBuilder = (props: any) => <PlaceholderEngine name="SUBTRACTION_BUILDER" {...props} />;
export const MultiplicationArrays = (props: any) => <PlaceholderEngine name="MULTIPLICATION_ARRAYS" {...props} />;
export const DivisionSharing = (props: any) => <PlaceholderEngine name="DIVISION_SHARING" {...props} />;
export const FractionBuilder = (props: any) => <PlaceholderEngine name="FRACTION_BUILDER" {...props} />;
export const MoneyShop = (props: any) => <PlaceholderEngine name="MONEY_SHOP" {...props} />;
export const ClockGame = (props: any) => <PlaceholderEngine name="CLOCK_GAME" {...props} />;
export const MeasurementLab = (props: any) => <PlaceholderEngine name="MEASUREMENT_LAB" {...props} />;
export const ShapePuzzle = (props: any) => <PlaceholderEngine name="SHAPE_PUZZLE" {...props} />;

// Language Games
export const LetterHunt = (props: any) => <PlaceholderEngine name="LETTER_HUNT" {...props} />;
export const SoundHunt = (props: any) => <PlaceholderEngine name="SOUND_HUNT" {...props} />;
export const SyllableBuilder = (props: any) => <PlaceholderEngine name="SYLLABLE_BUILDER" {...props} />;
export const PictureWordMatch = (props: any) => <PlaceholderEngine name="PICTURE_WORD_MATCH" {...props} />;
export const SpellingDictation = (props: any) => <PlaceholderEngine name="SPELLING_DICTATION" {...props} />;
export const SentenceOrder = (props: any) => <PlaceholderEngine name="SENTENCE_ORDER" {...props} />;
export const GrammarSort = (props: any) => <PlaceholderEngine name="GRAMMAR_SORT" {...props} />;
export const ReadAloud = (props: any) => <PlaceholderEngine name="READ_ALOUD" {...props} />;
export const StoryComprehension = (props: any) => <PlaceholderEngine name="STORY_COMPREHENSION" {...props} />;

// Science Games
export const SequenceExperiment = (props: any) => <PlaceholderEngine name="SEQUENCE_EXPERIMENT" {...props} />;
export const CauseAndEffectLab = (props: any) => <PlaceholderEngine name="CAUSE_EFFECT_LAB" {...props} />;
export const InteractiveScienceScene = (props: any) => <PlaceholderEngine name="SCIENCE_SCENE" {...props} />;

// Cross-Subject
export const AdventureChallenge = (props: any) => <PlaceholderEngine name="ADVENTURE_CHALLENGE" {...props} />;
