import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import asyncComponent from 'libs/asyncComponent';


const AppRouter = (props) => {

	return (
		<Switch>
			<Route
				exact
				key="root"
				path="/"
				component={() => (<Redirect to="/posts"/>)}
			/>
			<Route
				exact
				key="posts"
				path="/posts"
				component={asyncComponent(() => import('containers/Posts'))}
			/>
			<Route
				exact
				key="post"
				path="/posts/:id"
				component={asyncComponent(() => import('containers/Posts/Post'))}
			/>
			<Route
				exact
				key="about"
				path="/about"
				component={asyncComponent(() => import('containers/About'))}
			/>
			<Route
				key="not-found"
				component={asyncComponent(() => import('containers/NotFound'))}
			/>
		</Switch>
	);
};


export default AppRouter;
