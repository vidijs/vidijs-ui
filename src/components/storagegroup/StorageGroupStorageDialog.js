import React from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import StorageGroupStorageForm from './StorageGroupStorageForm';
import * as formActions from '../../formactions/storagegroup';
import * as actions from '../../actions';

const EDIT_STORAGEGROUP_STORAGE_FORM = 'EDIT_STORAGEGROUP_STORAGE_FORM';

function StorageGroupStorageDialog({
  submitForm,
  closeModal,
  isOpen,
  onRefresh,
  openSnackBar,
  groupName,
}) {
  const onSubmitSuccess = (response) => {
    const { storageId } = response;
    const messageContent = `Storage ${storageId} Added`;
    openSnackBar({ messageContent });
    closeModal();
    onRefresh();
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Adding Storage Group';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Dialog open={isOpen} onClose={closeModal} fullWidth maxWidth={false}>
      <DialogTitle>Add Storage To Group</DialogTitle>
      <DialogContent>
        <StorageGroupStorageForm
          form={EDIT_STORAGEGROUP_STORAGE_FORM}
          groupName={groupName}
          onSubmit={formActions.onAddStorageGroupStorage}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
        />
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button
          size="small"
          color="secondary"
          onClick={closeModal}
        >
          Close
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => submitForm(EDIT_STORAGEGROUP_STORAGE_FORM)}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const mapDispatchToProps = {
  submitForm: submit,
  openSnackBar: actions.ui.openSnackBar,
};

export default connect(null, mapDispatchToProps)(StorageGroupStorageDialog);
