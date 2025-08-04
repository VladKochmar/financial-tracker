import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useTransactionsStore } from '../stores/useTransactionsStore.ts';
import { useExpenseCategoryPercentages } from './useExpenseCategoryPercentages';

describe('useExpenseCategoryPercentages', () => {
  beforeEach(() => {
    useTransactionsStore.setState({
      categories: [],
      transactions: [],
    });
  });

  it('returns correct percentage per category', () => {
    act(() => {
      useTransactionsStore.setState({
        categories: [
          { id: 'food', title: 'Food', color: '#252525' },
          { id: 'rent', title: 'Rent', color: '#757575' },
        ],
        transactions: [
          { id: '1', type: 'expense', amount: 50, categoryId: 'food', date: '', note: '' },
          { id: '2', type: 'expense', amount: 150, categoryId: 'rent', date: '', note: '' },
        ],
      });
    });

    const { result } = renderHook(() => useExpenseCategoryPercentages());

    expect(result.current).toStrictEqual([
      { name: 'Food', value: 25, color: '#252525' },
      { name: 'Rent', value: 75, color: '#757575' },
    ]);
  });
});
