import { act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useFiltersStore } from './useFiltersStore';

beforeEach(() => {
  useFiltersStore.setState({ filters: { transactionType: 'all', categoryId: 'all', dateRange: undefined } });
});

describe('useFiltersStore', () => {
  it('sets new filters', () => {
    act(() =>
      useFiltersStore.getState().setFilters({
        transactionType: 'income',
        categoryId: 'rent-1',
        dateRange: { from: new Date('01.02.2025'), to: new Date('01.04.2025') },
      })
    );

    const filters = useFiltersStore.getState().filters;
    expect(filters).toMatchObject({
      transactionType: 'income',
      categoryId: 'rent-1',
      dateRange: { from: new Date('01.02.2025'), to: new Date('01.04.2025') },
    });
  });
});
