import React from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import StorageForm from './StorageForm';
import * as formActions from '../../formactions/storage';
import * as actions from '../../actions';
import WizardForm from '../ui/WizardForm';

function StorageDialog({
  closeModal,
  isOpen,
  history,
  openSnackBar,
}) {
  const onSubmitSuccess = (response) => {
    const { storageDocument } = response;
    const { id: storageId } = storageDocument;
    const messageContent = `Storage ${storageId} Created`;
    openSnackBar({ messageContent });
    history.push(`/storage/${storageId}/`);
    closeModal();
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Creating Storage';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Dialog open={isOpen} onClose={closeModal} fullWidth maxWidth={false}>
      <DialogTitle>New Storage</DialogTitle>
      <DialogContent>
        <WizardForm
          FormComponent={StorageForm}
          documentName="storageDocument"
          onSubmit={formActions.onCreate}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          onCancel={closeModal}
        />
      </DialogContent>
    </Dialog>
  );
}

const mapDispatchToProps = {
  openSnackBar: actions.ui.openSnackBar,
};

export default connect(null, mapDispatchToProps)(StorageDialog);
