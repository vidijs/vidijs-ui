import React from 'react';

import * as formActions from '../../formactions/exportlocation';
import ExportLocationDisplay from './ExportLocationDisplay';
import ExportLocationForm from './ExportLocationForm';

import Editor from '../ui/Editor';
import withUI from '../../hoc/withUI';

function ExportLocationEditor({
  exportLocationDocument,
  locationName,
  openSnackBar,
  onRefresh,
}) {
  const EDIT_EXPORTLOCATION_FORM = 'EDIT_EXPORTLOCATION_FORM';
  const onSubmitSuccess = () => {
    const messageContent = 'Export Location Saved';
    openSnackBar({ messageContent });
    if (onRefresh) { onRefresh(); }
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Updating Export Location';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  const formProps = { locationName };
  const displayProps = { exportLocationDocument };
  const initialValues = { exportLocationDocument };
  return (
    <Editor
      formName={EDIT_EXPORTLOCATION_FORM}
      onSubmitSuccess={onSubmitSuccess}
      onSubmitFail={onSubmitFail}
      onSubmit={formActions.onUpdate}
      formProps={formProps}
      displayProps={displayProps}
      initialValues={initialValues}
      displayComponent={ExportLocationDisplay}
      formComponent={ExportLocationForm}
    />
  );
}

export default withUI(ExportLocationEditor);
