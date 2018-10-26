import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Posts from 'containers/Posts';
import Post from 'containers/Posts/Post';


const AppRouter = (props) => {

	return (
		<Switch>
			<Route
				exact
				key="posts"
				path="/posts"
				component={() => (<Posts/>)}
			/>
			<Route
				exact
				key="post"
				path="/posts/:id"
				component={() => (<Post/>)}
			/>
		</Switch>
	);
};


export default AppRouter;
