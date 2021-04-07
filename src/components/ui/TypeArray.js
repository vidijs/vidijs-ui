import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import startCase from 'lodash.startcase';

import withErrorBoundary from '../../hoc/withErrorBoundary';

const hoverStyle = (theme) => ({
  onHover: {
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
});

const style = {
  marginLeft: {
    marginLeft: '10px',
  },
  withPadding: {
    paddingTop: '10px',
    paddingBottom: '10px',
  },
};

const TypeArray = ({
  title,
  titleKey,
  value,
  classes,
  arrayTitle,
  arrayStartCase = false,
  component: Component,
  hover = true,
  dense = false,
  hideNoValue = false,
  titleStartCase = true,
}) => {
  if (hideNoValue && value === undefined) { return null; }
  if (hideNoValue && value.length === 0) { return null; }
  if (!Array.isArray(value)) { return null; }
  return (
    <>
      {arrayTitle
      && (
      <Typography variant="subtitle2">
        {arrayStartCase ? startCase(arrayTitle) : arrayTitle}
      </Typography>
      )}
      {value.map((thisValue, index) => (
        <div
          className={hover ? classes.onHover : undefined}
          style={dense ? undefined : style.marginLeft}
          key={index} // eslint-disable-line react/no-array-index-key
        >
          { (title && !titleKey)
          && (
          <Typography variant="subtitle2">
            {titleStartCase
              ? startCase(`${title} ${index + 1}`)
              : `${title} ${index + 1}`}
          </Typography>
          )}
          { (titleKey && title)
          && (
          <Typography variant="subtitle2">
            {titleStartCase
              ? startCase(`${title} ${thisValue[titleKey]}`)
              : `${title} ${thisValue[titleKey]}`}
          </Typography>
          )}
          { (titleKey && !title)
          && (
          <Typography variant="subtitle2">
            {titleStartCase ? startCase(thisValue[titleKey]) : thisValue[titleKey]}
          </Typography>
          )}
          <div className={dense ? undefined : classes.marginLeft}>
            <Component value={thisValue} />
          </div>
        </div>
      ))}
    </>
  );
};

export default withErrorBoundary(withStyles(hoverStyle)(TypeArray));
