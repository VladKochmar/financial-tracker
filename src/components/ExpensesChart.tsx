import type { FC } from 'react';
import { Cell, Pie, PieChart } from 'recharts';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { useExpenseCategoryPercentages } from '../hooks/useExpenseCategoryPercentages';
import { ScrollArea } from './ui/scroll-area';
import { ChartPie } from 'lucide-react';

interface ExpensesChartProps {
  className?: string;
}

const ExpensesChart: FC<ExpensesChartProps> = ({ className }) => {
  const data = useExpenseCategoryPercentages();

  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: Record<string, number>) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Expenses by Category</CardTitle>
      </CardHeader>
      {data.length ? (
        <CardContent className="flex justify-center">
          <PieChart width={200} height={200}>
            <Pie data={data} cx="50%" cy="50%" labelLine={false} label={renderCustomizedLabel} outerRadius={100} fill="#8884d8" dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </CardContent>
      ) : (
        <CardContent className="text-center py-12">
          <div className="text-muted-foreground flex flex-col items-center gap-2">
            <ChartPie className="w-12 h-12" />
            <p className="text-lg font-medium">There is no data to display yet</p>
            <p className="text-sm">Add the first transaction to see statistics</p>
          </div>
        </CardContent>
      )}
      <CardFooter className="justify-center">
        <ScrollArea className="h-14">
          <ul className="flex flex-wrap gap-2">
            {data.map(item => (
              <li key={item.name} className="inline-flex items-center gap-x-2">
                <span className={`w-4 h-4 rounded-full`} style={{ backgroundColor: item.color }}></span>
                {item.name}
              </li>
            ))}
          </ul>
        </ScrollArea>
      </CardFooter>
    </Card>
  );
};

export default ExpensesChart;
