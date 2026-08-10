import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const publicDeckRoot = new URL("../../../design/hardware-software/", import.meta.url);

test("published flashcard app includes the new input and output deck", async () => {
  const [html, app, deckData] = await Promise.all([
    readFile(new URL("index.html", publicDeckRoot), "utf8"),
    readFile(new URL("app.js", publicDeckRoot), "utf8"),
    readFile(new URL("input-output-deck.js", publicDeckRoot), "utf8"),
  ]);

  assert.match(html, /input-output-deck\.js/);
  assert.match(app, /window\.inputOutputDeck/);
  assert.match(app, /discussion-block/);
  assert.match(app, /introCount/);
  assert.match(deckData, /Input and Output Devices/);
  assert.equal((deckData.match(/"question":/g) ?? []).length, 30);
  assert.equal((deckData.match(/"discussion":/g) ?? []).length, 8);
});
