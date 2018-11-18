import React from 'react';
import { connect } from 'react-redux';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import * as actions from '../../actions';

function LeftSnackbar({
  closeSnackBar,
  isOpen = false,
  messageContent,
  actionButton,
  messageColor = 'inherit',
}) {
  const action = [
    actionButton,
    <IconButton
      key="close"
      aria-label="Close"
      color="inherit"
      onClick={closeSnackBar}
    >
      <CloseIcon />
    </IconButton>,
  ];
  const message = <Typography color={messageColor} id="message-id">{messageContent}</Typography>;
  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={6000}
      onClose={closeSnackBar}
      message={message}
      action={action}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    />
  );
}

function mapStateToProps(state) {
  const { ui: { snackBar } } = state;
  return {
    ...snackBar,
  };
}

const mapDispatchToProps = {
  closeSnackBar: actions.ui.closeSnackBar,
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftSnackbar);
