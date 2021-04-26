import React, { useState } from "react";
import QuoteComponent from "./Quote";
import styled from "styled-components";
import { QuoteProvider } from "./Quote/context";

const Footer = styled.small`
  align-self: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const App: React.FC = () => {
  return (
    <Container>
      <QuoteProvider>
        <QuoteComponent />
      </QuoteProvider>
      <Footer>Powered by @jessyhalife</Footer>
    </Container>
  );
};

export default App;
