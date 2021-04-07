import React from 'react';
import { connect } from 'react-redux';
import startCase from 'lodash.startcase';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import ResourceForm from './ResourceForm';
import * as formActions from '../../formactions/resource';
import * as actions from '../../actions';
import WizardForm from '../ui/WizardForm';

function ImportSettingsDialog({
  closeModal,
  isOpen,
  history,
  openSnackBar,
  resourceType,
}) {
  const onSubmitSuccess = (response) => {
    const { resourceDocument } = response;
    const { id: resourceId } = resourceDocument;
    const messageContent = `${resourceType} ${resourceId} Created`;
    openSnackBar({ messageContent });
    history.push(`/resource/${resourceType}/${resourceId}`);
    closeModal();
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Creating Resource';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Dialog open={isOpen} onClose={closeModal} fullWidth maxWidth={false}>
      <DialogTitle>{`New ${startCase(resourceType)}`}</DialogTitle>
      <DialogContent>
        <WizardForm
          FormComponent={ResourceForm}
          documentName="resourceDocument"
          onSubmit={formActions.onCreate}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          onCancel={closeModal}
          resourceType={resourceType}
        />
      </DialogContent>
    </Dialog>
  );
}

const mapDispatchToProps = {
  openSnackBar: actions.ui.openSnackBar,
};

export default connect(null, mapDispatchToProps)(ImportSettingsDialog);
