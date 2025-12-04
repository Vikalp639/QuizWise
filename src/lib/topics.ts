import { type LucideIcon, HeartPulse, Cpu, Landmark, FlaskConical } from 'lucide-react';

export type MCQ = {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  difficulty: 'easy' | 'medium' | 'hard';
};

export type Topic = {
  name: string;
  slug: string;
  IconComponent: LucideIcon;
  description: string;
  mcqs: MCQ[];
};

export const topics: Topic[] = [
  {
    name: 'Wellness',
    slug: 'wellness',
    IconComponent: HeartPulse,
    description: 'Explore topics on health, mindfulness, and personal growth.',
    mcqs: [
      {
        question: 'Which of the following is a primary component of physical wellness?',
        options: ['Financial stability', 'Regular exercise', 'Social interaction', 'Spiritual reflection'],
        correctAnswerIndex: 1,
        difficulty: 'easy',
      },
      {
        question: 'What is mindfulness?',
        options: [
          'A type of intense workout',
          'A practice of focusing on the present moment',
          'A financial planning strategy',
          'A historical study',
        ],
        correctAnswerIndex: 1,
        difficulty: 'easy',
      },
      {
        question: 'How many hours of sleep are recommended for adults per night?',
        options: ['4-5 hours', '6-7 hours', '7-9 hours', '10-12 hours'],
        correctAnswerIndex: 2,
        difficulty: 'medium',
      },
      {
        question: 'Which of these is NOT considered a macronutrient?',
        options: ['Protein', 'Fat', 'Vitamins', 'Carbohydrates'],
        correctAnswerIndex: 2,
        difficulty: 'medium',
      },
      {
        question:
          'What is the "fight or flight" response primarily mediated by in the human body?',
        options: [
          'The digestive system',
          'The parasympathetic nervous system',
          'The somatic nervous system',
          'The sympathetic nervous system',
        ],
        correctAnswerIndex: 3,
        difficulty: 'hard',
      },
    ],
  },
  {
    name: 'Tech Trends',
    slug: 'tech-trends',
    IconComponent: Cpu,
    description: 'Test your knowledge on the latest in technology and innovation.',
    mcqs: [
      {
        question: 'What does "AI" stand for?',
        options: [
          'Automated Intelligence',
          'Artificial Intelligence',
          'Algorithmic Interface',
          'Applied Innovation',
        ],
        correctAnswerIndex: 1,
        difficulty: 'easy',
      },
      {
        question: 'Which company developed the React JavaScript library?',
        options: ['Google', 'Apple', 'Facebook (Meta)', 'Microsoft'],
        correctAnswerIndex: 2,
        difficulty: 'medium',
      },
      {
        question: 'What is a "blockchain"?',
        options: [
          'A type of computer virus',
          'A distributed, immutable ledger',
          'A CPU architecture',
          'A graphics rendering technique',
        ],
        correctAnswerIndex: 1,
        difficulty: 'medium',
      },
      {
        question: 'In computing, what does "SaaS" stand for?',
        options: [
          'Software as a Standard',
          'Security as a Service',
          'Software as a Service',
          'System as a Service',
        ],
        correctAnswerIndex: 2,
        difficulty: 'hard',
      },
      {
        question: 'What is the primary function of a quantum computer?',
        options: [
          'To play video games at high resolution',
          'To leverage quantum-mechanical phenomena to solve complex problems',
          'To create more efficient solar panels',
          'To browse the internet faster',
        ],
        correctAnswerIndex: 1,
        difficulty: 'hard',
      },
    ],
  },
  {
    name: 'History',
    slug: 'history',
    IconComponent: Landmark,
    description: 'Journey through time and challenge your historical knowledge.',
    mcqs: [
      {
        question: 'In what year did the Titanic sink?',
        options: ['1905', '1912', '1918', '1923'],
        correctAnswerIndex: 1,
        difficulty: 'easy',
      },
      {
        question: 'Who was the first President of the United States?',
        options: ['Thomas Jefferson', 'Abraham Lincoln', 'John Adams', 'George Washington'],
        correctAnswerIndex: 3,
        difficulty: 'easy',
      },
      {
        question: 'The Renaissance began in which country?',
        options: ['France', 'Spain', 'Italy', 'England'],
        correctAnswerIndex: 2,
        difficulty: 'medium',
      },
      {
        question: 'What event marked the beginning of World War I?',
        options: [
          'The bombing of Pearl Harbor',
          'The invasion of Poland',
          'The assassination of Archduke Franz Ferdinand',
          'The Battle of Stalingrad',
        ],
        correctAnswerIndex: 2,
        difficulty: 'hard',
      },
      {
        question: 'The ancient city of Rome was built on how many hills?',
        options: ['Five', 'Seven', 'Nine', 'Three'],
        correctAnswerIndex: 1,
        difficulty: 'hard',
      },
    ],
  },
  {
    name: 'Science',
    slug: 'science',
    IconComponent: FlaskConical,
    description: 'Dive into the world of scientific discoveries and principles.',
    mcqs: [
      {
        question: 'What is the chemical symbol for water?',
        options: ['O2', 'CO2', 'H2O', 'NaCl'],
        correctAnswerIndex: 2,
        difficulty: 'easy',
      },
      {
        question: 'What is the powerhouse of the cell?',
        options: ['Nucleus', 'Ribosome', 'Mitochondrion', 'Cell membrane'],
        correctAnswerIndex: 2,
        difficulty: 'easy',
      },
      {
        question: "What is the force that holds planets in orbit around the sun?",
        options: ["Gravity", "Magnetism", "Friction", "Tension"],
        correctAnswerIndex: 0,
        difficulty: "medium",
      },
      {
        question: "Which of these is not a state of matter?",
        options: ["Solid", "Liquid", "Gas", "Energy"],
        correctAnswerIndex: 3,
        difficulty: "medium",
      },
      {
        question: "What does E=mc² represent?",
        options: [
          "The law of universal gravitation",
          "The theory of general relativity",
          "The mass-energy equivalence principle",
          "The formula for kinetic energy",
        ],
        correctAnswerIndex: 2,
        difficulty: "hard",
      },
    ],
  },
];
