// Write a function called countVowels that takes a string as input and returns the count of vowels (a, e, i, o, u) in the string. The function should be case-insensitive, meaning it should count both lowercase and uppercase vowels.

export const countVowels = (word: string) => {
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  return Array.from(word).filter((letter) =>
    vowels.includes(letter.toLowerCase()) ? letter : ''
  ).length;
};
