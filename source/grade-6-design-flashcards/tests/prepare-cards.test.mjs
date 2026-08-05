import assert from "node:assert/strict";
import test from "node:test";
import { prepareCards } from "../app/prepareCards.ts";

test("balances correct answers across choice positions", () => {
  const cards = Array.from({ length: 25 }, (_, index) => ({
    question: `Question ${index + 1}`,
    choices: [`Correct ${index}`, `Wrong ${index}-1`, `Wrong ${index}-2`],
    answer: `Correct ${index}`,
  }));

  const prepared = prepareCards(cards, () => 0.42);
  const positions = prepared.map((card) => card.choices.indexOf(card.answer));
  const counts = [0, 1, 2].map(
    (position) => positions.filter((value) => value === position).length,
  );

  assert.deepEqual(counts.sort((a, b) => a - b), [8, 8, 9]);
  assert.notDeepEqual(positions, Array(25).fill(0));
  assert.equal(cards.every((card) => card.choices[0] === card.answer), true);
});
