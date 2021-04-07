import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import MetadataFieldForm from './MetadataFieldForm';
import * as formActions from '../../formactions/metadatafield';
import WizardForm from '../ui/WizardForm';
import withUI from '../../hoc/withUI';

function MetadataFieldDialog({
  open,
  onClose,
  openSnackBar,
  history,
}) {
  const onSubmitSuccess = (response) => {
    const { metadataFieldDocument } = response;
    const { name: fieldName } = metadataFieldDocument;
    const messageContent = `Metadata Field ${fieldName} Created`;
    openSnackBar({ messageContent });
    history.push(`/metadata-field/${fieldName}/`);
    onClose();
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Creating Metadata Field';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={false}
    >
      <DialogTitle>New Metadata Field</DialogTitle>
      <DialogContent>
        <WizardForm
          FormComponent={MetadataFieldForm}
          documentName="metadataFieldDocument"
          onSubmit={formActions.onUpdate}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}

export default withUI(MetadataFieldDialog);
