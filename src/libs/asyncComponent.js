import React, { Component } from 'react';
import ReactPlaceholder from 'react-placeholder';
import Nprogress from 'nprogress';
import 'react-placeholder/lib/reactPlaceholder.css';
import 'nprogress/nprogress.css';

export default function asyncComponent(importComponent) {
  class AsyncFunc extends Component {
    state = {
      component: null,
    };

    componentWillMount() {
      Nprogress.start();
    }

    async componentDidMount() {
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
      this.mounted = false;
    }

    render() {
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
