/* eslint-disable import/first */
const l = require('../utils/log')(module);

import React, { Component } from 'react';
import ReactPlaceholder from 'react-placeholder';
import Nprogress from 'nprogress';
import 'react-placeholder/lib/reactPlaceholder.css';
import 'nprogress/nprogress.css';

export default function asyncComponent(importComponent) {
  l();

  class AsyncFunc extends Component {
    constructor(props) {
      l();

      super(props);

      this.state = {
        component: null,
      };
    }

    componentWillMount() {
      l();

      Nprogress.start();
    }

    async componentDidMount() {
      l();

      this.mounted = true;
      const { default: Component } = await importComponent();
      Nprogress.done();
      if (this.mounted) {
        this.setState({
          component: <Component {...this.props}/>
        });
      };
    }

    componentWillUnmount() {
      l();

      this.mounted = false;
    }

    render() {
      l();

      const Component = this.state.component || <div/>;

      return (
        <ReactPlaceholder
          type="text"
          rows={7}
          ready={Component !== null}
        >
          {Component}
        </ReactPlaceholder>
      );
    }
  };

  return AsyncFunc;
};
