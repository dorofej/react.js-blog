import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import classnames from 'classnames';

import defaultStyle from './defaultStyle';

const Placeholder = ({ style, className, ...props }) => {
  return (
    <div
      style={{ ...style, ...defaultStyle }}
      className={classnames('rounded overflow-hidden', className)}
    >
      <SkeletonTheme color="#6c757d" highlightColor="#343a40">
        <Skeleton width={defaultStyle.width} height={defaultStyle.height}/>
      </SkeletonTheme>
    </div>
  );
};

export default Placeholder;
