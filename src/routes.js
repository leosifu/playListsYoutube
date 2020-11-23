import React from 'react';

import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import store, {history} from './redux/store';

import MainPage from './components/MainPage';

import App from './App.js';

const AppRoutes = () =>
  <Provider store = {store}>
    <ConnectedRouter history={history}>
      <App>
        <Switch>
          <Route exact path="/" component={MainPage} />
        </Switch>
      </App>
    </ConnectedRouter>
  </Provider>;

export default AppRoutes;
