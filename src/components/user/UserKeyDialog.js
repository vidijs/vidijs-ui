import React from 'react';
import { compose } from 'redux';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import UserKeyForm from './UserKeyForm';
import TextGrid from '../ui/TextGrid';
import * as formActions from '../../formactions/user';
import withUI from '../../hoc/withUI';
import withFormActions from '../../hoc/withFormActions';

export const EDIT_USERKEY_FORM = 'EDIT_USERKEY_FORM';

function UserKeyDialog({
  submitForm,
  openSnackBar,
  onClose,
  onSuccess,
  open,
  userName,
  accessKeyDocument,
  onSetAccessKey,
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const { data: newAccessKeyDocument } = response;
    onSetAccessKey(newAccessKeyDocument);
    const messageContent = 'User Key Created';
    openSnackBar({ messageContent });
    if (onSuccess) { onSuccess(response, dispatch, props); }
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Creating User Key';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  const onCloseSuccess = () => {
    onSetAccessKey();
    onClose();
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      {accessKeyDocument ? (
        <React.Fragment>
          <DialogTitle>Success!</DialogTitle>
          <DialogContent>
            <React.Fragment>
              <TextGrid
                title="ID"
                value={accessKeyDocument.id}
                hideNoValue
                hover
              />
              <TextGrid
                title="Secret"
                value={accessKeyDocument.secret}
                hideNoValue
                hover
              />
            </React.Fragment>
          </DialogContent>
          <Divider />
          <DialogActions>
            <Button
              size="small"
              color="secondary"
              onClick={onCloseSuccess}
            >
              Close
            </Button>
          </DialogActions>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <DialogTitle>New User Key</DialogTitle>
          <DialogContent>
            <UserKeyForm
              form={EDIT_USERKEY_FORM}
              onSubmit={formActions.onCreateKey}
              onSubmitSuccess={onSubmitSuccess}
              onSubmitFail={onSubmitFail}
              userName={userName}
            />
          </DialogContent>
          <Divider />
          <DialogActions>
            <Button
              size="small"
              color="secondary"
              onClick={onClose}
            >
              Close
            </Button>
            <Button
              size="small"
              color="primary"
              onClick={() => submitForm(EDIT_USERKEY_FORM)}
            >
              Create
            </Button>
          </DialogActions>
        </React.Fragment>
      )}
    </Dialog>
  );
}

export default compose(withUI, withFormActions)(UserKeyDialog);
