"use client";

import { useState } from "react";
import { subjects, type Card, type Deck, type Subject } from "./decks";
import { prepareCards } from "./prepareCards";

/** Published student root on planwellmd.com */
const FLASH_BASE = "/flash/";

type Session = {
  subject: Subject;
  deck: Deck;
  cards: Card[];
};

function assetUrl(path: string): string {
  return `${FLASH_BASE}${path.replace(/^\//, "")}`;
}

export default function Flashcards() {
  const [subject, setSubject] = useState<Subject | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);

  function start(nextSubject: Subject, deck: Deck) {
    setSubject(nextSubject);
    setSession({ subject: nextSubject, deck, cards: prepareCards(deck.cards) });
    setIndex(0);
    setSelected(null);
  }

  function leaveDeck() {
    setSession(null);
    setIndex(0);
    setSelected(null);
  }

  function leaveSubject() {
    leaveDeck();
    setSubject(null);
  }

  if (!subject) {
    return (
      <main className="library">
        <header className="site-header">
          <span className="mark">G6</span>
          <div>
            <strong>Grade 6 Flashcards</strong>
            <span>Choose a subject</span>
          </div>
        </header>

        <section className="intro">
          <p className="eyebrow">Learn · discuss · practise</p>
          <h1>Music or Design.</h1>
          <p>Pick a subject, then choose a topic deck.</p>
        </section>

        <section className="deck-list" aria-label="Subjects">
          {subjects.map((item) => (
            <article className="deck" key={item.id}>
              <div>
                <span className="deck-meta">{item.decks.length} {item.decks.length === 1 ? "deck" : "decks"}</span>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
              </div>
              <div className="deck-actions">
                <button className="primary" onClick={() => setSubject(item)}>
                  Open {item.title}
                </button>
              </div>
            </article>
          ))}
        </section>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="library">
        <header className="site-header">
          <span className="mark">{subject.mark}</span>
          <div>
            <strong>Grade 6 {subject.title}</strong>
            <span>Flashcard library</span>
          </div>
        </header>

        <section className="intro">
          <p className="eyebrow">Learn · discuss · practise</p>
          <h1>Choose a topic.</h1>
          <p>Think before answering. Read the explanation. Talk about ideas that surprise you.</p>
        </section>

        <section className="deck-list" aria-label="Available topics">
          {subject.decks.map((deck) => (
            <article className="deck" key={deck.id}>
              <div>
                <span className="deck-meta">{deck.cards.length} questions</span>
                <h2>{deck.title}</h2>
                <p>{deck.description}</p>
              </div>
              <div className="deck-actions">
                <button className="primary" onClick={() => start(subject, deck)}>
                  Practice now
                </button>
              </div>
            </article>
          ))}
        </section>

        <p className="back-row">
          <button className="text-button" onClick={leaveSubject}>
            ← All subjects
          </button>
        </p>
      </main>
    );
  }

  if (index >= session.cards.length) {
    return (
      <main className="centered">
        <section className="complete">
          <span className="complete-mark">✓</span>
          <p className="eyebrow">Deck complete</p>
          <h1>Good work.</h1>
          <p>
            You finished all {session.cards.length} questions in {session.deck.title}.
          </p>
          <div className="complete-actions">
            <button className="primary" onClick={() => start(session.subject, session.deck)}>
              Start again
            </button>
            <button className="secondary" onClick={leaveDeck}>
              Back to topics
            </button>
          </div>
        </section>
      </main>
    );
  }

  const card = session.cards[index];
  const answered = selected !== null;
  const teachingCount = session.deck.teachingCount ?? 5;
  const isDiscussionCard = index < teachingCount;

  return (
    <main className="practice">
      <header className="practice-header">
        <button className="text-button" onClick={leaveDeck}>
          ← Topics
        </button>
        <div>
          <strong>{session.deck.title}</strong>
          <span>{isDiscussionCard ? "Discuss together" : "Independent practice"}</span>
        </div>
        <span className="counter">
          {index + 1}/{session.cards.length}
        </span>
      </header>

      <div className="progress" aria-label={`${index + 1} of ${session.cards.length}`}>
        <span style={{ width: `${((index + 1) / session.cards.length) * 100}%` }} />
      </div>

      <article className="question-card">
        <p className="stage">{isDiscussionCard ? "Predict, then discuss" : "Choose the best answer"}</p>
        <h1>{card.question}</h1>

        {card.image && (
          <figure className="card-image">
            {/* Static SVG notation assets; next/image is unnecessary here. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={assetUrl(card.image)} alt="" />
          </figure>
        )}

        <div className="choices">
          {card.choices.map((choice, choiceIndex) => {
            const correct = answered && choice === card.answer;
            const wrong = selected === choice && choice !== card.answer;
            return (
              <button
                className={`${correct ? "correct" : ""} ${wrong ? "wrong" : ""}`}
                disabled={answered}
                key={choice}
                onClick={() => setSelected(choice)}
              >
                <span>{String.fromCharCode(65 + choiceIndex)}</span>
                {choice}
              </button>
            );
          })}
        </div>

        {answered && (
          <section className="explanation" aria-live="polite">
            <p className="result">{selected === card.answer ? "Yes." : `The best answer is: ${card.answer}`}</p>
            <p>{card.explanation}</p>
            {card.discuss && (
              <div className="discuss">
                <strong>Discuss</strong>
                <p>{card.discuss}</p>
              </div>
            )}
            <button
              className="primary next"
              onClick={() => {
                setIndex(index + 1);
                setSelected(null);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              {index + 1 === session.cards.length ? "Finish deck" : "Next question"} →
            </button>
          </section>
        )}
      </article>
    </main>
  );
}
