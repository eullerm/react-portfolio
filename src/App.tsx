import React from "react";
import Home from "./pages/Home";
import { GoogleSheetProvider } from "./context/GoogleSheetContext";
import { ThemeProvider } from "./theme";
import { LanguageProvider } from "./translation/LanguageContext";
import styled from "@emotion/styled";

const Container = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  transition: all 0.5s ease-in-out;
  margin: 0 auto;
  padding: 0 1rem;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.textPrimary};
  transition: all 0.5s ease-in-out;
`;

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <GoogleSheetProvider>
          <Container>
            <Home />
          </Container>
        </GoogleSheetProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
