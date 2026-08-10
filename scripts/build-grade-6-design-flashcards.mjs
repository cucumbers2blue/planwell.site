import { cp, lstat, mkdir, rm, writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourceDirectory = resolve(repositoryRoot, "source/grade-6-design-flashcards");
const clientDirectory = resolve(sourceDirectory, "dist/client");
const publicDirectory = resolve(repositoryRoot, "flash");
const assetsDirectory = resolve(publicDirectory, "assets");
const notationSource = resolve(sourceDirectory, "public/notation");
const notationTarget = resolve(publicDirectory, "notation");

execFileSync("npm", ["run", "build"], {
  cwd: sourceDirectory,
  stdio: "inherit",
});

const workerUrl = pathToFileURL(resolve(sourceDirectory, "dist/server/index.js"));
workerUrl.searchParams.set("static-export", Date.now().toString());
const { default: worker } = await import(workerUrl.href);

const response = await worker.fetch(
  new Request("https://planwellmd.com/", {
    headers: { accept: "text/html" },
  }),
  { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
  { waitUntil() {}, passThroughOnException() {} },
);

if (!response.ok) {
  throw new Error(`Static render failed with status ${response.status}`);
}

const html = (await response.text())
  .replaceAll("/assets/", "/flash/assets/")
  .replaceAll("/favicon.svg", "/flash/favicon.svg")
  .replaceAll("/og.png", "/flash/og.png");

try {
  const assets = await lstat(assetsDirectory);
  if (!assets.isDirectory() || assets.isSymbolicLink()) {
    throw new Error("flash/assets must be a regular directory");
  }
  await rm(assetsDirectory, { recursive: true });
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}

await mkdir(publicDirectory, { recursive: true });
await mkdir(assetsDirectory, { recursive: true });
await cp(resolve(clientDirectory, "assets"), assetsDirectory, {
  recursive: true,
});
await cp(resolve(clientDirectory, "favicon.svg"), resolve(publicDirectory, "favicon.svg"));
await cp(resolve(clientDirectory, "og.png"), resolve(publicDirectory, "og.png"));
await writeFile(resolve(publicDirectory, "index.html"), html);

// Notation SVGs for Music cards
await rm(notationTarget, { recursive: true, force: true });
await cp(notationSource, notationTarget, { recursive: true });

// Keep old /design/ bookmark working
const designRedirect = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta http-equiv="refresh" content="0; url=/flash/" />
  <link rel="canonical" href="https://planwellmd.com/flash/" />
  <title>Moved to Grade 6 Flashcards</title>
  <script>location.replace("/flash/");</script>
</head>
<body>
  <p>This page has moved to <a href="/flash/">planwellmd.com/flash/</a>.</p>
</body>
</html>
`;
await mkdir(resolve(repositoryRoot, "design"), { recursive: true });
await writeFile(resolve(repositoryRoot, "design/index.html"), designRedirect);

console.log("Exported Grade 6 flashcards to flash/");
