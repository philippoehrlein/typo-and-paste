import { readFileSync, writeFileSync } from "node:fs";
import process from "node:process";

const [version, ...extraArgs] = process.argv.slice(2);
const semver = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-([0-9a-z-]+(?:\.[0-9a-z-]+)*))?$/i;
const match = version?.match(semver);
if (extraArgs.length || !match || match[4]?.split(".").some((part) => /^0\d+$/.test(part))) {
  console.error("Usage: npm run version:set -- <version> (for example 2.4.2 or 3.0.0-beta.3)");
  process.exit(1);
}

const root = new URL("../", import.meta.url);
const files = ["package.json", "package-lock.json", "composer.json", "index.php"];
const [manifest, lockfile, composer, entrypoint] = files.map((file) =>
  readFileSync(new URL(file, root), "utf8"),
);
const packageJson = JSON.parse(manifest);
const packageLock = JSON.parse(lockfile);
const composerJson = JSON.parse(composer);
const phpVersion = /^([ \t]*['"]version['"][ \t]*=>[ \t]*)(['"])[^'"]+\2(,?[ \t]*\r?)$/gm;

if (!packageLock.packages?.[""] || [...entrypoint.matchAll(phpVersion)].length !== 1) {
  throw new Error("Expected a root npm lockfile package and one PHP plugin version.");
}

packageJson.version = version;
packageLock.version = version;
packageLock.packages[""].version = version;
composerJson.version = version;

const updated = [
  ...[packageJson, packageLock, composerJson].map((json) => `${JSON.stringify(json, null, 2)}\n`),
  entrypoint.replace(phpVersion, (_, prefix, quote, suffix) => `${prefix}${quote}${version}${quote}${suffix}`),
];

for (const [index, file] of files.entries()) {
  writeFileSync(new URL(file, root), updated[index]);
}

console.log(`Plugin version set to ${version}.`);
