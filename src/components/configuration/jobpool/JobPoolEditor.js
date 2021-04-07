import React from 'react';
import * as formActions from '../../../formactions/configuration';
import Editor from '../../ui/Editor';
import JobPoolForm from './JobPoolForm';
import JobPoolDisplay from './JobPoolDisplay';
import withSnackbar from '../../../hoc/withSnackbar';

function JobPoolEditor({
  jobPoolListDocument,
  openSnackBar,
  onSuccess,
}) {
  const EDIT_JOBPOOL_FORM = 'EDIT_JOBPOOL_FORM';
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Job Pool Configuration Updated';
    openSnackBar({ messageContent });
    if (onSuccess) { onSuccess(response, dispatch, props); }
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Updating Job Pool Configuration';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Editor
      formName={EDIT_JOBPOOL_FORM}
      onSubmitSuccess={onSubmitSuccess}
      onSubmitFail={onSubmitFail}
      onSubmit={formActions.onUpdateJobPoolConfiguration}
      displayProps={{ jobPoolListDocument }}
      initialValues={{ jobPoolListDocument }}
      formComponent={JobPoolForm}
      displayComponent={JobPoolDisplay}
    />
  );
}

export default withSnackbar(JobPoolEditor);
