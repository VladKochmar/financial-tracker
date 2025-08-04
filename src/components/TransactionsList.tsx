import { useState, type FC } from 'react';
import { BanknoteArrowDown, BanknoteArrowUp } from 'lucide-react';

import { useTransactionsStore } from '../stores/useTransactionsStore';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

import CategoryCreator from './CategoryCreator';
import TransactionDialog from './TransactionDialog';
import TransactionActionsDropdown from './TransactionActionsDropdown';
import TransactionEditor from './TransactionEditor';
import { useFiltersStore } from '../stores/useFiltersStore';

interface TransactionsListProps {
  className?: string;
}

const TransactionsList: FC<TransactionsListProps> = ({ className }) => {
  const filters = useFiltersStore(state => state.filters);
  const transactions = useTransactionsStore(state => state.transactions);
  const getCategoryById = useTransactionsStore(state => state.getCategoryById);
  const removeTransaction = useTransactionsStore(state => state.removeTransaction);

  const [editId, setEditId] = useState<string | undefined>(undefined);

  const filteredTransactions = transactions.filter(transaction => {
    const { transactionType, categoryId, dateRange } = filters;

    const matchesType = transactionType === 'all' || transactionType === transaction.type;
    const matchesCategory = categoryId === 'all' || categoryId === transaction.categoryId;
    const matchesDate =
      !dateRange || (new Date(transaction.date) >= new Date(dateRange.from!) && new Date(transaction.date) <= new Date(dateRange.to!));

    return matchesType && matchesCategory && matchesDate;
  });

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Transactions List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-52 overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Anount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Note</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.length ? (
                filteredTransactions.map(t => (
                  <TableRow key={t.id}>
                    {editId !== t.id ? (
                      <>
                        <TableCell>
                          {t.type === 'income' ? (
                            <BanknoteArrowUp aria-label="Banknote arrow up" className="text-primary" />
                          ) : (
                            <BanknoteArrowDown aria-label="Banknote arrow down" className="text-destructive" />
                          )}{' '}
                        </TableCell>
                        <TableCell className="capitalize">{getCategoryById(t.categoryId)?.title}</TableCell>
                        <TableCell>
                          {t.type === 'income' ? (
                            <span className="text-primary">${t.amount}</span>
                          ) : (
                            <span className="text-destructive">-${t.amount}</span>
                          )}
                        </TableCell>
                        <TableCell>{new Date(t.date).toLocaleDateString()}</TableCell>
                        <TableCell>{t.note}</TableCell>
                      </>
                    ) : (
                      <TransactionEditor transaction={t} />
                    )}
                    <TableCell>
                      <TransactionActionsDropdown
                        data-testid="actions-dropdown"
                        onDelete={() => removeTransaction(t.id)}
                        onEditClick={() => setEditId(prev => (prev !== t.id ? t.id : undefined))}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center font-bold text-xl">
                    No results
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className="flex-wrap gap-4 justify-end">
        <CategoryCreator />
        <TransactionDialog />
      </CardFooter>
    </Card>
  );
};

export default TransactionsList;
