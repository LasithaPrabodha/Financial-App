export interface Transaction {
  id: string | undefined | null;
  company: string;
  product: string;
  location: string;
  date: string;
  icon: string;
  amount: string;
  currency: string;
}

export interface TransactionWithId extends Omit<Transaction, 'id'> {
  id: string;
}

export interface TransactionWithType extends Omit<Transaction, 'icon'> {
  icon: {icon: string; name: string} | null;
}
