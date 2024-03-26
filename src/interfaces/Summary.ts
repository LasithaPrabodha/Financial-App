import {ITransaction} from './Transaction';

export interface ISummary {
  count: number;
  balance: number;
  highest: ITransaction;
  lowest: ITransaction;
  currency: string;
}
