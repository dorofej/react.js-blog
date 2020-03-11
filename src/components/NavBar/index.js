import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';

import Avatar from '../Avatar';
import AvatarPlaceholder from '../Avatar/Placeholder';

function NavBar({ className, user, loading, ...props }) {
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
          {!loading && <Avatar className="ml-4" user={user}/>}
          {loading && <AvatarPlaceholder className="ml-4"/>}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ Profile }) => {
  return {
    user: Profile.user,
    loading: Profile.loading
  };
};

export default connect(mapStateToProps)(NavBar);
