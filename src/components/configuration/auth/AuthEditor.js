import React from 'react';
import * as formActions from '../../../formactions/configuration';
import Editor from '../../ui/Editor';
import AuthForm from './AuthForm';
import AuthDisplay from './AuthDisplay';
import withSnackbar from '../../../hoc/withSnackbar';

function AuthEditor({
  oAuth2ConfigurationDocument,
  openSnackBar,
  onSuccess,
}) {
  const EDIT_AUTH_FORM = 'EDIT_AUTH_FORM';
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'OAuth2 Configuration Updated';
    openSnackBar({ messageContent });
    if (onSuccess) { onSuccess(response, dispatch, props); }
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Updating OAuth2 Configuration';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Editor
      formName={EDIT_AUTH_FORM}
      onSubmitSuccess={onSubmitSuccess}
      onSubmitFail={onSubmitFail}
      onSubmit={formActions.onUpdateAuthConfiguration}
      displayProps={{ oAuth2ConfigurationDocument }}
      initialValues={{ oAuth2ConfigurationDocument }}
      formComponent={AuthForm}
      displayComponent={AuthDisplay}
    />
  );
}

export default withSnackbar(AuthEditor);
