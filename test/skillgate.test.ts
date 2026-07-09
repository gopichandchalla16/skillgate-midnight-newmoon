/**
 * skillgate.test.ts
 *
 * Basic test suite for the SkillGate contract, following the pattern used
 * in Midnight's official example DApps (in-memory simulator, no live
 * network needed for local tests).
 *
 * NOTE: Replace the import path below with the actual generated contract
 * module path once you've run `compact compile` — it will be generated
 * under contracts/managed/skillgate/contract/index.cjs (or .ts) after
 * compilation.
 */

import { describe, it, expect } from "vitest";
import { createSkillGateWitnesses, initialPrivateState } from "../src/witnesses";

describe("SkillGate witnesses", () => {
  it("returns the private score unchanged", () => {
    const state = initialPrivateState(85);
    const witnesses = createSkillGateWitnesses(state);
    const [, score] = witnesses.getSkillScore();
    expect(score).toBe(85n);
  });

  it("supports a below-threshold score", () => {
    const state = initialPrivateState(40);
    const witnesses = createSkillGateWitnesses(state);
    const [, score] = witnesses.getSkillScore();
    expect(score).toBe(40n);
  });
});

// TODO once compiled: add a full-circuit test that instantiates the
// generated SkillGate contract, calls checkEligibility(80n), and asserts
// that ledger.passed === true for a score of 85, and false for a score of 40.
