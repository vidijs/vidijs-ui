import React from 'react';
import Editor from '../ui/Editor';
import MetadataForm from './MetadataForm';
import MetadataDisplay from './MetadataDisplay';
import withSnackbar from '../../hoc/withSnackbar';
import metadataDocumentToForm from '../../utils/metadataDocumentToForm';

function MetadataEditor({
  metadataDocument,
  openSnackBar,
  onSubmit,
  onSuccess,
  onFail,
  title,
  ...formProps
}) {
  const EDIT_METADATA_FORM = 'EDIT_METADATA_FORM';
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Metadata Updated';
    openSnackBar({ messageContent });
    if (onSuccess) { onSuccess(response, dispatch, props); }
  };
  const onSubmitFail = (error, dispatch, props) => {
    const messageContent = 'Error Updating Metadata';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) { onFail(error, dispatch, props); }
  };
  const initialMetadataDocument = metadataDocumentToForm(metadataDocument);
  return (
    <Editor
      title={title}
      formName={EDIT_METADATA_FORM}
      onSubmitSuccess={onSubmitSuccess}
      onSubmitFail={onSubmitFail}
      onSubmit={onSubmit}
      displayProps={{ metadataDocument }}
      initialValues={{ metadataDocument: initialMetadataDocument }}
      formComponent={MetadataForm}
      displayComponent={MetadataDisplay}
      formProps={formProps}
    />
  );
}

export default withSnackbar(MetadataEditor);
