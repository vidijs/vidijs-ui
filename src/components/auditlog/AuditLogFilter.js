import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import { compose } from 'redux';

import * as formActions from '../../formactions/auditlog';
import AuditLogFilterForm from './AuditLogFilterForm';
import withFormActions from '../../hoc/withFormActions';
import withUI from '../../hoc/withUI';

function AuditLogFilter({
  onClose,
  onSuccess,
  openSnackBar,
  submitForm,
  resetForm,
  form = 'AUDITLOG_FILTER_FORM',
  changeForm,
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    if (onSuccess) { onSuccess(response, dispatch, props); }
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Listing Audit Log';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  const onClick = async () => {
    await changeForm(form, 'queryParams.first', 0);
    submitForm(form);
  };
  return (
    <>
      <CardContent>
        <AuditLogFilterForm
          form={form}
          onSubmit={formActions.onAuditList}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          onCancel={onClose}
          initialValues={{ queryParams: { performCount: false } }}
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

export default compose(withUI, withFormActions)(AuditLogFilter);
