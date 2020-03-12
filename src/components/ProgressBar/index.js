import React from 'react';
import Nprogress from 'nprogress';
import 'nprogress/nprogress.css';

class ProgressBar extends React.Component {
  componentWillMount() {
    Nprogress.start();
  }

  componentWillUnmount() {
    Nprogress.done();
  }

  render() {
    return null;
  }
};

export default ProgressBar;
