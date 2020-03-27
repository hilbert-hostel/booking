export const toSentenceCase = (text: string) => {
  return (
    text.slice(0, 1).toUpperCase() +
    (text.length > 1 ? text.slice(1).toLowerCase() : '')
  );
};

export const pluralize = (string: string, amount: number) => {
  return `${string}${amount > 1 ? 's' : ''}`;
};
