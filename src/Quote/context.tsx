import React from "react";
import api from "../api";
import { Quote } from "./types";

export interface Context {
  quotes: Quote[];
  getRandomQuote: () => Quote;
}

const QuoteContext = React.createContext({} as Context);
interface Props {
  children: JSX.Element;
}

const QuoteProvider = ({ children }: Props) => {
  const [quotes, setQuotes] = React.useState<Quote[]>([]);
  const [status, setStatus] = React.useState<"loading" | "done" | "error">(
    "loading"
  );

  React.useEffect(() => {
    const fetch = async () => {
      try {
        const quotesResult = await api.get();
        setQuotes(quotesResult);
        setStatus("done");
      } catch (err) {
        setQuotes([]);
        setStatus("error");
      }
    };

    fetch();
  }, []);

  if (status === "loading") return <h1>Loading...</h1>;
  if (status === "error") return <h1>Oops :(</h1>;
  const getRandomQuote = (): Quote => {
    const rnd = Math.floor(Math.random() * (quotes.length - 0));

    return quotes[rnd];
  };

  return (
    <QuoteContext.Provider value={{ quotes, getRandomQuote }}>
      {children}
    </QuoteContext.Provider>
  );
};

export { QuoteProvider, QuoteContext };
