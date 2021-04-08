import React from 'react';

import { vxa as api } from '@vidispine/vdt-api';
import VxaListCard from '../components/vxa/VxaListCard';
import VxaDialog from '../components/vxa/VxaDialog';
import VxaConfigurationDialog from '../components/vxa/VxaConfigurationDialog';
import VxaListTitle from '../components/vxa/VxaListTitle';

import withUI from '../hoc/withUI';

const VXA_CREATE_MODAL = 'VXA_CREATE_MODAL';
const VXA_CONFIG_MODAL = 'VXA_CONFIG_MODAL';

class VxaList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.state = {
      vxaListDocument: undefined,
      vxaConfiguration: undefined,
    };
  }

  componentDidMount() {
    this.onRefresh();
    document.title = 'xray | Agent';
  }

  onRefresh() {
    try {
      api.listVxa()
        .then((response) => this.setState({ vxaListDocument: response.data }))
        .catch((error) => this.onRefreshError(error));
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading Agent List';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  render() {
    const { vxaListDocument, vxaConfiguration } = this.state;
    const { onOpen } = this.props;
    return (
      <>
        <VxaListTitle
          createModal={VXA_CREATE_MODAL}
          onRefresh={this.onRefresh}
          code={vxaListDocument}
          codeModal="VXAListDocument"
        />
        {vxaListDocument
        && (
        <VxaListCard
          vxaListDocument={vxaListDocument}
          onRefresh={this.onRefresh}
        />
        )}
        <VxaDialog
          dialogName={VXA_CREATE_MODAL}
          onSuccess={(response) => {
            this.setState({ vxaConfiguration: response.vxaConfiguration });
            onOpen({ modalName: VXA_CONFIG_MODAL });
            this.onRefresh();
          }}
        />
        { vxaConfiguration
          && (
          <VxaConfigurationDialog
            dialogName={VXA_CONFIG_MODAL}
            vxaConfiguration={vxaConfiguration}
          />
          )}
      </>
    );
  }
}

export default withUI(VxaList);
