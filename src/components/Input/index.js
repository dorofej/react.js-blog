import React from 'react';
import classnames from 'classnames';

const Input = ({
  style,
  className,
  value,
  showClear = false,
  onClear,
  ...props
}) => {
  return (
    <div style={style} className={classnames('input-group', className)}>
      <input className="form-control" value={value} {...props}/>
      {showClear && (
        <div
          style={{ cursor: 'pointer', userSelect: 'none' }}
          className="input-group-append"
          onClick={value ? onClear : null}
        >
          <span className="input-group-text">&times;</span>
        </div>
      )}
    </div>
  );
};

export default Input;
