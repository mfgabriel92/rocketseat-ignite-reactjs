import styled, { css } from "styled-components";

export const Container = styled.form`
  display: flex;
  flex-direction: column;

  h2 {
    color: var(--dark-gray);
    font-size: 1.5rem;
    padding-bottom: 2rem;
  }

  input {
    padding: 0 1.5rem;
    height: 4rem;
    margin-bottom: 1rem;
    border-radius: 0.25rem;
    border: 1px solid #d7d7d7;
    background: #e7e9ee;
  }

  > button[type="submit"] {
    height: 4rem;
    border-radius: 0.25rem;
    background: var(--green);
    color: var(--white);
  }

  > button[type="button"] {
    position: absolute;
    right: 1.5rem;
    top: 1.5rem;
  }
`;

export const TransactionTypeContainer = styled.div`
  margin: 0 0 1rem 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  height: 4rem;
`;

type TransactionTypeButtonProps = {
  isSelected: boolean;
};

const TransactionTypeButton = styled.button<TransactionTypeButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--light-gray);

  > img {
    width: 25px;
    height: 25px;
    margin-right: 0.5rem;
    transition: all 0.2s;
  }

  &:hover {
    color: var(--white);

    > img {
      filter: brightness(0) invert(1);
    }
  }

  ${(props) =>
    props.isSelected &&
    css`
      color: var(--white);
      > img {
        filter: brightness(0) invert(1);
      }
    `}
`;

export const TransactionTypeButtonIncome = styled(TransactionTypeButton)`
  &:hover {
    background: var(--green);
    border-color: var(--green);
  }

  ${(props) =>
    props.isSelected &&
    css`
      background: var(--green);
      border-color: var(--green);
    `}
`;

export const TransactionTypeButtonOutcome = styled(TransactionTypeButton)`
  &:hover {
    background: var(--red);
    border-color: var(--red);
  }

  ${(props) =>
    props.isSelected &&
    css`
      background: var(--red);
      border-color: var(--red);
    `}
`;
