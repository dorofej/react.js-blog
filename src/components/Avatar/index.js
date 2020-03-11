import React from 'react';
import classnames from 'classnames';

import defaultStyle from './defaultStyle';

const Avatar = ({ style, className, user, ...props }) => {
  if (!user) {
    return null;
  }

  return (
    <div
      style={{ ...style, ...defaultStyle }}
      className={classnames('rounded overflow-hidden', className)}
    >
      <img
        className="img-fluid"
        title={user.name}
        src={user.avatar}
      />
    </div>
  );
};

export default Avatar;
