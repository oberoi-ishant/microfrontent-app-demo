import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import Landing from './components/Landing';
import Subscribe from './components/Subscribe';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

// Production Prefix for CSS class names
const prodPrefixClassName = createGenerateClassName({
  productionPrefix: 'pr'
});

const App = ({ history }) => {
  return (
    <StylesProvider generateClassName={ prodPrefixClassName }>
      <Router history={ history }>
        <Switch>
          <Route exact
            path="/subscribe"
            component={ Subscribe }
          />
          <Route exact
            path="/"
            component={ Landing }
          />
        </Switch>
      </Router>
    </StylesProvider>
  );
};

export default App;