import { LIMIT_NAME_CHARACTERS } from "~/constants/common";

/**
 * Split and limit sentence
 *
 * @param text full text need split
 * @param limit limit of word
 * @param haveDot adding dot in the end of sentence
 * @returns textFull, textSub
 */
export const substringWithLimitCharacters = (
  text: string,
  limit: number = LIMIT_NAME_CHARACTERS,
  autoHaveDot: boolean = false,
) => {
  const arrayTextFull = text.split(" ");
  const isExceed = arrayTextFull.length >= limit;

  let textSub = text;
  const textFull = text;

  if (isExceed) {
    const splitTextSub = arrayTextFull.slice(0, limit);
    textSub = splitTextSub.join(" ");
    if (autoHaveDot) {
      textSub = textSub.concat("...");
    }
  }

  return { textFull, textSub };
};

/**
 * Convert non-escape to element text
 *
 * @param str text want to convert
 * @returns re-convert text
 */
export const convertHTMLtoString = (str: string) => {
  const parser = new DOMParser();
  const htmlDoc = parser.parseFromString(str, "text/html");

  return htmlDoc.getElementsByTagName("body")[0].innerText;
};

/**
 * Escape string to a new string
 *
 * @param str string needs to convert
 * @returns
 */
export const escapeString = (str: string) => {
  // Convert \\n to \n (break line)
  let newStr = str.replace(/\\n/g, "\n");
  console.log(newStr);

  return newStr;
};
