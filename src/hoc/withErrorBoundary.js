import React from 'react';
import Typography from '@material-ui/core/Typography';

const withErrorBoundary = (WrappedComponent) => (
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: null };
    }

    componentDidCatch() {
      this.setState({ hasError: true });
      console.error(this.props); // eslint-disable-line no-console
    }

    render() {
      if (this.state.hasError) {
        return <Typography color="error">Unable to render component (see console)</Typography>;
      }
      return <WrappedComponent {...this.props} />;
    }
  }
);

export default withErrorBoundary;
