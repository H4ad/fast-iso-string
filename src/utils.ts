export const pad = n => (n < 10 ? `0${ n }` : n);
export const padMs = n => (n >= 100 ? n : n >= 10 ? `0${ n }` : `00${ n }`);
