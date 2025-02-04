import React from 'react';
import styled from 'styled-components';
import CepSearch from './components/CepSearch';
import GlobalStyle from './styles/GlobalStyle';
import { FaMapMarkerAlt } from 'react-icons/fa';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 3rem;
`;

const Logo = styled.div`
  color: #4A90E2;
  font-size: 2.5rem;
`;

const Title = styled.h1`
  color: #2D3748;
  font-size: 32px;
  font-weight: 700;
`;

const Footer = styled.footer`
  margin-top: auto;
  padding: 2rem;
  text-align: center;
  color: #2D3748;
  font-size: 14px;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Header>
          <Logo>
            <FaMapMarkerAlt />
          </Logo>
          <Title>Consulta de CEP</Title>
        </Header>
        <CepSearch />
        <Footer>
          © 2024 MeuSiteCEP. Todos os direitos reservados.
        </Footer>
      </AppContainer>
    </>
  );
}

export default App;