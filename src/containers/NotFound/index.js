/* eslint-disable import/first */
const l = require('../../utils/log')(module);

import React from 'react';

const NotFound = (props) => {
  l();

  return (
    <div className="d-flex flex-column align-items-center">
      <h1 className="mb-3 text-muted">404</h1>
      <h5>We are sorry, but page not found</h5>
    </div>
  );
};

export default NotFound;
