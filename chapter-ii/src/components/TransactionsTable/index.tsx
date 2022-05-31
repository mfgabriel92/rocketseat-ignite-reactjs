import { format } from "date-fns";
import { useState, useEffect } from "react";
import { api } from "services/api";
import { Container, TableHeader, TableRow } from "./styles";

type Transaction = {
  id: number;
  title: string;
  amount: number;
  category: string;
  type: string;
  date: Date;
};

function TransactionsTable() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api
      .get("transactions")
      .then((response) => setTransactions(response.data.transactions));
  }, []);

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
          <p className={transaction.type}>${transaction.amount.toFixed(2)}</p>
          <p>{transaction.category}</p>
          <p>{format(new Date(transaction.date), "do 'of' MMMM, yyyy")}</p>
        </TableRow>
      ))}
    </Container>
  );
}

export { TransactionsTable };
