import React, { memo } from 'react';
import { Route, Switch, BrowserRouter as Router, } from 'react-router-dom';
import Login from './pages/Login';
import Layout from './Layout';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/messages/:channelId" component={Layout} />
        <Route exact path="/" component={Layout} />
      </Switch>
    </Router>
  );
};

export default memo(Routes);