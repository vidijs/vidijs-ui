import React from 'react';

import { configuration as api } from '@vidijs/vidijs-api';
import LogReportCard from '../../components/configuration/logreport/LogReportCard';

import TitleHeader from '../../components/ui/TitleHeader';
import withSnackbar from '../../hoc/withSnackbar';

class LogReport extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.state = {
      logReportConfigurationDocument: undefined,
    };
  }

  componentDidMount() {
    this.onRefresh();
    document.title = 'vidi.js | Configuration | Log Report';
  }

  onRefresh() {
    try {
      api.getLogReportConfiguration()
        .then((response) => this.setState({ logReportConfigurationDocument: response.data }))
        .catch((error) => this.onRefreshError(error));
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading Log Report Configuration';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  render() {
    const { logReportConfigurationDocument } = this.state;
    return (
      <>
        <TitleHeader
          title="Log Report"
          parentTitle="Configuration"
          parentTo="/configuration/"
          helpTo="/ref/property.html#logreport-settings"
          onRefresh={this.onRefresh}
          code={logReportConfigurationDocument}
          codeModal="LogReportConfigurationDocument"
        />
        { logReportConfigurationDocument
        && (
        <LogReportCard
          logReportConfigurationDocument={logReportConfigurationDocument}
          onSuccess={this.onRefresh}
        />
        )}
      </>
    );
  }
}

export default withSnackbar(LogReport);
