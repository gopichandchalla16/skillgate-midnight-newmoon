# SkillGate — Midnight New Moon Level 1 Submission

## What this project does

SkillGate is a minimal Compact smart contract that demonstrates how Midnight can
verify a private skill or reputation score without exposing the score itself.
The contract takes a public threshold, compares it with a private witness value,
and discloses only the final pass/fail result on-chain.

## Initial product idea

This project is a simple building block for privacy-first reputation systems.
A freelance platform or cross-border gig marketplace could use a pattern like
this to verify that a worker meets a minimum score or qualification threshold
without revealing their full private history to every client or counterparty.
In the long term, this could evolve into a portable private reputation passport
that proves trustworthiness while preserving user privacy.

## Public state vs. private witness

- Private witness: `getSkillScore()` in `src/witnesses.ts`
  - This is where the actual numeric score lives.
  - It remains off-chain and is never published to the ledger.
- Public ledger state: `passed: Boolean` in `contracts/skillgate.compact`
  - Only the comparison result is written to the chain.
  - `disclose()` is used so the contract can expose the boolean result without
    revealing the underlying private value.

This is the core Midnight privacy pattern: private data stays private until the
contract explicitly chooses to disclose a specific result.

## Project structure

```text
contracts/
  skillgate.compact       # Compact contract source
  managed/                # generated after compilation
src/
  witnesses.ts           # off-chain witness implementation
test/
  skillgate.test.ts       # local unit tests
screenshots/             # add your real compile/deploy screenshots here
```

## Setup instructions

1. Install prerequisites
   - Node.js 22+
   - Docker Desktop
   - Midnight Compact toolchain

2. Clone the repository and install dependencies

```bash
git clone https://github.com/gopichandchalla16/skillgate-midnight-newmoon.git
cd skillgate-midnight-newmoon
npm install
```

3. Start the proof server (in a separate terminal)

```bash
docker run -p 6300:6300 midnightntwrk/proof-server:latest midnight-proof-server -v
```

4. Compile the contract

If you are using Windows PowerShell, make sure you are invoking the Midnight
Compact compiler and not the built-in Windows `compact.exe` utility. If the
command shows the Windows file-compression help text, you are in the wrong
`compact` context.

Use WSL for the compiler step if needed:

```bash
wsl
cd /mnt/c/Users/gopic/Downloads/skillgate-midnight-newmoon-main/skillgate-midnight-newmoon
compact compile contracts/skillgate.compact contracts/managed/skillgate
```

If the compiler is installed in PowerShell already, this command should work:

```powershell
compact compile contracts/skillgate.compact contracts/managed/skillgate
```

5. Run the tests

```bash
npm test
```

6. Deploy to Preview or Preprod using your Midnight deployment flow and note the
   resulting contract address.

## How to capture screenshots for the submission

Open the integrated terminal in VS Code and choose PowerShell (recommended on Windows). Run these commands from the repository root:

```powershell
cd C:\Users\gopic\Downloads\skillgate-midnight-newmoon-main\skillgate-midnight-newmoon
npm test
compact compile contracts/skillgate.compact contracts/managed/skillgate
git status --short
```

If you are inside WSL and the path does not resolve, switch to a normal PowerShell terminal instead. The screenshots folder should contain only the PNG images you upload, not an extra README file.

What to look for:

- The compile command should finish successfully and list generated artifacts in
  `contracts/managed`.
- The deployment step should show a contract address that you can capture in a
  second screenshot.

Take screenshots on your phone or laptop of:

- the terminal output showing the successful compile step and generated files in
  `contracts/managed`
- the deployment output showing the contract address

Save them as PNG files in the `screenshots/` folder using names like:

```text
screenshots/compile-output.png
screenshots/deployed-contract.png
```

Then upload them manually to GitHub:

1. Open your repository in GitHub.
2. Go to the `screenshots/` folder.
3. Click `Add file` -> `Upload files`.
4. Drag the two PNG files into the upload box.
5. Commit the new files to `main`.

## Submission checklist

- [x] Public GitHub repository with a README
- [x] Setup instructions included
- [ ] Compile screenshot uploaded
- [ ] Deployment screenshot uploaded
- [x] Public state vs. private witness explained
- [x] Initial product idea paragraph included
- [x] Repository contains a meaningful commit history
```
