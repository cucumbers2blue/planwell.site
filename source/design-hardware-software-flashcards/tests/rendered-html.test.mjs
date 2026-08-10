import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the three-deck learning experience", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Digital Systems Lab \| Grade 6 Design<\/title>/i);
  assert.match(html, /Choose your challenge\./);
  assert.match(html, /Hardware and Software Basics/);
  assert.match(html, /Applying the Idea/);
  assert.match(html, /Input and Output Devices/);
  assert.match(html, /Cards you miss will come back/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/i);
});

test("contains mastery behavior and retains the original twenty cards", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  const cardIds = page.match(/\bid:\s*\d+,/g) ?? [];
  assert.equal(cardIds.length, 20);
  assert.match(page, /This card will return later/);
  assert.match(page, /Go deeper/);
  assert.match(page, /setQueue\(\(cards\) => \[\.\.\.cards\.slice\(1\), cards\[0\]\]\)/);
  assert.match(layout, /Digital Systems Lab/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  await assert.rejects(access(new URL("../app/_sites-preview/SkeletonPreview.tsx", import.meta.url)));
  await access(new URL(".openai/hosting.json", root));
});
