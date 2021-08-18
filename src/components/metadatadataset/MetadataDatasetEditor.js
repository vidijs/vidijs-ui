import React from 'react';

import * as formActions from '../../formactions/metadatadataset';

import Editor from '../ui/Editor';
import withUI from '../../hoc/withUI';
import MetadataDatasetDisplay from './MetadataDatasetDisplay';
import MetadataDatasetForm from './MetadataDatasetForm';

const EDIT_METADATADATASET_FORM = 'EDIT_METADATADATASET_FORM';

function MetadataDatasetEditor({
  body,
  datasetId,
  openSnackBar,
  onRefresh,
}) {
  const onSubmitSuccess = () => {
    const messageContent = 'Metadata Dataset Saved';
    openSnackBar({ messageContent });
    if (onRefresh) { onRefresh(); }
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Updating Metadata Dataset';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  const formProps = { datasetId };
  const displayProps = { value: body };
  const initialValues = { datasetId, body, headers: { contentType: 'application/ld+json' } };
  return (
    <Editor
      formComponent={MetadataDatasetForm}
      displayComponent={MetadataDatasetDisplay}
      formName={EDIT_METADATADATASET_FORM}
      onSubmitSuccess={onSubmitSuccess}
      onSubmitFail={onSubmitFail}
      onSubmit={formActions.onUpdate}
      formProps={formProps}
      displayProps={displayProps}
      initialValues={initialValues}
    />
  );
}

export default withUI(MetadataDatasetEditor);
