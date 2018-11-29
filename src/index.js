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
    console.log('calling next on non-promise action', action.type);
    return next(action);
  }

  console.log('dispatching load_start before promise');
  store.dispatch ({ type: 'LOAD_START' });
  action.payload
    .then(results => {
      console.log('results of promise:', results);
      next({
        type: action.type,
        payload: results
      });
      console.log('dispatching load_end after promise');
      store.dispatch({ type: 'LOAD_END' });
    })
    .catch(error => {
      console.log('dispatching load_end in error');
      store.dispatch({ type: 'LOAD_END' });
      return store.dispatch({
        type: 'ERROR',
        payload: error
      });
      //throw error;
    });


};
