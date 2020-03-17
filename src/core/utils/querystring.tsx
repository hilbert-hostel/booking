export const toQuerystring = (obj: any): string => {
  return Object.keys(obj)
    .reduce(
      (p, c) =>
        p +
        c +
        '=' +
        (typeof obj[c] == 'object' ? JSON.stringify(obj[c]) : obj[c]) +
        '&',
      '?'
    )
    .slice(undefined, -1);
};
