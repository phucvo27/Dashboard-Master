import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client'
import { setContext } from '@apollo/client/link/context';
import { typeDefs } from './graphql/typeDefs'
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  let token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYWE3NWNiMzQ1MjU2MWEzZjY0NjNjOCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYwNzc1NDkxMiwiZXhwIjoxNjEwMzQ2OTEyfQ.o078VfkpyNF7TazXcmM7OmyicuPhHp17-QZeIshvlGY"
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : "",
    }
  }
});
const cache = new InMemoryCache();
// const link = createHttpLink({
//   uri: 'https://aulac-api.purplese.com/graphql'
// })
const link = createUploadLink ({
  uri: 'https://aulac-api.purplese.com/graphql'
})

const client = new ApolloClient({
  link: authLink.concat(link),
  cache,
  typeDefs,
  // defaultOptions: {
  //   query: {
  //     fetchPolicy: 'no-cache',
  //     errorPolicy: 'all',
      
  //   }
  // }
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
