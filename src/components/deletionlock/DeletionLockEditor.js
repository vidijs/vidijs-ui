import React from 'react';
import { connect } from 'react-redux';
import * as formActions from '../../formactions/deletionlock';
import * as actions from '../../actions';
import Editor from '../ui/Editor';
import DeletionLockDisplay from './DeletionLockDisplay';
import DeletionLockForm from './DeletionLockForm';

function DeletionLockEditor({
  deletionLockDocument,
  lockId,
  openSnackBar,
  onRefresh,
}) {
  const EDIT_DELETIONLOCK_FORM = 'EDIT_DELETIONLOCK_FORM';
  const onSubmitSuccess = () => {
    const messageContent = 'Deletion Lock Saved';
    openSnackBar({ messageContent });
    if (onRefresh) { onRefresh(); }
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Updating Deletion Lock';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Editor
      formComponent={DeletionLockForm}
      displayComponent={DeletionLockDisplay}
      formName={EDIT_DELETIONLOCK_FORM}
      onSubmitSuccess={onSubmitSuccess}
      onSubmitFail={onSubmitFail}
      onSubmit={formActions.onUpdateDeletionLock}
      formProps={{ lockId }}
      displayProps={{ deletionLockDocument }}
      initialValues={{ deletionLockDocument }}
    />
  );
}

const mapDispatchToProps = {
  openSnackBar: actions.ui.openSnackBar,
};

export default connect(null, mapDispatchToProps)(DeletionLockEditor);
