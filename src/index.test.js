import redux, { createStore, applyMiddleware } from 'redux';
import { middleware, isPromise } from './index';

describe ('middleware tests', () => {

  it('responds to a successful promise', () => {

    const reducer = jest.fn();
    const next = jest.fn();
    const action = { type: 'SUCCESSFUL PROMISE', payload: Promise.resolve('Howdy') };
    const store = createStore(reducer, applyMiddleware(middleware));

    middleware(store)(next)(action);

    return action.payload
      .then(() => {
        console.log('running tests');
        expect(next.mock.calls).toHaveLength(1);
        expect(store.dispatch.calls).toHaveLength(2);
        // expect(action.mock.calls[0][0]).toBe(store.dispatch);
        // expect(action.mock.calls[0][1]).toBe(store.getState);
      });

    console.log('too soon to run tests!');

  });

});

/*
Create an src/index.test.js file and put your tests inside.

test your middleware
create a mock reducer with const reducer = jest.fn()
create a store using the mock reducer const store = createStore(reducer, applyMiddleware(promiseMiddleware))
Test successful promise (use Promise.resolve as payload)
LOAD_START action is sent
LOAD_END action is sent
PROMISE_ACTION action is sent
Test unsuccessful promise (use Promise.reject as payload)
LOAD_END action is sent
ERROR action is sent
 */

describe ('isPromise tests', () => {

  it('returns true when sent a promise', () => {
    const myPromise = new Promise(function(resolve, reject) {
      resolve('Yep!');
    });
    expect(isPromise(myPromise)).toBeTruthy;
  });

  it('returns false when sent an object that has a then', () => {
    const myObject = { then: 'value' };
    expect(isPromise(myObject)).toBeFalsy;
  });

  it('returns false when sent a string', () => {
    const myString = 'I am a string.';
    expect(isPromise(myString)).toBeFalsy;
  });

});
