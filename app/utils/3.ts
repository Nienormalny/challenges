// Challenge: Flatten an Array

// Write a function called flattenArray that takes an array of nested arrays as input and returns a single flat array containing all the elements.

export const flattenArray = (arr: []) => {
  // [1, [2, 3], [4, [5, 6]]]
  const a = JSON.stringify(arr);
  const newArr = JSON.parse(`[${a.replaceAll('[', '').replaceAll(']', '')}]`);
  console.log('RESULT: ', newArr);
  return `[${newArr}]`;
};
