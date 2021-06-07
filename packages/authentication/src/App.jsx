import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import SignIn from './components/SignIn';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

// Production Prefix for CSS class names
const prodPrefixClassName = createGenerateClassName({
  productionPrefix: 'au'
});

const App = ({ history, onSignIn = () => {} }) => {
  return (
    <StylesProvider generateClassName={ prodPrefixClassName }>
      <Router history={ history }>
        <Switch>
          <Route path="/auth/signin">
            <SignIn onSignIn={ onSignIn }/>
          </Route>
        </Switch>
      </Router>
    </StylesProvider>
  );
};

export default App;