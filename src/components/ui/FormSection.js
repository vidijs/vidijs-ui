import React from 'react';
import { FormSection } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import startCase from 'lodash.startcase';

const hoverStyle = (theme) => ({
  onHover: {
    paddingTop: '10px',
    paddingBottom: '10px',
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
  noHover: {
    paddingTop: '10px',
    paddingBottom: '10px',
  },
  marginLeft: {
    marginLeft: '10px',
  },
});

const WrappedFormSection = ({
  label,
  hover = false,
  classes,
  labelStartCase = true,
  ...props
}) => (
  <div
    className={hover ? classes.onHover : classes.noHover}
  >
    { label
      && <Typography variant="subtitle2">{labelStartCase ? startCase(label) : label}</Typography>}
    <div className={label ? classes.marginLeft : undefined}>
      <FormSection
        {...props}
      />
    </div>
  </div>
);

export default withStyles(hoverStyle)(WrappedFormSection);
