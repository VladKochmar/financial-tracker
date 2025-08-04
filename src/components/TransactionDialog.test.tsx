import TransactionDialog from './TransactionDialog';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import * as useTransactionFormHook from '@/hooks/useTransactionForm';

const addTransactionMock = vi.fn();

vi.mock('@/stores/useTransactionsStore', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useTransactionsStore: (selector: any) =>
    selector({
      addTransaction: addTransactionMock,
      categories: [
        { id: 'food-1', title: 'Food', color: '#252525' },
        { id: 'rent-2', title: 'Rent', color: '#757575' },
      ],
    }),
}));

describe('TransactionDialog', () => {
  const useTransactionFormSpy = vi.spyOn(useTransactionFormHook, 'useTransactionForm');
  const form: useTransactionFormHook.TransactionForm = { type: '', category: '', amount: '', date: undefined, note: undefined };
  const mockErrors: Record<string, string> = {};

  useTransactionFormSpy.mockReturnValue({
    form,
    errors: mockErrors,
    update: vi.fn(),
    validate: vi.fn(),
    reset: vi.fn(),
  });

  it('renders transaction dialog with form fields', () => {
    render(<TransactionDialog />);

    const dialogButton = screen.getByTestId('transaction-dialog-button');
    fireEvent.click(dialogButton);

    expect(screen.getByText('New Transaction')).toBeInTheDocument();
    expect(screen.getByText('Select transaction type')).toBeInTheDocument();
    expect(screen.getByText('Select transaction category')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter amount in $')).toBeInTheDocument();
    expect(screen.getByText('Select date')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Type your note')).toBeInTheDocument();
  });

  it('renders errors if form is invalid', () => {
    useTransactionFormSpy.mockReturnValue({
      form,
      errors: {
        type: 'Transaction type is required',
        category: 'Transaction category is required',
        amount: 'Value has to be at least 1$',
        date: 'Invalid date format',
      },
      update: vi.fn(),
      validate: vi.fn(),
      reset: vi.fn(),
    });

    render(<TransactionDialog />);

    const dialogButton = screen.getByTestId('transaction-dialog-button');
    fireEvent.click(dialogButton);

    const saveButton = screen.getByTestId('save-button');
    fireEvent.click(saveButton);

    expect(screen.getByText('Transaction type is required')).toBeInTheDocument();
    expect(screen.getByText('Transaction category is required')).toBeInTheDocument();
    expect(screen.getByText('Value has to be at least 1$')).toBeInTheDocument();
    expect(screen.getByText('Invalid date format')).toBeInTheDocument();
  });

  it('calls addTransaction if the form is valid', () => {
    useTransactionFormSpy.mockReturnValue({
      form: {
        type: 'income',
        category: 'rent-2',
        amount: '1000',
        date: new Date(2024, 6, 17),
        note: 'Test transaction',
      },
      errors: mockErrors,
      update: vi.fn(),
      validate: vi.fn(() => true),
      reset: vi.fn(),
    });

    render(<TransactionDialog />);

    const dialogButton = screen.getByTestId('transaction-dialog-button');
    fireEvent.click(dialogButton);

    const saveButton = screen.getByTestId('save-button');
    fireEvent.click(saveButton);

    expect(addTransactionMock).toHaveBeenCalledWith({
      type: 'income',
      categoryId: 'rent-2',
      amount: 1000,
      date: expect.any(String),
      note: 'Test transaction',
    });
  });

  it('closes dialog after cancel button is clicked', () => {
    render(<TransactionDialog />);

    const dialogButton = screen.getByTestId('transaction-dialog-button');
    fireEvent.click(dialogButton);

    const cancelButton = screen.getByTestId('cancel-button');
    fireEvent.click(cancelButton);

    expect(screen.queryByText('New Transaction')).not.toBeInTheDocument();
  });
});
