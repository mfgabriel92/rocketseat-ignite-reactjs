import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  gap: 2rem;
  margin-top: -6rem;
`;

export const SummaryItem = styled.div`
  background: var(--white);
  border-radius: 0.25rem;
  padding: 1.5rem;
  color: var(--dark-gray);
  border: 1px solid var(--lt-color-border-default);

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  strong {
    display: block;
    margin-top: 1rem;
    font-size: 2rem;
  }

  &.highlight {
    background: var(--green);
    border: 1px solid var(--green);
    color: var(--white);
  }
`;
