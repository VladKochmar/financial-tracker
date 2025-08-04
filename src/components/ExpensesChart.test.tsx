import ExpensesChart from './ExpensesChart';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';

vi.mock('@/hooks/useExpenseCategoryPercentages', () => ({
  useExpenseCategoryPercentages: vi.fn(),
}));

import { useExpenseCategoryPercentages } from '@/hooks/useExpenseCategoryPercentages';
const mockedHook = useExpenseCategoryPercentages as Mock;

describe('ExpensesChart', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders chart with data', () => {
    mockedHook.mockReturnValue([
      { name: 'Food', value: 300, color: 'rgb(255, 0, 0)' },
      { name: 'Rent', value: 500, color: 'rgb(0, 255, 0)' },
    ]);

    render(<ExpensesChart />);

    expect(screen.getByText('Food')).toBeInTheDocument();
    expect(screen.getByText('Rent')).toBeInTheDocument();
  });

  it('renders fallback when data is empty', () => {
    mockedHook.mockReturnValue([]);

    render(<ExpensesChart />);

    expect(screen.getByText('There is no data to display yet')).toBeInTheDocument();
    expect(screen.getByText('Add the first transaction to see statistics')).toBeInTheDocument();
  });
});
