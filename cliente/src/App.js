import React from 'react';
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './componentes/Header';
import Clientes from './componentes/Clientes';


const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  onError: ({ networkError, graphQlErrors }) => {
    console.log('graphQLErrors', graphQlErrors)
    console.log('networkError', networkError)
  }
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <React.Fragment>
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Clientes} />
            </Switch>
          </div>
        </React.Fragment>
      </Router>
    </ApolloProvider>
  );
}

export default App;
