import incomeImg from "@assets/income.svg";
import outcomeImg from "@assets/outcome.svg";
import totalImg from "@assets/total.svg";
import { useTransactions } from "hooks/useTransactions";
import { getFormattedCurrency } from "utils/currency";
import { Container, SummaryItem } from "./styles";

function Summary() {
  const { transactions } = useTransactions();

  const totals = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "income") {
        acc.income += transaction.amount;
        acc.total += transaction.amount;
      } else if (transaction.type === "outcome") {
        acc.outcome += transaction.amount;
        acc.total -= transaction.amount;
      }

      return acc;
    },
    {
      income: 0,
      outcome: 0,
      total: 0,
    }
  );

  return (
    <Container>
      <SummaryItem>
        <header>
          <p>Income</p>
          <img src={incomeImg} alt="income" />
        </header>
        <strong>{getFormattedCurrency(totals.income)}</strong>
      </SummaryItem>
      <SummaryItem>
        <header>
          <p>Outcome</p>
          <img src={outcomeImg} alt="outcome" />
        </header>
        <strong>{getFormattedCurrency(totals.outcome)}</strong>
      </SummaryItem>
      <SummaryItem className="highlight">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="total" />
        </header>
        <strong>{getFormattedCurrency(totals.total)}</strong>
      </SummaryItem>
    </Container>
  );
}

export { Summary };
