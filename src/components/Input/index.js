import React from 'react';
import classnames from 'classnames';

const Input = ({ className, showClear = false, onClear, ...props }) => {
  return (
    <div className={classnames('input-group', className)}>
      <input className="form-control" {...props}/>
      {showClear && (
        <div
          style={{ cursor: 'pointer' }}
          className="input-group-append"
          onClick={onClear}
        >
          <span className="input-group-text">&times;</span>
        </div>
      )}
    </div>
  );
};

export default Input;
