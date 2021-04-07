import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';

import Dialog from '@material-ui/core/Dialog';
import ExportLocationForm from './ExportLocationForm';
import * as formActions from '../../formactions/exportlocation';
import WizardForm from '../ui/WizardForm';
import withUI from '../../hoc/withUI';
import DialogContent from '../ui/DialogContent';

function ExportLocationDialog({
  open,
  onClose,
  openSnackBar,
  history,
}) {
  const onSubmitSuccess = (response) => {
    const { locationName } = response;
    const messageContent = `Export Location ${locationName} Created`;
    openSnackBar({ messageContent });
    history.push(`/export-location/${locationName}/`);
    onClose();
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Creating Export Location';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={false}
    >
      <DialogTitle>New Export Location</DialogTitle>
      <DialogContent>
        <WizardForm
          FormComponent={ExportLocationForm}
          documentName="exportLocationDocument"
          onSubmit={formActions.onUpdate}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}

export default withUI(ExportLocationDialog);
