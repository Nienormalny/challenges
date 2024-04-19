// Write a JavaScript function that checks whether a given string is a palindrome or not. A palindrome is a word, phrase, number, or other sequence of characters that reads the same forward and backward, ignoring spaces, punctuation, and capitalization.

export const isPalindrome = (word: string) => {
  const reversedWord = Array.from(
    word.replaceAll(/\W/g, '').trim().toLowerCase()
  )
    .reverse()
    .join('');
  return `${reversedWord === word.replaceAll(/\W/g, '').trim().toLowerCase()}`;
};
