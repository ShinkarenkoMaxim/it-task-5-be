export interface IAccount {
  num: number;
  id: string;
  fullName: string;
  address: string;
  phoneNumber: string;
}

export interface IAccountQueryParams {
  page: string;
  country: Country;
  errorsCount: string;
  seed: string;
}

export enum Country {
  'usa' = 'en_US',
  'poland' = 'pl',
  'italy' = 'it',
}
