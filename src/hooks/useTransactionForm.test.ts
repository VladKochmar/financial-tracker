import { describe, it, expect } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useTransactionForm, type TransactionForm } from './useTransactionForm';
import type { Transaction } from '@/types/Transaction';

const transactionMock: Transaction = {
  id: '1',
  type: 'expense',
  categoryId: '8d53cec5-306a-4826-a307-3a6892016c29',
  amount: 200,
  date: '2025-07-24T22:00:00.000Z',
  note: undefined,
};

describe('useTransactionForm', () => {
  it('updates existing transaction', () => {
    const { result } = renderHook(() => useTransactionForm(transactionMock));

    act(() => result.current.update('amount', '300'));
    act(() => result.current.update('note', 'Updated note'));

    expect(result.current.form.amount).toBe('300');
    expect(result.current.form.note).toBe('Updated note');
  });

  it('validates form', async () => {
    const { result } = renderHook(() => useTransactionForm(transactionMock));

    const validationResult = await act(() => result.current.validate());
    expect(validationResult).toBe(true);
  });

  it('sets errors when validation fails', async () => {
    const { result } = renderHook(() => useTransactionForm());
    const validationResult = await act(() => result.current.validate());

    expect(validationResult).toBe(false);
    expect(result.current.errors.type).toBe('Transaction type is required');
    expect(result.current.errors.category).toBe('Transaction category is required');
    expect(result.current.errors.amount).toBe('Value has to be at least 1$');
    expect(result.current.errors.date).toBe('Invalid date format');
  });

  it('resets existing transaction', () => {
    const transactionFormMock: TransactionForm = { type: '', category: '', amount: '', date: undefined, note: undefined };

    const { result } = renderHook(() => useTransactionForm(transactionMock));

    act(() => result.current.reset());
    expect(result.current.form).toStrictEqual(transactionFormMock);
  });
});
