import React from 'react';

import { version as api } from '@vidispine/vdt-api';
import VersionCard from '../components/version/VersionCard';
import VersionDialog from '../components/version/VersionDialog';
import VersionTitle from '../components/version/VersionTitle';
import withSnackbar from '../hoc/withSnackbar';

const VERSION_UPDATE_MODAL = 'VERSION_UPDATE_MODAL';

class Version extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.state = {
      versionDocument: undefined,
    };
  }

  componentDidMount() {
    document.title = 'vidi.js | Version';
    this.onRefresh();
  }

  onRefresh() {
    const { openSnackBar } = this.props;
    try {
      api.getVersion()
        .then((response) => this.setState({ versionDocument: response.data }));
    } catch (error) {
      const messageContent = 'Error Loading Version Information';
      openSnackBar({ messageContent, messageColor: 'secondary' });
    }
  }

  render() {
    const {
      versionDocument,
    } = this.state;
    return (
      <>
        <VersionTitle
          onRefresh={this.onRefresh}
          uploadModal={VERSION_UPDATE_MODAL}
          code={versionDocument}
          codeModal="VersionDocument"
        />
        { versionDocument && (
          <VersionCard
            versionDocument={versionDocument}
          />
        )}
        <VersionDialog
          dialogName={VERSION_UPDATE_MODAL}
          onSuccess={this.onRefresh}
        />
      </>
    );
  }
}

export default withSnackbar(Version);
