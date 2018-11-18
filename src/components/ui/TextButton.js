import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = {
  button: {
    padding: 'unset',
    minWidth: 'unset',
  },
};

const TextButton = ({
  classes,
  children,
  ...props
}) => (
  <Button
    className={classes.button}
    disableFocusRipple
    disableRipple
    {...props}
  >
    {children}
  </Button>
);

export default withStyles(styles)(TextButton);
