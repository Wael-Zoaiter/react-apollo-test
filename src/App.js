import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

// GraphQL Setup
import { client } from './graphql';

// Components
import RepositoriesList from './components/RepositoriesList';
import RepositoryDetail from './components/RepositoryDetail';
import Authentication from './components/Authentication';

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route exact path="/" component={Authentication} />
            <Route exact path="/page/:page" component={RepositoriesList} />
            <Route exact path="/:owner/:name" component={RepositoryDetail} />
            <Route path="*" component={() => <Redirect to="/" />} />
          </Switch>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;