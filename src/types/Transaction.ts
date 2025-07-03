export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  categoryId: string;
  amount: number;
  date: string;
  note?: string;
}

export type TransactionType = 'income' | 'expense';
