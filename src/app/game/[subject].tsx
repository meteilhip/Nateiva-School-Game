import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, router, useFocusEffect } from 'expo-router';
import * as Speech from 'expo-speech';

// Import All 60 Game Components from Master Registry
import {
  // Early (01-15)
  ColorSplash, ShapeSafari, CountTheAnimals, BubbleNumbers, LetterTrain,
  SoundDetective, AnimalHomes, PatternCaterpillar, FruitBasket, PictureMemory,
  DancingLetters, StoryPuppetShow, SizeSorting, ShadowMatch, RainbowBridge,
  // Foundation (16-30)
  MathCarRacing, TreasureHunt, RobotFactory, WordCastle, SyllableJump,
  SpellingBeeAdventure, NumberLineRunner, AdditionBridge, SubtractionNinja, CFAMarket,
  ClockQuest, SentenceTrain, ReadingRescue, ScienceGarden, PhonicsFishing,
  // Developing (31-45)
  MultiplicationBattle, DivisionPizzaShop, FractionChef, GrammarDetective, VocabularyExplorer,
  ReadingMystery, ScienceExperimentLab, EcosystemBuilder, GeometryArchitect, MeasurementChallenge,
  MemoryMaze, WordScrambleAdventure, WaterCycleJourney, MathEscapeRoom, MapExplorer,
  // Advanced (46-60)
  FractionSpaceMission, DecimalRacing, BudgetTycoon, ScienceDiscoveryQuest, ReadingDetectiveAgency,
  LogicLabyrinth, GeometryConstructionSite, GrammarKingdom, WordMeaningDuel, DataDetective,
  MathStrategyTower, PlanetExplorer, StoryCreator, VirtualClassroomChallenge, GrandAdventure,
  // Classic Engines
  CountAndTap, NumberMatch, NumberOrder, NumberLine, TenFrame, PlaceValueBuilder,
  AdditionBuilder, SubtractionBuilder, MultiplicationArrays, DivisionSharing, FractionBuilder,
  MoneyShop, ClockGame, MeasurementLab, ShapePuzzle, AlphabetRecognition, PhonemeMatch,
  SyllableBuilder, PictureWordMatch, SpellingDictation, SentenceOrder, GrammarSort,
  ReadAloud, StoryComprehension, LivingClassification, HabitatExplorer, PlantGrowthSequence,
  BodyAndSensesLab, HygieneNutritionSort, CauseAndEffectLab, MemoryCardGame, TapToPair, SortingBaskets
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
        { id: '1', type: 'COUNT_ANIMALS', q: 'Combien d\'éléphants vois-tu dans la savane ?', animalIcon: '🐘', ans: difficulty === 1 ? '4' : '6', options: ['3', '4', '5', '6'], hint: 'Touche chaque éléphant pour compter.' },
        { id: '2', type: 'BUBBLE_NUMBERS', q: 'Éclate la bulle avec le nombre 5 !', ans: '5', options: ['2', '5', '8', '3'], hint: 'Reconnais le chiffre 5.' },
        { id: '3', type: 'NUMBER_ORDER', q: 'Range les nombres en ordre croissant :', options: ['2', '5', '7', '9'], ans: '2, 5, 7, 9', hint: 'Commence par le plus petit.' }
      ];

    case 'math_shapes_basic':
      return [
        { id: '1', type: 'SHAPE_SAFARI', q: 'Trouve les objets en forme de Cercle :', targetShape: 'Cercle', ans: 'Cercle', options: ['Cercle', 'Triangle', 'Carré'], hint: 'Le cercle est tout rond comme le soleil.' },
        { id: '2', type: 'SHAPE_PUZZLE', q: 'Touche le Triangle (3 côtés) :', shape: 'triangle', ans: 'Triangle', options: ['Triangle', 'Cercle', 'Carré'], hint: 'Il a 3 pointes comme le mont Cameroun.' }
      ];

    case 'math_number_order_20':
      return [
        { id: '1', type: 'NUMBER_LINE_RUNNER', q: 'Où se trouve le diamant à la position 7 ?', ans: '7', target: 7, hint: 'Avance sur la ligne graduée.' },
        { id: '2', type: 'NUMBER_ORDER', q: 'Range ces nombres du plus petit au plus grand :', options: ['11', '14', '17', '20'], ans: '11, 14, 17, 20', hint: 'Regarde le chiffre des unités.' }
      ];

    case 'math_add_10':
      return [
        { id: '1', type: 'MATH_RACING', q: 'Résous l\'addition pour faire avancer la voiture :', equation: difficulty === 1 ? '4 + 3 = ?' : '6 + 3 = ?', ans: difficulty === 1 ? '7' : '9', options: difficulty === 1 ? ['6', '7', '8', '9'] : ['7', '8', '9', '10'], hint: 'Mets le premier nombre dans ta tête et ajoute le deuxième.' },
        { id: '2', type: 'ROBOT_FACTORY', q: 'Assemble l\'énergie du robot :', ans: '15', target: 15, hint: 'Utilise 1 dizaine et 5 unités.' },
        { id: '3', type: 'ADDITION_BRIDGE', q: 'Répare le pont avec la somme 5 + 3 = ?', equation: '5 + 3 = ?', ans: '8', options: ['7', '8', '9', '10'], hint: '5 et encore 3 font 8.' }
      ];

    case 'math_sub_10':
      return [
        { id: '1', type: 'SUBTRACTION_NINJA', q: 'Le ninja tranche 2 cibles sur 6 !', total: 6, cut: 2, ans: '4', options: ['3', '4', '5', '6'], hint: '6 moins 2 font 4.' },
        { id: '2', type: 'SUBTRACTION_BUILDER', q: 'Combien reste-t-il ?', equation: '7 - 3 = ?', ans: '4', options: ['3', '4', '5', '6'], hint: 'Retire 3 bananes.' }
      ];

    case 'math_place_value_100':
      return [
        { id: '1', type: 'ROBOT_FACTORY', q: 'Fabrique le robot n° 34 :', target: 34, ans: '34', hint: 'Prends 3 barres de dix et 4 unités.' },
        { id: '2', type: 'PLACE_VALUE_BUILDER', q: 'Construis 52 :', target: 52, ans: '52', hint: '5 dizaines et 2 unités.' }
      ];

    case 'math_cfa_money':
      return [
        { id: '1', type: 'CFA_MARKET', item: 'Poisson braisé de Kribi', price: 500, ans: '500', options: ['250', '500', '1000', '100'], hint: 'La pièce dorée vaut 500 Francs CFA.' },
        { id: '2', type: 'MONEY_SHOP', item: 'Beignets chauds', price: 250, ans: '250', hint: 'Deux pièces de 100F et une pièce de 50F.' }
      ];

    case 'math_mult_arrays':
      return [
        { id: '1', type: 'MULTIPLICATION_BATTLE', rows: 4, cols: 3, ans: '12', options: ['10', '12', '14', '16'], hint: '4 lignes de 3 font 12.' },
        { id: '2', type: 'MULTIPLICATION_ARRAYS', rows: 3, cols: 4, ans: '12', options: ['10', '12', '14', '16'], hint: '3 × 4 = 12.' }
      ];

    case 'math_division_sharing':
      return [
        { id: '1', type: 'DIVISION_PIZZA', slices: 12, friends: 3, ans: '4', options: ['3', '4', '5', '6'], hint: '12 divisé par 3 fait 4.' },
        { id: '2', type: 'DIVISION_SHARING', total: 6, plates: 2, ans: '3', hint: 'Chacun reçoit 3 poissons.' }
      ];

    case 'math_clock_time':
      return [
        { id: '1', type: 'CLOCK_QUEST', hour: 8, ans: '8h00', options: ['7h00', '8h00', '9h00', '12h00'], hint: 'L\'école commence à 8 heures précises.' }
      ];

    case 'math_fractions_basic':
      return [
        { id: '1', type: 'FRACTION_CHEF', targetFraction: '1/2', ans: '1/2', options: ['1/2', '1/3', '1/4', '3/4'], hint: 'Une demi-portion égale à la moitié.' },
        { id: '2', type: 'FRACTION_SPACE', problem: '2/5 + 1/5 = ?', ans: '3/5', options: ['3/5', '3/10', '2/5', '1/5'], hint: 'Additionne les numérateurs du haut : 2 + 1 = 3.' }
      ];

    case 'math_measurement_lab':
      return [
        { id: '1', type: 'MEASUREMENT_CHALLENGE', ans: '50 Kilogrammes (kg)', options: ['50 Kilogrammes (kg)', '50 Grammes (g)', '50 Milligrammes (mg)'], hint: 'Un grand sac de manioc est lourd, il se pèse en kg.' }
      ];

    // --- READING & LANGUAGE ---
    case 'fr_alphabet_letters':
      return [
        { id: '1', type: 'LETTER_TRAIN', sequence: ['A', 'B', 'C', '?'], ans: 'D', options: ['D', 'F', 'M', 'P'], hint: 'Après C vient la lettre D.' },
        { id: '2', type: 'DANCING_LETTERS', targetLetter: 'A', ans: 'A', options: ['A', 'E', 'I', 'O'], hint: 'Attrape la lettre A !' }
      ];

    case 'fr_read_vowels':
      return [
        { id: '1', type: 'PHONICS_FISHING', targetSound: 'B', ans: 'B', options: ['B', 'D', 'P', 'T'], hint: 'Pêche la lettre B.' },
        { id: '2', type: 'PHONEME_MATCH', q: 'Quel mot contient le son "O" ?', sound: 'O', ans: 'Moto', options: ['Moto', 'Lit', 'Sac', 'Mur'], hint: 'Écoute : Mo-to.' }
      ];

    case 'fr_syllable_blends':
      return [
        { id: '1', type: 'SYLLABLE_JUMP', syllables: ['PA', 'PI', 'LLON'], ans: 'PAPILLON', options: ['PA', 'PI', 'LLON', 'MA', 'TO'], hint: 'Saute sur PA, puis PI, puis LLON.' },
        { id: '2', type: 'SYLLABLE_BUILDER', targetWord: 'MAMAN', syllables: ['MA', 'MAN'], options: ['MA', 'MAN', 'PA', 'TO'], ans: 'MAMAN', hint: 'MA + MAN.' }
      ];

    case 'fr_spelling_cameroon':
      return [
        { id: '1', type: 'SPELLING_BEE', targetWord: 'MANGUE', letters: ['M', 'A', 'N', 'G', 'U', 'E', 'O', 'S'], ans: 'MANGUE', hint: 'M - A - N - G - U - E.' }
      ];

    case 'fr_sentence_order':
      return [
        { id: '1', type: 'SENTENCE_TRAIN', words: ['Musa', 'lit', 'un', 'livre.'], ans: 'Musa lit un livre.', hint: 'Sujet + Verbe + Complément.' },
        { id: '2', type: 'GRAMMAR_DETECTIVE', sentence: 'Les enfant joue dans la cour.', ans: 'joue (doit être jouent)', options: ['enfant (doit prendre un s)', 'joue (doit être jouent)', 'cour (mal orthographié)'], hint: 'Le verbe s\'accorde avec le pluriel "Les enfants".' }
      ];

    case 'fr_story_amina':
      return [
        {
          id: '1',
          type: 'READING_MYSTERY',
          story: 'Amina et sa maman sont parties au marché de Mokolo à Yaoundé. Elles ont acheté du poisson frais pêché dans le fleuve Wouri.',
          q: 'Dans quelle ville se trouve le marché de Mokolo ?',
          ans: 'Yaoundé',
          options: ['Yaoundé', 'Douala', 'Garoua', 'Bafoussam'],
          hint: 'Mokolo est le célèbre grand marché de Yaoundé.'
        }
      ];

    // --- SCIENCE & NATURE ---
    case 'sci_living_nonliving':
      return [
        { id: '1', type: 'ANIMAL_HOMES', animal: { name: 'Chimpanzé', icon: '🐒' }, ans: 'Dans les arbres 🌳', options: ['Dans les arbres 🌳', 'Dans l\'eau 🌊', 'Sous terre 🕳️'], hint: 'Le chimpanzé vit dans la canopée de la forêt équatoriale.' },
        { id: '2', type: 'LIVING_CLASSIFICATION', item: 'Éléphant du Waza', itemEmoji: '🐘', ans: 'VIVANT', hint: 'L\'éléphant respire, grandit et mange.' }
      ];

    case 'sci_body_senses':
      return [
        { id: '1', type: 'SOUND_DETECTIVE', soundName: 'Le Lion', soundPrompt: 'Roooaaar !', ans: 'Lion 🦁', options: ['Lion 🦁', 'Oiseau 🦜', 'Grenouille 🐸', 'Mouton 🐑'], hint: 'Écoute le grand rugissement du roi de la savane.' }
      ];

    case 'sci_animal_habitat':
      return [
        { id: '1', type: 'HABITAT_EXPLORER', animal: 'Gorille du Dja', animalEmoji: '🦍', ans: 'FORET', hint: 'Le gorille vit dans les grands arbres de la forêt équatoriale.' }
      ];

    case 'sci_plant_growth':
      return [
        { id: '1', type: 'SCIENCE_GARDEN', ans: 'Eau et Soleil ☀️💧', options: ['Eau et Soleil ☀️💧', 'Chocolat 🍫', 'Téléphone 📱', 'Pierres 🪨'], hint: 'Les plantes ont besoin d\'eau et de lumière.' }
      ];

    case 'sci_hygiene_health':
      return [
        { id: '1', type: 'HYGIENE_NUTRITION_SORT', habit: 'Dormir sous une moustiquaire imprégnée', habitIcon: '🛏️', ans: 'BON', hint: 'La moustiquaire protège des moustiques qui transmettent le paludisme.' }
      ];

    // --- MEMORY ---
    case 'mem_cards':
      return [
        { id: '1', type: 'PICTURE_MEMORY', ans: 'COMPLETED' }
      ];

    default:
      return [
        { id: 'def_1', type: 'MATH_RACING', equation: '3 + 2 = ?', ans: '5', options: ['4', '5', '6', '7'], hint: '3 et encore 2 font 5.' }
      ];
  }
};

export default function GameActivityScreen() {
  const { subject, skillId, gameKey } = useLocalSearchParams();
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
    }, [skillId, gameKey])
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
      const generated = generateQuestionsForSkill(skillId as string || 'math_count_1_10', diff);
      
      // If user selected a specific game mechanic, apply it to the first question
      if (gameKey && generated.length > 0) {
        generated[0].type = gameKey as string;
      }
      
      setQuestions(generated);
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
    const earned = Math.max(15, perfectCount * 20 * difficultyLevel);
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
            masteryValue: 0.25,
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
    
    const isCorrect = selected === q.ans || q.ans === 'COMPLETED' || selected.toLowerCase().includes(q.ans?.toLowerCase());

    if (isCorrect) {
      setFeedbackColor('#10B981');
      setFeedback('Gagné ! Bravo champion ! 🎉');
      speak('Bravo ! C\'est la bonne réponse !');
      
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
        setFeedback('Regarde bien l\'indice ou touche le Hibou Tuteur pour t\'aider !');
        speak('Essaie encore une fois !');
        setTimeout(() => setFeedback(null), 3000);
      } else {
        setFeedback(null);
        setShowTutor(true);
      }
    }
  };

  const handlePracticeSimilar = () => {
    setShowTutor(false);
    setErrorsOnCurrent(0);
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
          <Text style={styles.celebrationTitle}>Victoire ! Jeu Terminé !</Text>
          <Text style={styles.celebrationStars}>⭐⭐⭐</Text>
          
          <View style={styles.rewardBox}>
            <Text style={styles.coinsAmount}>+{coinsEarned} 🪙</Text>
            <Text style={styles.rewardSubtitle}>Pièces d'or gagnées pour ta tirelire !</Text>
          </View>

          <Text style={styles.statSummary}>
            Niveau Maîtrisé | Vies restantes : {lives} ❤️
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
  const activeType = currentQ.type;

  // Master Engine Router for all 60 Distinct Games
  const renderEngine = () => {
    switch (activeType) {
      // Early (01-15)
      case 'COLOR_SPLASH': return <ColorSplash question={currentQ} onAnswer={handleAnswer} />;
      case 'SHAPE_SAFARI': return <ShapeSafari question={currentQ} onAnswer={handleAnswer} />;
      case 'COUNT_ANIMALS': return <CountTheAnimals question={currentQ} onAnswer={handleAnswer} />;
      case 'BUBBLE_NUMBERS': return <BubbleNumbers question={currentQ} onAnswer={handleAnswer} />;
      case 'LETTER_TRAIN': return <LetterTrain question={currentQ} onAnswer={handleAnswer} />;
      case 'SOUND_DETECTIVE': return <SoundDetective question={currentQ} onAnswer={handleAnswer} />;
      case 'ANIMAL_HOMES': return <AnimalHomes question={currentQ} onAnswer={handleAnswer} />;
      case 'PATTERN_CATERPILLAR': return <PatternCaterpillar question={currentQ} onAnswer={handleAnswer} />;
      case 'FRUIT_BASKET': return <FruitBasket question={currentQ} onAnswer={handleAnswer} />;
      case 'PICTURE_MEMORY': return <PictureMemory question={currentQ} onAnswer={handleAnswer} />;
      case 'DANCING_LETTERS': return <DancingLetters question={currentQ} onAnswer={handleAnswer} />;
      case 'STORY_PUPPET': return <StoryPuppetShow question={currentQ} onAnswer={handleAnswer} />;
      case 'SIZE_SORTING': return <SizeSorting question={currentQ} onAnswer={handleAnswer} />;
      case 'SHADOW_MATCH': return <ShadowMatch question={currentQ} onAnswer={handleAnswer} />;
      case 'RAINBOW_BRIDGE': return <RainbowBridge question={currentQ} onAnswer={handleAnswer} />;

      // Foundation (16-30)
      case 'MATH_RACING': return <MathCarRacing question={currentQ} onAnswer={handleAnswer} />;
      case 'TREASURE_HUNT': return <TreasureHunt question={currentQ} onAnswer={handleAnswer} />;
      case 'ROBOT_FACTORY': return <RobotFactory question={currentQ} onAnswer={handleAnswer} />;
      case 'WORD_CASTLE': return <WordCastle question={currentQ} onAnswer={handleAnswer} />;
      case 'SYLLABLE_JUMP': return <SyllableJump question={currentQ} onAnswer={handleAnswer} />;
      case 'SPELLING_BEE': return <SpellingBeeAdventure question={currentQ} onAnswer={handleAnswer} />;
      case 'NUMBER_LINE_RUNNER': return <NumberLineRunner question={currentQ} onAnswer={handleAnswer} />;
      case 'ADDITION_BRIDGE': return <AdditionBridge question={currentQ} onAnswer={handleAnswer} />;
      case 'SUBTRACTION_NINJA': return <SubtractionNinja question={currentQ} onAnswer={handleAnswer} />;
      case 'CFA_MARKET': return <CFAMarket question={currentQ} onAnswer={handleAnswer} />;
      case 'CLOCK_QUEST': return <ClockQuest question={currentQ} onAnswer={handleAnswer} />;
      case 'SENTENCE_TRAIN': return <SentenceTrain question={currentQ} onAnswer={handleAnswer} />;
      case 'READING_RESCUE': return <ReadingRescue question={currentQ} onAnswer={handleAnswer} />;
      case 'SCIENCE_GARDEN': return <ScienceGarden question={currentQ} onAnswer={handleAnswer} />;
      case 'PHONICS_FISHING': return <PhonicsFishing question={currentQ} onAnswer={handleAnswer} />;

      // Developing (31-45)
      case 'MULTIPLICATION_BATTLE': return <MultiplicationBattle question={currentQ} onAnswer={handleAnswer} />;
      case 'DIVISION_PIZZA': return <DivisionPizzaShop question={currentQ} onAnswer={handleAnswer} />;
      case 'FRACTION_CHEF': return <FractionChef question={currentQ} onAnswer={handleAnswer} />;
      case 'GRAMMAR_DETECTIVE': return <GrammarDetective question={currentQ} onAnswer={handleAnswer} />;
      case 'VOCABULARY_EXPLORER': return <VocabularyExplorer question={currentQ} onAnswer={handleAnswer} />;
      case 'READING_MYSTERY': return <ReadingMystery question={currentQ} onAnswer={handleAnswer} />;
      case 'SCIENCE_EXPERIMENT': return <ScienceExperimentLab question={currentQ} onAnswer={handleAnswer} />;
      case 'ECOSYSTEM_BUILDER': return <EcosystemBuilder question={currentQ} onAnswer={handleAnswer} />;
      case 'GEOMETRY_ARCHITECT': return <GeometryArchitect question={currentQ} onAnswer={handleAnswer} />;
      case 'MEASUREMENT_CHALLENGE': return <MeasurementChallenge question={currentQ} onAnswer={handleAnswer} />;
      case 'MEMORY_MAZE': return <MemoryMaze question={currentQ} onAnswer={handleAnswer} />;
      case 'WORD_SCRAMBLE': return <WordScrambleAdventure question={currentQ} onAnswer={handleAnswer} />;
      case 'WATER_CYCLE': return <WaterCycleJourney question={currentQ} onAnswer={handleAnswer} />;
      case 'MATH_ESCAPE_ROOM': return <MathEscapeRoom question={currentQ} onAnswer={handleAnswer} />;
      case 'MAP_EXPLORER': return <MapExplorer question={currentQ} onAnswer={handleAnswer} />;

      // Advanced (46-60)
      case 'FRACTION_SPACE': return <FractionSpaceMission question={currentQ} onAnswer={handleAnswer} />;
      case 'DECIMAL_RACING': return <DecimalRacing question={currentQ} onAnswer={handleAnswer} />;
      case 'BUDGET_TYCOON': return <BudgetTycoon question={currentQ} onAnswer={handleAnswer} />;
      case 'SCIENCE_QUEST': return <ScienceDiscoveryQuest question={currentQ} onAnswer={handleAnswer} />;
      case 'READING_AGENCY': return <ReadingDetectiveAgency question={currentQ} onAnswer={handleAnswer} />;
      case 'LOGIC_LABYRINTH': return <LogicLabyrinth question={currentQ} onAnswer={handleAnswer} />;
      case 'GEO_CONSTRUCTION': return <GeometryConstructionSite question={currentQ} onAnswer={handleAnswer} />;
      case 'GRAMMAR_KINGDOM': return <GrammarKingdom question={currentQ} onAnswer={handleAnswer} />;
      case 'WORD_MEANING_DUEL': return <WordMeaningDuel question={currentQ} onAnswer={handleAnswer} />;
      case 'DATA_DETECTIVE': return <DataDetective question={currentQ} onAnswer={handleAnswer} />;
      case 'MATH_TOWER': return <MathStrategyTower question={currentQ} onAnswer={handleAnswer} />;
      case 'PLANET_EXPLORER': return <PlanetExplorer question={currentQ} onAnswer={handleAnswer} />;
      case 'STORY_CREATOR': return <StoryCreator question={currentQ} onAnswer={handleAnswer} />;
      case 'VIRTUAL_CLASSROOM': return <VirtualClassroomChallenge question={currentQ} onAnswer={handleAnswer} />;
      case 'GRAND_ADVENTURE': return <GrandAdventure question={currentQ} onAnswer={handleAnswer} />;

      // Classic fallbacks
      case 'COUNT_AND_TAP': return <CountAndTap question={currentQ} onAnswer={handleAnswer} />;
      case 'NUMBER_MATCH': return <NumberMatch question={currentQ} onAnswer={handleAnswer} />;
      case 'NUMBER_ORDER': return <NumberOrder question={currentQ} onAnswer={handleAnswer} />;
      case 'TEN_FRAME': return <TenFrame question={currentQ} onAnswer={handleAnswer} />;
      case 'PLACE_VALUE_BUILDER': return <PlaceValueBuilder question={currentQ} onAnswer={handleAnswer} />;
      case 'ADDITION_BUILDER': return <AdditionBuilder question={currentQ} onAnswer={handleAnswer} />;
      case 'SUBTRACTION_BUILDER': return <SubtractionBuilder question={currentQ} onAnswer={handleAnswer} />;
      case 'MULTIPLICATION_ARRAYS': return <MultiplicationArrays question={currentQ} onAnswer={handleAnswer} />;
      case 'DIVISION_SHARING': return <DivisionSharing question={currentQ} onAnswer={handleAnswer} />;
      case 'MONEY_SHOP': return <MoneyShop question={currentQ} onAnswer={handleAnswer} />;
      case 'HABITAT_EXPLORER': return <HabitatExplorer question={currentQ} onAnswer={handleAnswer} />;
      case 'LIVING_CLASSIFICATION': return <LivingClassification question={currentQ} onAnswer={handleAnswer} />;

      default:
        return <MathCarRacing question={currentQ} onAnswer={handleAnswer} />;
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
