import MockDate from 'mockdate';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { fastISOString, fromUnixToISOString } from '../src';

describe('fromUnixToISOString', () => {
  it('should output the same values as new Date()', () => {
    const now = Date.now();
    const testValues = new Array(100).fill(now).map((v, i) => Math.floor(v + ((i * 1000) * (1 + Math.random()))));

    for (const value of testValues) {
      const expectedValue = new Date(value).toISOString();
      const calculated = fromUnixToISOString(value);

      expect(calculated, `fromUnixToISOString(${ now }) => ${ calculated } === ${ expectedValue }`).equal(expectedValue);
    }
  });

  it('should output correctly for a list of dates', () => {
    const dates = [
      new Date('2000-01-01'),
      new Date('2001-01-28'),
      new Date('2001-01-29'),
      new Date('2000-01-29'),
      new Date('2019-10-12'),
    ];

    for (const date of dates) {
      const expectedValue = new Date(date.valueOf()).toISOString();
      const calculated = fromUnixToISOString(date.valueOf());

      expect(calculated, `fromUnixToISOString(${ date.valueOf() }) => ${ calculated } === ${ expectedValue }`).equal(expectedValue);
    }
  });
});

describe('fastISOString', () => {
  let now: number;

  beforeEach(() => {
    now = Date.now();

    MockDate.set(now);
  });

  afterEach(() => {
    MockDate.reset();
  });

  it('should output the same values as new Date()', () => {
    const expectedValue = new Date(now).toISOString();
    const currentValue = fastISOString();

    expect(currentValue, `fastISOString() => ${ currentValue } === ${ expectedValue }`).equal(expectedValue);
  });
});
