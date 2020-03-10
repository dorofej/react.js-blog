import React from 'react';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';

export default function NavBar({ className, ...props }) {
  return (
    <div className={classnames(/* 'sticky-top',  */className)}>
      <div className="navbar bg-light shadow-sm">
        <a className="navbar-brand text-dark" href="/">Home</a>
        <div className="navbar-nav ml-auto flex-row">
          <NavLink className="nav-link ml-3" to="/posts" activeClassName="border-bottom border-primary">
            Posts
          </NavLink>
          <NavLink className="nav-link ml-3" to="/about" activeClassName="border-bottom border-primary">
            About
          </NavLink>
        </div>
      </div>
    </div>
  );
};
