import {faker} from '@faker-js/faker';
import {Transaction, TransactionWithId} from '../interfaces/Transaction';
import {SummaryGridItem} from '../interfaces/SummaryGridItem';
import firestore from '@react-native-firebase/firestore';
import {transactionTypes} from '../core/constants';

export default class TransactionsService {
  private static instance: TransactionsService;
  private list: TransactionWithId[] = [];
  public reachedEnd = false;

  private constructor() {}

  public static getInstance(): TransactionsService {
    if (!TransactionsService.instance) {
      TransactionsService.instance = new TransactionsService();
    }
    return TransactionsService.instance;
  }

  public async saveTransaction(tranaction: Transaction) {
    await firestore()
      .collection('Transactions')
      .add({...tranaction, created: firestore.Timestamp.now()});
  }

  public generate() {
    return {
      company: faker.company.name(),
      product: faker.commerce.product(),
      location: `${faker.location.city()}, ${faker.location.countryCode()}`,
      date: faker.date.past().toDateString(),
      icon: transactionTypes[
        Math.floor(Math.random() * transactionTypes.length)
      ].icon,
      amount: faker.commerce.price({
        min: 10,
        max: 200,
        dec: 2,
      }),
      currency: '$',
    } as Transaction;
  }

  public async loadList(limit = 10): Promise<TransactionWithId[]> {
    try {
      this.reachedEnd = false;

      console.log('loading');

      this.list = await firestore()
        .collection('Transactions')
        .orderBy('date', 'desc')
        .limit(limit)
        .get()
        .then(snapshot => {
          let list: TransactionWithId[] = [];
          if (!snapshot.empty) {
            snapshot.forEach(doc => {
              const data = doc.data() as Transaction;
              list.push({...data, id: doc.id});
            });
          }

          return list;
        });

      return this.list;
    } catch (e) {
      return [];
    }
  }

  public getItem(id: string) {
    return this.list.find(item => item.id === id)!;
  }

  public async loadMore(limit = 10) {
    const last = this.list[this.list.length - 1];
    if (!last) {
      return [];
    }
    console.log('loading more');
    const prevLastDoc = await firestore()
      .collection('Transactions')
      .doc(last.id)
      .get();

    let nextList: TransactionWithId[] = [];
    try {
      nextList = await firestore()
        .collection('Transactions')
        .orderBy('date', 'desc')
        .startAt(prevLastDoc)
        .limit(limit)
        .get()
        .then(snapshot => {
          let list: TransactionWithId[] = [];

          if (snapshot.size < limit) {
            this.reachedEnd = true;
          } else {
            this.reachedEnd = false;
          }

          snapshot.forEach((doc, i) => {
            // skipping the first one as it was the previously last
            if (i === 0) {
              return;
            }

            const data = doc.data() as Transaction;
            list.push({...data, id: doc.id});
          });

          return list;
        });
    } catch (e) {
      this.reachedEnd = true;
      console.error(e);
    }

    this.list = [...this.list, ...nextList];

    return this.list;
  }

  private async loadFullList(): Promise<TransactionWithId[]> {
    return await firestore()
      .collection('Transactions')
      .get()
      .then(snapshot => {
        let freshList: TransactionWithId[] = [];
        if (!snapshot.empty) {
          snapshot.forEach(doc => {
            const data = doc.data() as Transaction;
            freshList.push({...data, id: doc.id});
          });
        }

        return freshList;
      });
  }

  public async calculateSummary(): Promise<SummaryGridItem[]> {
    const list = await this.loadFullList();

    const count = list.length;
    const total = list.reduce((prev, curr) => prev + +curr.amount, 0);
    const sorted = [...list].sort(
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
