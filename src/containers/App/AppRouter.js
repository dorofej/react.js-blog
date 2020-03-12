import React, { Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import ProgressBar from '../../components/ProgressBar';

const PostsList = React.lazy(() => import('../../containers/PostsList'));
const SinglePost = React.lazy(() => import('../../containers/SinglePost'));
const About = React.lazy(() => import('../../containers/About'));
const NotFound = React.lazy(() => import('../../containers/NotFound'));

const AppRouter = (props) => {

  return (
    <Suspense fallback={<ProgressBar/>}>
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
          component={PostsList}
        />
        <Route
          exact
          key="post"
          path="/posts/:id"
          component={SinglePost}
        />
        <Route
          exact
          key="about"
          path="/about"
          component={About}
        />
        <Route
          key="not-found"
          component={NotFound}
        />
      </Switch>
    </Suspense>
  );
};

export default AppRouter;
