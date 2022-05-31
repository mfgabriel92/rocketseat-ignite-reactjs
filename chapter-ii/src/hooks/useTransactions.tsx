import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "services/api";

type Transaction = {
  id: number;
  title: string;
  amount: number;
  category: string;
  type: string;
  date: Date;
};

type TransactionInput = Omit<Transaction, "id">;

type TransactionsContextProps = {
  children: ReactNode;
};

type TransactionsProviderProps = {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
};

function TransactionsProvider({ children }: TransactionsContextProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api
      .get("/transactions")
      .then((response) => setTransactions(response.data.transactions));
  }, []);

  async function createTransaction(transaction: TransactionInput) {
    const response = await api.post("/transactions", transaction);
    const { transactions: newTransaction } = response.data;

    setTransactions([...transactions, newTransaction]);
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}

const TransactionsContext = createContext<TransactionsProviderProps>(
  {} as TransactionsProviderProps
);

function useTransactions() {
  return useContext(TransactionsContext);
}

export { TransactionsProvider, useTransactions };
