import React from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { StorageMethodForm } from './StorageForm';
import * as formActions from '../../formactions/storage';
import * as actions from '../../actions';
import WizardForm from '../ui/WizardForm';

function StorageMethodDialog({
  closeModal,
  isOpen,
  openSnackBar,
  storageId,
  onRefresh,
}) {
  const onSubmitSuccess = () => {
    const messageContent = 'Storage Method Added';
    openSnackBar({ messageContent });
    onRefresh();
    closeModal();
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Adding Storage Method';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Dialog open={isOpen} onClose={closeModal} fullWidth maxWidth={false}>
      <DialogTitle>New Storage Method</DialogTitle>
      <DialogContent>
        <WizardForm
          FormComponent={StorageMethodForm}
          documentName="storageMethodDocument"
          onSubmit={formActions.onMethodCreate}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          onCancel={closeModal}
          storageId={storageId}
        />
      </DialogContent>
    </Dialog>
  );
}

const mapDispatchToProps = {
  openSnackBar: actions.ui.openSnackBar,
};

export default connect(null, mapDispatchToProps)(StorageMethodDialog);
