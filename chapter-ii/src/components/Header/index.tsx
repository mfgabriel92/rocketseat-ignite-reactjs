import logoImg from "@assets/logo.svg";
import { Container, Content } from "./styles";

type HeaderProps = {
  onToggleNewTransactionModal: Function;
};

function Header(props: HeaderProps) {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="DT Money" />
        <button
          type="button"
          onClick={() => props.onToggleNewTransactionModal()}
        >
          New transaction
        </button>
      </Content>
    </Container>
  );
}

export { Header };
