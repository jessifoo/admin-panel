import React from 'react';
import {
  Router,
  IndexRoute,
  Route,
  hashHistory
} from 'react-router';
import Master from './Master.js';
import Index from './Index.js';
import CreateUser from './CreateUser.js';
import MergeUser from './MergeUser.js';
import DeleteUser from './DeleteUser.js';
import Users from './Users.js';
import Login from './Login.js';
import ModifyBookings from './ModifyBookings.js';
import BookingsList from './BookingsList.js';
import Credits from './Credits.js';
import apiService from '../services/apiService.js';

require('normalize.css/normalize.css');

const requireAuth = function(nextState, replace) {
  if (!apiService.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    });
  }
};

export default class Main extends React.Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Master}>
          <IndexRoute component={Index} onEnter={requireAuth} />
          <Route path="/login" component={Login} />
          <Route
            path="/create-user"
            component={CreateUser}
            onEnter={requireAuth}
          />
          <Route
            path="/merge-user"
            component={MergeUser}
            onEnter={requireAuth}
          />
          <Route
            path="/edit-user"
            component={Users}
            onEnter={requireAuth}
          />
          <Route
            path="/delete"
            component={DeleteUser}
            onEnter={requireAuth}
          />
          <Route
            path="/bookings"
            component={BookingsList}
            onEnter={requireAuth}
          />
          <Route
            path="/modify-booking"
            component={ModifyBookings}
            onEnter={requireAuth}
          />
          <Route
            path="/credits"
            component={Credits}
            onEnter={requireAuth}
          />
        </Route>
      </Router>
    );
  }
}
