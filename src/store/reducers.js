/* eslint-disable import/first */
const l = require('utils/log')(module);

import Posts from './posts/reducer';
import Comments from './comments/reducer';
import User from './user/reducer';
l('REDUCERS');

export default {
	Posts,
	Comments,
	User
};
