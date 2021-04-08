import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import DeletionLockForm from './DeletionLockForm';
import WizardForm from '../ui/WizardForm';
import * as formActions from '../../formactions/deletionlock';
import withUI from '../../hoc/withUI';

function DeletionLockWizard({
  open,
  onClose,
  onSuccess,
  openSnackBar,
  entityId,
  entityType,
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Deletion Lock Created';
    openSnackBar({ messageContent });
    onClose();
    if (onSuccess) { onSuccess(response, dispatch, props); }
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Creating Deletion Lock';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>New Deletion Lock</DialogTitle>
      <DialogContent>
        <WizardForm
          FormComponent={DeletionLockForm}
          documentName="deletionLockDocument"
          onSubmit={formActions.onCreateEntityDeletionLock}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          onCancel={onClose}
          entityId={entityId}
          entityType={entityType}
          initialStep={1}
          showMetadataType
          isNew
        />
      </DialogContent>
    </Dialog>
  );
}

export default withUI(DeletionLockWizard);
