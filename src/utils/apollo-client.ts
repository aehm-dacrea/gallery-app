import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";
import { onError } from '@apollo/client/link/error';

const TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;
const SPACE = process.env.CONTENTFUL_SPACE_ID;
const URL = `https://graphql.contentful.com/content/v1/spaces/${SPACE}`;

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.error(message));
})

const http = new HttpLink({
  uri: URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

const link = ApolloLink.from([errorLink, http]);

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  link,
  cache,
});

export default apolloClient;
