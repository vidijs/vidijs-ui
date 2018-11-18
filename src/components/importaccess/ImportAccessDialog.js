import React from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import ImportAccessForm from './ImportAccessForm';
import * as formActions from '../../formactions/access';
import * as actions from '../../actions';

const EDIT_IMPORTACCESS_FORM = 'EDIT_IMPORTACCESS_FORM';

function ImportAccessDialog({
  submitForm,
  closeModal,
  isOpen,
  onRefresh,
  openSnackBar,
  group = {},
  userName,
}) {
  const onSubmitSuccess = () => {
    const messageContent = 'Import Access Created';
    openSnackBar({ messageContent });
    if (onRefresh) { onRefresh(); }
    closeModal();
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Creating Import Access';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  const { name: groupName, permission } = group;
  const initialValues = {
    groupName,
    queryParams: {
      permission,
    },
  };
  return (
    <Dialog open={isOpen} onClose={closeModal} fullWidth maxWidth={false}>
      <DialogTitle>Edit Import Access</DialogTitle>
      <DialogContent>
        <ImportAccessForm
          form={EDIT_IMPORTACCESS_FORM}
          onSubmit={formActions.onUpdateImportAccessGroup}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          initialValues={initialValues}
          userName={userName}
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
          onClick={() => submitForm(EDIT_IMPORTACCESS_FORM)}
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

export default connect(null, mapDispatchToProps)(ImportAccessDialog);
