import React from 'react';

import './Placeholder.less';

const Placeholder = ({ className, style, ...props }) => {
  return (
    <div
      style={style}
      className="placeholder"
    />
  );
};

export default Placeholder;
