import assert from "node:assert/strict";
import test from "node:test";
import { musicTaskAScoreSymbolsDeck } from "../app/musicTaskAScoreSymbolsDeck.ts";

test("music Task A deck has 20 cards with teaching discussion content", () => {
  const deck = musicTaskAScoreSymbolsDeck;
  assert.equal(deck.id, "task-a-score-symbols");
  assert.equal(deck.cards.length, 20);
  assert.equal(deck.teachingCount, 8);

  const teaching = deck.cards.slice(0, deck.teachingCount);
  assert.equal(teaching.every((card) => Boolean(card.discuss)), true);
  assert.equal(teaching.every((card) => Boolean(card.image)), true);
  assert.equal(teaching.every((card) => card.explanation.length > 60), true);

  const text = teaching
    .flatMap((card) => [card.question, card.answer, card.explanation])
    .join(" ")
    .toLowerCase();
  for (const term of [
    "staff",
    "clef",
    "key signature",
    "time signature",
    "bar",
    "rest",
    "repeat",
    "dynamic",
  ]) {
    assert.equal(text.includes(term), true, `missing teaching term: ${term}`);
  }

  assert.equal(
    deck.cards.every(
      (card) =>
        card.choices.length === 3 &&
        new Set(card.choices).size === 3 &&
        card.choices.includes(card.answer),
    ),
    true,
  );
  assert.equal(new Set(deck.cards.map((card) => card.question)).size, 20);
});
