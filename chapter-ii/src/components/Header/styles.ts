import styled from "styled-components";

export const Container = styled.header`
  background: var(--purple);
`;

export const Content = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1rem 12rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    font-size: 1rem;
    padding: 1rem 2rem;
    color: var(--white);
    background: var(--purple-light);
  }
`;
