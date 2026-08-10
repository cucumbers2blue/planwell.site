import { writeFile } from "node:fs/promises";
import { inputOutputDeck } from "../app/decks.ts";

const output = new URL(
  "../../../design/hardware-software/input-output-deck.js",
  import.meta.url,
);
const source = `window.inputOutputDeck = ${JSON.stringify(inputOutputDeck, null, 2)};\n`;

await writeFile(output, source, "utf8");
