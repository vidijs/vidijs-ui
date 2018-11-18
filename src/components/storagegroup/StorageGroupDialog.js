import React from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import StorageGroupForm from './StorageGroupForm';
import * as formActions from '../../formactions/storagegroup';
import * as actions from '../../actions';

const EDIT_STORAGEGROUP_FORM = 'EDIT_STORAGEGROUP_FORM';

function StorageGroupDialog({
  submitForm,
  closeModal,
  isOpen,
  history,
  openSnackBar,
}) {
  const onSubmitSuccess = (response) => {
    const { storageGroupDocument } = response;
    const { name: groupName } = storageGroupDocument;
    const messageContent = `Storage Group ${groupName} Created`;
    openSnackBar({ messageContent });
    history.push(`/storage-group/${groupName}/`);
    closeModal();
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Creating Storage Group';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Dialog open={isOpen} onClose={closeModal} fullWidth maxWidth={false}>
      <DialogTitle>New Storage Group</DialogTitle>
      <DialogContent>
        <StorageGroupForm
          form={EDIT_STORAGEGROUP_FORM}
          onSubmit={formActions.onCreate}
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
          onClick={() => submitForm(EDIT_STORAGEGROUP_FORM)}
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

export default connect(null, mapDispatchToProps)(StorageGroupDialog);
