import { cp, lstat, mkdir, rm, writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourceDirectory = resolve(repositoryRoot, "source/grade-6-design-flashcards");
const clientDirectory = resolve(sourceDirectory, "dist/client");
const publicDirectory = resolve(repositoryRoot, "design");
const assetsDirectory = resolve(publicDirectory, "assets");

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
  .replaceAll("/assets/", "/design/assets/")
  .replaceAll("/favicon.svg", "/design/favicon.svg")
  .replaceAll("/og.png", "/design/og.png");

try {
  const assets = await lstat(assetsDirectory);
  if (!assets.isDirectory() || assets.isSymbolicLink()) {
    throw new Error("design/assets must be a regular directory");
  }
  await rm(assetsDirectory, { recursive: true });
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}

await mkdir(assetsDirectory, { recursive: true });
await cp(resolve(clientDirectory, "assets"), assetsDirectory, {
  recursive: true,
});
await cp(resolve(clientDirectory, "favicon.svg"), resolve(publicDirectory, "favicon.svg"));
await cp(resolve(clientDirectory, "og.png"), resolve(publicDirectory, "og.png"));
await writeFile(resolve(publicDirectory, "index.html"), html);

console.log("Exported Grade 6 Design flashcards to design/");
