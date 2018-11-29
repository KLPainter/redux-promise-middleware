export function isPromise(possiblePromise) {
  if(typeof possiblePromise === 'object') {
    if(typeof possiblePromise.then === 'function') {
      return true;
    }
  }
  return false;
}

export const middleware = store => next => action => {

  if(!isPromise(action.payload)) {
    next(action);
  }

  store.dispatch({ type: 'LOAD_START' });

  action
    .then(results => {
      next({
        type: action.type,
        payload: results
      });
    })
    .catch(error => {
      store.dispatch({ type: 'LOAD_END' });
      store.dispatch({
        type: 'ERROR',
        payload: error
      });
    });

  store.dispatch({ type: 'LOAD_END' });
};
