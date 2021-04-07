import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import ExternalIdNamespaceForm from './ExternalIdNamespaceForm';
import WizardForm from '../ui/WizardForm';
import * as formActions from '../../formactions/externalid';
import withUI from '../../hoc/withUI';

function ExternalIdNamespaceWizard({
  open,
  onClose,
  onSuccess,
  openSnackBar,
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'External ID Namespace Created';
    openSnackBar({ messageContent });
    onClose();
    if (onSuccess) { onSuccess(response, dispatch, props); }
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Creating External ID Namespace';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>New External ID Namespace</DialogTitle>
      <DialogContent>
        <WizardForm
          FormComponent={ExternalIdNamespaceForm}
          documentName="externalIdentifierNamespaceDocument"
          onSubmit={formActions.onUpdateNamespace}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}

export default withUI(ExternalIdNamespaceWizard);
