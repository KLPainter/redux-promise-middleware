export function isPromise(possiblePromise) {
  return typeof possiblePromise === 'object' && typeof possiblePromise.then === 'function';
}

export const middleware = store => next => action => {

  const { type, payload } = action;
  const { dispatch } = store;

  if(!isPromise(payload)) {
    return next(action);
  }

  dispatch ({ type: 'LOAD_START' });
  return action.payload
    .then(results => {
      next({ type: type, payload: results });
      dispatch({ type: 'LOAD_END' });
    })
    .catch(error => {
      dispatch({ type: 'LOAD_END' });
      dispatch({ type: 'ERROR', payload: error
      });
    });
};
