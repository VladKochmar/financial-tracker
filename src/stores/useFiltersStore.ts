import { create } from 'zustand';
import { combine } from 'zustand/middleware';

import type { DateRange } from 'react-day-picker';
import type { TransactionType } from '../types/Transaction';

interface Filters {
  transactionType: TransactionType | 'all';
  categoryId: string | 'all';
  dateRange?: DateRange;
}

interface State {
  filters: Filters;
}

interface Actions {
  setFilters: (filters: Partial<Filters>) => void;
}

export const useFiltersStore = create(
  combine<State, Actions>({ filters: { transactionType: 'all', categoryId: 'all', dateRange: undefined } }, set => ({
    setFilters: filters => set(state => ({ filters: { ...state.filters, ...filters } })),
  }))
);
