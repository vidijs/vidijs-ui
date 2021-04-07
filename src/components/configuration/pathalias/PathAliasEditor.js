import React from 'react';

import * as formActions from '../../../formactions/configuration';
import Editor from '../../ui/Editor';
import PathAliasForm from './PathAliasForm';
import PathAliasTable from './PathAliasTable';
import withSnackbar from '../../../hoc/withSnackbar';

function PathAliasEditor({
  pathAliasConfigurationDocument,
  openSnackBar,
  onSuccess,
}) {
  const EDIT_PATHALIAS_FORM = 'EDIT_PATHALIAS_FORM';
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Path Alias Configuration Updated';
    openSnackBar({ messageContent });
    if (onSuccess) { onSuccess(response, dispatch, props); }
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Updating Path Alias Configuration';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Editor
      formName={EDIT_PATHALIAS_FORM}
      onSubmitSuccess={onSubmitSuccess}
      onSubmitFail={onSubmitFail}
      onSubmit={formActions.onUpdatePathAliasConfiguration}
      displayProps={{ pathAliasConfigurationDocument }}
      initialValues={{ pathAliasConfigurationDocument }}
      formComponent={PathAliasForm}
      displayComponent={PathAliasTable}
    />
  );
}

export default withSnackbar(PathAliasEditor);
