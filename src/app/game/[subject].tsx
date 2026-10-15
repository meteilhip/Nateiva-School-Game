import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, router, useFocusEffect } from 'expo-router';
import * as Speech from 'expo-speech';

// Import All 31 Real Engines from Registry
import {
  CountAndTap,
  NumberMatch,
  NumberOrder,
  NumberLine,
  TenFrame,
  PlaceValueBuilder,
  AdditionBuilder,
  SubtractionBuilder,
  MultiplicationArrays,
  DivisionSharing,
  FractionBuilder,
  MoneyShop,
  ClockGame,
  MeasurementLab,
  ShapePuzzle,
  AlphabetRecognition,
  PhonemeMatch,
  SyllableBuilder,
  PictureWordMatch,
  SpellingDictation,
  SentenceOrder,
  GrammarSort,
  ReadAloud,
  StoryComprehension,
  LivingClassification,
  HabitatExplorer,
  PlantGrowthSequence,
  BodyAndSensesLab,
  HygieneNutritionSort,
  CauseAndEffectLab,
  MemoryCardGame,
  TapToPair,
  SortingBaskets
} from '../../games/GameRegistry';

import { TutorOverlay } from '../../components/TutorOverlay';
import { getProfiles, getMastery, saveMastery, saveProfile, ChildProfile } from '../../storage/db';
import { calculateNewMastery, SkillMastery } from '../../adaptive/engine';

// Procedural question generator mapped directly to Cameroon Skills
const generateQuestionsForSkill = (skillId: string, difficulty: number = 1): any[] => {
  switch (skillId) {
    // --- MATH ---
    case 'math_count_1_5':
      return [
        { id: '1', type: 'COUNT_AND_TAP', q: 'Combien y a-t-il de mangues ?', icon: '🥭', ans: '3', options: ['2', '3', '4', '5'], hint: 'Touche chaque mangue une par une.' },
        { id: '2', type: 'NUMBER_MATCH', q: 'Touche le nombre 4', ans: '4', displayNumber: '4', options: ['2', '3', '4', '5'], hint: 'Le 4 ressemble à une chaise renversée.' },
        { id: '3', type: 'TAP_TO_PAIR', q: 'Associe chaque chiffre à sa quantité :', ans: 'COMPLETED' }
      ];

    case 'math_count_1_10':
      return [
        { id: '1', type: 'COUNT_AND_TAP', q: 'Combien y a-t-il d\'ananas ?', icon: '🍍', ans: difficulty === 1 ? '6' : '9', options: ['6', '7', '8', '9'], hint: 'Compte doucement avec le doigt.' },
        { id: '2', type: 'TEN_FRAME', q: 'Combien de jetons rouges dans la grille ?', displayCount: difficulty === 1 ? 7 : 8, ans: difficulty === 1 ? '7' : '8', options: ['6', '7', '8', '9'], hint: 'Une ligne complète fait 5 jetons.' },
        { id: '3', type: 'NUMBER_ORDER', q: 'Range les nombres en ordre croissant :', options: ['2', '5', '7', '9'], ans: '2, 5, 7, 9', hint: 'Commence par le plus petit.' }
      ];

    case 'math_shapes_basic':
      return [
        { id: '1', type: 'SHAPE_PUZZLE', q: 'Touche le TRIANGLE (3 côtés) :', shape: 'triangle', ans: 'Triangle', options: ['Triangle', 'Cercle', 'Carré', 'Rectangle'], hint: 'Il a 3 pointes comme une case traditionnelle.' },
        { id: '2', type: 'SHAPE_PUZZLE', q: 'Touche le CERCLE (Rond comme un ballon) :', shape: 'circle', ans: 'Cercle', options: ['Cercle', 'Carré', 'Triangle', 'Rectangle'], hint: 'Il roule parfaitement sans coins.' }
      ];

    case 'math_number_order_20':
      return [
        { id: '1', type: 'NUMBER_LINE', q: 'Fais sauter la grenouille jusqu\'à 8 !', min: 0, max: 10, target: 8, ans: '8', hint: 'Avance pas à pas vers la droite.' },
        { id: '2', type: 'NUMBER_ORDER', q: 'Range ces nombres du plus petit au plus grand :', options: ['11', '14', '17', '20'], ans: '11, 14, 17, 20', hint: 'Regarde le chiffre des unités.' }
      ];

    case 'math_add_10':
      return [
        { id: '1', type: 'ADDITION_BUILDER', q: 'Résous l\'addition :', equation: difficulty === 1 ? '3 + 2 = ?' : '5 + 4 = ?', ans: difficulty === 1 ? '5' : '9', options: difficulty === 1 ? ['4', '5', '6', '7'] : ['7', '8', '9', '10'], hint: 'Mets le premier nombre dans ta tête et ajoute le deuxième.' },
        { id: '2', type: 'ADDITION_BUILDER', q: 'Résous l\'addition :', equation: '4 + 4 = ?', ans: '8', options: ['6', '7', '8', '9'], hint: 'C\'est un double !' }
      ];

    case 'math_sub_10':
      return [
        { id: '1', type: 'SUBTRACTION_BUILDER', q: 'Soustraction : Combien reste-t-il de bananes ?', equation: '6 - 2 = ?', ans: '4', options: ['2', '3', '4', '5'], hint: 'Retire 2 bananes barrées.' },
        { id: '2', type: 'SUBTRACTION_BUILDER', q: 'Résous la soustraction :', equation: '8 - 3 = ?', ans: '5', options: ['4', '5', '6', '7'], hint: 'Compte ce qu\'il reste.' }
      ];

    case 'math_place_value_100':
      return [
        { id: '1', type: 'PLACE_VALUE_BUILDER', q: 'Fabrique le nombre 34 avec 3 dizaines et 4 unités :', target: 34, ans: '34', hint: 'Chaque barre bleue vaut 10.' },
        { id: '2', type: 'PLACE_VALUE_BUILDER', q: 'Fabrique le nombre 52 avec 5 dizaines et 2 unités :', target: 52, ans: '52', hint: 'Ajoute 5 dizaines puis 2 unités.' }
      ];

    case 'math_cfa_money':
      return [
        { id: '1', type: 'MONEY_SHOP', item: 'Beignets chauds', itemIcon: '🥯', price: 250, ans: '250', hint: 'Utilise deux pièces de 100F et une pièce de 50F.' },
        { id: '2', type: 'MONEY_SHOP', item: 'Poisson braisé de Douala', itemIcon: '🐟', price: 1000, ans: '1000', hint: 'Le billet vert vaut 1000 Francs CFA.' }
      ];

    case 'math_mult_arrays':
      return [
        { id: '1', type: 'MULTIPLICATION_ARRAYS', q: 'Combien de mangues au total ?', rows: 3, cols: 4, ans: '12', options: ['10', '12', '14', '16'], hint: 'Compte 3 lignes de 4 : 4 + 4 + 4.' }
      ];

    case 'math_division_sharing':
      return [
        { id: '1', type: 'DIVISION_SHARING', q: 'Partage 6 poissons équitablement entre 2 enfants :', total: 6, plates: 2, ans: '3', hint: 'Chaque assiette doit avoir exactement le même nombre.' }
      ];

    case 'math_clock_time':
      return [
        { id: '1', type: 'CLOCK_GAME', q: 'Quelle heure est-il sur l\'horloge ?', hour: 4, minute: 0, ans: '4h00', options: ['3h00', '4h00', '5h00', '12h20'], hint: 'La petite aiguille bleue indique l\'heure.' }
      ];

    case 'math_fractions_basic':
      return [
        { id: '1', type: 'FRACTION_BUILDER', q: 'Quelle fraction représente une demi-part ?', slices: 2, ans: '1/2', options: ['1/2', '1/3', '1/4', '2/3'], hint: 'Le gâteau est coupé en deux moitiés.' }
      ];

    case 'math_measurement_lab':
      return [
        { id: '1', type: 'MEASUREMENT_LAB', q: 'Combien mesure ce crayon sur la règle ?', lengthCm: 7, ans: '7 cm', options: ['5 cm', '6 cm', '7 cm', '8 cm'], hint: 'Regarde le bout de la mine sur la graduation.' }
      ];

    // --- READING & LANGUAGE ---
    case 'fr_alphabet_letters':
      return [
        { id: '1', type: 'ALPHABET_RECOGNITION', targetLetter: 'A', q: 'Touche la lettre "A" comme Ananas :', ans: 'A', options: ['A', 'B', 'C', 'D'], hint: 'Elle a deux jambes et une barre au milieu.' },
        { id: '2', type: 'ALPHABET_RECOGNITION', targetLetter: 'M', q: 'Touche la lettre "M" comme Maman :', ans: 'M', options: ['N', 'M', 'W', 'P'], hint: 'Elle a deux bosses comme deux montagnes.' }
      ];

    case 'fr_read_vowels':
      return [
        { id: '1', type: 'PHONEME_MATCH', q: 'Quel mot commence ou contient le son "O" ?', sound: 'O', ans: 'Moto', options: ['Moto', 'Lit', 'Sac', 'Mur'], hint: 'Écoute le son rond : Ooooo.' },
        { id: '2', type: 'READ_ALOUD', q: 'Lis cette lettre à voix haute dans le micro :', ans: 'A', options: [], hint: 'Ouvre bien grand la bouche : Aaaa.' }
      ];

    case 'fr_syllable_blends':
      return [
        { id: '1', type: 'SYLLABLE_BUILDER', q: 'Assemble les syllabes pour écrire MAMAN :', targetWord: 'MAMAN', syllables: ['MA', 'MAN'], options: ['MA', 'MAN', 'PA', 'TO'], ans: 'MAMAN', hint: 'Commence par MA, puis MAN.' },
        { id: '2', type: 'PICTURE_WORD_MATCH', q: 'Quelle est cette image camerounaise ?', imageEmoji: '🥭', ans: 'Mangue', options: ['Mangue', 'Pirogue', 'Baobab', 'Lion'], hint: 'C\'est un fruit sucré et juteux.' }
      ];

    case 'fr_spelling_cameroon':
      return [
        { id: '1', type: 'SPELLING_DICTATION', targetWord: 'LION', letterPool: ['L', 'I', 'O', 'N', 'A', 'S'], ans: 'LION', hint: 'L - I - O - N.' }
      ];

    case 'fr_sentence_order':
      return [
        { id: '1', type: 'SENTENCE_ORDER', q: 'Remets les mots dans l\'ordre :', words: ['Amina', 'mange', 'une', 'mangue.'], ans: 'Amina mange une mangue.', hint: 'Qui fait l\'action ? Amina !' },
        { id: '2', type: 'GRAMMAR_SORT', word: 'Courir', ans: 'VERBE', hint: 'Est-ce une personne ou une action ?' }
      ];

    case 'fr_story_amina':
      return [
        {
          id: '1',
          type: 'STORY_COMPREHENSION',
          story: {
            title: 'Amina au Marché de Mokolo',
            paragraphs: [
              'Ce matin à Yaoundé, Amina accompagne sa mère au marché de Mokolo.',
              'Elles achètent cinq belles mangues sucrées et du poisson du Wouri.',
              'Amina aide à porter le panier fièrement jusqu\'à la maison.'
            ]
          },
          q: 'Dans quelle ville du Cameroun se passe cette histoire ?',
          ans: 'Yaoundé',
          options: ['Yaoundé', 'Douala', 'Garoua', 'Bafoussam'],
          hint: 'Relis la toute première ligne de l\'histoire !'
        }
      ];

    case 'en_cvc_words':
      return [
        { id: '1', type: 'PICTURE_WORD_MATCH', q: 'What word matches this picture?', imageEmoji: '🐱', ans: 'CAT', options: ['CAT', 'DOG', 'PEN', 'SUN'], hint: 'It says Meow!' },
        { id: '2', type: 'READ_ALOUD', q: 'Read this English word aloud:', ans: 'SUN', options: [], hint: 'S - U - N.' }
      ];

    case 'en_story_limbe':
      return [
        {
          id: '1',
          type: 'STORY_COMPREHENSION',
          story: {
            title: 'Tata at Limbe Beach',
            paragraphs: [
              'Tata traveled to Limbe with his family on a sunny Saturday.',
              'He walked on the famous black volcanic sand and watched the fishermen boats.',
              'In the evening, they enjoyed fresh roasted fish by the sea.'
            ]
          },
          q: 'What color is the sand on Limbe beach?',
          ans: 'Black',
          options: ['Black', 'White', 'Yellow', 'Red'],
          hint: 'Limbe has black volcanic sand from Mount Cameroon!'
        }
      ];

    // --- SCIENCE & NATURE ---
    case 'sci_living_nonliving':
      return [
        { id: '1', type: 'LIVING_CLASSIFICATION', item: 'Éléphant du Waza', itemEmoji: '🐘', ans: 'VIVANT', hint: 'L\'éléphant boit de l\'eau, respire et grandit.' },
        { id: '2', type: 'LIVING_CLASSIFICATION', item: 'Voiture / Moto', itemEmoji: '🚗', ans: 'NON_VIVANT', hint: 'Une voiture ne naît pas et ne grandit pas toute seule.' }
      ];

    case 'sci_body_senses':
      return [
        { id: '1', type: 'BODY_SENSES_LAB', stimulus: 'La musique du balafon', stimulusIcon: '🎵', ans: 'OREILLES', hint: 'On écoute les sons avec...' },
        { id: '2', type: 'BODY_SENSES_LAB', stimulus: 'Le parfum doux de la papaye', stimulusIcon: '👃', ans: 'NEZ', hint: 'On respire et sent les odeurs avec...' }
      ];

    case 'sci_animal_habitat':
      return [
        { id: '1', type: 'HABITAT_EXPLORER', animal: 'Gorille du Dja', animalEmoji: '🦍', ans: 'FORET', hint: 'Le gorille vit dans les grands arbres de la forêt équatoriale.' },
        { id: '2', type: 'HABITAT_EXPLORER', animal: 'Girafe du Nord', animalEmoji: '🦒', ans: 'SAVANE', hint: 'La girafe aime les plaines herbeuses de la savane de Waza.' }
      ];

    case 'sci_plant_growth':
      return [
        { id: '1', type: 'PLANT_GROWTH_SEQUENCE', q: 'Mets dans l\'ordre le cycle du maïs :', ans: '1-2-3-4', hint: 'Tout commence par la graine mise en terre.' }
      ];

    case 'sci_hygiene_health':
      return [
        { id: '1', type: 'HYGIENE_NUTRITION_SORT', habit: 'Dormir sous une moustiquaire imprégnée', habitIcon: '🛏️', ans: 'BON', hint: 'La moustiquaire protège des piqûres d\'anophèles et du paludisme.' },
        { id: '2', type: 'HYGIENE_NUTRITION_SORT', habit: 'Manger des fruits sans les laver à l\'eau propre', habitIcon: '🍇', ans: 'MAUVAIS', hint: 'Il faut toujours laver les aliments pour éviter les microbes.' }
      ];

    // --- MEMORY & MATCHING ---
    case 'mem_cards':
      return [
        { id: '1', type: 'MEMORY_CARD_GAME', ans: 'COMPLETED' }
      ];

    default:
      return [
        { id: 'def_1', type: 'NUMBER_MATCH', q: 'Choisis le bon nombre :', ans: '5', displayNumber: '5', options: ['3', '4', '5', '6'], hint: 'Compte jusqu\'à 5.' }
      ];
  }
};

export default function GameActivityScreen() {
  const { subject, skillId } = useLocalSearchParams();
  const [questions, setQuestions] = useState<any[]>([]);
  const [qIndex, setQIndex] = useState(0);
  const [lives, setLives] = useState(3);
  
  const [feedback, setFeedback] = useState<string | null>(null);
  const [feedbackColor, setFeedbackColor] = useState<string>('#10B981');
  const [errorsOnCurrent, setErrorsOnCurrent] = useState(0);
  const [showTutor, setShowTutor] = useState(false);
  
  const [isFinished, setIsFinished] = useState(false);
  const [coinsEarned, setCoinsEarned] = useState(0);
  const [difficultyLevel, setDifficultyLevel] = useState(1);
  const [responses, setResponses] = useState<{ isCorrect: boolean, attempts: number }[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadInitialData();
    }, [skillId])
  );

  const loadInitialData = async () => {
    try {
      const profiles = await getProfiles();
      const profile = profiles.length > 0 ? profiles[0] : null;
      let diff = 1;
      
      if (profile && skillId) {
        const allMastery = await getMastery(profile.id);
        const skillMastery = allMastery[skillId as string];
        if (skillMastery && skillMastery.masteryValue > 0.6) {
          diff = 2;
        }
      }
      
      setDifficultyLevel(diff);
      if (skillId) {
        setQuestions(generateQuestionsForSkill(skillId as string, diff));
      }
    } catch (e) {
      setQuestions(generateQuestionsForSkill(skillId as string || 'math_count_1_10', 1));
    }
  };

  const speak = (text: string) => {
    Speech.stop();
    Speech.speak(text, { language: 'fr-FR', rate: 0.9 });
  };

  const completeLevel = async () => {
    const perfectCount = responses.filter(r => r.isCorrect && r.attempts === 0).length; 
    const earned = Math.max(10, perfectCount * 15 * difficultyLevel);
    setCoinsEarned(earned);
    setIsFinished(true);

    try {
      const profiles = await getProfiles();
      const profile = profiles.length > 0 ? profiles[0] : null;
      if (profile) {
        profile.coins = (profile.coins || 0) + earned;
        profile.streak = (profile.streak || 0) + 1;
        await saveProfile(profile);

        if (skillId) {
          const allMastery = await getMastery(profile.id);
          let currentSkillMastery: SkillMastery = allMastery[skillId as string] || {
            skillId: skillId as string,
            masteryValue: 0.2,
            state: 'LEARNING',
            consecutiveSuccesses: 0,
            consecutiveFailures: 0,
            lastPracticed: Date.now(),
            nextReviewDue: Date.now() + 86400000
          };

          for (const res of responses) {
            currentSkillMastery = calculateNewMastery(currentSkillMastery, {
              learnerId: profile.id,
              skillId: skillId as string,
              activityId: 'activity_' + Date.now(),
              timestamp: Date.now(),
              correct: res.isCorrect,
              difficulty: difficultyLevel * 0.5,
              responseTimeMs: 3000,
              hintsUsed: res.attempts,
              explanationUsed: showTutor,
              retryCount: res.attempts,
              inputMode: 'touch'
            });
          }
          
          allMastery[skillId as string] = currentSkillMastery;
          await saveMastery(profile.id, allMastery);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleAnswer = (selected: string) => {
    if (feedback || showTutor) return;
    const q = questions[qIndex];
    
    // Evaluate answer
    const isCorrect = selected === q.ans || q.ans === 'COMPLETED';

    if (isCorrect) {
      setFeedbackColor('#10B981');
      setFeedback('Super ! Excellente réponse ! 🎉');
      speak('Super ! C\'est la bonne réponse !');
      
      const isPerfect = errorsOnCurrent === 0;
      setResponses(prev => [...prev, { isCorrect: isPerfect, attempts: errorsOnCurrent }]);

      setTimeout(() => {
        setFeedback(null);
        setErrorsOnCurrent(0); 
        
        if (qIndex + 1 < questions.length) {
          setQIndex(qIndex + 1);
          if (questions[qIndex + 1].q) {
            speak(questions[qIndex + 1].q);
          }
        } else {
          completeLevel();
        }
      }, 1400);
    } else {
      const newErrors = errorsOnCurrent + 1;
      setErrorsOnCurrent(newErrors);
      setLives(prev => Math.max(0, prev - 1));
      
      setResponses(prev => [...prev, { isCorrect: false, attempts: newErrors }]);
      
      if (newErrors === 1) {
        setFeedbackColor('#D97706');
        setFeedback(`💡 Indice : ${q.hint || 'Prends ton temps et recompte.'}`);
        speak(`Presque ! ${q.hint || 'Prends ton temps.'}`);
        setTimeout(() => setFeedback(null), 3000);
      } else if (newErrors === 2) {
        setFeedbackColor('#EA580C');
        setFeedback('Regarde bien l\'indice fort ci-dessous, ou touche le Hibou Tuteur !');
        speak('Essaie encore une fois ! Tu peux y arriver.');
        setTimeout(() => setFeedback(null), 3000);
      } else {
        // Error 3: Trigger step-by-step AI Tutor
        setFeedback(null);
        setShowTutor(true);
      }
    }
  };

  const handlePracticeSimilar = () => {
    setShowTutor(false);
    setErrorsOnCurrent(0);
    // Regenerate parallel question
    const refreshed = generateQuestionsForSkill(skillId as string, difficultyLevel);
    setQuestions(refreshed);
    setQIndex(0);
  };

  if (questions.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.loadingText}>Chargement du jeu éducatif...</Text>
      </View>
    );
  }

  if (isFinished) {
    return (
      <View style={styles.container}>
        <View style={styles.completionCard}>
          <Text style={styles.celebrationTrophy}>🏆</Text>
          <Text style={styles.celebrationTitle}>Niveau Terminé avec Succès !</Text>
          <Text style={styles.celebrationStars}>⭐⭐⭐</Text>
          
          <View style={styles.rewardBox}>
            <Text style={styles.coinsAmount}>+{coinsEarned} 🪙</Text>
            <Text style={styles.rewardSubtitle}>Pièces d'or ajoutées à ta tirelire !</Text>
          </View>

          <Text style={styles.statSummary}>
            Difficulté maîtrisée : Niveau {difficultyLevel} | Vie restante : {lives} ❤️
          </Text>

          <TouchableOpacity 
            style={styles.continueBtn} 
            onPress={() => router.replace(`/levels/${subject || 'math'}`)}
          >
            <Text style={styles.continueText}>Continuer l'Aventure ➡️</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const currentQ = questions[qIndex];

  // Dynamic Router for all 31 engines
  const renderEngine = () => {
    switch (currentQ.type) {
      // Math
      case 'COUNT_AND_TAP': return <CountAndTap question={currentQ} onAnswer={handleAnswer} />;
      case 'NUMBER_MATCH': return <NumberMatch question={currentQ} onAnswer={handleAnswer} />;
      case 'NUMBER_ORDER': return <NumberOrder question={currentQ} onAnswer={handleAnswer} />;
      case 'NUMBER_LINE': return <NumberLine question={currentQ} onAnswer={handleAnswer} />;
      case 'TEN_FRAME': return <TenFrame question={currentQ} onAnswer={handleAnswer} />;
      case 'PLACE_VALUE_BUILDER': return <PlaceValueBuilder question={currentQ} onAnswer={handleAnswer} />;
      case 'ADDITION_BUILDER': return <AdditionBuilder question={currentQ} onAnswer={handleAnswer} />;
      case 'SUBTRACTION_BUILDER': return <SubtractionBuilder question={currentQ} onAnswer={handleAnswer} />;
      case 'MULTIPLICATION_ARRAYS': return <MultiplicationArrays question={currentQ} onAnswer={handleAnswer} />;
      case 'DIVISION_SHARING': return <DivisionSharing question={currentQ} onAnswer={handleAnswer} />;
      case 'FRACTION_BUILDER': return <FractionBuilder question={currentQ} onAnswer={handleAnswer} />;
      case 'MONEY_SHOP': return <MoneyShop question={currentQ} onAnswer={handleAnswer} />;
      case 'CLOCK_GAME': return <ClockGame question={currentQ} onAnswer={handleAnswer} />;
      case 'MEASUREMENT_LAB': return <MeasurementLab question={currentQ} onAnswer={handleAnswer} />;
      case 'SHAPE_PUZZLE': return <ShapePuzzle question={currentQ} onAnswer={handleAnswer} />;
      
      // Language
      case 'ALPHABET_RECOGNITION': return <AlphabetRecognition question={currentQ} onAnswer={handleAnswer} />;
      case 'PHONEME_MATCH': return <PhonemeMatch question={currentQ} onAnswer={handleAnswer} />;
      case 'SYLLABLE_BUILDER': return <SyllableBuilder question={currentQ} onAnswer={handleAnswer} />;
      case 'PICTURE_WORD_MATCH': return <PictureWordMatch question={currentQ} onAnswer={handleAnswer} />;
      case 'SPELLING_DICTATION': return <SpellingDictation question={currentQ} onAnswer={handleAnswer} />;
      case 'SENTENCE_ORDER': return <SentenceOrder question={currentQ} onAnswer={handleAnswer} />;
      case 'GRAMMAR_SORT': return <GrammarSort question={currentQ} onAnswer={handleAnswer} />;
      case 'READ_ALOUD': return <ReadAloud question={currentQ} onAnswer={handleAnswer} />;
      case 'STORY_COMPREHENSION': return <StoryComprehension question={currentQ} onAnswer={handleAnswer} />;

      // Science
      case 'LIVING_CLASSIFICATION': return <LivingClassification question={currentQ} onAnswer={handleAnswer} />;
      case 'HABITAT_EXPLORER': return <HabitatExplorer question={currentQ} onAnswer={handleAnswer} />;
      case 'PLANT_GROWTH_SEQUENCE': return <PlantGrowthSequence question={currentQ} onAnswer={handleAnswer} />;
      case 'BODY_SENSES_LAB': return <BodyAndSensesLab question={currentQ} onAnswer={handleAnswer} />;
      case 'HYGIENE_NUTRITION_SORT': return <HygieneNutritionSort question={currentQ} onAnswer={handleAnswer} />;
      case 'CAUSE_EFFECT_LAB': return <CauseAndEffectLab question={currentQ} onAnswer={handleAnswer} />;

      // Memory & Matching
      case 'MEMORY_CARD_GAME': return <MemoryCardGame question={currentQ} onAnswer={handleAnswer} />;
      case 'TAP_TO_PAIR': return <TapToPair question={currentQ} onAnswer={handleAnswer} />;
      case 'SORTING_BASKETS': return <SortingBaskets question={currentQ} onAnswer={handleAnswer} />;

      default:
        return <NumberMatch question={currentQ} onAnswer={handleAnswer} />;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>⬅️ Carte</Text>
        </TouchableOpacity>

        <View style={styles.progressPill}>
          <Text style={styles.progressText}>Question {qIndex + 1} / {questions.length}</Text>
        </View>

        <View style={styles.livesPill}>
          <Text style={styles.livesText}>{"❤️".repeat(Math.max(0, lives))}</Text>
        </View>

        <TouchableOpacity style={styles.tutorHelpBtn} onPress={() => setShowTutor(true)}>
          <Text style={styles.tutorHelpText}>🦉 Tuteur</Text>
        </TouchableOpacity>
      </View>

      {/* Main Game Card */}
      <View style={styles.gameWrapperCard}>
        {renderEngine()}

        {feedback && (
          <View style={[styles.feedbackBanner, { backgroundColor: feedbackColor }]}>
            <Text style={styles.feedbackBannerText}>{feedback}</Text>
          </View>
        )}
      </View>

      {/* Animated Step-by-Step AI Tutor Overlay */}
      {showTutor && (
        <TutorOverlay 
          question={currentQ} 
          onClose={() => {
            setShowTutor(false);
            setErrorsOnCurrent(0); 
          }} 
          onPracticeSimilar={handlePracticeSimilar}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F4F8', padding: 16, justifyContent: 'center' },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { fontSize: 18, color: '#64748B', fontWeight: 'bold' },

  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, marginTop: 10 },
  backBtn: { paddingVertical: 8, paddingHorizontal: 14, backgroundColor: '#E2E8F0', borderRadius: 12 },
  backText: { fontWeight: 'bold', color: '#475569', fontSize: 14 },
  progressPill: { backgroundColor: '#E0E7FF', paddingVertical: 6, paddingHorizontal: 14, borderRadius: 20 },
  progressText: { fontSize: 14, fontWeight: 'bold', color: '#4338CA' },
  livesPill: { backgroundColor: '#FEE2E2', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20 },
  livesText: { fontSize: 14 },
  tutorHelpBtn: { backgroundColor: '#FEF3C7', borderWidth: 2, borderColor: '#F59E0B', paddingVertical: 6, paddingHorizontal: 14, borderRadius: 20 },
  tutorHelpText: { fontSize: 14, fontWeight: 'bold', color: '#B45309' },

  gameWrapperCard: { flex: 1, backgroundColor: 'white', borderRadius: 24, padding: 16, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 15, elevation: 6 },
  
  feedbackBanner: { position: 'absolute', bottom: 15, paddingVertical: 12, paddingHorizontal: 24, borderRadius: 16, elevation: 6, maxWidth: '90%' },
  feedbackBannerText: { color: 'white', fontWeight: 'bold', fontSize: 16, textAlign: 'center' },

  // Completion Screen
  completionCard: { backgroundColor: 'white', padding: 30, borderRadius: 28, alignItems: 'center', maxWidth: 440, width: '100%', alignSelf: 'center', elevation: 8 },
  celebrationTrophy: { fontSize: 65, marginBottom: 8 },
  celebrationTitle: { fontSize: 24, fontWeight: 'bold', color: '#1E293B', textAlign: 'center', marginBottom: 8 },
  celebrationStars: { fontSize: 32, marginBottom: 15 },
  rewardBox: { backgroundColor: '#FFFBEB', borderWidth: 2, borderColor: '#FDE68A', borderRadius: 20, padding: 16, alignItems: 'center', width: '100%', marginBottom: 15 },
  coinsAmount: { fontSize: 36, fontWeight: 'bold', color: '#D97706', marginBottom: 4 },
  rewardSubtitle: { fontSize: 14, color: '#78350F', fontWeight: 'bold' },
  statSummary: { fontSize: 14, color: '#64748B', textAlign: 'center', marginBottom: 25 },
  continueBtn: { backgroundColor: '#2563EB', paddingVertical: 16, paddingHorizontal: 32, borderRadius: 18, width: '100%', alignItems: 'center', elevation: 4 },
  continueText: { color: 'white', fontSize: 18, fontWeight: 'bold' }
});
