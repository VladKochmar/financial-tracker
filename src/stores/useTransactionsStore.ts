import { create } from 'zustand';
import { combine, persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

import type { Transaction } from '../types/Transaction';
import type { Category } from '../types/Category';

interface State {
  categories: Category[];
  transactions: Transaction[];
}

interface Actions {
  getTotalBalance: () => number;
  getCategoryById: (id: string) => Category | undefined;
  getUsedCategories: () => Category[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (updatedTransaction: Transaction) => void;
  removeTransaction: (id: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  removeCategory: (id: string) => void;
}

const initialState: State = {
  categories: [],
  transactions: [],
};

export const useTransactionsStore = create(
  persist(
    combine<State, Actions>(initialState, (set, get) => ({
      getTotalBalance: () => get().transactions.reduce((total, t) => (t.type === 'income' ? total + t.amount : total - t.amount), 0),
      getCategoryById: id => get().categories.find(category => category.id === id),
      getUsedCategories: () => {
        const { categories, transactions } = get();
        return categories.filter(category => transactions.some(transaction => transaction.categoryId === category.id));
      },

      addTransaction: transaction => {
        const id = uuidv4();
        set(state => ({ transactions: [{ id, ...transaction }, ...state.transactions] }));
      },
      updateTransaction: updatedTransaction =>
        set(state => ({
          transactions: state.transactions.map(t => {
            if (t.id !== updatedTransaction.id) {
              return t;
            } else {
              return { ...t, ...updatedTransaction };
            }
          }),
        })),
      removeTransaction: id => set(state => ({ transactions: state.transactions.filter(transaction => transaction.id !== id) })),

      addCategory: category => {
        const id = uuidv4();
        set(state => ({ categories: [{ id, ...category }, ...state.categories] }));
      },
      removeCategory: id => set(state => ({ categories: state.categories.filter(category => category.id !== id) })),
    })),
    { name: 'transactions-state' }
  )
);
