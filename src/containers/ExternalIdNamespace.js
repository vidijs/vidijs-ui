import React from 'react';

import { externalid as api } from '@vidispine/vdt-api';
import ExternalIdNamespaceTitle from '../components/externalid/ExternalIdNamespaceTitle';
import ExternalIdNamespaceCard from '../components/externalid/ExternalIdNamespaceCard';
import ExternalIdNamespaceWizard from '../components/externalid/ExternalIdNamespaceWizard';

import withSnackbar from '../hoc/withSnackbar';

const EXTERNALID_NAMESPACE_CREATE_MODAL = 'EXTERNALID_NAMESPACE_CREATE_MODAL';

class ExternalIdNamespace extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.state = {
      externalIdentifierNamespaceListDocument: undefined,
    };
  }

  componentDidMount() {
    this.onRefresh();
    document.title = 'xray | External ID Namespace';
  }

  onRefresh() {
    try {
      api.listExternalIdNamespace()
        .then((response) => this.setState({
          externalIdentifierNamespaceListDocument: response.data,
        }))
        .catch((error) => this.onRefreshError(error));
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading External ID Namespace List';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  render() {
    const { externalIdentifierNamespaceListDocument } = this.state;
    return (
      <>
        <ExternalIdNamespaceTitle
          createModal={EXTERNALID_NAMESPACE_CREATE_MODAL}
          onRefresh={this.onRefresh}
          code={externalIdentifierNamespaceListDocument}
          codeModal="ExternalIdentifierNamespaceListDocument"
        />
        {externalIdentifierNamespaceListDocument
        && (
        <ExternalIdNamespaceCard
          externalIdentifierNamespaceListDocument={externalIdentifierNamespaceListDocument}
          onRefresh={this.onRefresh}
        />
        )}
        <ExternalIdNamespaceWizard
          dialogName={EXTERNALID_NAMESPACE_CREATE_MODAL}
          onSuccess={this.onRefresh}
        />
      </>
    );
  }
}

export default withSnackbar(ExternalIdNamespace);
