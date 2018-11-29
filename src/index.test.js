// import redux from 'redux';
import { isPromise } from './index';

describe ('isPromise test', () => {

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
