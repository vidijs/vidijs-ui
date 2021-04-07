import React from 'react';

import { vxa as api } from '@vidispine/vdt-api';
import VxaTitle from '../components/vxa/VxaTitle';
import VxaCard from '../components/vxa/VxaCard';
import VxaRemove from '../components/vxa/VxaRemove';

import withUI from '../hoc/withUI';

const REMOVE_AGENT_DIALOG = 'REMOVE_AGENT_DIALOG';

class Vxa extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.state = {
      vxaDocument: undefined,
    };
  }

  componentDidMount() {
    this.onRefresh();
    const { vxaUuid } = this.props;
    document.title = `vidi.js | Agent | ${vxaUuid}`;
  }

  onRefresh() {
    const { vxaUuid } = this.props;
    try {
      api.getVxa({ vxaUuid })
        .then((response) => this.setState({ vxaDocument: response.data }))
        .catch((error) => this.onRefreshError(error));
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading Agent';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  render() {
    const { vxaDocument } = this.state;
    const { vxaUuid, history } = this.props;
    return (
      <>
        <VxaTitle
          onRefresh={this.onRefresh}
          code={vxaDocument}
          codeModal="VXADocument"
          removeModal={REMOVE_AGENT_DIALOG}
          vxaUuid={vxaUuid}
        />
        {vxaDocument
        && (
        <VxaCard
          vxaDocument={vxaDocument}
        />
        )}
        <VxaRemove
          dialogName={REMOVE_AGENT_DIALOG}
          onSuccess={() => history.push('/vxa/')}
          vxaDocument={vxaDocument}
        />
      </>
    );
  }
}

export default withUI(Vxa);
