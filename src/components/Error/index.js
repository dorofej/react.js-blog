import React from 'react';
import classnames from 'classnames';

const Error = ({ className, error, ...props }) => {
  return (
    <div className={classnames('p-4 rounded text-white bg-danger', className)}>
      <h3>Oops! Error occurs</h3>
      <div>
        {error.message || error}
      </div>
    </div>
  );
};

export default Error;
