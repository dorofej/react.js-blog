import React, { Component, Fragment } from 'react';
import classnames from 'classnames';

import Placeholder from './Placeholder';
import defaultStyle from './defaultStyle';

class Avatar extends Component {
  state = {
    imgLoaded: false,
  };

  handleImgLoad = (e) => this.setState({ imgLoaded: true });

  renderImg() {
    const { loading, user } = this.props;

    if (loading) {
      return <Placeholder/>;
    }

    const { imgLoaded } = this.state;

    return (
      <Fragment>
        <img
          style={{ display: imgLoaded ? undefined : 'none' }}
          className="img-fluid"
          title={user.name}
          src={user.avatar}
          onLoad={this.handleImgLoad}
        />
        {!imgLoaded && <Placeholder/>}
      </Fragment>
    );
  }

  render() {
    const { style, className, loading, user } = this.props;

    if (!user && !loading) {
      return null;
    }

    return (
      <div
        style={{ ...style, ...defaultStyle }}
        className={classnames('rounded overflow-hidden', className)}
      >
        {this.renderImg()}
      </div>
    );
  }
};

export default Avatar;
