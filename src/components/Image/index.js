import React, { Component } from 'react';
import classnames from 'classnames';

import Placeholder from '../Placeholder';

const intersectionOptions = { rootMargin: '500px' };

export default class Image extends Component {
  state = {
    imgLoaded: false,
    visible: false,
  };

  container = React.createRef();

  observer = new IntersectionObserver(([entry]) => {
    if (entry.intersectionRatio > 0) {
      this.setState({ visible: true });
      this.observer.disconnect();
    };
  }, intersectionOptions);

  componentDidMount() {
    this.observer.observe(this.container.current);
  }

  componentWillUnmount() {
    this.observer.disconnect();
  }

  handleImgLoad = (e) => {
    if (typeof this.props.onLoad === 'function') {
      this.props.onLoad(e);
    };
    this.setState({ imgLoaded: true });
  };

  render() {
    const { className, style, alt, ...props } = this.props;
    const { imgLoaded, visible } = this.state;

    return (
      <div ref={this.container}>
        {visible && (
          <img
            style={{ display: imgLoaded ? undefined : 'none' }}
            className={classnames('img-fluid', className)}
            alt={alt || ''}
            {...props}
            onLoad={this.handleImgLoad}
          />
        )}
        {!imgLoaded && <Placeholder style={style}/>}
      </div>
    );
  }
};
