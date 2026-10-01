/**
 * The parts of a `controller` request-context entry that carry state. Loose on
 * purpose: the entry is not always a live `AgentControllerRequestContext`.
 */
export interface ControllerStateSource<TState> {
  getState?: () => Readonly<TState>;
  session?: { state?: { get?: () => Readonly<TState> } };
  state?: Readonly<TState>;
}

/**
 * Read controller state from a `controller` request-context entry.
 *
 * A live AgentController context exposes `getState()`. A durable or evented
 * run that is recovered after a process restart rebuilds its request context
 * from the JSON snapshot persisted with the run, so the entry is a plain
 * object whose methods were dropped. Its `state` snapshot survives: it is the
 * controller state the run was started with, so it is the right fallback.
 */
export function readControllerState<TState>(
  ctx: ControllerStateSource<TState> | undefined | null,
): Readonly<TState> | undefined {
  if (typeof ctx?.getState === 'function') return ctx.getState();
  const sessionState = ctx?.session?.state;
  if (typeof sessionState?.get === 'function') return sessionState.get();
  return ctx?.state ?? undefined;
}
