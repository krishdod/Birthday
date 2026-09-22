import assert from 'node:assert/strict';
import test from 'node:test';
import { BIRTHDAY_AGE, birthdayState } from '../lib/birthday.ts';

test('Anita turns 25 on October 6, 2026', () => assert.equal(BIRTHDAY_AGE, 25));
for (const [date, phase, seconds] of [
  ['2026-10-05T18:29:59Z', 'before', 1],
  ['2026-10-05T18:30:00Z', 'birthday', 0],
  ['2026-10-06T18:29:59Z', 'birthday', 0],
  ['2026-10-06T18:30:00Z', 'after', 0],
  ['2026-11-06T12:00:00+05:30', 'after', 0],
  ['2026-12-06T12:00:00+05:30', 'after', 0],
  ['2027-10-06T12:00:00+05:30', 'after', 0],
]) test(`${date} is ${phase}`, () => {
  const actual = birthdayState(new Date(date));
  assert.equal(actual.phase, phase);
  assert.equal(actual.seconds, seconds);
  for (const unit of ['days', 'hours', 'minutes', 'seconds']) assert.ok(actual[unit] >= 0);
});
test('the same instant is independent of visitor timezone', () => {
  assert.deepEqual(birthdayState(new Date('2026-10-05T23:00:00+05:30')), birthdayState(new Date('2026-10-05T17:30:00Z')));
});
