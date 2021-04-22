import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import startCase from 'lodash.startcase';

import withErrorBoundary from '../../hoc/withErrorBoundary';

const hoverStyle = (theme) => ({
  onHover: {
    paddingTop: '10px',
    paddingBottom: '10px',
    // paddingLeft: '10px',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  noHover: {
    paddingTop: '10px',
    paddingBottom: '10px',
    // paddingLeft: '10px',
  },
  marginLeft: {
    marginLeft: '10px',
  },
});

const TypeSection = ({
  title,
  value,
  classes,
  component: Component,
  hover = false,
  hideNoValue = false,
  titleStartCase = true,
  dense = false,
  ...props
}) => {
  if (hideNoValue && value === undefined) { return null; }
  return (
    <div
      className={hover ? classes.onHover : classes.noHover}
    >
      {title
      && <Typography variant="subtitle2">{titleStartCase ? startCase(title) : title}</Typography>}
      { typeof value === 'object'
      && (
      <div className={dense ? undefined : classes.marginLeft}>
        <Component value={value} {...props} />
      </div>
      )}
    </div>
  );
};

export default withErrorBoundary(withStyles(hoverStyle)(TypeSection));
