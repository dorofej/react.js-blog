import React from 'react';
import classnames from 'classnames';

const Pagination = ({ className, page, lastPage, onPaginate, ...props }) => {
  const prevDisabled = page === 1;
  const nextDisabled = lastPage;

  const buttonProps = {
    style: { cursor: 'pointer' },
    className: 'page-link',
  };

  return (
    <ul style={{ userSelect: 'none' }} className={classnames('pagination', className)}>
      <li className={classnames('page-item', prevDisabled && 'disabled')}>
        <span {...buttonProps} onClick={() => onPaginate(page - 1)}>
          Previous
        </span>
      </li>
      <li className={classnames('page-item', nextDisabled && 'disabled')}>
        <span {...buttonProps} onClick={() => onPaginate(page + 1)}>
          Next
        </span>
      </li>
    </ul>
  );
};

export default Pagination;
