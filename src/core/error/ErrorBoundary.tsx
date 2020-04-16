import React from 'react';
import { toElasticSearch } from './logstash';

export class ErrorBoundary extends React.Component<{}> {
  //   constructor(props) {
  //     super(props);
  //   }

  //   static getDerivedStateFromError(error) {
  //     // Update state so the next render will show the fallback UI.
  //     return { hasError: true };
  //   }

  componentDidCatch(error: any, errorInfo: any) {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      // console.log('error', error.name, error.stack);
    } else {
      process.env.REACT_APP_ELASTIC_SEARCH_URL &&
        toElasticSearch({
          from: 'booking',
          error: error.name,
          stack: error.stack,
        }).then(() => {
          console.log('logged');
        });
    }
  }

  render() {
    return this.props.children;
  }
}
