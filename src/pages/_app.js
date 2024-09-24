import Head from "next/head";
import { ApolloProvider, InMemoryCache, ApolloClient } from "@apollo/client";
import "../app/globals.css";
const client = new ApolloClient({
  uri: "https://astralpaints.kwebmakerdigitalagency.com/graphql",
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  );
}

export default MyApp;
