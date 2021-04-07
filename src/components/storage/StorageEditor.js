import React from 'react';
import { connect } from 'react-redux';
import * as formActions from '../../formactions/storage';
import * as actions from '../../actions';
import Editor from '../ui/Editor';

function StorageEditor({
  storageDocument,
  storageId,
  openSnackBar,
  onRefresh,
  ...props
}) {
  const EDIT_STORAGE_FORM = 'EDIT_STORAGE_FORM';
  const onSubmitSuccess = () => {
    const messageContent = 'Storage Saved';
    openSnackBar({ messageContent });
    if (onRefresh) { onRefresh(); }
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Updating Storage';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  const formProps = { storageId };
  const displayProps = { value: storageDocument };
  const initialValues = { storageDocument };
  return (
    <Editor
      formName={EDIT_STORAGE_FORM}
      onSubmitSuccess={onSubmitSuccess}
      onSubmitFail={onSubmitFail}
      onSubmit={formActions.onUpdate}
      formProps={formProps}
      displayProps={displayProps}
      initialValues={initialValues}
      {...props}
    />
  );
}

const mapDispatchToProps = {
  openSnackBar: actions.ui.openSnackBar,
};

export default connect(null, mapDispatchToProps)(StorageEditor);
