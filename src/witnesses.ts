/**
 * witnesses.ts
 *
 * Off-chain witness implementation for the SkillGate contract.
 * This is where the "private" data actually lives — it never touches the
 * chain unless the contract's disclose() logic says so.
 *
 * In a real LumoPay-style app, getSkillScore() would read from local
 * encrypted storage, a signed attestation from a previous job, or an
 * on-device reputation cache — NOT a hardcoded value.
 */

export interface SkillGatePrivateState {
  skillScore: number; // 0–65535, kept private
}

export const createSkillGateWitnesses = (privateState: SkillGatePrivateState) => ({
  getSkillScore: (): [SkillGatePrivateState, bigint] => {
    return [privateState, BigInt(privateState.skillScore)];
  },
});

export const initialPrivateState = (skillScore: number): SkillGatePrivateState => ({
  skillScore,
});
