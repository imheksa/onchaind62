// Install Linux native binaries when running on Linux (Vercel/CI)
// Workaround for npm optional dependencies bug: https://github.com/npm/cli/issues/4828
const { execSync } = require("child_process");
const os = require("os");

if (os.platform() !== "linux") {
  process.exit(0);
}

const arch = os.arch() === "x64" ? "x64" : "arm64";
const libc = (() => {
  try {
    execSync("ldd --version 2>&1 | grep -i musl", { stdio: "pipe" });
    return "musl";
  } catch {
    return "gnu";
  }
})();

const packages = [
  `@tailwindcss/oxide-linux-${arch}-${libc}@4.2.2`,
  `lightningcss-linux-${arch}-${libc}@1.32.0`,
];

console.log("Installing Linux native binaries:", packages.join(", "));
try {
  execSync(`npm install --no-save ${packages.join(" ")}`, { stdio: "inherit" });
} catch (e) {
  console.warn("Failed to install some native binaries, build may fail:", e.message);
}
