import React from 'react';
import classnames from 'classnames';

import Image from '../Image';

const defaultStyle = {
  width: 40,
  height: 40,
};

const Avatar = ({ style, className, user, ...props }) => {
  if (!user) {
    return null;
  }

  return (
    <div
      style={{ ...style, ...defaultStyle }}
      className={classnames('rounded overflow-hidden', className)}
    >
      <Image
        style={defaultStyle}
        src={user.avatar}
      />
    </div>
  );
};

export default Avatar;
