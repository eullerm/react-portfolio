import React from "react";
import Header from "../components/Header";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Experiences from "../components/Experiences";
import Skills from "../components/Skills";
import styled from "@emotion/styled";

const Container = styled.div`
  min-height: 100vh;
  width: 42rem;
  display: flex;
  flex-direction: column;
  transition: all 0.5s ease-in-out;
  margin: 0 auto;
  padding: 1rem;
  gap: 1rem;
`;

const Home: React.FC = () => {
  return (
    <Container>
      <Header />
      <Contact />
      <Experiences />
      <Projects />
      <Skills />
    </Container>
  );
};

export default Home;
