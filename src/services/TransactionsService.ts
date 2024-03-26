import {faker} from '@faker-js/faker';
import 'react-native-get-random-values';
import {nanoid} from 'nanoid';
import {ITransaction} from '../interfaces/Transaction';
import {ISummaryGridItem} from '../interfaces/SummaryGridItem';

export default class TransactionsService {
  private static instance: TransactionsService;
  private list!: ITransaction[];
  private readonly icons = [
    'beach-access',
    'shopping-cart',
    'coffee',
    'hotel',
    'credit-card',
    'healing',
  ];

  private constructor() {}

  public static getInstance(): TransactionsService {
    if (!TransactionsService.instance) {
      TransactionsService.instance = new TransactionsService();
    }
    return TransactionsService.instance;
  }

  private generate(amount: number) {
    return Array.from(Array(amount).keys()).map(
      _ =>
        ({
          id: nanoid(),
          company: faker.company.name(),
          product: faker.commerce.product(),
          location: `${faker.location.city()}, ${faker.location.countryCode()}`,
          date: faker.date.past().toDateString(),
          icon: this.icons[Math.floor(Math.random() * this.icons.length)],
          amount: faker.commerce.price({
            min: 10,
            max: 200,
            dec: 2,
          }),
          currency: '$',
        } as ITransaction),
    );
  }

  public generateList(amount = 30): ITransaction[] {
    this.list = this.generate(amount);

    return this.list;
  }

  public getItem(id: string) {
    return this.list.find(item => item.id === id)!;
  }

  public loadMore(amount = 30) {
    const list = this.generate(amount);

    this.list = [...this.list, ...list];

    return this.list;
  }

  public calculateSummary(): ISummaryGridItem[] {
    const count = this.list.length;
    const balance = this.list.reduce((prev, curr) => prev + +curr.amount, 0);
    const sorted = [...this.list].sort(
      (a, b) => parseFloat(a.amount) - parseFloat(b.amount),
    );
    const highest = sorted[sorted.length - 1];

    const lowest = sorted[0];

    const summaryArray = [
      {
        number: count,
        label: 'Transactions',
        item: '',
      },
      {
        number: `$${balance}`,
        label: 'Balance',
        item: '',
      },
      {
        number: `$${highest.amount}`,
        label: 'Highest Spending',
        item: highest.product,
      },
      {
        number: `$${lowest.amount}`,
        label: 'Lowest Spending',
        item: lowest.product,
      },
    ];
    return summaryArray;
  }
}
