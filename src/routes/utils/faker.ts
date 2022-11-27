import { faker } from '@faker-js/faker';
import {
  ACCOUNT_FIELDS,
  COUNT_PER_PAGE,
  INITIAL_COUNT_PER_PAGE,
} from '../../constants';
import { Country } from '../interfaces/account';

const getRandomAccountField = () =>
  ACCOUNT_FIELDS[(ACCOUNT_FIELDS.length * Math.random()) << 0];

interface GeneratorOptions {
  page: number;
  country: Country;
  errorsCount: number;
  seed: number;
}

export const generateFakeData = (options: GeneratorOptions) => {
  const accounts = [];

  faker.seed(options.seed);
  faker.locale = options.country;

  const isInitialPage = options.page === 1;
  const seed = isInitialPage ? options.seed : options.seed + options.page;
  let shiftedIterator = isInitialPage ? 0 : 10 * options.page;
  const lengthOfIteration = isInitialPage
    ? INITIAL_COUNT_PER_PAGE
    : COUNT_PER_PAGE;

  for (let i = 0; i < lengthOfIteration; i++) {
    shiftedIterator++;

    const account = {
      num: shiftedIterator,
      id: faker.database.mongodbObjectId(),
      fullName: faker.name.fullName(),
      address: `${faker.address.state()}, ${faker.address.cityName()}, ${faker.address.streetAddress()}`,
      phoneNumber: faker.phone.number(),
    };

    accounts.push(account);
  }

  return accounts;
};
