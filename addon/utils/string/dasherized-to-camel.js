import uncapitalize from './uncapitalize-word';
import dashToWords from './dasherized-to-words';
import capitalizeWords from './capitalize-words';
import stripWhiteSpace from './strip-whitespace';

export default function(s) {
  return uncapitalize(
    stripWhiteSpace(
      capitalizeWords(
        dashToWords(s))));
}
