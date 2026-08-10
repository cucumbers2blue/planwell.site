import type { Deck } from "./types";

/** Grade 6 Music Task A: reading symbols in a short piano score. */
export const musicTaskAScoreSymbolsDeck: Deck = {
  id: "task-a-score-symbols",
  title: "Reading a Piano Score",
  description:
    "Staff, clef, key signature, time signature, bar lines, notes, rests, repeats and dynamics.",
  teachingCount: 8,
  cards: [
    {
      question: "What is the staff?",
      choices: [
        "The five lines and four spaces used to write music",
        "A sign that means play louder",
        "A pause at the end of a song",
      ],
      answer: "The five lines and four spaces used to write music",
      explanation:
        "The staff is the set of five horizontal lines where music is written. Notes sit on a line or in a space. Higher notes are written higher on the staff. Lower notes are written lower.",
      discuss: "Why do musicians need shared lines and spaces instead of drawing notes anywhere on the page?",
      image: "notation/01-staff.svg",
    },
    {
      question: "What does a clef tell the musician?",
      choices: [
        "Which pitch each line and space represents",
        "How loud to play the music",
        "How many beats are in each bar",
      ],
      answer: "Which pitch each line and space represents",
      explanation:
        "A clef is placed at the start of the staff. It names the pitches. The treble clef is common for higher notes. The bass clef is common for lower notes. Without a clef, the lines and spaces have no fixed pitch meaning.",
      discuss: "Look at a treble clef. Which part of the symbol curls around a line, and why might that matter?",
      image: "notation/02-treble-clef.svg",
    },
    {
      question: "What is a key signature?",
      choices: [
        "The sharps or flats written after the clef",
        "The numbers that show the beat grouping",
        "A sign that means repeat the music",
      ],
      answer: "The sharps or flats written after the clef",
      explanation:
        "The key signature comes after the clef. It shows which notes are raised (sharps) or lowered (flats) for the whole piece, unless a temporary accidental changes one note. It helps the musician know the home pitch set of the music.",
      discuss: "If there is one sharp in the key signature, what does that tell a pianist before the first note?",
      image: "notation/04-key-signature.svg",
    },
    {
      question: "What does a time signature show?",
      choices: [
        "How beats are grouped in each bar",
        "Which hand plays higher notes",
        "Whether the music is loud or soft",
      ],
      answer: "How beats are grouped in each bar",
      explanation:
        "A common time signature is 4/4. The top number shows how many beats are in each bar. The bottom number shows which note value counts as one beat. In 4/4, there are four crotchet beats in each bar.",
      discuss: "Clap a steady pulse in 4/4. Where do you feel the strongest beat in each bar?",
      image: "notation/05-time-signature-4-4.svg",
    },
    {
      question: "What does a bar line do?",
      choices: [
        "Divides the music into bars (measures)",
        "Tells the musician to get louder",
        "Names the first note of the piece",
      ],
      answer: "Divides the music into bars (measures)",
      explanation:
        "Bar lines are vertical lines across the staff. They organise the beat groups shown by the time signature. A final double bar line often marks the end of a section or the whole piece.",
      discuss: "If the time signature is 4/4, how many beats should you count between one bar line and the next?",
      image: "notation/06-bar-lines.svg",
    },
    {
      question: "What do notes and rests communicate?",
      choices: [
        "Sound and silence, including pitch and duration",
        "Only the title of the piece",
        "Only which instrument may play",
      ],
      answer: "Sound and silence, including pitch and duration",
      explanation:
        "Notes show when to make sound. Their shape shows how long to hold the sound. Their place on the staff shows pitch. Rests show silence for a set duration. Music needs both sound and silence.",
      discuss: "Which is harder for a beginner: reading pitch, reading duration, or keeping a steady pulse? Why?",
      image: "notation/07-notes-and-rests.svg",
    },
    {
      question: "What does a repeat sign tell the musician?",
      choices: [
        "Play a section again",
        "Stop immediately",
        "Change to a new key",
      ],
      answer: "Play a section again",
      explanation:
        "Repeat signs mark music that should be played more than once. A begin-repeat and end-repeat pair shows which section to repeat. This saves writing the same bars twice.",
      discuss: "Why might a composer use a repeat sign instead of writing the same bars out again?",
      image: "notation/08-repeat-sign.svg",
    },
    {
      question: "What do dynamics tell the musician?",
      choices: [
        "How loud or soft to play",
        "Which clef to use",
        "How many beats are in a bar",
      ],
      answer: "How loud or soft to play",
      explanation:
        "Dynamics are volume instructions. For example, p means piano (soft) and f means forte (loud). Dynamics help the performance communicate energy and expression, not only correct notes.",
      discuss: "Play or sing one short phrase soft, then loud. What changes besides volume?",
      image: "notation/09-dynamics.svg",
    },
    {
      question: "How many lines does a standard musical staff have?",
      choices: ["Five", "Four", "Six"],
      answer: "Five",
      explanation: "A standard staff has five lines and four spaces between them.",
      image: "notation/01-staff.svg",
    },
    {
      question: "Where is the clef usually written?",
      choices: [
        "At the beginning of the staff",
        "Only above the final bar line",
        "In the middle of every note head",
      ],
      answer: "At the beginning of the staff",
      explanation: "The clef appears at the start so the musician knows the pitch of every line and space that follows.",
      image: "notation/02-treble-clef.svg",
    },
    {
      question: "Which clef is commonly used for higher-pitched piano notes?",
      choices: ["Treble clef", "Bass clef", "No clef is needed"],
      answer: "Treble clef",
      explanation: "The treble clef is often used for higher notes, including much of the pianist’s right-hand music.",
      image: "notation/02-treble-clef.svg",
    },
    {
      question: "Which clef is commonly used for lower-pitched piano notes?",
      choices: ["Bass clef", "Treble clef", "Repeat clef"],
      answer: "Bass clef",
      explanation: "The bass clef is often used for lower notes, including much of the pianist’s left-hand music.",
      image: "notation/03-bass-clef.svg",
    },
    {
      question: "In 4/4 time, how many crotchet beats are in one bar?",
      choices: ["Four", "Three", "Two"],
      answer: "Four",
      explanation: "In 4/4, the top number is 4, so each bar has four crotchet beats.",
      image: "notation/05-time-signature-4-4.svg",
    },
    {
      question: "What is another name for a bar?",
      choices: ["Measure", "Clef", "Dynamic"],
      answer: "Measure",
      explanation: "Bar and measure mean the same thing: one beat group between bar lines.",
      image: "notation/06-bar-lines.svg",
    },
    {
      question: "If you see a rest, what should you do?",
      choices: [
        "Stay silent for that duration",
        "Play the previous note again",
        "Get gradually louder",
      ],
      answer: "Stay silent for that duration",
      explanation: "A rest is written silence. Its shape shows how long the silence lasts.",
      image: "notation/07-notes-and-rests.svg",
    },
    {
      question: "What does f usually mean as a dynamic mark?",
      choices: ["Forte — loud", "Piano — soft", "Fast"],
      answer: "Forte — loud",
      explanation: "The letter f stands for forte, which means play loudly.",
      image: "notation/09-dynamics.svg",
    },
    {
      question: "What does p usually mean as a dynamic mark?",
      choices: ["Piano — soft", "Forte — loud", "Pause"],
      answer: "Piano — soft",
      explanation: "The letter p stands for piano, which means play softly.",
      image: "notation/09-dynamics.svg",
    },
    {
      question: "What should you do when you reach an end-repeat sign?",
      choices: [
        "Go back and play the repeated section again",
        "Skip to the final note only",
        "Change clef immediately",
      ],
      answer: "Go back and play the repeated section again",
      explanation: "An end-repeat sign sends the musician back to the matching begin-repeat, or to the start if none is marked.",
      image: "notation/08-repeat-sign.svg",
    },
    {
      question: "Why do musical symbols matter in a piano score?",
      choices: [
        "They tell musicians what and how to play",
        "They only decorate the page",
        "They replace the need for a steady pulse",
      ],
      answer: "They tell musicians what and how to play",
      explanation:
        "Symbols communicate pitch, duration, silence, grouping, repetition and expression so musicians can share the same plan.",
      image: "notation/10-mini-score-fragment.svg",
    },
    {
      question: "Which list names elements you may annotate in Task A?",
      choices: [
        "Staff, clef, key signature, time signature, bar line, notes, rests, repeat, dynamics",
        "Only the song title and composer",
        "Only the page number and date",
      ],
      answer:
        "Staff, clef, key signature, time signature, bar line, notes, rests, repeat, dynamics",
      explanation:
        "Task A asks you to redraw a short piano score and explain the symbols your teacher chooses from this set.",
      image: "notation/10-mini-score-fragment.svg",
    },
  ],
};
