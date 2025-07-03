import { useMemo } from 'react';
import { useTransactionsStore } from '../stores/useTransactionsStore';
import type { CategoryExpense } from '../types/CategoryExpense';

export const useExpenseCategoryPercentages = (): CategoryExpense[] => {
  const categories = useTransactionsStore(state => state.categories);
  const transactions = useTransactionsStore(state => state.transactions);

  return useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const total = expenses.reduce((acc, t) => acc + Math.abs(t.amount), 0);

    const categorySums: Record<string, number> = {};

    for (const t of expenses) {
      categorySums[t.categoryId] = (categorySums[t.categoryId] || 0) + Math.abs(t.amount);
    }

    const categoryPercents = Object.entries(categorySums).map(([categoryId, sum]) => {
      const category = categories.find(c => c.id === categoryId);

      if (!category) throw new Error('Category not found');

      return {
        name: category.title,
        value: total === 0 ? 0 : Math.round((sum / total) * 100),
        color: category.color,
      };
    });

    return categoryPercents;
  }, [transactions, categories]);
};
