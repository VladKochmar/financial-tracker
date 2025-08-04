import Summary from './Summary';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

const mockCategories = [
  { id: '1', title: 'Food', color: '#ff0000' },
  { id: '2', title: 'Rent', color: '#00ff00' },
];

vi.mock('@/stores/useTransactionsStore', () => ({
  useTransactionsStore: vi.fn().mockImplementation(selector =>
    selector({
      getTotalBalance: () => -500,
      getUsedCategories: () => mockCategories,
    })
  ),
}));

describe('Summary', () => {
  it('renders total balance', () => {
    render(<Summary />);
    expect(screen.getByText('-$500')).toBeInTheDocument();
  });

  it('renders categories list', () => {
    render(<Summary />);

    expect(screen.getByText('Food')).toBeInTheDocument();
    expect(screen.getByText('Rent')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(mockCategories.length);
  });
});
