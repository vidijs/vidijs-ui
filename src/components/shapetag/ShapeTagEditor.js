import React from 'react';
import { connect } from 'react-redux';
import * as formActions from '../../formactions/shapetag';
import * as actions from '../../actions';
import Editor from '../ui/Editor';

function ShapeTagEditor({
  transcodePresetDocument,
  tagName,
  openSnackBar,
  onRefresh,
  formComponent,
  ...props
}) {
  const EDIT_SHAPTAG_FORM = 'EDIT_SHAPTAG_FORM';
  const onSubmitSuccess = () => {
    const messageContent = 'Shape Tag Rule Saved';
    openSnackBar({ messageContent });
    if (onRefresh) { onRefresh(); }
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Updating Shape Tag';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  const formProps = { tagName };
  const initialValues = { transcodePresetDocument };
  return (
    <Editor
      formName={EDIT_SHAPTAG_FORM}
      onSubmitSuccess={onSubmitSuccess}
      onSubmitFail={onSubmitFail}
      onSubmit={formActions.onUpdate}
      formProps={formProps}
      displayProps={{ transcodePresetDocument }}
      initialValues={initialValues}
      formComponent={!tagName.startsWith('__') ? formComponent : undefined}
      {...props}
    />
  );
}

const mapDispatchToProps = {
  openSnackBar: actions.ui.openSnackBar,
};

export default connect(null, mapDispatchToProps)(ShapeTagEditor);
