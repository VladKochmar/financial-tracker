import ExpensesChart from './components/ExpensesChart';
import Filters from './components/Filters';
import Summary from './components/Summary';
import TransactionsList from './components/TransactionsList';
import { Card, CardContent } from './components/ui/card';

function App() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="bg-primary">
        <CardContent className="flex flex-col md:grid md:grid-cols-5 md:grid-rows-5 gap-4">
          <TransactionsList className="md:[grid-area:1/1/4/4]" />
          <Filters className="md:[grid-area:1/4/3/6]" />
          <Summary className="md:[grid-area:4/1/6/4]" />
          <ExpensesChart className="md:[grid-area:3/4/6/6]" />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
