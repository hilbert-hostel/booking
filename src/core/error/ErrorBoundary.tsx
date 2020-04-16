import React from 'react';
import { logstash } from './logstash';

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
      console.log('error', error.name, error.stack);
    } else {
      logstash.send({
        '@timestamp': new Date(),
        level: 'error',
        message: `main | booking | ${error.name} | ${error.stack}`,
      });
    }
  }

  render() {
    return this.props.children;
  }
}
