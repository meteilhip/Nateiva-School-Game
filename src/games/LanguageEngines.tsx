import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import * as Speech from 'expo-speech';
import { SpeechInputAdapter } from '../speech/SpeechInputAdapter';

// 1. ALPHABET RECOGNITION (Letter cards with audio)
export function AlphabetRecognition({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const letter = question.targetLetter || 'A';
  
  const speakLetter = () => {
    Speech.stop();
    Speech.speak(letter, { language: 'fr-FR', rate: 0.8 });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{question.q || `Touche la lettre "${letter}"`}</Text>
      
      <TouchableOpacity style={styles.bigLetterCard} onPress={speakLetter}>
        <Text style={styles.bigLetter}>{letter}</Text>
        <Text style={styles.listenHint}>🔊 Toucher pour écouter</Text>
      </TouchableOpacity>

      <View style={styles.options}>
        {question.options.map((opt: string) => (
          <TouchableOpacity key={opt} style={styles.letterBtn} onPress={() => onAnswer(opt)}>
            <Text style={styles.letterBtnText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// 2. PHONEME MATCH
export function PhonemeMatch({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const emojiMap: Record<string, string> = {
    'Moto': '🏍️',
    'Lit': '🛏️',
    'Sac': '🎒',
    'Mur': '🧱',
    'Chat': '🐈',
    'Chien': '🐕',
    'Papa': '👨',
    'Maman': '👩',
    'Bateau': '⛵',
    'Mangue': '🥭'
  };

  const speakSound = () => {
    Speech.stop();
    Speech.speak(question.sound || 'O', { language: 'fr-FR', rate: 0.8 });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{question.q}</Text>
      
      <TouchableOpacity style={styles.soundButton} onPress={speakSound}>
        <Text style={styles.soundIcon}>🔊</Text>
        <Text style={styles.soundText}>Écouter le son</Text>
      </TouchableOpacity>

      <View style={styles.options}>
        {question.options.map((opt: string) => (
          <TouchableOpacity key={opt} style={styles.bubbleBtn} onPress={() => onAnswer(opt)}>
            <Text style={styles.bubbleEmoji}>{emojiMap[opt] || '📝'}</Text>
            <Text style={styles.bubbleText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// 3. SYLLABLE BUILDER (Combine BA + NA + NE = BANANE)
export function SyllableBuilder({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const syllables: string[] = question.syllables || ['MA', 'MAN'];
  const [assembled, setAssembled] = useState<string[]>([]);

  const handleAddSyllable = (syl: string) => {
    const next = [...assembled, syl];
    setAssembled(next);
    if (next.length === syllables.length) {
      onAnswer(next.join(''));
    }
  };

  const handleReset = () => setAssembled([]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{question.q || 'Assemble les syllabes pour former le mot :'}</Text>
      <Text style={styles.subtext}>Mot cible : {question.targetWord || 'MAMAN'}</Text>

      {/* Assembly slots */}
      <View style={styles.assembledRow}>
        {assembled.map((syl, i) => (
          <View key={i} style={styles.syllableBadge}>
            <Text style={styles.syllableBadgeText}>{syl}</Text>
          </View>
        ))}
        {assembled.length < syllables.length && (
          <View style={styles.syllableSlot}>
            <Text style={styles.slotPlaceholder}>_ _</Text>
          </View>
        )}
      </View>

      {/* Available Syllable options */}
      <View style={styles.options}>
        {question.options.map((syl: string, idx: number) => (
          <TouchableOpacity key={idx} style={styles.syllableBtn} onPress={() => handleAddSyllable(syl)}>
            <Text style={styles.syllableBtnText}>{syl}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {assembled.length > 0 && (
        <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
          <Text style={styles.resetBtnText}>🔄 Recommencer</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// 4. PICTURE WORD MATCH
export function PictureWordMatch({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{question.q || 'Quel mot correspond à cette image ?'}</Text>
      
      <View style={styles.pictureCard}>
        <Text style={styles.pictureEmoji}>{question.imageEmoji || '🥭'}</Text>
      </View>

      <View style={styles.options}>
        {question.options.map((opt: string) => (
          <TouchableOpacity key={opt} style={styles.wordMatchBtn} onPress={() => onAnswer(opt)}>
            <Text style={styles.wordMatchText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// 5. SPELLING DICTATION (Tap letter tiles in order)
export function SpellingDictation({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const targetWord = question.targetWord || 'LION';
  const [typedLetters, setTypedLetters] = useState<string[]>([]);
  const letterPool: string[] = question.letterPool || ['L', 'I', 'O', 'N', 'A', 'S'];

  const speakWord = () => {
    Speech.stop();
    Speech.speak(targetWord, { language: 'fr-FR', rate: 0.8 });
  };

  const handleAddLetter = (letter: string) => {
    const next = [...typedLetters, letter];
    setTypedLetters(next);
    if (next.length === targetWord.length) {
      onAnswer(next.join(''));
    }
  };

  const handleClear = () => setTypedLetters([]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Écoute et épelle le mot :</Text>
      
      <TouchableOpacity style={styles.soundButton} onPress={speakWord}>
        <Text style={styles.soundIcon}>🔊</Text>
        <Text style={styles.soundText}>Écouter le mot</Text>
      </TouchableOpacity>

      {/* Target Word Slots */}
      <View style={styles.spellingSlots}>
        {Array.from({ length: targetWord.length }).map((_, i) => (
          <View key={i} style={styles.letterSlot}>
            <Text style={styles.slotLetterText}>{typedLetters[i] || '_'}</Text>
          </View>
        ))}
      </View>

      {/* Letter keyboard pool */}
      <View style={styles.lettersGrid}>
        {letterPool.map((letter, idx) => (
          <TouchableOpacity key={idx} style={styles.tileKey} onPress={() => handleAddLetter(letter)}>
            <Text style={styles.tileKeyText}>{letter}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {typedLetters.length > 0 && (
        <TouchableOpacity style={styles.resetBtn} onPress={handleClear}>
          <Text style={styles.resetBtnText}>Effacer</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// 6. SENTENCE ORDER (Reconstruct sentence)
export function SentenceOrder({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const words: string[] = question.words || ['Amina', 'mange', 'une', 'mangue.'];
  const [orderedWords, setOrderedWords] = useState<string[]>([]);

  const handleAddWord = (word: string) => {
    if (!orderedWords.includes(word)) {
      const next = [...orderedWords, word];
      setOrderedWords(next);
      if (next.length === words.length) {
        onAnswer(next.join(' '));
      }
    }
  };

  const handleReset = () => setOrderedWords([]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{question.q || 'Remets les mots dans l\'ordre pour former la phrase :'}</Text>
      
      {/* Constructed Sentence Display */}
      <View style={styles.sentenceBox}>
        <Text style={styles.sentenceText}>
          {orderedWords.length > 0 ? orderedWords.join(' ') : 'Touche les mots ci-dessous...'}
        </Text>
      </View>

      {/* Available words */}
      <View style={styles.options}>
        {words.map((word) => {
          const used = orderedWords.includes(word);
          return (
            <TouchableOpacity 
              key={word} 
              disabled={used} 
              style={[styles.wordChip, used && styles.wordChipUsed]} 
              onPress={() => handleAddWord(word)}
            >
              <Text style={[styles.wordChipText, used && styles.wordChipTextUsed]}>{word}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {orderedWords.length > 0 && (
        <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
          <Text style={styles.resetBtnText}>🔄 Recommencer</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// 7. GRAMMAR SORT (Categorize words into Noms / Verbes)
export function GrammarSort({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const word = question.word || 'Courir';
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ce mot est-il un NOM ou un VERBE ?</Text>
      
      <View style={styles.grammarWordCard}>
        <Text style={styles.grammarWord}>{word}</Text>
      </View>

      <View style={styles.options}>
        <TouchableOpacity style={styles.basketBtnNom} onPress={() => onAnswer('NOM')}>
          <Text style={styles.basketIcon}>📦</Text>
          <Text style={styles.basketText}>NOM (Une chose / personne)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.basketBtnVerbe} onPress={() => onAnswer('VERBE')}>
          <Text style={styles.basketIcon}>🏃</Text>
          <Text style={styles.basketText}>VERBE (Une action)</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// 8. READ ALOUD (Speech-to-text with microphone or listen-and-repeat)
export function ReadAloud({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{question.q || 'Lis à voix haute dans le micro :'}</Text>
      <View style={styles.speechCard}>
        <SpeechInputAdapter 
          expectedText={question.ans} 
          onResult={(isCorrect, spokenText) => {
            onAnswer(isCorrect ? question.ans : spokenText);
          }} 
        />
      </View>
    </View>
  );
}

// 9. STORY COMPREHENSION (Illustrated Cameroon cultural narrative)
export function StoryComprehension({ question, onAnswer }: { question: any, onAnswer: (ans: string) => void }) {
  const story = question.story || {
    title: 'Amina au Marché de Mokolo',
    paragraphs: [
      'Ce matin à Yaoundé, Amina accompagne sa mère au grand marché de Mokolo.',
      'Elles achètent cinq belles mangues sucrées et du poisson frais du Wouri.',
      'Amina aide à porter le panier en rentrant à la maison avec le sourire.'
    ]
  };

  const readStoryAloud = () => {
    Speech.stop();
    Speech.speak(story.paragraphs.join(' '), { language: 'fr-FR', rate: 0.85 });
  };

  return (
    <ScrollView contentContainerStyle={styles.storyContainer}>
      <Text style={styles.storyTitle}>📖 {story.title}</Text>
      
      <TouchableOpacity style={styles.soundButton} onPress={readStoryAloud}>
        <Text style={styles.soundIcon}>🔊</Text>
        <Text style={styles.soundText}>Écouter l'histoire</Text>
      </TouchableOpacity>

      <View style={styles.storyCard}>
        {story.paragraphs.map((p: string, idx: number) => (
          <Text key={idx} style={styles.storyParagraph}>{p}</Text>
        ))}
      </View>

      <View style={styles.questionSection}>
        <Text style={styles.comprehensionQ}>Question : {question.q}</Text>
        <View style={styles.options}>
          {question.options.map((opt: string) => (
            <TouchableOpacity key={opt} style={styles.storyOptionBtn} onPress={() => onAnswer(opt)}>
              <Text style={styles.storyOptionText}>{opt}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 15, width: '100%' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15, textAlign: 'center', color: '#1E293B' },
  subtext: { fontSize: 16, color: '#64748B', marginBottom: 20, textAlign: 'center' },

  // Sound Audio Button
  soundButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FEF3C7', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20, borderWidth: 2, borderColor: '#F59E0B', marginBottom: 20 },
  soundIcon: { fontSize: 24, marginRight: 8 },
  soundText: { fontSize: 16, fontWeight: 'bold', color: '#78350F' },

  // Alphabet
  bigLetterCard: { width: 140, height: 140, borderRadius: 24, backgroundColor: '#EFF6FF', borderWidth: 4, borderColor: '#3B82F6', alignItems: 'center', justifyContent: 'center', marginBottom: 25 },
  bigLetter: { fontSize: 80, fontWeight: 'bold', color: '#1D4ED8' },
  listenHint: { fontSize: 11, color: '#60A5FA', marginTop: 4 },
  letterBtn: { width: 65, height: 65, borderRadius: 16, backgroundColor: '#DBEAFE', borderWidth: 2, borderColor: '#3B82F6', alignItems: 'center', justifyContent: 'center' },
  letterBtnText: { fontSize: 32, fontWeight: 'bold', color: '#1E3A8A' },

  // Phoneme Match
  bubbleBtn: { padding: 16, backgroundColor: '#FEF3C7', borderRadius: 25, borderWidth: 3, borderColor: '#F59E0B', minWidth: 130, alignItems: 'center', elevation: 4 },
  bubbleEmoji: { fontSize: 50, marginBottom: 6 },
  bubbleText: { fontSize: 22, fontWeight: 'bold', color: '#78350F' },

  // Syllables
  assembledRow: { flexDirection: 'row', gap: 10, marginBottom: 25 },
  syllableBadge: { backgroundColor: '#10B981', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 14 },
  syllableBadgeText: { color: 'white', fontSize: 26, fontWeight: 'bold' },
  syllableSlot: { width: 70, height: 55, borderWidth: 2, borderColor: '#94A3B8', borderStyle: 'dashed', borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  slotPlaceholder: { fontSize: 24, color: '#94A3B8' },
  syllableBtn: { backgroundColor: '#DBEAFE', borderWidth: 2, borderColor: '#3B82F6', paddingVertical: 12, paddingHorizontal: 22, borderRadius: 16 },
  syllableBtnText: { fontSize: 24, fontWeight: 'bold', color: '#1E3A8A' },

  // Picture Word Match
  pictureCard: { width: 150, height: 150, borderRadius: 24, backgroundColor: '#FFFBEB', borderWidth: 4, borderColor: '#FDE68A', alignItems: 'center', justifyContent: 'center', marginBottom: 25 },
  pictureEmoji: { fontSize: 80 },
  wordMatchBtn: { paddingVertical: 15, paddingHorizontal: 28, backgroundColor: '#F0FDF4', borderWidth: 3, borderColor: '#22C55E', borderRadius: 20, minWidth: 140, alignItems: 'center' },
  wordMatchText: { fontSize: 22, fontWeight: 'bold', color: '#15803D' },

  // Spelling Dictation
  spellingSlots: { flexDirection: 'row', gap: 10, marginBottom: 25 },
  letterSlot: { width: 55, height: 60, borderBottomWidth: 4, borderBottomColor: '#2563EB', alignItems: 'center', justifyContent: 'center' },
  slotLetterText: { fontSize: 36, fontWeight: 'bold', color: '#1E293B' },
  lettersGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, maxWidth: 360, justifyContent: 'center', marginBottom: 20 },
  tileKey: { width: 55, height: 55, backgroundColor: '#3B82F6', borderRadius: 14, alignItems: 'center', justifyContent: 'center', elevation: 4 },
  tileKeyText: { fontSize: 28, fontWeight: 'bold', color: 'white' },

  // Sentence Order
  sentenceBox: { minHeight: 60, padding: 15, backgroundColor: '#F8FAFC', borderWidth: 2, borderColor: '#CBD5E1', borderRadius: 16, width: '100%', maxWidth: 450, alignItems: 'center', justifyContent: 'center', marginBottom: 25 },
  sentenceText: { fontSize: 20, fontWeight: 'bold', color: '#1E293B', textAlign: 'center' },
  wordChip: { backgroundColor: '#EEF2FF', borderWidth: 2, borderColor: '#6366F1', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 18 },
  wordChipUsed: { opacity: 0.3 },
  wordChipText: { fontSize: 20, fontWeight: 'bold', color: '#4338CA' },
  wordChipTextUsed: { color: '#94A3B8' },

  // Grammar Sort
  grammarWordCard: { backgroundColor: '#F5F3FF', paddingVertical: 20, paddingHorizontal: 40, borderRadius: 20, borderWidth: 3, borderColor: '#8B5CF6', marginBottom: 25 },
  grammarWord: { fontSize: 36, fontWeight: 'bold', color: '#6D28D9' },
  basketBtnNom: { flex: 1, backgroundColor: '#EFF6FF', borderWidth: 3, borderColor: '#3B82F6', borderRadius: 20, padding: 20, alignItems: 'center', minWidth: 150 },
  basketBtnVerbe: { flex: 1, backgroundColor: '#FEF2F2', borderWidth: 3, borderColor: '#EF4444', borderRadius: 20, padding: 20, alignItems: 'center', minWidth: 150 },
  basketIcon: { fontSize: 40, marginBottom: 8 },
  basketText: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: '#1E293B' },

  // Read Aloud
  speechCard: { width: '100%', maxWidth: 450, backgroundColor: 'white', borderRadius: 20, padding: 20, elevation: 4 },

  // Story Comprehension
  storyContainer: { padding: 20, alignItems: 'center', width: '100%' },
  storyTitle: { fontSize: 26, fontWeight: 'bold', color: '#1E3A8A', marginBottom: 15 },
  storyCard: { backgroundColor: '#FFFBEB', padding: 20, borderRadius: 20, borderWidth: 2, borderColor: '#FDE68A', width: '100%', maxWidth: 500, marginBottom: 25 },
  storyParagraph: { fontSize: 18, color: '#78350F', lineHeight: 28, marginBottom: 12 },
  questionSection: { width: '100%', maxWidth: 500, alignItems: 'center' },
  comprehensionQ: { fontSize: 20, fontWeight: 'bold', color: '#1E293B', marginBottom: 20, textAlign: 'center' },
  storyOptionBtn: { padding: 16, backgroundColor: '#EFF6FF', borderRadius: 16, borderWidth: 2, borderColor: '#3B82F6', width: '100%', alignItems: 'center', marginBottom: 10 },
  storyOptionText: { fontSize: 18, fontWeight: 'bold', color: '#1E40AF' },

  // Common UI
  options: { flexDirection: 'row', flexWrap: 'wrap', gap: 15, justifyContent: 'center', width: '100%', maxWidth: 450 },
  resetBtn: { backgroundColor: '#E2E8F0', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 14, marginTop: 15 },
  resetBtnText: { color: '#475569', fontSize: 16, fontWeight: 'bold' }
});
