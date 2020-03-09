/* eslint-disable import/first */
const l = require('../../utils/log')(module);

import React from 'react';

const Spinner = (props) => {
  l();

  return (
    <div className="d-flex justify-content-center">
      <div className="spinner-border"/>
    </div>
  );
};

export default Spinner;
