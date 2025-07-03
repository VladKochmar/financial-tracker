import { type FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useTransactionsStore } from '../stores/useTransactionsStore';
import type { TransactionType } from '../types/Transaction';
import { useFiltersStore } from '../stores/useFiltersStore';
import DatePicker from './DatePicker';

interface FiltersProps {
  className?: string;
}

const Filters: FC<FiltersProps> = ({ className }) => {
  const filters = useFiltersStore(state => state.filters);
  const setFilters = useFiltersStore(state => state.setFilters);
  const categories = useTransactionsStore(state => state.categories);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-muted rounded-xl p-3">
          <div className="mb-4">
            <DatePicker label="Date range" mode="range" selected={filters.dateRange} onChange={date => setFilters({ dateRange: date })} />
          </div>
          <div className="flex -m-2">
            <div className="flex-1/2 p-2">
              <Label>Type</Label>
              <Select
                defaultValue="all"
                value={filters.transactionType}
                onValueChange={(value: TransactionType | 'all') => setFilters({ transactionType: value })}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1/2 p-2">
              <Label>Category</Label>
              <Select defaultValue="all" value={filters.categoryId} onValueChange={value => setFilters({ categoryId: value })}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {categories.map(c => (
                    <SelectItem key={c.id} value={c.id}>
                      <span className="h-4 w-4 rounded-full" style={{ backgroundColor: c.color }}></span>
                      {c.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Filters;
