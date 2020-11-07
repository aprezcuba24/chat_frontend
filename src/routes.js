import React, { memo } from 'react';
import { Route, Switch, BrowserRouter as Router, } from 'react-router-dom';
import Login from './pages/Login';
import ChatLayout from './pages/chat';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <ChatLayout />
        </Route>
      </Switch>
    </Router>
  );
};

export default memo(Routes);