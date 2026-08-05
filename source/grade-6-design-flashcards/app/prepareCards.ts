type ChoiceCard = {
  choices: string[];
  answer: string;
};

function shuffle<T>(items: T[], random: () => number): T[] {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
}

export function prepareCards<T extends ChoiceCard>(
  cards: T[],
  random: () => number = Math.random,
): T[] {
  const targetPositions = new Map<number, number>();
  const groups = new Map<number, Array<{ card: T; index: number }>>();

  cards.forEach((card, index) => {
    const group = groups.get(card.choices.length) ?? [];
    group.push({ card, index });
    groups.set(card.choices.length, group);
  });

  for (const [choiceCount, group] of groups) {
    const balancedPositions = group.map((_, index) => index % choiceCount);
    const shuffledPositions = shuffle(balancedPositions, random);
    group.forEach(({ index }, groupIndex) => {
      targetPositions.set(index, shuffledPositions[groupIndex]);
    });
  }

  return cards.map((card, cardIndex) => {
    const answerIndex = card.choices.indexOf(card.answer);
    if (answerIndex === -1 || card.choices.length < 2) {
      return { ...card, choices: [...card.choices] };
    }

    const otherChoices = card.choices.filter((_, index) => index !== answerIndex);
    const choices = shuffle(otherChoices, random);
    choices.splice(targetPositions.get(cardIndex) ?? 0, 0, card.answer);

    return { ...card, choices };
  });
}
