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
    return next(action);
  }

  store.dispatch ({ type: 'LOAD_START' });
  action.payload
    .then(results => {
      next({
        type: action.type,
        payload: results
      });
      store.dispatch({ type: 'LOAD_END' });
    })
    .catch(error => {
      store.dispatch({ type: 'LOAD_END' });
      store.dispatch({
        type: 'ERROR',
        payload: error
      });
      throw error;
    });
};
