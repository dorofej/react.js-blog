/* eslint-disable import/first */
const l = require('utils/log')(module);

import React from 'react';
import ReactSpinner from 'react-loader-spinner';


const Spinner = (props) => {
	l();

	return (
		<div
			style={{
				width: '100%',
				height: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<ReactSpinner
				type="Oval"
				color="#00BFFF"
				height="100"
				width="100"
			/>
		</div>
	);
};


export default Spinner;
