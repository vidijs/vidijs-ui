import React from 'react';
import MUIDialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';


const Dialog = props => <MUIDialog {...props} classes={{ paperScrollPaper: props.classes.root }} />;

export default withStyles({ root: { overflow: 'visible' } })(Dialog);
