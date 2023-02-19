export const canTransition =
  (states) =>
  (transitions) =>
  ({ state, context }, data) => {
    return (
      ((transitions?.[state]?.[data.type] || states?.[state]?.[1] === 'initial') &&
        transitions?.[state]?.[data.type]) ||
      state
    );
  };

export const isTransitionGuarded =
  (guardedEvents) =>
  ({ state, context }, data) =>
    guardedEvents?.[state]?.[data.type];

export const canTransitionIfGuarded =
  (guardedEvents) =>
  ({ state, context }, data) => {
    const isTransitionGuarded_ = isTransitionGuarded(guardedEvents)({ state, context }, data);
    return (
      (isTransitionGuarded_ && guardedEvents?.[state]?.[data.type]?.({ state, context }, data)) || !isTransitionGuarded_
    );
  };

export const doesTransitionSatifiesContext =
  (guardedEvents) =>
  ({ state, context }, data) => {
    const isTransitionGuarded_ = isTransitionGuarded(guardedEvents)({ state, context }, data);
    return (
      (isTransitionGuarded_ && guardedEvents?.[state]?.[data.type]?.({ state, context }, data)) || !isTransitionGuarded_
    );
  };
