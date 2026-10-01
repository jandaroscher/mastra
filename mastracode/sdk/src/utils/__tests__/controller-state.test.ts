import { describe, expect, it } from 'vitest';
import { readControllerState } from '../controller-state.js';

describe('readControllerState', () => {
  const live = { from: 'getState' };
  const session = { from: 'session' };
  const snapshot = { from: 'snapshot' };

  it('prefers getState() over session state and the snapshot', () => {
    expect(
      readControllerState({ getState: () => live, session: { state: { get: () => session } }, state: snapshot }),
    ).toBe(live);
  });

  it('falls back to session.state.get() when getState() is missing', () => {
    expect(readControllerState({ session: { state: { get: () => session } }, state: snapshot })).toBe(session);
  });

  it('falls back to the state snapshot of a controller entry rebuilt from JSON', () => {
    const rebuilt = JSON.parse(
      JSON.stringify({ getState: () => live, session: { id: 's', state: { get: () => session } }, state: snapshot }),
    );
    expect(readControllerState(rebuilt)).toEqual(snapshot);
  });

  it('returns undefined for missing entries', () => {
    expect(readControllerState(undefined)).toBeUndefined();
    expect(readControllerState(null)).toBeUndefined();
    expect(readControllerState({})).toBeUndefined();
  });
});
