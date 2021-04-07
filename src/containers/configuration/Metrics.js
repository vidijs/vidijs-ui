import React from 'react';

import { configuration as api } from '@vidijs/vidijs-api';
import MetricsCard from '../../components/configuration/metrics/MetricsCard';

import TitleHeader from '../../components/ui/TitleHeader';
import withSnackbar from '../../hoc/withSnackbar';

class Metrics extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.state = {
      metricsConfigurationDocument: undefined,
    };
  }

  componentDidMount() {
    this.onRefresh();
    document.title = 'vidi.js | Configuration | Metrics';
  }

  onRefresh() {
    try {
      api.getMetricsConfiguration()
        .then((response) => this.setState({ metricsConfigurationDocument: response.data }))
        .catch((error) => this.onRefreshError(error));
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading Metrics Configuration';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  render() {
    const { metricsConfigurationDocument } = this.state;
    return (
      <>
        <TitleHeader
          title="Metrics"
          parentTitle="Configuration"
          parentTo="/configuration/"
          helpTo="/ref/property.html#metrics-settings"
          onRefresh={this.onRefresh}
          code={metricsConfigurationDocument}
          codeModal="MetricsConfigurationDocument"
        />
        { metricsConfigurationDocument
        && (
        <MetricsCard
          metricsConfigurationDocument={metricsConfigurationDocument}
          onSuccess={this.onRefresh}
        />
        )}
      </>
    );
  }
}

export default withSnackbar(Metrics);
