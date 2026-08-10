import assert from "node:assert/strict";
import test from "node:test";
import { decks } from "../app/decks.ts";

test("input and output deck provides a complete teaching sequence and practice set", () => {
  const deck = decks.find((item) => item.id === "input-output");

  assert.ok(deck, "input-output deck should exist");
  assert.equal(deck.cards.length, 30);
  assert.ok(deck.introCount >= 6);

  const teachingCards = deck.cards.slice(0, deck.introCount);
  assert.equal(
    teachingCards.every(
      (card) => card.deeper.length > 40 && (card.discussion?.length ?? 0) >= 2,
    ),
    true,
  );

  const teachingText = teachingCards
    .flatMap((card) => [card.question, card.answer, card.deeper])
    .join(" ")
    .toLowerCase();
  for (const term of ["hardware", "software", "input", "output"]) {
    assert.match(teachingText, new RegExp(`\\b${term}\\b`));
  }

  assert.equal(
    deck.cards.every(
      (card) =>
        card.choices.includes(card.answer) &&
        new Set(card.choices).size === card.choices.length &&
        card.deeper.length > 30,
    ),
    true,
  );
  assert.equal(new Set(deck.cards.map((card) => card.id)).size, 30);

  const answerPositions = deck.cards.map((card) => card.choices.indexOf(card.answer));
  const positionCounts = [0, 1, 2].map(
    (position) => answerPositions.filter((value) => value === position).length,
  );
  assert.ok(Math.max(...positionCounts) - Math.min(...positionCounts) <= 2);
});
