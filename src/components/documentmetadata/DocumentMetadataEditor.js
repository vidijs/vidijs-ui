import React from 'react';
import * as formActions from '../../formactions/documentmetadata';
import Editor from '../ui/Editor';
import DocumentMetadataForm from './DocumentMetadataForm';
import MetadataDisplay from '../metadata/MetadataDisplay';
import withSnackbar from '../../hoc/withSnackbar';

function DocumentMetadataEditor({
  metadataDocument,
  documentMetadataName,
  openSnackBar,
  onSuccess,
  onFail,
}) {
  const EDIT_DOCUMENTMETADATA_FORM = 'EDIT_DOCUMENTMETADATA_FORM';
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Document Updated';
    openSnackBar({ messageContent });
    if (onSuccess) { onSuccess(response, dispatch, props); }
  };
  const onSubmitFail = (error, dispatch, props) => {
    const messageContent = 'Error Updating Document';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) { onFail(error, dispatch, props); }
  };
  return (
    <Editor
      formName={EDIT_DOCUMENTMETADATA_FORM}
      onSubmitSuccess={onSubmitSuccess}
      onSubmitFail={onSubmitFail}
      onSubmit={formActions.onUpdate}
      displayProps={{ metadataDocument }}
      initialValues={{ metadataDocument, documentMetadataName }}
      formComponent={DocumentMetadataForm}
      displayComponent={MetadataDisplay}
    />
  );
}

export default withSnackbar(DocumentMetadataEditor);
