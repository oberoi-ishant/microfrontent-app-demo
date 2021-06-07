import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Switch, Route, Router, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Header from './components/Header';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

const prodPrefixClassName = createGenerateClassName({
  productionPrefix: 'co'
});

const ProductsAppLazy = lazy(() => import('./components/ProductsApp'));
const AuthenticationAppLazy = lazy(() => import('./components/AuthenticationApp'));
const DashboardAppLazy = lazy(() => import('./components/DashboardApp'));

const history = createBrowserHistory();

const useStyles = makeStyles((theme) => ({
  progressBar: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const App = () => {
  const classes = useStyles();
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      history.push('/dashboard');
    }
  }, [isSignedIn]);

  return (
    <div>
      <StylesProvider generateClassName={ prodPrefixClassName }>
        <Router history={ history }>
          <Header
            isSignedIn={ isSignedIn }
            onSignOut={ () => setIsSignedIn(false) } />
          <Switch>
            <Suspense fallback={
              <div className={ classes.progressBar }><LinearProgress /></div> }>
              <Route path="/dashboard">
                { !isSignedIn && <Redirect to="/" /> }
                <DashboardAppLazy />
              </Route>
              <Route path="/auth/">
                <AuthenticationAppLazy onSignIn={ () => setIsSignedIn(true) } />
              </Route>
              <Route path="/">
                <ProductsAppLazy />
              </Route>
            </Suspense>
          </Switch>
        </Router>
      </StylesProvider>
    </div>
  );
};

export default App;