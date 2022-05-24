import styled from "styled-components";

export const Container = styled.div`
  margin-top: 4rem;
`;

export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr 1fr 1fr;
  padding: 1rem 2rem;
  color: var(--light-gray);
  margin-bottom: 1rem;
`;

export const TableRow = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr 1fr 1fr;
  padding: 1.5rem 2rem;
  background: var(--white);
  border-radius: 0.25rem;
  margin-bottom: 0.5rem;
  border: 1px solid var(--lt-color-border-default);

  p.outcome {
    color: var(--red);
  }

  p.income {
    color: var(--green);
  }
`;
