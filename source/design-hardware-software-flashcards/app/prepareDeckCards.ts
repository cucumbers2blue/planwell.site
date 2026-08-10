export function prepareDeckCards<T>(
  cards: T[],
  introCount = 0,
  random: () => number = Math.random,
): T[] {
  const introduction = cards.slice(0, introCount);
  const practice = cards.slice(introCount);

  for (let index = practice.length - 1; index > 0; index -= 1) {
    const swapWith = Math.floor(random() * (index + 1));
    [practice[index], practice[swapWith]] = [practice[swapWith], practice[index]];
  }

  return [...introduction, ...practice];
}
