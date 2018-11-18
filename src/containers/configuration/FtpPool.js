import React from 'react';

import FtpPoolCard from '../../components/configuration/ftppool/FtpPoolCard';
import FtpPoolRemove from '../../components/configuration/ftppool/FtpPoolRemove';

import TitleHeader from '../../components/ui/TitleHeader';
import withSnackbar from '../../hoc/withSnackbar';
import { configuration as api } from '@vidijs/vidijs-api';

const FTPPOOL_REMOVE_DIALOG = 'FTPPOOL_REMOVE_DIALOG';

class FtpPool extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.state = {
      ftpPoolConfigurationDocument: undefined,
    };
  }

  componentDidMount() {
    this.onRefresh();
    document.title = 'vidi.js | Configuration | FTP Pool';
  }

  onRefresh() {
    try {
      api.getFtpPoolConfiguration()
        .then(response => this.setState({ ftpPoolConfigurationDocument: response.data }))
        .catch(error => this.onRefreshError(error));
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading FTP Pool Configuration';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  render() {
    const { ftpPoolConfigurationDocument } = this.state;
    return (
      <React.Fragment>
        <TitleHeader
          parentTitle="Configuration"
          parentTo="/configuration/"
          title="FTP Pool"
          helpTo="/ref/property.html#ftp-pool-configuration"
          onRefresh={this.onRefresh}
          code={ftpPoolConfigurationDocument}
          codeModal="FtpPoolConfigurationDocument"
          removeModal={FTPPOOL_REMOVE_DIALOG}
        />
        { ftpPoolConfigurationDocument &&
        <FtpPoolCard
          ftpPoolConfigurationDocument={ftpPoolConfigurationDocument}
          onSuccess={this.onRefresh}
        />
        }
        <FtpPoolRemove
          dialogName={FTPPOOL_REMOVE_DIALOG}
          onSuccess={this.onRefresh}
        />
      </React.Fragment>
    );
  }
}

export default withSnackbar(FtpPool);
