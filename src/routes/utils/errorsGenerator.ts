import { faker } from '@faker-js/faker';
import { ACCOUNT_FIELDS } from '../../constants';
import { IAccount } from '../interfaces/account';

const getRandomAccountField = () =>
  ACCOUNT_FIELDS[(ACCOUNT_FIELDS.length * Math.random()) << 0];

const removeRandomCharError = (s: string, randomCharPosition: number) =>
  s.replace(s[randomCharPosition], '');

const addRandomCharError = (s: string, randomCharPosition: number) =>
  s.slice(0, randomCharPosition) +
  faker.random.alphaNumeric() +
  s.slice(randomCharPosition);

const swapError = (s: string, randomCharPosition: number): string => {
  const listOfChars = s.split('');
  const isGreaterThanLengthOfString = randomCharPosition >= s.length;
  const charToBeReplacedPosition = isGreaterThanLengthOfString
    ? randomCharPosition - 1
    : randomCharPosition + 1;

  const [leftChar, rightChar] = [
    listOfChars[randomCharPosition],
    listOfChars[charToBeReplacedPosition],
  ];

  listOfChars[randomCharPosition] = rightChar;
  listOfChars[charToBeReplacedPosition] = leftChar;

  return listOfChars.join('');
};

const getRandomError = (s: string, fieldLength: number) => {
  let result = '';

  const maxErrorsFns = 3;
  const randomErrorFn = (Math.random() * maxErrorsFns) << 0;
  const randomCharPosition = (Math.random() * s.length) << 0;

  // Normalize maximum of resizing length of data
  const isGreaterThanOriginal = s.length > fieldLength;
  const isLowerThanOriginal = s.length < fieldLength;

  if (isGreaterThanOriginal) {
    result = removeRandomCharError(s, randomCharPosition);
  } else if (isLowerThanOriginal) {
    result = addRandomCharError(s, randomCharPosition);
  } else {
    switch (randomErrorFn) {
      case 0:
        result = removeRandomCharError(s, randomCharPosition);

        break;
      case 1:
        result = addRandomCharError(s, randomCharPosition);

        break;
      case 2:
        result = swapError(s, randomCharPosition);

        break;
    }
  }

  return result;
};

export const generateErrorsForRecord = (
  errorsCount: number,
  account: IAccount
) => {
  let changedAccountData = Object.assign({}, account);

  for (let i = 0; i < errorsCount; i++) {
    const randomField = getRandomAccountField();
    const fieldLength = account[randomField].length;

    changedAccountData[randomField] = getRandomError(
      changedAccountData[randomField],
      fieldLength
    );
  }

  return changedAccountData;
};
