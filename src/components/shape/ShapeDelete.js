import React from 'react';
import { compose } from 'redux';

import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import * as formActions from '../../formactions/shape';
import ShapeDeleteForm from './ShapeDeleteForm';
import withUI from '../../hoc/withUI';
import withFormActions from '../../hoc/withFormActions';
import DialogContent from '../ui/DialogContent';

const SHAPE_DELETE_FORM = 'SHAPE_DELETE_FORM';

function ShapeDelete({
  open,
  onClose,
  onSuccess,
  onFail,
  openSnackBar,
  submitForm,
  itemId,
  shapeId,
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Shape Deleted';
    openSnackBar({ messageContent });
    if (onSuccess) { onSuccess(response, dispatch, props); }
    onClose();
  };
  const onSubmitFail = (error, dispatch, props) => {
    const messageContent = 'Error Deleting Shape';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) { onFail(error, dispatch, props); }
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={false}
    >
      <DialogTitle>{`Delete Shape ${shapeId}`}</DialogTitle>
      <DialogContent>
        <ShapeDeleteForm
          form={SHAPE_DELETE_FORM}
          onSubmit={formActions.onRemoveShape}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          itemId={itemId}
          shapeId={shapeId}
        />
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button
          size="small"
          onClick={onClose}
        >
          Close
        </Button>
        <Button
          size="small"
          color="secondary"
          onClick={() => submitForm(SHAPE_DELETE_FORM)}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default compose(withUI, withFormActions)(ShapeDelete);
