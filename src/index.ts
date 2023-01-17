import { kDaysIn100Years, kDaysIn400Years, kDaysIn4Years, kDaysInMonths, kDaysOffset, kMsPerDay, kMsPerHour, kMsPerMin, kYearsOffset } from './constants';
import { pad, padMs } from './utils';

function getYearMonthDayFromDays(days: number): string {
  days += kDaysOffset;
  let year = 400 * ~~(days / kDaysIn400Years) - kYearsOffset;
  days %= kDaysIn400Years;

  days--;
  let yd1 = ~~(days / kDaysIn100Years);
  days %= kDaysIn100Years;
  year += 100 * yd1;

  days++;
  let yd2 = ~~(days / kDaysIn4Years);
  days %= kDaysIn4Years;
  year += 4 * yd2;

  days--;
  let yd3 = ~~(days / 365);
  days %= 365;
  year += yd3;

  const is_leap = (!yd1 || yd2) && !yd3;

  days = days + (is_leap ? 1 : 0);

  let month = 0;
  let day = 0;

  // Check if the date is after February.
  if (days >= 31 + 28 + (is_leap ? 1 : 0)) {
    days -= 31 + 28 + (is_leap ? 1 : 0);
    // Find the date starting from March.
    for (let i = 2; i < 12; i++) {
      if (days < kDaysInMonths[i]) {
        month = i;
        day = days + 1;
        break;
      }
      days -= kDaysInMonths[i];
    }
  } else {
    // Check January and February.
    if (days < 31) {
      month = 0;
      day = days + 1;
    } else {
      month = 1;
      day = days - 31 + 1;
    }
  }

  return `${ year }-${ pad(month + 1) }-${ pad(day) }`;
}

/**
 * Convert a unix time to ISO String format.
 *
 * @param unix The unix time
 */
export function fromUnixToISOString(unix: number): string {
  const days = unix < 0 ? unix - kMsPerDay - 1 : ~~(unix / kMsPerDay);
  const timeInDayMs = unix - days * kMsPerDay;

  const hour = ~~(timeInDayMs / kMsPerHour);
  const min = ~~((timeInDayMs / kMsPerMin) % 60);
  const sec = ~~((timeInDayMs / 1000) % 60);
  const ms = ~~(timeInDayMs % 1000);

  const datePart = getYearMonthDayFromDays(days);

  return `${ datePart }T${ pad(hour) }:${ pad(min) }:${ pad(sec) }.${ padMs(ms) }Z`;
}

/**
 * Returns the current date to ISO String format, uses Date.now() to get current date.
 */
export function fastISOString(): string {
  return fromUnixToISOString(Date.now());
}
