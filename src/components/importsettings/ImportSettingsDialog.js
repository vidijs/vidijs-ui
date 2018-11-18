import React from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import ImportSettingsForm from './ImportSettingsForm';
import * as formActions from '../../formactions/importsettings';
import * as actions from '../../actions';

const EDIT_IMPORTSETTINGS_FORM = 'EDIT_IMPORTSETTINGS_FORM';

function ImportSettingsDialog({
  submitForm,
  closeModal,
  isOpen,
  history,
  openSnackBar,
}) {
  const onSubmitSuccess = (response) => {
    const { importSettingsDocument } = response;
    const { id: settingsId } = importSettingsDocument;
    const messageContent = `Import Settings ${settingsId} Created`;
    openSnackBar({ messageContent });
    history.push(`/import/settings/${settingsId}`);
    closeModal();
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Updating Import Settings';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Dialog open={isOpen} onClose={closeModal} fullWidth maxWidth={false}>
      <DialogTitle>New Import Settings</DialogTitle>
      <DialogContent>
        <ImportSettingsForm
          form={EDIT_IMPORTSETTINGS_FORM}
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
          onClick={() => submitForm(EDIT_IMPORTSETTINGS_FORM)}
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

export default connect(null, mapDispatchToProps)(ImportSettingsDialog);
