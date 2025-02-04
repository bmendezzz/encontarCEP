import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FaSearch, FaCopy, FaTrash } from 'react-icons/fa';

const SearchContainer = styled.div`
  width: 100%;
  max-width: 600px;
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const SearchForm = styled.form`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 1rem;
  border: 2px solid #E2E8F0;
  border-radius: 8px;
  font-size: 16px;
  font-family: 'Roboto Mono', monospace;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #4A90E2;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  background: #4A90E2;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background 0.2s;

  &:hover {
    background: #357ABD;
  }
`;

const ResultContainer = styled.div`
  background: #F8FAFC;
  padding: 1.5rem;
  border-radius: 8px;
  opacity: ${props => props.visible ? 1 : 0};
  transform: translateY(${props => props.visible ? '0' : '20px'});
  transition: all 0.3s ease;
`;

const ResultItem = styled.div`
  margin: 1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ResultLabel = styled.span`
  font-weight: 600;
  color: #4A5568;
`;

const ResultValue = styled.span`
  font-family: 'Roboto Mono', monospace;
  color: #2D3748;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: #4A90E2;
  cursor: pointer;
  padding: 0.5rem;
  transition: color 0.2s;

  &:hover {
    color: #357ABD;
  }
`;

const ErrorMessage = styled.p`
  color: #E53E3E;
  margin-top: 1rem;
  text-align: center;
`;

const EmailSection = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #E2E8F0;
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const EmailInput = styled.input`
  flex: 1;
  padding: 0.8rem;
  border: 2px solid #E2E8F0;
  border-radius: 8px;
  font-size: 16px;
`;

const EmailButton = styled(Button)`
  background: #50E3C2;
  &:hover {
    background: #3BC5A7;
  }
`;

// Remove EmailSection, EmailInput, and EmailButton styled components

function CepSearch() {
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState(null);
  const [error, setError] = useState('');
  // removed email state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setAddress(null);

    const cleanCep = cep.replace(/\D/g, '');

    if (cleanCep.length !== 8) {
      setError('CEP inválido. Digite 8 números.');
      return;
    }

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cleanCep}/json/`);
      
      if (response.data.erro) {
        setError('CEP não encontrado.');
        return;
      }

      setAddress(response.data);
    } catch (err) {
      setError('Erro ao buscar o CEP. Tente novamente.');
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const clearSearch = () => {
    setCep('');
    setAddress(null);
    setError('');
  };

  const handleEmailSend = async () => {
    if (!email || !address) return;
    
    try {
      // Here you would integrate with your email sending service
      alert(`Endereço será enviado para: ${email}`);
      setEmail('');
    } catch (error) {
      setError('Erro ao enviar email. Tente novamente.');
    }
  };

  return (
    <SearchContainer>
      <SearchForm onSubmit={handleSubmit}>
        <Input
          type="text"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          placeholder="Digite o CEP"
          maxLength="9"
          aria-label="Digite o CEP para busca"
        />
        <Button type="submit">
          <FaSearch />
          Buscar
        </Button>
      </SearchForm>

      <ResultContainer visible={!!address}>
        {address && (
          <>
            <ResultItem>
              <ResultLabel>CEP:</ResultLabel>
              <div>
                <ResultValue>{address.cep}</ResultValue>
                <ActionButton onClick={() => copyToClipboard(address.cep)} title="Copiar CEP">
                  <FaCopy />
                </ActionButton>
              </div>
            </ResultItem>
            <ResultItem>
              <ResultLabel>Logradouro:</ResultLabel>
              <ResultValue>{address.logradouro}</ResultValue>
            </ResultItem>
            <ResultItem>
              <ResultLabel>Bairro:</ResultLabel>
              <ResultValue>{address.bairro}</ResultValue>
            </ResultItem>
            <ResultItem>
              <ResultLabel>Cidade:</ResultLabel>
              <ResultValue>{address.localidade}</ResultValue>
            </ResultItem>
            <ResultItem>
              <ResultLabel>Estado:</ResultLabel>
              <ResultValue>{address.uf}</ResultValue>
            </ResultItem>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <ActionButton onClick={clearSearch} title="Limpar busca">
                <FaTrash /> Limpar
              </ActionButton>
            </div>
          </>
        )}
      </ResultContainer>

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </SearchContainer>
  );
}

export default CepSearch;