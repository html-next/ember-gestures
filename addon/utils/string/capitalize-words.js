import capFirstLetter from "./cap-first-letter";

export default function (sentence) {
  return sentence.split(' ')
    .map(function (word) {
      return capFirstLetter(word);
    })
    .join(' ');
}
