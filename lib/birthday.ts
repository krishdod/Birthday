// A keepsake for October 6, 2026: the whole birthday uses India time.
export const BIRTHDAY_START = Date.parse("2026-10-06T00:00:00+05:30");
export const BIRTHDAY_END = Date.parse("2026-10-07T00:00:00+05:30");
export const BIRTH_YEAR = 2001;
export const CELEBRATION_YEAR = 2026;
export const BIRTHDAY_AGE = CELEBRATION_YEAR - BIRTH_YEAR;
export type BirthdayState = { phase: "before" | "birthday" | "after"; days: number; hours: number; minutes: number; seconds: number; };
export function birthdayState(now: Date): BirthdayState {
  const timestamp = now.getTime();
  const remaining = Math.max(0, Math.ceil((BIRTHDAY_START - timestamp) / 1000));
  return { phase: timestamp < BIRTHDAY_START ? "before" : timestamp < BIRTHDAY_END ? "birthday" : "after", days: Math.floor(remaining / 86400), hours: Math.floor((remaining % 86400) / 3600), minutes: Math.floor((remaining % 3600) / 60), seconds: remaining % 60 };
}
