import React from "react";
import styled from "@emotion/styled";
import { ErrorBoundary } from "react-error-boundary";
import { GoogleSheetProvider } from "./context/GoogleSheetContext";
import { ThemeProvider } from "./theme";
import { LanguageProvider } from "./translation/LanguageContext";
import { GoogleSheetErrorFallback } from "./components/GoogleSheetErrorFallback";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router/routes";

const Container = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  transition: all 0.5s ease-in-out;
  margin: 0 auto;
  padding: 1rem;
  padding-bottom: 5rem;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.textPrimary};
`;

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Container>
          <ErrorBoundary
            FallbackComponent={GoogleSheetErrorFallback}
            onReset={() => {
              window.location.reload();
            }}
          >
            <GoogleSheetProvider>
              <RouterProvider router={router} />
            </GoogleSheetProvider>
          </ErrorBoundary>
        </Container>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
