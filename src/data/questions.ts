import { Question } from '../engine/AdaptiveEngine';

export const QUESTION_BANK: Question[] = [
  // FOREST OF NUMBERS (Math)
  { 
    zone: "forest", skillId: "counting-1-10", difficulty: 0.2,
    prompt: "How many apples? 🍎🍎🍎", choices: ["2","3","4","5"], answer: "3",
    emoji: "🍎",
    explanation: "Let's count them together! One, Two, Three apples!"
  },
  { 
    zone: "forest", skillId: "add-within-10", difficulty: 0.4,
    prompt: "What is 4 + 3?", choices: ["5","6","7","8"], answer: "7",
    emoji: "➕",
    explanation: "Hold up 4 fingers, then add 3 more! You get 7!"
  },
  { 
    zone: "forest", skillId: "sub-within-10", difficulty: 0.45,
    prompt: "You have 5 🧸, you give away 2. How many are left?", choices: ["1","2","3","4"], answer: "3",
    emoji: "🧸",
    explanation: "5 minus 2 is 3! Think of taking 2 toys away from a group of 5."
  },

  // CASTLE OF STORIES (Reading)
  { 
    zone: "castle", skillId: "phonics-sh", difficulty: 0.3,
    prompt: "Which word starts with 'sh'?", choices: ["cat","ship","dog","run"], answer: "ship",
    emoji: "🏰",
    explanation: "Shhhhh! The word 'ship' makes the 'sh' sound!"
  },
  { 
    zone: "castle", skillId: "sight-words", difficulty: 0.4,
    prompt: "Which word is an animal?", choices: ["the","and","cat","is"], answer: "cat",
    emoji: "🐱",
    explanation: "Meow! A cat is a furry animal."
  },

  // SPACE LAB (Science)
  { 
    zone: "space", skillId: "planets", difficulty: 0.6,
    prompt: "Which planet is closest to the Sun?", choices: ["Venus","Mercury","Mars","Earth"], answer: "Mercury",
    emoji: "🚀",
    explanation: "Mercury is the smallest planet and it zooms right next to the Sun!"
  },
  { 
    zone: "space", skillId: "gravity", difficulty: 0.7,
    prompt: "What pulls things down to Earth?", choices: ["Magnetism","Wind","Gravity","Magic"], answer: "Gravity",
    emoji: "🌍",
    explanation: "Gravity is the invisible force that keeps our feet on the ground!"
  },

  // TIME TRAVELER'S MAP (Social Studies)
  { 
    zone: "time", skillId: "ancient-egypt", difficulty: 0.7,
    prompt: "What did ancient Egyptians write on?", choices: ["Paper","Papyrus","Stone tablets","Bark"], answer: "Papyrus",
    emoji: "📜",
    explanation: "They made a special thick paper out of a river plant called Papyrus!"
  },

  // PUZZLE PEAKS (Logic)
  { 
    zone: "puzzle", skillId: "logic-seq", difficulty: 0.8,
    prompt: "Next: 2, 4, 8, 16, ?", choices: ["18","24","32","64"], answer: "32",
    emoji: "🧩",
    explanation: "Each number is double the last one! 16 + 16 = 32!"
  },

  // CM2 / 6ème Math & Logic
  { 
    zone: "forest", skillId: "fractions-cm2", difficulty: 0.85,
    prompt: "What is 1/2 of 50?", choices: ["20","25","30","50"], answer: "25",
    emoji: "🍕",
    explanation: "Half of 50 is 25! If you share 50 candies with a friend, you both get 25."
  },
  { 
    zone: "forest", skillId: "algebra-6eme", difficulty: 0.9,
    prompt: "If 2x = 10, what is x?", choices: ["2","3","4","5"], answer: "5",
    emoji: "🧮",
    explanation: "Think: 2 times what number makes 10? Two times 5 is 10!"
  },
  { 
    zone: "castle", skillId: "grammar-cm2", difficulty: 0.85,
    prompt: "Identify the adjective: 'The fierce lion roared.'", choices: ["The","fierce","lion","roared"], answer: "fierce",
    emoji: "🦁",
    explanation: "An adjective describes a noun. 'Fierce' describes the lion!"
  },
  { 
    zone: "space", skillId: "geometry-6eme", difficulty: 0.9,
    prompt: "How many degrees are in a right angle?", choices: ["45","90","180","360"], answer: "90",
    emoji: "📐",
    explanation: "A right angle is exactly 90 degrees, like the corner of a square!"
  }
];