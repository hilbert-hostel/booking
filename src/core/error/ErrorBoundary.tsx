import React from 'react';
import { toElasticSearch } from './logstash';

export class ErrorBoundary extends React.Component<{}> {
  //   constructor(props) {
  //     super(props);
  //   }

  static getDerivedStateFromError(_: any) {
    return {};
  }

  componentDidCatch(error: any, errorInfo: any) {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      // console.log('error', error.name, error.stack);
    } else {
      process.env.REACT_APP_ELASTIC_SEARCH_URL &&
        toElasticSearch({
          level: 'error',
          type: 'app-error',
          error: error.name,
          stack: error.stack,
          timemstamp: Date.now(),
        }).then(() => {
          console.log('logged');
        });
    }
  }

  render() {
    return this.props.children;
  }
}
