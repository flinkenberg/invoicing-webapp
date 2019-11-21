import { NormalizedCacheObject, InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { ApolloLink, Operation } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";

const WS = "wss://localhost:4000/";

let client: ApolloClient<NormalizedCacheObject> | null = null;

const authLink = new ApolloLink((operation, forward) => {
  const token = "";
  (operation as Operation & { authToken: string | undefined }).authToken = token;
  return forward(operation);
});
const cache = new InMemoryCache({ addTypename: true });


export function getClient() {
  if (client) return client;
  const websocketClient = new WebSocketLink({
    options: {
      reconnect: true,
      lazy: true,
    },
    uri: WS,
  });

  const links: ApolloLink[] = [authLink, websocketClient];

  client = new ApolloClient({
    cache,
    link: ApolloLink.from(links),
    queryDeduplication: true,
    connectToDevTools: process.env.NODE_ENV !== "production",
  });

  return client;
}
