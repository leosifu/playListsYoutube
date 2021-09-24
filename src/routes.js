import React from 'react';

import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import store, {history} from './redux/store';

import MainPage from './components/MainPage';
import RoomPage from './components/RoomPage';
import RedirectComponent from './components/RedirectComponent';

import App from './App.js';

const AppRoutes = () =>
  <Provider store = {store}>
    <ConnectedRouter history={history}>
      <App>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/room/:id" component={RoomPage} />
          <Route exact path="/redirect" component={RedirectComponent} />
        </Switch>
      </App>
    </ConnectedRouter>
  </Provider>;

export default AppRoutes;
