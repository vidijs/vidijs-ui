import React from 'react';

import { deletionlock as api } from '@vidispine/vdt-api';
import DeletionLockTitle from '../components/deletionlock/DeletionLockTitle';
import DeletionLockCard from '../components/deletionlock/DeletionLockCard';
import DeletionLockRemove from '../components/deletionlock/DeletionLockRemove';
import SimpleMetadataCard from '../components/ui/SimpleMetadataCard';

import withUI from '../hoc/withUI';

const DELETIONLOCK_REMOVE_DIALOG = 'DELETIONLOCK_REMOVE_DIALOG';

class DeletionLock extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onFetch = this.onFetch.bind(this);
    this.onFetchError = this.onFetchError.bind(this);
    this.state = {
      deletionLockDocument: undefined,
    };
  }

  componentDidMount() {
    this.onRefresh();
    const { lockId } = this.props;
    document.title = `vidi.js | Deletion Lock | ${lockId}`;
  }

  onRefresh() {
    const { lockId } = this.props;
    this.onFetch(lockId);
  }

  onFetch(lockId) {
    try {
      api.getDeletionLock({ lockId })
        .then(({ data }) => this.setState({ deletionLockDocument: data }))
        .catch((error) => this.onFetchError(error));
    } catch (error) {
      this.onFetchError(error);
    }
  }

  onFetchError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading Deletion Lock';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  render() {
    const { deletionLockDocument } = this.state;
    const {
      lockId,
      history,
      entityId,
      entityType,
    } = this.props;
    return (
      <>
        <DeletionLockTitle
          onRefresh={this.onRefresh}
          code={deletionLockDocument}
          codeModal="DeletionLockDocument"
          lockId={lockId}
          removeModal={DELETIONLOCK_REMOVE_DIALOG}
        />
        {deletionLockDocument && (
          <>
            <DeletionLockCard
              deletionLockDocument={deletionLockDocument}
              lockId={lockId}
              onRefresh={this.onRefresh}
              entityId={entityId}
              entityType={entityType}
            />
            <SimpleMetadataCard
              simpleMetadataDocument={deletionLockDocument.metadata}
              onSuccess={this.onRefresh}
              entityType="deletion-lock"
              entityId={lockId}
            />
          </>
        )}
        <DeletionLockRemove
          dialogName={DELETIONLOCK_REMOVE_DIALOG}
          lockId={lockId}
          onSuccess={() => history.push('/deletion-lock/')}
        />
      </>
    );
  }
}

export default withUI(DeletionLock);
