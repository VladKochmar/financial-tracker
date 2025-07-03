import type { FC } from 'react';
import { useTransactionsStore } from '../stores/useTransactionsStore';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ScrollArea } from './ui/scroll-area';

interface SummaryProps {
  className?: string;
}

const Summary: FC<SummaryProps> = ({ className }) => {
  const getUsedCategories = useTransactionsStore(state => state.getUsedCategories);
  const total = useTransactionsStore(state => state.getTotalBalance());

  const totalSymbol = total < 0 ? '-' : '+';
  const categories = getUsedCategories();

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Summary</CardTitle>
      </CardHeader>
      <CardContent className="grid items-center grid-cols-2 gap-x-5">
        <div className="flex flex-col gap-y-1 items-center border-r border-border">
          <p className="text-sm text-muted-foreground">Total</p>
          <p className="font-bold text-3xl">
            {totalSymbol}${Math.abs(total)}
          </p>
        </div>
        <ScrollArea className="h-24">
          <ul>
            {categories.map(category => (
              <li key={category.id} className="flex gap-x-2 items-center not-last:mb-3">
                <span className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }}></span>
                <span>{category.title}</span>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default Summary;
