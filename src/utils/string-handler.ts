import { LIMIT_NAME_CHARACTERS } from "~/constants/common";

export const substringWithLimitCharacters = (
  text: string,
  limit: number = LIMIT_NAME_CHARACTERS,
) => {
  const isExceed = text.length >= limit;

  let textSub = "";
  const textFull = text;
  if (isExceed) {
    textSub = text.substring(0, limit);
  }

  return { textFull, textSub };
};
