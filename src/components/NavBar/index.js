import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';

import Avatar from '../Avatar';

function NavBar({ className, user, ...props }) {
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
          <Avatar className="ml-4" user={user}/>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ Profile, router }) => {
  return {
    router,
    user: Profile.user,
  };
};

export default connect(mapStateToProps)(NavBar);
