import assert from "node:assert/strict";
import test from "node:test";
import { prepareDeckCards } from "../app/prepareDeckCards.ts";

test("keeps teaching cards first and shuffles only the practice cards", () => {
  const cards = Array.from({ length: 12 }, (_, index) => ({ id: index + 1 }));

  const prepared = prepareDeckCards(cards, 8, () => 0);

  assert.deepEqual(
    prepared.slice(0, 8).map((card) => card.id),
    [1, 2, 3, 4, 5, 6, 7, 8],
  );
  assert.deepEqual(
    prepared.slice(8).map((card) => card.id).sort((a, b) => a - b),
    [9, 10, 11, 12],
  );
  assert.notDeepEqual(
    prepared.slice(8).map((card) => card.id),
    [9, 10, 11, 12],
  );
  assert.deepEqual(
    cards.map((card) => card.id),
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  );
});
