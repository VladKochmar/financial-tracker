import Filters from './Filters';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

const mockSetFilters = vi.fn();

vi.mock('@/stores/useFiltersStore', () => ({
  useFiltersStore: vi.fn().mockImplementation(selector =>
    selector({
      filters: { transactionType: 'all', categoryId: 'all', dateRange: undefined },
      setFilters: mockSetFilters,
    })
  ),
}));

vi.mock('@/stores/useTransactionsStore', () => ({
  useTransactionsStore: vi.fn().mockImplementation(selector =>
    selector({
      categories: [
        { id: 'food-1', title: 'Food', color: '#252525' },
        { id: 'rent-1', title: 'Rent', color: '#757575' },
      ],
    })
  ),
}));

describe('Filters', () => {
  it('renders default filters', () => {
    render(<Filters />);

    expect(screen.getAllByText('All')).toHaveLength(2);
    expect(screen.getByText('Date range')).toBeInTheDocument();
  });

  it('changes filters', () => {
    render(<Filters />);

    const typeTriggerBtn = screen.getByLabelText(/select transaction type/i);
    fireEvent.click(typeTriggerBtn);
    const expenseBtn = screen.getByLabelText(/select expense/i);
    fireEvent.click(expenseBtn);

    const categoryTriggerBtn = screen.getByLabelText(/select transaction category/i);
    fireEvent.click(categoryTriggerBtn);
    const foodCategoryBtn = screen.getByLabelText(/select food/i);
    fireEvent.click(foodCategoryBtn);

    expect(mockSetFilters).toHaveBeenCalled();
  });
});
