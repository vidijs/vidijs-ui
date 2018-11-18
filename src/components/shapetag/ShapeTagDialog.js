import React from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import ShapeTagForm from './ShapeTagForm';
import * as formActions from '../../formactions/shapetag';
import * as actions from '../../actions';
import WizardForm from '../ui/WizardForm';

function ShapeTagDialog({
  closeModal,
  isOpen,
  history,
  openSnackBar,
}) {
  const onSubmitSuccess = (response) => {
    const { transcodePresetDocument } = response;
    const { name: tagName } = transcodePresetDocument;
    const messageContent = `Shape Tag ${tagName} Created`;
    openSnackBar({ messageContent });
    history.push(`/shape-tag/${tagName}/`);
    closeModal();
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Creating Shape Tag';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Dialog open={isOpen} onClose={closeModal} fullWidth maxWidth={false}>
      <DialogTitle>New Shape Tag</DialogTitle>
      <DialogContent>
        <WizardForm
          FormComponent={ShapeTagForm}
          documentName="transcodePresetDocument"
          onSubmit={formActions.onUpdate}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          onCancel={closeModal}
        />
      </DialogContent>
    </Dialog>
  );
}

const mapDispatchToProps = {
  openSnackBar: actions.ui.openSnackBar,
};

export default connect(null, mapDispatchToProps)(ShapeTagDialog);
