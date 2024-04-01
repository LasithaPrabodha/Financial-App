import {faker} from '@faker-js/faker';
import 'react-native-get-random-values';
import {nanoid} from 'nanoid';
import {ITransaction} from '../interfaces/Transaction';
import {ISummaryGridItem} from '../interfaces/SummaryGridItem';

export default class TransactionsService {
  private static instance: TransactionsService;
  private list!: ITransaction[] = [];
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

  public generate() {
    return {
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
    } as ITransaction;
  }

  public loadList(): ITransaction[] {
    return this.list;
  }

  public getItem(id: string) {
    return this.list.find(item => item.id === id)!;
  }

  public loadMore(amount = 30) {
    return this.list;
  }

  public calculateSummary(): ISummaryGridItem[] {
    const count = this.list.length;
    const total = this.list.reduce((prev, curr) => prev + +curr.amount, 0);
    const sorted = [...this.list].sort(
      (a, b) => parseFloat(a.amount) - parseFloat(b.amount),
    );
    const highest = sorted.length
      ? sorted[sorted.length - 1]
      : {amount: 0, product: ''};

    const lowest = sorted.length ? sorted[0] : {amount: 0, product: ''};

    const summaryArray = [
      {
        number: count,
        label: 'Transactions',
        item: '',
      },
      {
        number: `$${total}`,
        label: 'Total Spending',
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
