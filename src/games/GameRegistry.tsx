import React from 'react';

// --- EARLY LEARNERS (01 - 15) ---
export {
  ColorSplash,
  ShapeSafari,
  CountTheAnimals,
  BubbleNumbers,
  LetterTrain,
  SoundDetective,
  AnimalHomes,
  PatternCaterpillar,
  FruitBasket,
  PictureMemory,
  DancingLetters,
  StoryPuppetShow,
  SizeSorting,
  ShadowMatch,
  RainbowBridge,
  BlockStack
} from './early/EarlyGames';

// --- FOUNDATION LEARNERS (16 - 30) ---
export {
  MathCarRacing,
  TreasureHunt,
  RobotFactory,
  WordCastle,
  SyllableJump,
  SpellingBeeAdventure,
  NumberLineRunner,
  AdditionBridge,
  SubtractionNinja,
  CFAMarket,
  ClockQuest,
  SentenceTrain,
  ReadingRescue,
  ScienceGarden,
  PhonicsFishing
} from './foundation/FoundationGames';

// --- DEVELOPING LEARNERS (31 - 45) ---
export {
  MultiplicationBattle,
  DivisionPizzaShop,
  FractionChef,
  GrammarDetective,
  VocabularyExplorer,
  ReadingMystery,
  ScienceExperimentLab,
  EcosystemBuilder,
  GeometryArchitect,
  MeasurementChallenge,
  MemoryMaze,
  WordScrambleAdventure,
  WaterCycleJourney,
  MathEscapeRoom,
  MapExplorer
} from './developing/DevelopingGames';

// --- ADVANCED PRIMARY (46 - 60) ---
export {
  FractionSpaceMission,
  DecimalRacing,
  BudgetTycoon,
  ScienceDiscoveryQuest,
  ReadingDetectiveAgency,
  LogicLabyrinth,
  GeometryConstructionSite,
  GrammarKingdom,
  WordMeaningDuel,
  DataDetective,
  MathStrategyTower,
  PlanetExplorer,
  StoryCreator,
  VirtualClassroomChallenge,
  GrandAdventure
} from './advanced/AdvancedGames';

// Re-export classic foundation engines
export * from './MathEngines';
export * from './LanguageEngines';
export * from './ScienceEngines';
export * from './MemoryEngines';

// Master Catalog Item Interface
export interface GameCatalogItem {
  id: string;
  gameKey: string;
  title: string;
  icon: string;
  category: 'Adventure' | 'Puzzle' | 'Creative' | 'Action' | 'Story' | 'Simulation';
  world: 'WORLD_A' | 'WORLD_B' | 'WORLD_C' | 'WORLD_D';
  subject: 'mathematics' | 'french_reading' | 'english_reading' | 'science' | 'cross_subject';
  recommendedAges: string;
  description: string;
}

// 60-Game Master Catalog
export const GAME_CATALOG: GameCatalogItem[] = [
  // World A: Early Explorers (4-5 yrs)
  { id: '01', gameKey: 'COLOR_SPLASH', title: 'Color Splash', icon: '🎨', category: 'Creative', world: 'WORLD_A', subject: 'cross_subject', recommendedAges: '4-5', description: 'Peins les objets selon les consignes vocales.' },
  { id: '02', gameKey: 'SHAPE_SAFARI', title: 'Shape Safari', icon: '🦁', category: 'Adventure', world: 'WORLD_A', subject: 'mathematics', recommendedAges: '4-5', description: 'Trouve et collectionne les formes dans la savane.' },
  { id: '03', gameKey: 'COUNT_ANIMALS', title: 'Count the Animals', icon: '🐾', category: 'Action', world: 'WORLD_A', subject: 'mathematics', recommendedAges: '4-5', description: 'Compte les éléphants et lions animés.' },
  { id: '04', gameKey: 'BUBBLE_NUMBERS', title: 'Bubble Numbers', icon: '🫧', category: 'Action', world: 'WORLD_A', subject: 'mathematics', recommendedAges: '4-5', description: 'Éclate les bulles portant le bon chiffre.' },
  { id: '05', gameKey: 'LETTER_TRAIN', title: 'Letter Train', icon: '🚂', category: 'Puzzle', world: 'WORLD_A', subject: 'french_reading', recommendedAges: '4-5', description: 'Accroche les wagons pour construire l\'alphabet.' },
  { id: '06', gameKey: 'SOUND_DETECTIVE', title: 'Sound Detective', icon: '🔍', category: 'Puzzle', world: 'WORLD_A', subject: 'french_reading', recommendedAges: '4-5', description: 'Écoute les sons et identifie les animaux.' },
  { id: '07', gameKey: 'ANIMAL_HOMES', title: 'Animal Homes', icon: '🏡', category: 'Simulation', world: 'WORLD_A', subject: 'science', recommendedAges: '4-5', description: 'Associe chaque animal à sa maison naturelle.' },
  { id: '08', gameKey: 'PATTERN_CATERPILLAR', title: 'Pattern Caterpillar', icon: '🐛', category: 'Puzzle', world: 'WORLD_A', subject: 'mathematics', recommendedAges: '4-5', description: 'Complète la suite logique de la chenille.' },
  { id: '09', gameKey: 'FRUIT_BASKET', title: 'Fruit Basket', icon: '🧺', category: 'Action', world: 'WORLD_A', subject: 'mathematics', recommendedAges: '4-5', description: 'Remplis le panier avec le bon nombre de fruits.' },
  { id: '10', gameKey: 'PICTURE_MEMORY', title: 'Picture Memory', icon: '🃏', category: 'Puzzle', world: 'WORLD_A', subject: 'cross_subject', recommendedAges: '4-5', description: 'Retrouve les paires d\'images cachées.' },
  { id: '11', gameKey: 'DANCING_LETTERS', title: 'Dancing Letters', icon: '💃', category: 'Action', world: 'WORLD_A', subject: 'french_reading', recommendedAges: '4-5', description: 'Attrape les lettres qui dansent en musique.' },
  { id: '12', gameKey: 'STORY_PUPPET', title: 'Story Puppet Show', icon: '🎭', category: 'Story', world: 'WORLD_A', subject: 'french_reading', recommendedAges: '4-5', description: 'Écoute et choisis les actions des marionnettes.' },
  { id: '13', gameKey: 'SIZE_SORTING', title: 'Size Sorting', icon: '📏', category: 'Puzzle', world: 'WORLD_A', subject: 'mathematics', recommendedAges: '4-5', description: 'Range les objets du plus petit au plus grand.' },
  { id: '14', gameKey: 'SHADOW_MATCH', title: 'Shadow Match', icon: '👥', category: 'Puzzle', world: 'WORLD_A', subject: 'science', recommendedAges: '4-5', description: 'Associe la silhouette noire au bon animal.' },
  { id: '15', gameKey: 'RAINBOW_BRIDGE', title: 'Rainbow Bridge', icon: '🌈', category: 'Creative', world: 'WORLD_A', subject: 'cross_subject', recommendedAges: '4-5', description: 'Complète les couleurs pour réparer le pont.' },

  // World B: Little Heroes (5-7 yrs)
  { id: '16', gameKey: 'MATH_RACING', title: 'Math Car Racing', icon: '🏎️', category: 'Action', world: 'WORLD_B', subject: 'mathematics', recommendedAges: '5-7', description: 'Propulse ta voiture avec la force du calcul mental !' },
  { id: '17', gameKey: 'TREASURE_HUNT', title: 'Treasure Hunt', icon: '🗺️', category: 'Adventure', world: 'WORLD_B', subject: 'mathematics', recommendedAges: '5-7', description: 'Trouve le coffre au trésor sur l\'île mystérieuse.' },
  { id: '18', gameKey: 'ROBOT_FACTORY', title: 'Robot Factory', icon: '🤖', category: 'Simulation', world: 'WORLD_B', subject: 'mathematics', recommendedAges: '5-7', description: 'Assemble des blocs de dizaines et d\'unités pour créer des robots.' },
  { id: '19', gameKey: 'WORD_CASTLE', title: 'Word Castle', icon: '🏰', category: 'Adventure', world: 'WORLD_B', subject: 'french_reading', recommendedAges: '5-7', description: 'Prononce les mots pour ouvrir la herse magique.' },
  { id: '20', gameKey: 'SYLLABLE_JUMP', title: 'Syllable Jump', icon: '🐸', category: 'Action', world: 'WORLD_B', subject: 'french_reading', recommendedAges: '5-7', description: 'Saute de nénuphar en nénuphar en suivant les syllabes.' },
  { id: '21', gameKey: 'SPELLING_BEE', title: 'Spelling Bee Adventure', icon: '🐝', category: 'Puzzle', world: 'WORLD_B', subject: 'french_reading', recommendedAges: '5-7', description: 'Écoute et épelle les mots dans la ruche dorée.' },
  { id: '22', gameKey: 'NUMBER_LINE_RUNNER', title: 'Number Line Runner', icon: '🏃', category: 'Action', world: 'WORLD_B', subject: 'mathematics', recommendedAges: '5-7', description: 'Cours le long de la ligne graduée pour attraper les diamants.' },
  { id: '23', gameKey: 'ADDITION_BRIDGE', title: 'Addition Bridge', icon: '🌉', category: 'Puzzle', world: 'WORLD_B', subject: 'mathematics', recommendedAges: '5-7', description: 'Assemble des blocs de pierres avec les sommes pour traverser.' },
  { id: '24', gameKey: 'SUBTRACTION_NINJA', title: 'Subtraction Ninja', icon: '🥷', category: 'Action', world: 'WORLD_B', subject: 'mathematics', recommendedAges: '5-7', description: 'Tranche les cibles avec ton sabre pour soustraire.' },
  { id: '25', gameKey: 'CFA_MARKET', title: 'CFA Market', icon: '🏪', category: 'Simulation', world: 'WORLD_B', subject: 'mathematics', recommendedAges: '5-7', description: 'Achète des provisions au marché en pièces de Francs CFA.' },
  { id: '26', gameKey: 'CLOCK_QUEST', title: 'Clock Quest', icon: '⏰', category: 'Adventure', world: 'WORLD_B', subject: 'mathematics', recommendedAges: '5-7', description: 'Lis l\'heure sur l\'horloge magique pour sauver le mage.' },
  { id: '27', gameKey: 'SENTENCE_TRAIN', title: 'Sentence Train', icon: '🚂', category: 'Puzzle', world: 'WORLD_B', subject: 'french_reading', recommendedAges: '5-7', description: 'Accroche les wagons dans l\'ordre grammatical.' },
  { id: '28', gameKey: 'READING_RESCUE', title: 'Reading Rescue', icon: '🚨', category: 'Story', world: 'WORLD_B', subject: 'french_reading', recommendedAges: '5-7', description: 'Déchiffre les indices pour sauver les animaux en détresse.' },
  { id: '29', gameKey: 'SCIENCE_GARDEN', title: 'Science Garden', icon: '🌱', category: 'Simulation', world: 'WORLD_B', subject: 'science', recommendedAges: '5-7', description: 'Fais pousser du maïs et des haricots avec eau et soleil.' },
  { id: '30', gameKey: 'PHONICS_FISHING', title: 'Phonics Fishing', icon: '🎣', category: 'Action', world: 'WORLD_B', subject: 'french_reading', recommendedAges: '5-7', description: 'Pêche les poissons portant les bons sons dans le fleuve Wouri.' },

  // World C: Skill Adventurers (7-9 yrs)
  { id: '31', gameKey: 'MULTIPLICATION_BATTLE', title: 'Multiplication Battle', icon: '⚔️', category: 'Action', world: 'WORLD_C', subject: 'mathematics', recommendedAges: '7-9', description: 'Terrasse les monstres avec des armées de multiplication !' },
  { id: '32', gameKey: 'DIVISION_PIZZA', title: 'Division Pizza Shop', icon: '🍕', category: 'Simulation', world: 'WORLD_C', subject: 'mathematics', recommendedAges: '7-9', description: 'Partage équitablement les parts de pizza entre amis.' },
  { id: '33', gameKey: 'FRACTION_CHEF', title: 'Fraction Chef', icon: '👨‍🍳', category: 'Creative', world: 'WORLD_C', subject: 'mathematics', recommendedAges: '7-9', description: 'Compose des recettes en dosant les fractions.' },
  { id: '34', gameKey: 'GRAMMAR_DETECTIVE', title: 'Grammar Detective', icon: '🕵️', category: 'Puzzle', world: 'WORLD_C', subject: 'french_reading', recommendedAges: '7-9', description: 'Débusque les fautes d\'accord dans les phrases.' },
  { id: '35', gameKey: 'VOCABULARY_EXPLORER', title: 'Vocabulary Explorer', icon: '🧭', category: 'Adventure', world: 'WORLD_C', subject: 'french_reading', recommendedAges: '7-9', description: 'Trouve les synonymes pour avancer dans la forêt tropicale.' },
  { id: '36', gameKey: 'READING_MYSTERY', title: 'Reading Mystery', icon: '📜', category: 'Story', world: 'WORLD_C', subject: 'french_reading', recommendedAges: '7-9', description: 'Résous les mystères camerounais grâce à ta lecture.' },
  { id: '37', gameKey: 'SCIENCE_EXPERIMENT', title: 'Science Experiment Lab', icon: '🧪', category: 'Simulation', world: 'WORLD_C', subject: 'science', recommendedAges: '7-9', description: 'Teste la flottaison et les mélanges dans le laboratoire.' },
  { id: '38', gameKey: 'ECOSYSTEM_BUILDER', title: 'Ecosystem Builder', icon: '🌿', category: 'Simulation', world: 'WORLD_C', subject: 'science', recommendedAges: '7-9', description: 'Construis la chaîne alimentaire de la savane.' },
  { id: '39', gameKey: 'GEOMETRY_ARCHITECT', title: 'Geometry Architect', icon: '📐', category: 'Creative', world: 'WORLD_C', subject: 'mathematics', recommendedAges: '7-9', description: 'Bâtis des monuments avec les solides géométriques.' },
  { id: '40', gameKey: 'MEASUREMENT_CHALLENGE', title: 'Measurement Challenge', icon: '⚖️', category: 'Puzzle', world: 'WORLD_C', subject: 'mathematics', recommendedAges: '7-9', description: 'Estime et mesure des masses en kilogrammes et grammes.' },
  { id: '41', gameKey: 'MEMORY_MAZE', title: 'Memory Maze', icon: '🌀', category: 'Puzzle', world: 'WORLD_C', subject: 'cross_subject', recommendedAges: '7-9', description: 'Retiens les séquences cardinales pour sortir du dédale.' },
  { id: '42', gameKey: 'WORD_SCRAMBLE', title: 'Word Scramble Adventure', icon: '🔤', category: 'Puzzle', world: 'WORLD_C', subject: 'french_reading', recommendedAges: '7-9', description: 'Reconstitue les mots camerounais mélangés.' },
  { id: '43', gameKey: 'WATER_CYCLE', title: 'Water Cycle Journey', icon: '💧', category: 'Adventure', world: 'WORLD_C', subject: 'science', recommendedAges: '7-9', description: 'Accompagne la goutte d\'eau dans son grand cycle.' },
  { id: '44', gameKey: 'MATH_ESCAPE_ROOM', title: 'Math Escape Room', icon: '🔐', category: 'Puzzle', world: 'WORLD_C', subject: 'mathematics', recommendedAges: '7-9', description: 'Déchiffre les énigmes numériques pour t\'échapper.' },
  { id: '45', gameKey: 'MAP_EXPLORER', title: 'Map Explorer', icon: '🧭', category: 'Adventure', world: 'WORLD_C', subject: 'science', recommendedAges: '7-9', description: 'Oriente-toi sur la carte des régions du Cameroun.' },

  // World D: Master Explorers (9-12 yrs)
  { id: '46', gameKey: 'FRACTION_SPACE', title: 'Fraction Space Mission', icon: '🚀', category: 'Adventure', world: 'WORLD_D', subject: 'mathematics', recommendedAges: '9-12', description: 'Pilote le vaisseau en calculant les fractions de carburant.' },
  { id: '47', gameKey: 'DECIMAL_RACING', title: 'Decimal Racing', icon: '🏎️', category: 'Action', world: 'WORLD_D', subject: 'mathematics', recommendedAges: '9-12', description: 'Gagne la course en ordonnant les nombres décimaux.' },
  { id: '48', gameKey: 'BUDGET_TYCOON', title: 'Budget Tycoon', icon: '💼', category: 'Simulation', world: 'WORLD_D', subject: 'mathematics', recommendedAges: '9-12', description: 'Gère un budget familial en Francs CFA et calcule l\'épargne.' },
  { id: '49', gameKey: 'SCIENCE_QUEST', title: 'Science Discovery Quest', icon: '🔬', category: 'Adventure', world: 'WORLD_D', subject: 'science', recommendedAges: '9-12', description: 'Explore la photosynthèse et la reproduction des plantes.' },
  { id: '50', gameKey: 'READING_AGENCY', title: 'Reading Detective Agency', icon: '🔍', category: 'Story', world: 'WORLD_D', subject: 'french_reading', recommendedAges: '9-12', description: 'Analyse les textes documentaires sur le Mont Cameroun.' },
  { id: '51', gameKey: 'LOGIC_LABYRINTH', title: 'Logic Labyrinth', icon: '🧩', category: 'Puzzle', world: 'WORLD_D', subject: 'cross_subject', recommendedAges: '9-12', description: 'Résous des déductions logiques complexes.' },
  { id: '52', gameKey: 'GEO_CONSTRUCTION', title: 'Geometry Construction Site', icon: '🏗️', category: 'Creative', world: 'WORLD_D', subject: 'mathematics', recommendedAges: '9-12', description: 'Calcule les périmètres et aires de chantiers réels.' },
  { id: '53', gameKey: 'GRAMMAR_KINGDOM', title: 'Grammar Kingdom', icon: '👑', category: 'Adventure', world: 'WORLD_D', subject: 'french_reading', recommendedAges: '9-12', description: 'Restaure le royaume en conjuguant au passé composé.' },
  { id: '54', gameKey: 'WORD_MEANING_DUEL', title: 'Word Meaning Duel', icon: '⚔️', category: 'Action', world: 'WORLD_D', subject: 'french_reading', recommendedAges: '9-12', description: 'Comprends les expressions figurées et proverbes.' },
  { id: '55', gameKey: 'DATA_DETECTIVE', title: 'Data Detective', icon: '📊', category: 'Puzzle', world: 'WORLD_D', subject: 'mathematics', recommendedAges: '9-12', description: 'Interprète les graphiques météo de Douala et Yaoundé.' },
  { id: '56', gameKey: 'MATH_TOWER', title: 'Math Strategy Tower', icon: '🗼', category: 'Action', world: 'WORLD_D', subject: 'mathematics', recommendedAges: '9-12', description: 'Enchaîne les calculs mentaux pour gravir la tour.' },
  { id: '57', gameKey: 'PLANET_EXPLORER', title: 'Planet Explorer', icon: '🪐', category: 'Simulation', world: 'WORLD_D', subject: 'science', recommendedAges: '9-12', description: 'Découvre les distances des planètes du système solaire.' },
  { id: '58', gameKey: 'STORY_CREATOR', title: 'Story Creator', icon: '✍️', category: 'Story', world: 'WORLD_D', subject: 'french_reading', recommendedAges: '9-12', description: 'Compose les dénouements moraux des grands contes africains.' },
  { id: '59', gameKey: 'VIRTUAL_CLASSROOM', title: 'Virtual Classroom Challenge', icon: '🎓', category: 'Puzzle', world: 'WORLD_D', subject: 'cross_subject', recommendedAges: '9-12', description: 'Défi multi-matières de culture générale camerounaise.' },
  { id: '60', gameKey: 'GRAND_ADVENTURE', title: 'Grand Adventure', icon: '⭐', category: 'Adventure', world: 'WORLD_D', subject: 'cross_subject', recommendedAges: '9-12', description: 'La grande quête finale pour le trophée d\'or de Nateiva EduKids !' }
];

// Helper to provide MULTIPLE GAME CHOICES for any skill
export function getGamesForSkill(skillId: string): GameCatalogItem[] {
  // If addition skill: return Math Racing, Addition Bridge, Robot Factory, CFA Market
  if (skillId.includes('add') || skillId === 'math_add_10') {
    return GAME_CATALOG.filter(g => ['16', '18', '23', '25'].includes(g.id));
  }
  // If counting/numbers:
  if (skillId.includes('count') || skillId.includes('order')) {
    return GAME_CATALOG.filter(g => ['03', '04', '08', '09', '17', '22'].includes(g.id));
  }
  // If shapes/geometry:
  if (skillId.includes('shape')) {
    return GAME_CATALOG.filter(g => ['02', '14', '15', '39', '52'].includes(g.id));
  }
  // If reading/phonics/syllables:
  if (skillId.includes('read') || skillId.includes('syllable') || skillId.includes('alphabet')) {
    return GAME_CATALOG.filter(g => ['05', '06', '11', '19', '20', '21', '30'].includes(g.id));
  }
  // If science:
  if (skillId.includes('sci') || skillId.includes('habitat') || skillId.includes('living')) {
    return GAME_CATALOG.filter(g => ['07', '29', '37', '38', '43', '49'].includes(g.id));
  }
  // Default: offer 4 high-rated diverse games
  return GAME_CATALOG.filter(g => ['16', '17', '18', '25'].includes(g.id));
}
