# SkillGate — Midnight "New Moon to Full" Level 1 Submission

## What this is

A minimal Compact smart contract that lets a user **prove their private
skill/reputation score meets a public threshold, without ever revealing the
score itself.** Built as Level 1 (New Moon) of MLH's Monthly Moonshots on
Midnight challenge.

## Initial product idea

Freelance and cross-border gig platforms (like the on-chain milestone-payment
tools I'm building on Stellar) need a way for a client to verify "this
freelancer is rated 80+" before releasing a job — without forcing the
freelancer to expose their full private rating history to every client they
work with. SkillGate demonstrates the core primitive for that: a private
score lives off-chain as a witness, and the contract discloses only a single
boolean (pass/fail) on-chain. Long-term, this pattern could extend into a
full "Private Reputation Passport" — a portable, ZK-verified trust score
freelancers carry across platforms, disclosing only what a specific job
requires (e.g. "rated 80+ in smart contract audits") instead of their entire
work history.

## Public state vs. private witness

- **Private witness** (`getSkillScore`): implemented off-chain in
  `src/witnesses.ts`. This is where the actual numeric score lives — it is
  never sent to the chain and never appears in any transaction.
- **Public ledger state** (`passed: Boolean`): the *only* thing ever written
  on-chain. It's the result of comparing the private score against a public
  threshold, wrapped in `disclose()` as required by the compiler.

This is Compact's "private by default" model: any value derived from a
witness is untouchable by the public ledger until you explicitly wrap it in
`disclose()`. Here, we disclose the comparison result — never the score.

## Project structure

```
contracts/
  skillgate.compact       # the Compact contract
  managed/                # generated after `compact compile` (circuits + keys)
src/
  witnesses.ts             # off-chain witness implementation (private state)
test/
  skillgate.test.ts        # witness unit tests
screenshots/
  compile-output.png       # add after running compact compile
  deployed-contract.png    # add after deploying to Preview/Preprod
```

## Setup instructions (run locally)

1. Install prerequisites:
   - Docker (for the proof server)
   - Node.js v22+
   - Midnight's Compact compiler — follow docs.midnight.network's toolchain install guide

2. Clone this repo and install dependencies:
   ```bash
   git clone https://github.com/gopichandchalla16/skillgate-midnight-newmoon.git
   cd skillgate-midnight-newmoon
   npm install
   ```

3. Compile the contract:
   ```bash
   compact compile contracts/skillgate.compact contracts/managed/skillgate
   ```

4. Start the proof server (separate terminal, Docker running):
   ```bash
   docker run -p 6300:6300 midnightnetwork/proof-server
   ```

5. Run the unit tests:
   ```bash
   npm test
   ```

6. Deploy to Preview/Preprod using the Midnight CLI/SDK deploy script.
   Screenshot the resulting contract address.

## Requirements checklist

- [x] Toolchain set up, contract written
- [ ] `compact compile` run locally, `managed/` generated
- [ ] Passing test suite
- [ ] Deployed to Preview/Preprod with visible contract address
- [x] Initial product idea paragraph (above)
- [ ] 5+ meaningful commits
```
