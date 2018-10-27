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
				component={asyncComponent(() => import('../Posts'))}
			/>
			<Route
				exact
				key="post"
				path="/posts/:id"
				component={asyncComponent(() => import('../Posts/Post'))}
			/>
		</Switch>
	);
};


export default AppRouter;
