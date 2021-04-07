import React from 'react';
import ReactJson from 'react-json-view';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import withUI from '../../hoc/withUI';

function CodeModal({
  code,
  title,
  open,
  onClose,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={false}
    >
      {open && (
        <>
          <DialogTitle>{title || ''}</DialogTitle>
          <DialogContent>
            <ReactJson
              src={code}
              theme="solarized"
              displayDataTypes={false}
              collapsed={false}
              displayObjectSize={false}
              name={false}
              enableClipboard={(copy) => navigator.clipboard.writeText(JSON.stringify(copy.src, null, '\t'))}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}

export default withUI(CodeModal);
