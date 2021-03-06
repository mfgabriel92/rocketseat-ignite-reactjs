import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --background: #f7f7f7;
    --red: #e5334d;
    --green: #33cc95;
    --purple: #5429cc;
    --purple-light: #6933ff;
    --dark-gray: #363f5f;
    --light-gray: #969cb3;
    --white: #fff;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    @media (max-width: 1080px) {
       font-size: 93.75%;
    }

    @media (max-width: 720px) {
      font-size: 87.5%;
    }
  }
  
  body {
    background: var(--background);
    -webkit-font-smoothing: antialised;
  }

  html,body {
    height: 100%;
  }

  body, input, textarea, button {
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
  }

  h1, h2, h3, h4, h5, h6, strong, button {
    font-weight: 600;
  }

  button {
    cursor: pointer;
    border: 0;
    border-radius: 0.25rem;
    transition: all 0.2s;
    background: transparent;

    &:disabled {
      background: var(--light-gray);
      color: var(--dark-gray);
    }

    &:hover {
      filter: brightness(0.9);
    }
  }

  [disabled] {
    opacity: 0.6;
    background: var(--light-gray);
    color: var(--dark-gray);
    cursor: not-allowed;
  }

  .react-modal-overlay {
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .react-modal-content {
    background: var(--white);
    width: 100%;
    max-width: 576px;
    margin: 2rem;
    padding: 3rem;
    border-radius: 0.25rem;
    position: relative;
  }
`;
