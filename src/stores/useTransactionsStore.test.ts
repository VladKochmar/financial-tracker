import { act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useTransactionsStore } from './useTransactionsStore';

vi.mock('uuid', () => ({
  ...vi.importActual('uuid'),
  v4: vi.fn(() => 'mock-id'),
}));

beforeEach(() => {
  useTransactionsStore.persist.clearStorage();
  useTransactionsStore.setState({ transactions: [], categories: [] });
});

describe('useTransactionsStore', () => {
  it('calculates total balance correctly', () => {
    useTransactionsStore.setState({
      transactions: [
        { id: '1', amount: 200, type: 'income', date: '', note: '', categoryId: '' },
        { id: '2', amount: 50, type: 'expense', date: '', note: '', categoryId: '' },
      ],
    });

    const totalBalance = useTransactionsStore.getState().getTotalBalance();
    expect(totalBalance).toBe(150);
  });

  it('returns only used categories', () => {
    useTransactionsStore.setState({
      transactions: [{ id: '1', amount: 200, type: 'income', date: '', note: '', categoryId: 'category-1' }],
      categories: [
        { id: 'category-1', title: 'Food', color: '#252525' },
        { id: 'category-2', title: 'Entertainment', color: '#151515' },
      ],
    });

    const usedCategories = useTransactionsStore.getState().getUsedCategories();
    expect(usedCategories).toEqual([{ id: 'category-1', title: 'Food', color: '#252525' }]);
  });

  it('returns category by id', () => {
    useTransactionsStore.setState({
      categories: [{ id: 'category-1', title: 'Food', color: '#252525' }],
    });

    const category = useTransactionsStore.getState().getCategoryById('category-1');
    expect(category).toStrictEqual({ id: 'category-1', title: 'Food', color: '#252525' });
  });

  it('adds a transaction', () => {
    act(() => {
      useTransactionsStore.getState().addTransaction({
        type: 'income',
        amount: 1000,
        categoryId: 'salary',
        date: '2025-07-24T22:00:00.000Z',
        note: '',
      });
    });

    const transactions = useTransactionsStore.getState().transactions;
    expect(transactions).toHaveLength(1);
    expect(transactions[0]).toMatchObject({
      type: 'income',
      id: 'mock-id',
      amount: 1000,
      categoryId: 'salary',
      date: '2025-07-24T22:00:00.000Z',
      note: '',
    });
  });

  it('adds a category', () => {
    act(() => {
      useTransactionsStore.getState().addCategory({ title: 'food', color: '#252525' });
    });

    const categories = useTransactionsStore.getState().categories;
    expect(categories).toHaveLength(1);
    expect(categories[0]).toMatchObject({
      id: 'mock-id',
      title: 'food',
      color: '#252525',
    });
  });

  it('updates transaction', () => {
    useTransactionsStore.setState({
      transactions: [{ id: '1', amount: 200, type: 'income', date: '', note: '', categoryId: '1' }],
    });

    act(() => {
      useTransactionsStore
        .getState()
        .updateTransaction({ id: '1', amount: 250, type: 'income', date: '2025-07-24', note: 'Updated note', categoryId: '2' });
    });

    const transaction = useTransactionsStore.getState().transactions[0];
    expect(transaction).toStrictEqual({ id: '1', amount: 250, type: 'income', date: '2025-07-24', note: 'Updated note', categoryId: '2' });
  });

  it('removes a transaction', () => {
    useTransactionsStore.setState({
      transactions: [{ id: '1', amount: 200, type: 'income', date: '', note: '', categoryId: '' }],
    });

    act(() => {
      useTransactionsStore.getState().removeTransaction('1');
    });

    const transactions = useTransactionsStore.getState().transactions;
    expect(transactions).toHaveLength(0);
  });

  it('removes a category', () => {
    useTransactionsStore.setState({
      categories: [{ id: '1', title: 'Food', color: '#252525' }],
    });

    act(() => {
      useTransactionsStore.getState().removeCategory('1');
    });

    const categories = useTransactionsStore.getState().categories;
    expect(categories).toHaveLength(0);
  });
});
