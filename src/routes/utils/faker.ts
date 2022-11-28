import { faker } from '@faker-js/faker';
import { COUNT_PER_PAGE, INITIAL_COUNT_PER_PAGE } from '../../constants';
import { Country, IAccount } from '../interfaces/account';
import { generateErrorsForRecord } from './errorsGenerator';

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

    let account: IAccount = {
      num: shiftedIterator,
      id: faker.database.mongodbObjectId(),
      fullName: faker.name.fullName(),
      address: `${faker.address.state()}, ${faker.address.cityName()}, ${faker.address.streetAddress()}`,
      phoneNumber: faker.phone.number(),
    };

    if (options.errorsCount > 0) {
      account = generateErrorsForRecord(options.errorsCount, account);
    }

    accounts.push(account);
  }

  return accounts;
};
