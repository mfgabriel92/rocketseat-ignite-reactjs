import { Dashboard } from "@components/Dashboard";
import { Header } from "@components/Header";
import { NewTransactionModal } from "@components/NewTransactionModal";
import { createServer, Model } from "miragejs";
import { useState } from "react";
import { GlobalStyle } from "./styles/global";

createServer({
  models: {
    transactions: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: "Lorem",
          amount: 123,
          type: "income",
          category: "Ipsum",
          date: new Date("2022-05-20 12:23:50"),
        },
      ],
    });
  },

  routes() {
    this.namespace = "api";

    this.get("/transactions", () => this.schema.all("transactions"));

    this.post("/transactions", (schema, request) => {
      const data = JSON.parse(request.requestBody);
      return schema.create("transactions", data);
    });
  },
});

function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);

  function handleToggleNewTransactionModal() {
    setIsNewTransactionModalOpen(!isNewTransactionModalOpen);
  }

  return (
    <>
      <GlobalStyle />
      <Header onToggleNewTransactionModal={handleToggleNewTransactionModal} />
      <Dashboard />
      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleToggleNewTransactionModal}
      />
    </>
  );
}

export default App;
