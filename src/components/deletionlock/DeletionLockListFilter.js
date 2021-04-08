import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import { compose } from 'redux';

import * as formActions from '../../formactions/deletionlock';
import DeletionLockListFilterForm from './DeletionLockListFilterForm';
import withFormActions from '../../hoc/withFormActions';
import withUI from '../../hoc/withUI';

function DeletionLockListFilter({
  onClose,
  onSuccess,
  openSnackBar,
  submitForm,
  resetForm,
  form = 'DELETIONLOCKLIST_FILTER_FORM',
  changeForm,
  entityId,
  entityType,
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    if (onSuccess) { onSuccess(response, dispatch, props); }
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Listing Deletion Lock list';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  const onClick = async () => {
    await changeForm(form, 'queryParams.first', 1);
    submitForm(form);
  };
  return (
    <>
      <CardContent>
        <DeletionLockListFilterForm
          form={form}
          onSubmit={entityType
            ? formActions.onListEntityDeletionLock : formActions.onListDeletionLock}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          onCancel={onClose}
          initialValues={{ queryParams: { entityTypes: 'all', onlyEffective: false } }}
          entityId={entityId}
          entityType={entityType}
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
    </>
  );
}

export default compose(withUI, withFormActions)(DeletionLockListFilter);
