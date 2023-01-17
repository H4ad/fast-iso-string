export const kMsPerMin = 60 * 1000;
export const kSecPerDay = 24 * 60 * 60;
export const kMsPerDay = kSecPerDay * 1000;

export const kMsPerHour = 60 * 60 * 1000;

export const kDaysIn4Years = 4 * 365 + 1;
export const kDaysIn100Years = 25 * kDaysIn4Years - 1;
export const kDaysIn400Years = 4 * kDaysIn100Years + 1;
export const kDays1970to2000 = 30 * 365 + 7;
export const kDaysOffset = 1000 * kDaysIn400Years + 5 * kDaysIn400Years - kDays1970to2000;
export const kYearsOffset = 400000;
export const kDaysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
