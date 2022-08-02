export const transformText = (text: string): string => {
  const transformedText = text.replace(/\s/g, "_");
  const lowerCaseText = transformedText.toLowerCase();
  const replaceSpecialCharacters = lowerCaseText.replace(/ñ/g, "n");
  const removeAccentuation = replaceSpecialCharacters
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  return removeAccentuation;
};
