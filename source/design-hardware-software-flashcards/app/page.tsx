"use client";

import { useState } from "react";
import { inputOutputDeck } from "./decks";
import { prepareDeckCards } from "./prepareDeckCards";

type Card = {
  id: number;
  question: string;
  choices: string[];
  answer: string;
  deeper: string;
  discussion?: string[];
};

type Deck = {
  id: "basics" | "applying" | "input-output";
  number: string;
  title: string;
  description: string;
  accent: string;
  introCount?: number;
  cards: Card[];
};

const decks: Deck[] = [
  {
    id: "basics",
    number: "01",
    title: "Hardware and Software Basics",
    description:
      "Build the foundation: definitions, examples and the essential difference.",
    accent: "cyan",
    cards: [
      {
        id: 1,
        question: "What is hardware?",
        choices: ["Physical computer parts", "Programs", "Websites"],
        answer: "Physical computer parts",
        deeper:
          "Hardware includes external devices such as keyboards and monitors, but also internal parts such as the processor, memory and storage drive.",
      },
      {
        id: 2,
        question: "What is software?",
        choices: ["Programs and instructions", "Computer parts", "Wires"],
        answer: "Programs and instructions",
        deeper:
          "Software tells the hardware what to do. Operating systems manage the computer, while applications help users perform particular tasks.",
      },
      {
        id: 3,
        question: "Which item is hardware?",
        choices: ["Keyboard", "Google Chrome", "PowerPoint"],
        answer: "Keyboard",
        deeper:
          "A keyboard converts each key press into an electronic signal that the computer can understand.",
      },
      {
        id: 4,
        question: "Which item is software?",
        choices: ["Monitor", "Mouse", "Microsoft Word"],
        answer: "Microsoft Word",
        deeper:
          "Word is application software designed for creating documents. It relies on the operating system and physical computer to work.",
      },
      {
        id: 5,
        question: "Is a printer hardware or software?",
        choices: ["Hardware", "Software"],
        answer: "Hardware",
        deeper:
          "A printer is a physical output device. It also needs software called a printer driver to communicate with the computer.",
      },
      {
        id: 6,
        question: "Is a computer game hardware or software?",
        choices: ["Hardware", "Software"],
        answer: "Software",
        deeper:
          "The game contains programmed rules, instructions, images and sounds. It needs hardware such as a processor, screen and controller to run.",
      },
      {
        id: 7,
        question: "Which can you physically touch?",
        choices: ["Hardware", "Software"],
        answer: "Hardware",
        deeper:
          "Some hardware is easy to see, while other components are hidden inside the computer case.",
      },
      {
        id: 8,
        question: "Which item is software?",
        choices: ["Laptop", "Windows", "Speaker"],
        answer: "Windows",
        deeper:
          "Windows is an operating system. It manages the computer’s hardware and provides a platform for applications to run.",
      },
      {
        id: 9,
        question: "Which item is hardware?",
        choices: ["YouTube", "Keyboard", "Google Docs"],
        answer: "Keyboard",
        deeper:
          "YouTube and Google Docs are software services accessed through a browser. The keyboard is a physical device used to control them.",
      },
      {
        id: 10,
        question: "What gives hardware instructions?",
        choices: ["Software", "Electricity", "The desk"],
        answer: "Software",
        deeper:
          "The processor follows software instructions to perform calculations and control other components. Hardware without software has nothing useful to execute.",
      },
    ],
  },
  {
    id: "applying",
    number: "02",
    title: "Applying the Idea",
    description:
      "Use what you know: classify combinations, situations and simple problems.",
    accent: "orange",
    cards: [
      {
        id: 1,
        question:
          "A student types in Microsoft Word. Which item is hardware?",
        choices: ["Keyboard", "Microsoft Word", "Document"],
        answer: "Keyboard",
        deeper:
          "Pressing a key closes a small electronic circuit. The keyboard sends a code representing that key to the computer.",
      },
      {
        id: 2,
        question:
          "A student types in Microsoft Word. Which item is software?",
        choices: ["Keyboard", "Microsoft Word", "Screen"],
        answer: "Microsoft Word",
        deeper:
          "Word interprets the keyboard signals and displays the corresponding letters. The hardware and software work together.",
      },
      {
        id: 3,
        question: "Which pair contains only hardware?",
        choices: [
          "Mouse and monitor",
          "Chrome and Word",
          "Keyboard and PowerPoint",
        ],
        answer: "Mouse and monitor",
        deeper:
          "Both are physical devices, but they perform different jobs. The mouse sends information into the system, while the monitor presents information to the user.",
      },
      {
        id: 4,
        question: "Which pair contains only software?",
        choices: [
          "Chrome and PowerPoint",
          "Mouse and printer",
          "Screen and Windows",
        ],
        answer: "Chrome and PowerPoint",
        deeper:
          "Chrome is designed for accessing websites, while PowerPoint is designed for presentations. Different software is created for different purposes.",
      },
      {
        id: 5,
        question:
          "Which pair contains one hardware item and one software item?",
        choices: [
          "Keyboard and Chrome",
          "Mouse and printer",
          "Word and PowerPoint",
        ],
        answer: "Keyboard and Chrome",
        deeper:
          "The keyboard provides physical controls, while Chrome interprets the user’s actions and communicates with websites.",
      },
      {
        id: 6,
        question: "Which part displays a computer game?",
        choices: ["Monitor", "Game software", "Keyboard"],
        answer: "Monitor",
        deeper:
          "A monitor creates an image using thousands or millions of tiny pixels. The computer sends instructions describing the colour of every pixel.",
      },
      {
        id: 7,
        question:
          "Which item contains the instructions for a computer game?",
        choices: ["Game software", "Monitor", "Mouse"],
        answer: "Game software",
        deeper:
          "Game software stores rules such as movement, scoring and what happens when objects interact. The processor executes these instructions.",
      },
      {
        id: 8,
        question:
          "The screen is cracked. Is this a hardware or software problem?",
        choices: ["Hardware", "Software"],
        answer: "Hardware",
        deeper:
          "Physical damage requires repairing or replacing the affected component. Installing new software cannot repair broken glass.",
      },
      {
        id: 9,
        question:
          "An application freezes. Is this probably a hardware or software problem?",
        choices: ["Hardware", "Software"],
        answer: "Software",
        deeper:
          "The program may have encountered an error or become unable to complete an instruction. However, weak or failing hardware can sometimes cause similar symptoms.",
      },
      {
        id: 10,
        question: "Why does a computer need hardware and software?",
        choices: [
          "Hardware runs instructions provided by software",
          "They are the same thing",
          "Software can work without a device",
        ],
        answer: "Hardware runs instructions provided by software",
        deeper:
          "A useful computer system requires both. Software provides instructions, while hardware performs calculations, stores information and communicates with the user.",
      },
    ],
  },
  inputOutputDeck,
];

export default function Home() {
  const [deck, setDeck] = useState<Deck | null>(null);
  const [queue, setQueue] = useState<Card[]>([]);
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const [selected, setSelected] = useState<string | null>(null);
  const [mastered, setMastered] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const current = queue[0];
  const total = deck?.cards.length ?? 0;
  const visibleMastered = mastered + (status === "correct" ? 1 : 0);
  const progress = total ? (visibleMastered / total) * 100 : 0;

  function startDeck(nextDeck: Deck) {
    setDeck(nextDeck);
    setQueue(prepareDeckCards(nextDeck.cards, nextDeck.introCount));
    setStatus("idle");
    setSelected(null);
    setMastered(0);
    setAttempts(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function selectAnswer(choice: string) {
    if (!current || status !== "idle") return;
    setSelected(choice);
    setAttempts((value) => value + 1);
    setStatus(choice === current.answer ? "correct" : "wrong");
  }

  function continueDeck() {
    if (!current) return;
    if (status === "correct") {
      setMastered((value) => value + 1);
      setQueue((cards) => cards.slice(1));
    } else {
      setQueue((cards) => [...cards.slice(1), cards[0]]);
    }
    setStatus("idle");
    setSelected(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function returnHome() {
    setDeck(null);
    setQueue([]);
    setStatus("idle");
    setSelected(null);
    setMastered(0);
    setAttempts(0);
  }

  if (!deck) {
    return (
      <main className="home-shell">
        <div className="ambient ambient-one" />
        <div className="ambient ambient-two" />
        <header className="topbar">
          <div className="brand-mark">DS</div>
          <div>
            <p className="brand-name">Digital Systems Lab</p>
            <p className="brand-meta">Grade 6 · Design</p>
          </div>
          <span className="week-chip">This week</span>
        </header>

        <section className="hero">
          <p className="eyebrow">Hardware + Software</p>
          <h1>Choose your challenge.</h1>
          <p className="hero-copy">
            Pick a deck. Cards you miss will come back until you have
            mastered every one.
          </p>
          <div className="system-line" aria-label="The relationship between hardware and software">
            <span>YOU</span>
            <i>→</i>
            <span>HARDWARE</span>
            <i>↔</i>
            <span>SOFTWARE</span>
          </div>
        </section>

        <section className="deck-grid" aria-label="Choose a flashcard deck">
          {decks.map((item) => (
            <button
              className={`deck-card ${item.accent}`}
              key={item.id}
              onClick={() => startDeck(item)}
            >
              <span className="deck-number">{item.number}</span>
              <span className="deck-kicker">{item.cards.length} cards</span>
              <strong>{item.title}</strong>
              <span className="deck-description">{item.description}</span>
              <span className="deck-action">
                Start deck <b aria-hidden="true">→</b>
              </span>
            </button>
          ))}
        </section>

        <footer>
          <span>Learn it.</span>
          <span>Test it.</span>
          <span>Master it.</span>
        </footer>
      </main>
    );
  }

  if (!current) {
    return (
      <main className="completion-shell">
        <div className="completion-card">
          <span className="completion-icon" aria-hidden="true">✓</span>
          <p className="eyebrow">Deck complete</p>
          <h1>You mastered all {total} cards.</h1>
          <p>
            You answered {attempts} question{attempts === 1 ? "" : "s"} to
            complete <strong>{deck.title}</strong>.
          </p>
          <div className="completion-actions">
            <button className="primary-button" onClick={() => startDeck(deck)}>
              Play this deck again
            </button>
            <button className="text-button" onClick={returnHome}>
              Choose another deck
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="practice-shell">
      <header className="practice-header">
        <button className="back-button" onClick={returnHome}>
          ← Decks
        </button>
        <div className="practice-title">
          <span>{deck.number}</span>
          <strong>{deck.title}</strong>
        </div>
        <span className="mastery-count">{visibleMastered}/{total} mastered</span>
      </header>

      <div
        className="progress-track"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={visibleMastered}
        aria-label={`${visibleMastered} of ${total} cards mastered`}
      >
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <section className="question-wrap">
        <div className="question-meta">
          <span>Choose the best answer</span>
          <span>{queue.length} card{queue.length === 1 ? "" : "s"} in play</span>
        </div>

        <article className="question-card">
          <h1>{current.question}</h1>
          <div className="answer-list">
            {current.choices.map((choice, index) => {
              const isSelected = selected === choice;
              const answerClass =
                status === "correct" && isSelected
                  ? "is-correct"
                  : status === "wrong" && isSelected
                    ? "is-wrong"
                    : "";
              return (
                <button
                  className={`answer-button ${answerClass}`}
                  key={choice}
                  onClick={() => selectAnswer(choice)}
                  disabled={status !== "idle"}
                >
                  <span>{String.fromCharCode(65 + index)}</span>
                  {choice}
                </button>
              );
            })}
          </div>

          <div className="feedback" aria-live="polite">
            {status === "correct" && (
              <div className="correct-panel">
                <p className="feedback-label">Correct — card mastered</p>
                <h2>Go deeper</h2>
                <p>{current.deeper}</p>
                {current.discussion && (
                  <div className="discussion-block">
                    <h3>Discuss</h3>
                    <ul>
                      {current.discussion.map((question) => (
                        <li key={question}>{question}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <button className="primary-button" onClick={continueDeck}>
                  {queue.length === 1 ? "Finish deck" : "Next card"} →
                </button>
              </div>
            )}
            {status === "wrong" && (
              <div className="wrong-panel">
                <p className="feedback-label">Not yet</p>
                <p>
                  No problem. This card will return later so you can try it
                  again.
                </p>
                <button className="secondary-button" onClick={continueDeck}>
                  Continue
                </button>
              </div>
            )}
          </div>
        </article>
      </section>
    </main>
  );
}
