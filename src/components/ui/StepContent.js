import React from 'react';
import MUIStepContent from '@material-ui/core/StepContent';
import { withStyles } from '@material-ui/core/styles';

const StepContent = (props) => (
  <MUIStepContent
    {...props}
    classes={{ transition: props.classes.root }}
  />
);

export default withStyles({ root: { overflow: 'visible' } })(StepContent);
