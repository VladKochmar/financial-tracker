import type { FC } from 'react';
import { TableCell } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useTransactionForm } from '../hooks/useTransactionForm';
import { Input } from './ui/input';
import { useTransactionsStore } from '../stores/useTransactionsStore';
import DatePicker from './DatePicker';
import type { Transaction } from '../types/Transaction';
import { Button } from './ui/button';

interface TransactionEditorProps {
  transaction: Transaction;
}

const TransactionEditor: FC<TransactionEditorProps> = ({ transaction }) => {
  const { form, errors, validate, update } = useTransactionForm(transaction);
  const updateTransaction = useTransactionsStore(state => state.updateTransaction);
  const categories = useTransactionsStore(state => state.categories);

  const handleUpdate = () => {
    if (!validate()) {
      return;
    }

    if (form.type && form.date) {
      const nextTransaction: Transaction = {
        id: transaction.id,
        type: form.type,
        categoryId: form.category,
        amount: Number(form.amount),
        date: form.date.toLocaleDateString(),
        note: form.note,
      };
      updateTransaction(nextTransaction);
    }
  };

  return (
    <>
      <TableCell>
        <Select value={form.type} onValueChange={nextType => update('type', nextType)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select transaction type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="income">Income</SelectItem>
            <SelectItem value="expense">Expense</SelectItem>
          </SelectContent>
        </Select>
        {errors.type && <p className="text-sm text-destructive pt-2">{errors.type}</p>}
      </TableCell>
      <TableCell>
        <Select value={form.category} onValueChange={nextCategory => update('category', nextCategory)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select transaction category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(c => (
              <SelectItem key={c.id} value={c.id} className="capitalize">
                <span className="h-4 w-4 rounded-full" style={{ backgroundColor: c.color }}></span>
                {c.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.category && <p className="text-sm text-destructive pt-2">{errors.category}</p>}
      </TableCell>
      <TableCell>
        <Input
          type="number"
          value={form.amount}
          onChange={e => update('amount', e.target.value)}
          placeholder="Enter amount in $"
          className="w-[120px]"
        />
        {errors.amount && <p className="text-sm text-destructive pt-2">{errors.amount}</p>}
      </TableCell>
      <TableCell>
        <DatePicker
          mode="single"
          selected={form.date}
          onChange={date => {
            update('date', date);
          }}
        />
        {errors.date && <p className="text-sm text-destructive pt-2">{errors.date}</p>}
      </TableCell>
      <TableCell>
        <Input value={form.note} onChange={e => update('note', e.target.value)} placeholder="Type your note" className="w-3xs" />
      </TableCell>
      <TableCell>
        <Button onClick={handleUpdate}>Save</Button>
      </TableCell>
    </>
  );
};

export default TransactionEditor;
