import React from 'react';

import { externalid as api } from '@vidijs/vidijs-api';
import ExternalIdTitle from '../components/externalid/ExternalIdTitle';
import ExternalIdCard from '../components/externalid/ExternalIdCard';
import ExternalIdDialog from '../components/externalid/ExternalIdDialog';
import ExternalIdRemoveAll from '../components/externalid/ExternalIdRemoveAll';

import withSnackbar from '../hoc/withSnackbar';

const EXTERNALID_CREATE_MODAL = 'EXTERNALID_CREATE_MODAL';
const EXTERNALID_REMOVEALL_MODAL = 'EXTERNALID_REMOVEALL_MODAL';

class ExternalId extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.state = {
      externalIdentifierListDocument: undefined,
    };
  }

  componentDidMount() {
    this.onRefresh();
    document.title = 'vidi.js | External ID';
  }

  onRefresh() {
    const { entityType, entityId, entitySubType } = this.props;
    try {
      api.listExternalId({
        entityType: entitySubType ? `${entityType}/${entitySubType}` : entityType,
        entityId,
      })
        .then((response) => this.setState({ externalIdentifierListDocument: response.data }))
        .catch((error) => this.onRefreshError(error));
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading External ID List';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  render() {
    const { externalIdentifierListDocument } = this.state;
    const { entityType, entityId, entitySubType } = this.props;
    return (
      <>
        <ExternalIdTitle
          createModal={EXTERNALID_CREATE_MODAL}
          onRefresh={this.onRefresh}
          removeModal={EXTERNALID_REMOVEALL_MODAL}
          code={externalIdentifierListDocument}
          codeModal="ExternalIdentifierListDocument"
          entityType={entitySubType ? `${entityType}/${entitySubType}` : entityType}
          entityId={entityId}
        />
        {externalIdentifierListDocument
        && (
        <ExternalIdCard
          externalIdentifierListDocument={externalIdentifierListDocument}
          onRefresh={this.onRefresh}
          entityType={entitySubType ? `${entityType}/${entitySubType}` : entityType}
          entityId={entityId}
        />
        )}
        <ExternalIdDialog
          dialogName={EXTERNALID_CREATE_MODAL}
          onSuccess={this.onRefresh}
          entityType={entitySubType ? `${entityType}/${entitySubType}` : entityType}
          entityId={entityId}
        />
        <ExternalIdRemoveAll
          dialogName={EXTERNALID_REMOVEALL_MODAL}
          onSuccess={this.onRefresh}
          entityType={entitySubType ? `${entityType}/${entitySubType}` : entityType}
          entityId={entityId}
        />
      </>
    );
  }
}

export default withSnackbar(ExternalId);
