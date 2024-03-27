import {ITransaction} from './Transaction';

export interface ISummary {
  count: number;
  total: number;
  highest: ITransaction;
  lowest: ITransaction;
  currency: string;
}
