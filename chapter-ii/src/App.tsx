import { Dashboard } from "@components/Dashboard";
import { Header } from "@components/Header";
import { createServer } from "miragejs";
import { GlobalStyle } from "./styles/global";

createServer({
  routes() {
    this.namespace = "api";
    this.get("/transactions", () => {
      return [
        {
          id: 1,
          title: "Transaction I",
          amount: Math.floor(Math.random() * 9999),
          category: "Deposit",
          type: "income",
          date: new Date(),
        },
        {
          id: 2,
          title: "Transaction II",
          amount: Math.floor(Math.random() * 9999),
          category: "Deposit",
          type: "income",
          date: new Date(),
        },
        {
          id: 3,
          title: "Transaction III",
          amount: Math.floor(Math.random() * 9999),
          category: "Debit",
          type: "outcome",
          date: new Date(),
        },
      ];
    });
  },
});

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Dashboard />
    </>
  );
}

export default App;
