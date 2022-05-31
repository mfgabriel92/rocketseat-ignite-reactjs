import closeImg from "@assets/close.svg";
import incomeImg from "@assets/income.svg";
import outcomeImg from "@assets/outcome.svg";
import { useTransactions } from "hooks/useTransactions";
import { FormEvent, useState } from "react";
import Modal from "react-modal";
import {
  Container,
  TransactionTypeContainer,
  TransactionTypeButtonIncome,
  TransactionTypeButtonOutcome,
} from "./styles";

Modal.setAppElement("#root");

type NewTransactionModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
};

function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
  const { createTransaction } = useTransactions();
  const [title, setTitle] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [type, setType] = useState<string>("income");
  const [category, setCategory] = useState<string>("");

  async function handleCreateNewTransaction(e: FormEvent) {
    e.preventDefault();
    await createTransaction({
      title,
      amount,
      type,
      category,
      date: new Date(),
    });
    setTitle("");
    setAmount(0);
    setType("income");
    setCategory("");
    onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <Container onSubmit={handleCreateNewTransaction}>
        <button type="button" onClick={onRequestClose}>
          <img src={closeImg} alt="Close" />
        </button>

        <h2>New transaction</h2>

        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />

        <TransactionTypeContainer>
          <TransactionTypeButtonIncome
            type="button"
            isSelected={type === "income"}
            onClick={() => setType("income")}
          >
            <img src={incomeImg} alt="Income" /> Income
          </TransactionTypeButtonIncome>
          <TransactionTypeButtonOutcome
            type="button"
            isSelected={type === "outcome"}
            onClick={() => setType("outcome")}
          >
            <img src={outcomeImg} alt="Outcome" />
            Outcome
          </TransactionTypeButtonOutcome>
        </TransactionTypeContainer>

        <input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <button type="submit">Save</button>
      </Container>
    </Modal>
  );
}

export { NewTransactionModal };
