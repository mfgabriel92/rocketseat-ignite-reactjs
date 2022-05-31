import { format } from "date-fns";
import { useTransactions } from "hooks/useTransactions";
import { getFormattedCurrency } from "utils/currency";
import { Container, TableHeader, TableRow } from "./styles";

function TransactionsTable() {
  const { transactions } = useTransactions();

  return (
    <Container>
      <TableHeader>
        <p>Title</p>
        <p>Amount</p>
        <p>Category</p>
        <p>Date</p>
      </TableHeader>
      {transactions?.map((transaction) => (
        <TableRow key={transaction.id}>
          <p>{transaction.title}</p>
          <p className={transaction.type}>
            {getFormattedCurrency(transaction.amount)}
          </p>
          <p>{transaction.category}</p>
          <p>{format(new Date(transaction.date), "do 'of' MMMM, yyyy")}</p>
        </TableRow>
      ))}
    </Container>
  );
}

export { TransactionsTable };
