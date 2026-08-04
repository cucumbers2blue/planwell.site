"use client";

import { useMemo, useState } from "react";
import styles from "./page.module.css";

type Card = {
  question: string;
  choices: string[];
  answer: string;
  note: string;
};

type Deck = {
  id: string;
  label: string;
  title: string;
  intro: string;
  symbol: string;
  cards: Card[];
};

const decks: Deck[] = [
  {
    id: "footprint",
    label: "Trail",
    title: "Digital Footprint",
    intro: "Notice the trail you create whenever you use the internet.",
    symbol: "◌",
    cards: [
      {
        question: "What is a digital footprint?",
        choices: ["The trail you leave online", "A computer password", "A broken screen"],
        answer: "The trail you leave online",
        note: "Posts, comments, photos, likes and searches can all add to your digital footprint.",
      },
      {
        question: "Who might see something you share online?",
        choices: ["Only your closest friend", "People you have never met", "Nobody after one day"],
        answer: "People you have never met",
        note: "Online information can travel beyond the people you first shared it with.",
      },
      {
        question: "What can happen to a photo shared online?",
        choices: ["It can be copied and reshared", "It becomes completely private", "It cannot leave the app"],
        answer: "It can be copied and reshared",
        note: "Someone can save or share a copy without asking you first.",
      },
      {
        question: "Does deleting a post guarantee it is gone forever?",
        choices: ["Yes, always", "No, copies may still exist", "Only on weekends"],
        answer: "No, copies may still exist",
        note: "Screenshots, backups and shared copies can remain after the original is deleted.",
      },
      {
        question: "Why should you pause before posting?",
        choices: ["It may affect how people see you", "It makes the internet faster", "It charges your device"],
        answer: "It may affect how people see you",
        note: "Your digital footprint can shape how others see you now and in the future.",
      },
      {
        question: "Which information might a music app remember?",
        choices: ["Music you listen to", "Your shoe size automatically", "Your classroom wall colour"],
        answer: "Music you listen to",
        note: "Apps and sites can store information about how you use them, such as listening or search history.",
      },
    ],
  },
  {
    id: "passwords",
    label: "Shield",
    title: "Password Power",
    intro: "Build strong passwords and keep private information protected.",
    symbol: "✦",
    cards: [
      {
        question: "Which password is strongest?",
        choices: ["Blue!Tiger47", "password", "123456"],
        answer: "Blue!Tiger47",
        note: "A strong password mixes upper- and lowercase letters, numbers and symbols.",
      },
      {
        question: "Should you use the same password for every account?",
        choices: ["Yes, it is easier", "No, use a different one", "Only for games"],
        answer: "No, use a different one",
        note: "Different passwords stop one stolen password from unlocking all your accounts.",
      },
      {
        question: "Who should know your password?",
        choices: ["Everyone in your class", "Your online friends", "Only you and a trusted adult when needed"],
        answer: "Only you and a trusted adult when needed",
        note: "Passwords should stay private—even from friends. Ask a trusted adult for help when necessary.",
      },
      {
        question: "Why is your birthday a weak password?",
        choices: ["It may be easy to discover", "It has too many symbols", "It changes every day"],
        answer: "It may be easy to discover",
        note: "Personal facts such as birthdays and pet names may be known or found by other people.",
      },
      {
        question: "What should you do if a friend asks for your password?",
        choices: ["Share it once", "Keep it private", "Post it in the group chat"],
        answer: "Keep it private",
        note: "A good friend will respect your privacy and will not need your password.",
      },
      {
        question: "Why should your home address stay private online?",
        choices: ["It reveals where you live", "It uses too many letters", "It makes photos blurry"],
        answer: "It reveals where you live",
        note: "Private information can put your safety at risk. Tell a trusted adult if someone asks for it.",
      },
    ],
  },
  {
    id: "netiquette",
    label: "Signal",
    title: "Netiquette",
    intro: "Communicate clearly, kindly and respectfully with other people.",
    symbol: "≈",
    cards: [
      {
        question: "What should you do before sending a message?",
        choices: ["Think before you type", "Send it as fast as possible", "Add more capital letters"],
        answer: "Think before you type",
        note: "A short pause helps you check whether your message is clear, necessary and kind.",
      },
      {
        question: "What can WRITING IN ALL CAPS suggest?",
        choices: ["Shouting", "Whispering", "Singing"],
        answer: "Shouting",
        note: "Use normal capitalisation so your message does not sound angry or aggressive.",
      },
      {
        question: "How should you respond to a different opinion?",
        choices: ["Respectfully", "With an insult", "By sharing private details"],
        answer: "Respectfully",
        note: "You can disagree with an idea while still treating the person with respect.",
      },
      {
        question: "What should you do with an unkind message you are about to send?",
        choices: ["Do not send it", "Add an emoji and send it", "Send it to more people"],
        answer: "Do not send it",
        note: "If it is unkind, stop. Rewrite it respectfully or speak with a trusted adult.",
      },
      {
        question: "Why can written messages be misunderstood?",
        choices: ["They lack tone and facial expressions", "They are always too long", "Screens change every word"],
        answer: "They lack tone and facial expressions",
        note: "Readers cannot always hear your tone or see your expression, so choose words carefully.",
      },
      {
        question: "A message makes you feel unsafe. What is the best next step?",
        choices: ["Tell a trusted adult", "Reply with something mean", "Share your address"],
        answer: "Tell a trusted adult",
        note: "You do not have to manage an unsafe situation alone. Save the message and ask for help.",
      },
    ],
  },
];

function shuffled<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

export default function DigitalCitizenshipPage() {
  const [deck, setDeck] = useState<Deck | null>(null);
  const [queue, setQueue] = useState<Card[]>([]);
  const [choice, setChoice] = useState<string | null>(null);
  const [mastered, setMastered] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const current = queue[0];
  const isCorrect = choice === current?.answer;
  const total = deck?.cards.length ?? 0;
  const progress = total ? ((mastered + (isCorrect ? 1 : 0)) / total) * 100 : 0;
  const allCards = useMemo(() => decks.reduce((sum, item) => sum + item.cards.length, 0), []);

  function start(nextDeck: Deck) {
    setDeck(nextDeck);
    setQueue(shuffled(nextDeck.cards));
    setChoice(null);
    setMastered(0);
    setAttempts(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function answer(nextChoice: string) {
    if (choice) return;
    setChoice(nextChoice);
    setAttempts((value) => value + 1);
  }

  function continuePractice() {
    if (!current || !choice) return;
    if (isCorrect) {
      setMastered((value) => value + 1);
      setQueue((cards) => cards.slice(1));
    } else {
      setQueue((cards) => [...cards.slice(1), cards[0]]);
    }
    setChoice(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function home() {
    setDeck(null);
    setQueue([]);
    setChoice(null);
    setMastered(0);
  }

  if (!deck) {
    return (
      <main className={styles.page}>
        <header className={styles.topbar}>
          <div className={styles.logo}>DC</div>
          <div>
            <strong>Digital Citizenship</strong>
            <span>Grade 6 · Design</span>
          </div>
          <span className={styles.count}>{allCards} cards</span>
        </header>

        <section className={styles.hero}>
          <p className={styles.eyebrow}>Your digital passport</p>
          <h1>Be smart. Be safe. Be kind.</h1>
          <p>Choose a topic. Missed cards return until you have mastered the whole deck.</p>
          <div className={styles.rules} aria-label="Three digital citizenship habits">
            <span>PAUSE</span><i>→</i><span>PROTECT</span><i>→</i><span>RESPECT</span>
          </div>
        </section>

        <section className={styles.deckGrid} aria-label="Choose a topic">
          {decks.map((item, index) => (
            <button className={styles.deck} key={item.id} onClick={() => start(item)}>
              <span className={styles.deckIndex}>0{index + 1}</span>
              <span className={styles.symbol} aria-hidden="true">{item.symbol}</span>
              <span className={styles.deckLabel}>{item.label}</span>
              <strong>{item.title}</strong>
              <span className={styles.deckIntro}>{item.intro}</span>
              <span className={styles.deckStart}>Start {item.cards.length} cards <b>→</b></span>
            </button>
          ))}
        </section>
      </main>
    );
  }

  if (!current) {
    return (
      <main className={`${styles.page} ${styles.centered}`}>
        <section className={styles.complete}>
          <span className={styles.completeMark}>✓</span>
          <p className={styles.eyebrow}>Passport stamped</p>
          <h1>Topic mastered.</h1>
          <p>You completed <strong>{deck.title}</strong> in {attempts} attempt{attempts === 1 ? "" : "s"}.</p>
          <div className={styles.actions}>
            <button className={styles.primary} onClick={() => start(deck)}>Practise again</button>
            <button className={styles.linkButton} onClick={home}>Choose another topic</button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.practice}>
      <header className={styles.practiceHeader}>
        <button className={styles.linkButton} onClick={home}>← Topics</button>
        <strong>{deck.title}</strong>
        <span>{mastered + (isCorrect ? 1 : 0)}/{total} mastered</span>
      </header>
      <div className={styles.progress} role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={mastered + (isCorrect ? 1 : 0)}>
        <span style={{ width: `${progress}%` }} />
      </div>

      <section className={styles.questionArea}>
        <div className={styles.questionMeta}><span>Choose the best answer</span><span>{queue.length} in play</span></div>
        <article className={styles.card}>
          <span className={styles.cardSymbol} aria-hidden="true">{deck.symbol}</span>
          <h1>{current.question}</h1>
          <div className={styles.answers}>
            {current.choices.map((item, index) => {
              const state = choice === item ? (item === current.answer ? styles.correct : styles.wrong) : "";
              return (
                <button key={item} className={`${styles.answer} ${state}`} disabled={Boolean(choice)} onClick={() => answer(item)}>
                  <span>{String.fromCharCode(65 + index)}</span>{item}
                </button>
              );
            })}
          </div>
          <div className={styles.feedback} aria-live="polite">
            {choice && isCorrect && <div className={styles.success}><strong>Correct — card mastered</strong><p>{current.note}</p><button className={styles.primary} onClick={continuePractice}>{queue.length === 1 ? "Finish topic" : "Next card"} →</button></div>}
            {choice && !isCorrect && <div className={styles.retry}><strong>Not yet</strong><p>This card will return later so you can try again.</p><button className={styles.secondary} onClick={continuePractice}>Continue</button></div>}
          </div>
        </article>
      </section>
    </main>
  );
}
