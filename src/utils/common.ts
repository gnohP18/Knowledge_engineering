import { HASHTAG_EXAMPLE } from "~/constants/sample";

/**
 * Get hashtag name
 *
 * @param id {number} id of hashtag
 * @returns name of hashtag
 */
export const mappingHashtag = (id: number) => {
  return HASHTAG_EXAMPLE.filter((item) => Number(item.code) === id)[0];
};

/**
 * Delay function
 * @param {countTime} number of milisecond 
 * @returns 
 */
export const delayFunc = (countTime: number) => {
  return new Promise(resolve => setTimeout(resolve, countTime));
};
