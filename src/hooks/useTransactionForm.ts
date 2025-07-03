import { useState } from 'react';
import type { Transaction, TransactionType } from '../types/Transaction';

interface TransactionForm {
  type: TransactionType | '';
  category: string;
  amount: string;
  date: Date | undefined;
  note: string | undefined;
}

export const useTransactionForm = (initTransaction?: Transaction) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState<TransactionForm>(() => {
    const result: TransactionForm = initTransaction
      ? {
          type: initTransaction.type,
          category: initTransaction.categoryId,
          amount: initTransaction.amount.toString(),
          date: new Date(initTransaction.date),
          note: initTransaction.note,
        }
      : { type: '', category: '', amount: '', date: undefined, note: undefined };
    return result;
  });

  const update = (field: keyof TransactionForm, value: unknown) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const err: Record<string, string> = {};

    if (!form.type) err.type = 'Transaction type is required';

    if (!form.category) err.category = 'Transaction category is required';

    if (!form.amount || Number(form.amount) < 1) err.amount = 'Value has to be at least 1$';

    if (!form.date) err.date = 'Date is required';
    if (!(form.date instanceof Date)) err.date = 'Invalid date format';

    if (Object.values(err).length) {
      setErrors(err);
      return false;
    }

    return true;
  };

  const reset = () => {
    setForm({ type: '', category: '', amount: '', date: undefined, note: undefined });
  };

  return { form, errors, update, validate, reset };
};
