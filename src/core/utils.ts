import {faker} from '@faker-js/faker';
import {transactionTypes} from '../core/constants';
import {Transaction} from '../interfaces/Transaction';

export function generateTransaction(): Transaction {
  return {
    id: null,
    company: faker.company.name(),
    product: faker.commerce.product(),
    location: `${faker.location.city()}, ${faker.location.countryCode()}`,
    date: faker.date.past().toDateString(),
    icon: transactionTypes[Math.floor(Math.random() * transactionTypes.length)]
      .icon,
    amount: faker.commerce.price({
      min: 10,
      max: 200,
      dec: 2,
    }),
    currency: '$',
  };
}
