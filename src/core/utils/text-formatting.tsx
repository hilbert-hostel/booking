export const toSentenceCase = (text: string) => {
  return (
    text.slice(0, 1).toUpperCase() +
    (text.length > 1 ? text.slice(1).toLowerCase() : '')
  );
};
