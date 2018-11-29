import redux, { createStore, applyMiddleware } from 'redux';
import { middleware, isPromise } from './index';

describe ('middleware tests', () => {

  it('responds to a successful promise', () => {

    const reducer = jest.fn();
    const next = jest.fn();
    const action = { type: 'SUCCESSFUL_PROMISE', payload: Promise.resolve('Howdy') };
    const store = createStore(reducer, applyMiddleware(middleware));

    middleware(store)(next)(action);

    return action.payload
      .then(() => {
        expect(next.mock.calls[0][0]).toEqual({ type: 'SUCCESSFUL_PROMISE', payload: 'Howdy' });
        expect(reducer.mock.calls[1][1]).toEqual({ type: 'LOAD_START' });
        expect(reducer.mock.calls[2][1]).toEqual({ type: 'LOAD_END' });
      });
  });

  it('responds to a rejected promise', () => {

    const reducer = jest.fn();
    const next = jest.fn();
    const action = { type: 'REJECTED_PROMISE', payload: Promise.reject('No way!') };
    const store = createStore(reducer, applyMiddleware(middleware));

    middleware(store)(next)(action);

    return action.payload
      .then(() => {
      })
      .catch(() => {
        expect(reducer.mock.calls[1][1]).toEqual({ type: 'LOAD_START' });
        expect(reducer.mock.calls[2][1]).toEqual({ type: 'LOAD_END' });
        expect(reducer.mock.calls[3][1]).toEqual({ type: 'ERROR', payload: 'No way!' });
      });
  });

});

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
