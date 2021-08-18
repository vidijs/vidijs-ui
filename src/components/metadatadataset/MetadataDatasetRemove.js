import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import { metadatadataset as api } from '@vidispine/vdt-api';
import withUI from '../../hoc/withUI';

function MetadataDatasetRemove({
  open,
  onClose,
  history,
  openSnackBar,
  datasetId,
  onSuccess,
}) {
  const onRemove = () => {
    api.removeMetadataDataset({ datasetId })
      .then(() => {
        const messageContent = `Metadata Dataset ${datasetId} Removed`;
        openSnackBar({ messageContent });
        history.push('/metadata-dataset/');
        onClose();
        if (onSuccess) { onSuccess(); }
      })
      .catch(() => {
        const messageContent = 'Error Removing Metadata Dataset';
        openSnackBar({ messageContent, messageColor: 'secondary' });
      });
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>
        {`Remove Metadata Dataset "${datasetId}"?`}
      </DialogTitle>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          variant="text"
          onClick={onRemove}
          color="secondary"
          autoFocus
        >
          Remove
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default withUI(MetadataDatasetRemove);
