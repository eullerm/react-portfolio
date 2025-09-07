import React from "react";
import styled from "@emotion/styled";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.textPrimary};
`;

const Title = styled.h1`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const Message = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

const HomeLink = styled.a`
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  background: ${({ theme }) => theme.primary};
  color: white;
  border-radius: 4px;
  font-weight: bold;
  transition: background 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.primary};
  }
`;

const NotFound: React.FC = () => {
  return (
    <Wrapper>
      <Title>404</Title>
      <Message>Página não encontrada.</Message>
      <HomeLink href="/">Voltar para Home</HomeLink>
    </Wrapper>
  );
};

export default NotFound;
