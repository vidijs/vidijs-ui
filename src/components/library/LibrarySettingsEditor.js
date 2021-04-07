import React from 'react';
import Editor from '../ui/Editor';
import LibrarySettingsForm from './LibrarySettingsForm';
import LibrarySettingsDisplay from './LibrarySettingsDisplay';
import withSnackbar from '../../hoc/withSnackbar';
import * as formActions from '../../formactions/library';

function LibrarySettingsEditor({
  librarySettingsDocument,
  openSnackBar,
  onSubmit,
  onSuccess,
  onFail,
  ...formProps
}) {
  const LIBRARY_SETTINGS_FORM = 'LIBRARY_SETTINGS_FORM';
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Library Settings Updated';
    openSnackBar({ messageContent });
    if (onSuccess) { onSuccess(response, dispatch, props); }
  };
  const onSubmitFail = (error, dispatch, props) => {
    const messageContent = 'Error Updating Library Settings';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) { onFail(error, dispatch, props); }
  };
  return (
    <Editor
      title="Library Settings"
      formName={LIBRARY_SETTINGS_FORM}
      onSubmitSuccess={onSubmitSuccess}
      onSubmitFail={onSubmitFail}
      onSubmit={formActions.onUpdateSettings}
      displayProps={{ librarySettingsDocument }}
      formComponent={LibrarySettingsForm}
      displayComponent={LibrarySettingsDisplay}
      initialValues={{ librarySettingsDocument }}
      formProps={formProps}
    />
  );
}

export default withSnackbar(LibrarySettingsEditor);
