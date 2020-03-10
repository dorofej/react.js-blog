import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import asyncComponent from '../../libs/asyncComponent';
import PostsList from '../../containers/PostsList';

const AppRouter = (props) => {

  return (
    <Switch>
      <Route
        exact
        key="root"
        path="/"
        component={() => <Redirect to="/posts"/>}
      />
      <Route
        exact
        key="posts"
        path="/posts"
        // FIXME: remounting occurs while changing url parameter string
        // which causes bad experience during posts searching
        // component={asyncComponent(() => import('../../containers/PostsList'))}
        component={PostsList}
      />
      <Route
        exact
        key="post"
        path="/posts/:id"
        component={asyncComponent(() => import('../../containers/SinglePost'))}
      />
      <Route
        exact
        key="about"
        path="/about"
        component={asyncComponent(() => import('../../containers/About'))}
      />
      <Route
        key="not-found"
        component={asyncComponent(() => import('../../containers/NotFound'))}
      />
    </Switch>
  );
};

export default AppRouter;
