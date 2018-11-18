import React from 'react';

import StackTraceTitle from '../components/service/StackTraceTitle';
import StackTraceCard from '../components/service/StackTraceCard';

import withSnackbar from '../hoc/withSnackbar';
import { service as api } from '@vidijs/vidijs-api';

class Service extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.state = {
      stacktrace: undefined,
    };
  }

  componentDidMount() {
    this.onRefresh();
    document.title = 'vidi.js | Stack Trace';
  }

  onRefresh() {
    const { openSnackBar } = this.props;
    this.setState({ stacktrace: undefined });
    try {
      api.getStackTrace()
        .then(response => this.setState({ stacktrace: response.data }));
    } catch (error) {
      const messageContent = 'Error Loading Stack Trace';
      openSnackBar({ messageContent, messageColor: 'secondary' });
    }
  }


  render() {
    const { stacktrace } = this.state;
    return (
      <React.Fragment>
        <StackTraceTitle
          onRefresh={this.onRefresh}
        />
        <StackTraceCard
          onRefresh={this.onRefresh}
          stacktrace={stacktrace}
        />
      </React.Fragment>
    );
  }
}

export default withSnackbar(Service);
