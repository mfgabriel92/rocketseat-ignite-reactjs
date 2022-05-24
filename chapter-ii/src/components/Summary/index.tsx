import incomeImg from "@assets/income.svg";
import outcomeImg from "@assets/outcome.svg";
import totalImg from "@assets/total.svg";
import { Container, SummaryItem } from "./styles";

function Summary() {
  return (
    <Container>
      <SummaryItem>
        <header>
          <p>Income</p>
          <img src={incomeImg} alt="income" />
        </header>
        <strong>$1,000.00</strong>
      </SummaryItem>
      <SummaryItem>
        <header>
          <p>Outcome</p>
          <img src={outcomeImg} alt="outcome" />
        </header>
        <strong>- $1,000.00</strong>
      </SummaryItem>
      <SummaryItem className="highlight">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="total" />
        </header>
        <strong>$1,000.00</strong>
      </SummaryItem>
    </Container>
  );
}

export { Summary };
