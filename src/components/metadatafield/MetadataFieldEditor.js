import React from 'react';

import * as formActions from '../../formactions/metadatafield';

import Editor from '../ui/Editor';
import withUI from '../../hoc/withUI';
import MetadataFieldDisplay from './MetadataFieldDisplay';
import MetadataFieldForm from './MetadataFieldForm';

function MetadataFieldEditor({
  metadataFieldDocument,
  fieldName,
  openSnackBar,
  onRefresh,
}) {
  const EDIT_METADATAFIELD_FORM = 'EDIT_METADATAFIELD_FORM';
  const onSubmitSuccess = () => {
    const messageContent = 'Metadata Field Saved';
    openSnackBar({ messageContent });
    if (onRefresh) { onRefresh(); }
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Updating Metadata Field';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  const formProps = { fieldName };
  const displayProps = { value: metadataFieldDocument };
  const initialValues = { metadataFieldDocument };
  return (
    <Editor
      formComponent={MetadataFieldForm}
      displayComponent={MetadataFieldDisplay}
      formName={EDIT_METADATAFIELD_FORM}
      onSubmitSuccess={onSubmitSuccess}
      onSubmitFail={onSubmitFail}
      onSubmit={formActions.onUpdate}
      formProps={formProps}
      displayProps={displayProps}
      initialValues={initialValues}
    />
  );
}

export default withUI(MetadataFieldEditor);
