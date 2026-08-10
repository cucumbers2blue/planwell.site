import assert from "node:assert/strict";
import test from "node:test";
import { decks } from "../app/decks.ts";

test("hardware, software, input and output deck follows the library workflow", () => {
  const deck = decks.find((item) => item.id === "hardware-software-input-output");

  assert.ok(deck, "new weekly deck should be available in the shared library");
  assert.equal(deck.title, "Hardware, Software, Input and Output");
  assert.equal(deck.cards.length, 30);

  const teachingCards = deck.cards.slice(0, 5);
  assert.equal(teachingCards.every((card) => Boolean(card.discuss)), true);

  const teachingText = teachingCards
    .flatMap((card) => [card.question, card.answer, card.explanation, card.discuss ?? ""])
    .join(" ")
    .toLowerCase();
  for (const term of ["hardware", "software", "input", "output"]) {
    assert.match(teachingText, new RegExp(`\\b${term}\\b`));
  }

  assert.equal(
    deck.cards.every(
      (card) =>
        card.choices.length === 3 &&
        new Set(card.choices).size === 3 &&
        card.choices.includes(card.answer) &&
        card.explanation.length > 60,
    ),
    true,
  );
  assert.equal(new Set(deck.cards.map((card) => card.question)).size, 30);
});
