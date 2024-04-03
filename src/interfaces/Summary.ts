import {Transaction} from './Transaction';

export interface Summary {
  count: number;
  total: number;
  highest: Transaction;
  lowest: Transaction;
  currency: string;
}
