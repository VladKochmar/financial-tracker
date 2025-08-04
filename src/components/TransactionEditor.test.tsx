import TransactionEditor from './TransactionEditor';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useTransactionsStore } from '@/stores/useTransactionsStore';
import type { Transaction } from '@/types/Transaction';

vi.mock('@/stores/useTransactionsStore');

describe('TransactionEditor', () => {
  const mockUpdateTransaction = vi.fn();

  const mockTransaction: Transaction = {
    id: '1',
    type: 'expense',
    amount: 200,
    categoryId: 'food-1',
    date: '2025-07-25',
    note: 'Some note',
  };

  beforeEach(() => {
    vi.clearAllMocks();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (useTransactionsStore as any).mockImplementation((selector: any) =>
      selector({
        updateTransaction: mockUpdateTransaction,
        categories: [
          { id: 'food-1', title: 'Food', color: '#252525' },
          { id: 'rent-1', title: 'Rent', color: '#757575' },
        ],
      })
    );
  });

  it('renders props value', () => {
    render(<TransactionEditor transaction={mockTransaction} />);

    expect(screen.getByText('Expense')).toBeInTheDocument();
    expect(screen.getByText('Food')).toBeInTheDocument();
    expect(screen.getByLabelText('Amount in dollars')).toHaveValue(200);
    expect(screen.getByText('25.07.2025')).toBeInTheDocument();
    expect(screen.getByLabelText('Note input field')).toHaveValue('Some note');
  });

  it('calls updateTransaction on save click with valid form', async () => {
    render(<TransactionEditor transaction={mockTransaction} />);

    const amountInput = screen.getByLabelText('Amount in dollars');
    await userEvent.clear(amountInput);
    await userEvent.type(amountInput, '250');

    const noteInput = screen.getByLabelText('Note input field');
    await userEvent.clear(noteInput);
    await userEvent.type(noteInput, 'Updated note');

    await userEvent.click(screen.getByRole('button', { name: /save transaction/i }));

    expect(mockUpdateTransaction).toHaveBeenCalledWith({
      ...mockTransaction,
      amount: 250,
      date: '25.07.2025',
      note: 'Updated note',
    });
  });

  it("renders errors on save click if the form isn't valid", async () => {
    render(<TransactionEditor transaction={{ id: '1', type: 'expense', amount: 0, categoryId: '', date: '2025-07-25', note: '' }} />);

    await userEvent.click(screen.getByRole('button', { name: /save transaction/i }));

    expect(screen.getByText('Transaction category is required')).toBeInTheDocument();
    expect(screen.getByText('Value has to be at least 1$'));
  });
});
