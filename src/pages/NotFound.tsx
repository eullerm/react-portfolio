import React from "react";
import styled from "@emotion/styled";
import Lottie from "lottie-react";
import spaceData from "../assets/lottie/space.json";
import astronautData from "../assets/lottie/astronaut.json";
import notFoundData from "../assets/lottie/404.json";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
  text-align: center;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.textPrimary};
  overflow: hidden;
`;

const Title = styled.h1`
  height: auto;
  width: 20rem;
`;

const Message = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

const HomeLink = styled.a`
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  color: white;
  border-radius: 4px;
  font-weight: bold;
  transition: background 0.3s ease;

  &:hover {
    outline: 2px solid;
  }
`;

const NotFound: React.FC = () => {
  return (
    <Wrapper>
      <Lottie
        animationData={spaceData}
        loop={true}
        style={{
          width: "100%",
          height: "auto",
          maxHeight: "100%",
          objectFit: "fill",
          position: "absolute",
          overflow: "hidden",
          top: 0,
          left: 0,
        }}
        rendererSettings={{
          preserveAspectRatio: "none",
        }}
      />
      <Lottie
        animationData={astronautData}
        loop={true}
        style={{
          width: "20%",
          height: "20%",
          position: "absolute",
          bottom: "70%",
          right: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Title>
          <Lottie animationData={notFoundData} loop={true} />
        </Title>
        <Message>Desculpe, não encontramos nada aqui.</Message>
        <HomeLink href="/react-portfolio">Voltar para Home</HomeLink>
      </div>
    </Wrapper>
  );
};

export default NotFound;
