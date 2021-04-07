import React from 'react';
import MUIDialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';

const DialogContent = (props) => <MUIDialogContent {...props} className={props.classes.root} />;

export default withStyles({ root: { overflow: 'visible' } })(DialogContent);
