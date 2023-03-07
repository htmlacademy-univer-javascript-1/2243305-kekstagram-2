function getRandomInt(from, to) {
  if (from < 0 || to < 0) {
    throw new Error('В диапазоне должны быть положительные числа');
  }
  if (from === to) {
    return from;
  }
  if (from > to) {
    [from, to] = [to, from];
  }
  return Math.floor(Math.random() * (to - from + 1)) + from;
}

const checkMaxLength = (str, maxLength) => str.length <= maxLength;
