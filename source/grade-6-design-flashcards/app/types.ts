export type Card = {
  question: string;
  choices: string[];
  answer: string;
  explanation: string;
  discuss?: string;
  /** Path relative to the published flash root, e.g. notation/01-staff.svg */
  image?: string;
};

export type Deck = {
  id: string;
  title: string;
  description: string;
  cards: Card[];
  /** First N cards stay teaching/discussion-focused in deck order. Default 5. */
  teachingCount?: number;
};

export type Subject = {
  id: string;
  title: string;
  mark: string;
  description: string;
  decks: Deck[];
};
