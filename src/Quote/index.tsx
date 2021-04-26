import React from "react";
import styled from "styled-components";
import { QuoteContext } from "./context";
import { Quote } from "./types";
import { FaTwitter, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
const colors = [
  "#16a085",
  "#27ae60",
  "#dab9ff",
  "#f39c12",
  "#e74c3c",
  "#9b59b6",
  "#FB6964",
  "#ffbbe4",
  "#8ad0ff",
  "#BDBB99",
  "#77B1A9",
  "#73A857",
];
const Text = styled.div`
  font-size: 2rem;
  font-weight: 500;
`;

interface PropsContainer {
  backgroundColor: string;
}

const Container = styled.div`
  border-radius: 16px;
  padding: 2rem;
  margin: auto;
  background-color: ${({ backgroundColor }: PropsContainer) =>
    backgroundColor || "#c4c4c4"};
  transition: background-color 0.8s ease;
  width: 50rem;
`;
const Author = styled.div`
  font-size: 1rem;
  text-align: right;
  padding: 1rem;
`;

const Tweet = styled.a`
  text-decoration: none;
  border-radius: 4px;
  padding: 0.3rem 0.75rem;
  background-color: #00acee;
  color: white;
  font-weight: bold;
`;

const TwSpan = styled.span`
  display: none;
  @media (min-width: 768px) {
    display: inline;
  }
`;

const Actions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
`;

const NewQuote = styled.button`
  border: none;
  text-decoration: none;
  font-size: 1rem;
  border-radius: 4px;
  padding: 0.3rem 0.75rem;
  background-color: #f24e4e;
  color: white;
  font-weight: bold;
  font-family: Inconsolata;
  cursor: pointer;
`;

const QuoteText = styled.span`
  margin: 0 1rem;
`;

const QuoteComponent: React.FC = () => {
  const { getRandomQuote } = React.useContext(QuoteContext);
  const [current, setCurrent] = React.useState<Quote>({} as Quote);
  const [color, setColor] = React.useState<string>("#c4c4c4");

  React.useEffect(() => {
    handleNewQuote();
  }, []);

  function handleNewQuote() {
    setCurrent(getRandomQuote());
    const rnd = Math.floor(Math.random() * (colors.length - 0));
    setColor(colors[rnd]);
  }
  return (
    <Container backgroundColor={color}>
      {current && (
        <>
          <Text>
            <FaQuoteLeft size={30} />
            <QuoteText>{current.quote}</QuoteText>
            <FaQuoteRight size={30} />
          </Text>

          <Author>- {current.author}</Author>
          <Actions>
            <Tweet
              href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${encodeURIComponent(
                '"' + current.quote + '" - ' + current.author
              )}`}
            >
              <FaTwitter size={12} /> <TwSpan> Tweet</TwSpan>
            </Tweet>
            <NewQuote onClick={() => handleNewQuote()}>New Quote</NewQuote>
          </Actions>
        </>
      )}
    </Container>
  );
};

export default QuoteComponent;
