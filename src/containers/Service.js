import React from 'react';

import { service as api } from '@vidijs/vidijs-api';
import ServiceTitle from '../components/service/ServiceTitle';
import ServiceListCard from '../components/service/ServiceListCard';

import withSnackbar from '../hoc/withSnackbar';

class Service extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.state = {
      vidispineServiceListDocument: undefined,
    };
  }

  componentDidMount() {
    this.onRefresh();
    document.title = 'vidi.js | Service';
  }

  onRefresh() {
    const { openSnackBar } = this.props;
    try {
      api.getServiceList()
        .then((response) => this.setState({ vidispineServiceListDocument: response.data }));
    } catch (error) {
      const messageContent = 'Error Loading Service List';
      openSnackBar({ messageContent, messageColor: 'secondary' });
    }
  }

  render() {
    const { vidispineServiceListDocument } = this.state;
    return (
      <>
        <ServiceTitle
          onRefresh={this.onRefresh}
          code={vidispineServiceListDocument}
          codeModal="VidispineServiceListDocument"
        />
        {vidispineServiceListDocument
        && (
        <ServiceListCard
          onRefresh={this.onRefresh}
          vidispineServiceListDocument={vidispineServiceListDocument}
        />
        )}
      </>
    );
  }
}

export default withSnackbar(Service);
