import React from 'react';

const Spinner = (props) => {
  return (
    <div
      style={{ height: 200 }}
      className="d-flex justify-content-center align-items-center"
    >
      <div className="spinner-border"/>
    </div>
  );
};

export default Spinner;
