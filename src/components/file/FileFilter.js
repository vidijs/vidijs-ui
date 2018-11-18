import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import { compose } from 'redux';

import * as formActions from '../../formactions/file';
import FileFilterForm from './FileFilterForm';
import withFormActions from '../../hoc/withFormActions';
import withUI from '../../hoc/withUI';


function FileFilter({
  onClose,
  onSuccess,
  openSnackBar,
  submitForm,
  resetForm,
  form = 'FILE_FILTER_FORM',
  changeForm,
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    if (onSuccess) { onSuccess(response, dispatch, props); }
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Listing Files';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  const onClick = async () => {
    await changeForm(form, 'matrixParams.first', 0);
    submitForm(form);
  };
  const initialValues = {
    matrixParams: {
      first: 0,
      number: 10,
      prefixFirst: 0,
      prefixNumber: 10,
    },
  };
  return (
    <React.Fragment>
      <CardContent>
        <FileFilterForm
          form={form}
          onSubmit={formActions.onFileList}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          onCancel={onClose}
          destroyOnUnmount={false}
          initialValues={initialValues}
        />
      </CardContent>
      <Divider />
      <DialogActions>
        <Button
          size="small"
          onClick={() => resetForm(form)}
        >
          Reset
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={onClick}
        >
          Filter
        </Button>
      </DialogActions>
    </React.Fragment>
  );
}

export default compose(withUI, withFormActions)(FileFilter);
