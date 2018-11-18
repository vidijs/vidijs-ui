import React from 'react';
import { connect } from 'react-redux';
import * as formActions from '../../formactions/storage';
import * as actions from '../../actions';
import Editor from '../ui/Editor';
import { StorageMethodType } from './StorageDisplay';
import { StorageMethodForm } from './StorageForm';

function StorageMethodEditor({
  storageMethodDocument,
  storageId,
  storageMethodId,
  openSnackBar,
  onRefresh,
}) {
  const EDIT_STORAGEMETHOD_FORM = 'EDIT_STORAGEMETHOD_FORM';
  const onSubmitSuccess = () => {
    const messageContent = 'Storage Method Saved';
    openSnackBar({ messageContent });
    if (onRefresh) { onRefresh(); }
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Updating Storage Method';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  const formProps = { storageId, storageMethodId };
  const displayProps = { value: storageMethodDocument.method[0] };
  const initialValues = { method: storageMethodDocument.method[0] };
  return (
    <Editor
      formComponent={StorageMethodForm}
      displayComponent={StorageMethodType}
      formName={EDIT_STORAGEMETHOD_FORM}
      onSubmitSuccess={onSubmitSuccess}
      onSubmitFail={onSubmitFail}
      onSubmit={formActions.onMethodUpdate}
      formProps={formProps}
      displayProps={displayProps}
      initialValues={initialValues}
    />
  );
}

const mapDispatchToProps = {
  openSnackBar: actions.ui.openSnackBar,
};

export default connect(null, mapDispatchToProps)(StorageMethodEditor);
