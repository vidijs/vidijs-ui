import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import FieldGroupForm from './FieldGroupForm';
import * as formActions from '../../formactions/fieldgroup';
import WizardForm from '../ui/WizardForm';
import withUI from '../../hoc/withUI';

function FieldGroupDialog({
  open,
  onClose,
  openSnackBar,
  history,
}) {
  const onSubmitSuccess = (response) => {
    const { groupName } = response;
    const messageContent = `Field Group ${groupName} Created`;
    openSnackBar({ messageContent });
    history.push(`/field-group/${groupName}/`);
    onClose();
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Creating Field Group';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={false}
    >
      <DialogTitle>New Field Group</DialogTitle>
      <DialogContent>
        <WizardForm
          FormComponent={FieldGroupForm}
          documentName="metadataFieldGroupDocument"
          onSubmit={formActions.onUpdate}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}

export default withUI(FieldGroupDialog);
