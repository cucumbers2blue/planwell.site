import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import test from "node:test";

test("obsolete standalone hardware and software site is removed", async () => {
  await assert.rejects(
    access(new URL("../../../design/hardware-software/", import.meta.url)),
  );
  await assert.rejects(
    access(new URL("../../design-hardware-software-flashcards/", import.meta.url)),
  );
});
