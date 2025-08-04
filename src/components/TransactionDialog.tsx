import { useState, type FC } from 'react';

import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

import { useTransactionForm } from '../hooks/useTransactionForm';
import { useTransactionsStore } from '../stores/useTransactionsStore';
import CategoryCreator from './CategoryCreator';
import DatePicker from './DatePicker';

const TransactionDialog: FC = () => {
  const { form, errors, validate, update, reset } = useTransactionForm();
  const categories = useTransactionsStore(state => state.categories);
  const addTransaction = useTransactionsStore(state => state.addTransaction);

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClick = () => {
    if (!validate()) {
      return;
    }

    if (form.type && form.date) {
      const newTransaction = {
        type: form.type,
        categoryId: form.category,
        amount: Number(form.amount),
        date: form.date!.toISOString(),
        note: form.note,
      };
      addTransaction(newTransaction);
      setDialogOpen(false);
      reset();
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button data-testid="transaction-dialog-button" size="lg">
          Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>New Transaction</DialogTitle>
        </DialogHeader>
        <div className="grid gap-y-4">
          <div>
            <Label>Transaction Type</Label>
            <Select value={form.type} onValueChange={nextType => update('type', nextType)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select transaction type" className={`${errors.type ? 'border-destructive' : null}`} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
            {errors.type && <p className="text-sm text-destructive pt-2">{errors.type}</p>}
          </div>
          <div>
            <Label>Transaction Category</Label>
            {categories.length ? (
              <>
                <Select value={form.category} onValueChange={nextCategory => update('category', nextCategory)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select transaction category" className={`${errors.type ? 'border-destructive' : null}`} />
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
              </>
            ) : (
              <CategoryCreator style={{ width: '100%' }} />
            )}
          </div>
          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input
              type="number"
              value={form.amount}
              onChange={e => update('amount', e.target.value)}
              id="amount"
              placeholder="Enter amount in $"
              className={`${errors.type ? 'border-destructive' : null}`}
            />
            {errors.amount && <p className="text-sm text-destructive pt-2">{errors.amount}</p>}
          </div>
          <div>
            <DatePicker
              label="Date"
              mode="single"
              selected={form.date}
              onChange={date => {
                update('date', date);
              }}
            />
            {errors.date && <p className="text-sm text-destructive pt-2">{errors.date}</p>}
          </div>
          <div>
            <Label htmlFor="note">Note</Label>
            <Textarea id="note" value={form.note} onChange={e => update('note', e.target.value)} placeholder="Type your note" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button data-testid="cancel-button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button data-testid="save-button" onClick={handleClick}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionDialog;
