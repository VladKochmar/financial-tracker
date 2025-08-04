import TransactionsList from './TransactionsList';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useTransactionsStore } from '@/stores/useTransactionsStore';
import { useFiltersStore } from '@/stores/useFiltersStore';

vi.mock('@/stores/useFiltersStore');
vi.mock('@/stores/useTransactionsStore');

describe('TransactionsList', () => {
  const categories = [
    { id: 'food-1', title: 'Food', color: '#252525' },
    { id: 'rent-1', title: 'Rent', color: '#757575' },
  ];
  const mockGetCategoryById = vi.fn((id: string) => {
    return categories.find(c => c.id === id);
  });
  const mockRemoveTransaction = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (useTransactionsStore as any).mockImplementation((selector: any) =>
      selector({
        transactions: [
          { id: '1', type: 'expense', amount: 200, categoryId: 'food-1', date: '2025-07-25', note: 'Some note' },
          { id: '2', type: 'income', amount: 1000, categoryId: 'rent-1', date: '2025-06-24' },
        ],
        categories,
        getCategoryById: mockGetCategoryById,
        removeTransaction: mockRemoveTransaction,
      })
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (useFiltersStore as any).mockImplementation((selector: any) =>
      selector({
        filters: {
          transactionType: 'all',
          categoryId: 'all',
          dateRange: undefined,
        },
      })
    );
  });

  it('renders transactions list', () => {
    render(<TransactionsList />);

    expect(screen.getByText('Food')).toBeInTheDocument();
    expect(screen.getByText('-$200')).toBeInTheDocument();
    expect(screen.getByText('Some note')).toBeInTheDocument();
    expect(screen.getByText('25.07.2025')).toBeInTheDocument();
  });

  it('renders empty list', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (useTransactionsStore as any).mockImplementation((selector: any) =>
      selector({
        transactions: [],
        categories: [],
      })
    );

    render(<TransactionsList />);
    expect(screen.getByText('No results')).toBeInTheDocument();
  });

  it('renders correct icon depending on the transaction type', () => {
    render(<TransactionsList />);
    expect(screen.getByLabelText('Banknote arrow down')).toBeInTheDocument();
  });

  it('renders filtered transactions by transaction type', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (useFiltersStore as any).mockImplementation((selector: any) =>
      selector({
        filters: {
          transactionType: 'income',
          categoryId: 'all',
        },
      })
    );

    render(<TransactionsList />);

    expect(screen.getByText('$1000')).toBeInTheDocument();
    expect(screen.queryByText('-$200')).not.toBeInTheDocument();
  });

  it('renders filtered transactions by transaction category', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (useFiltersStore as any).mockImplementation((selector: any) =>
      selector({
        filters: {
          transactionType: 'all',
          categoryId: 'food-1',
        },
      })
    );

    render(<TransactionsList />);

    expect(screen.getByText('Food')).toBeInTheDocument();
    expect(screen.queryByText('Rent')).not.toBeInTheDocument();
  });

  it('renders filtered transactions by date range', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (useFiltersStore as any).mockImplementation((selector: any) =>
      selector({
        filters: {
          transactionType: 'all',
          categoryId: 'all',
          dateRange: {
            from: new Date('2025-06-23'),
            to: new Date('2025-07-01'),
          },
        },
      })
    );

    render(<TransactionsList />);

    expect(screen.getByText('24.06.2025')).toBeInTheDocument();
    expect(screen.queryByText('25.07.2025')).not.toBeInTheDocument();
  });
});
