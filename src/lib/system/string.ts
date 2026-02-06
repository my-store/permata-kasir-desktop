export function capitalizeEachWord(sentence: string): string {
  // Split the sentence into an array of words
  const words = sentence.split(" ");

  // Map over the words array to capitalize the first letter of each
  const capitalizedWords = words.map((word) => {
    if (!word) return word;
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(); // Optionally force the rest to lowercase
  });

  // Join the words back into a single string
  return capitalizedWords.join(" ");
}

export function capitalizeFirstChar(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
