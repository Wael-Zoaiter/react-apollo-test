import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

// GraphQL Setup
import { client } from './graphql';

// Components
import RepositoriesList from './components/RepositoriesList';
import RepositoryDetail from './components/RepositoryDetail';

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <Switch>
            <Route exact path="/" component={() => <Redirect to="/page/1" />} />
            <Route exact path="/page/:page" component={RepositoriesList} />
            <Route exact path="/:owner/:name" component={RepositoryDetail} />
          </Switch>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;