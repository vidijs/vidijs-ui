import React from 'react';
import Typography from '@material-ui/core/Typography';
import { FormSection, FieldArray } from 'redux-form';
import Delete from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import startCase from 'lodash.startcase';

import withErrorBoundary from '../../hoc/withErrorBoundary';
import TextButton from './TextButton';

const hoverStyle = (theme) => ({
  onHover: {
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  noHover: {
  },
  marginLeft: {
    marginLeft: '10px',
  },
});

const RemoveAction = ({
  removeLabel,
  fields,
  index,
  label,
}) => (
  removeLabel ? (
    <Button
      size="small"
      color="secondary"
      onClick={() => fields.remove(index)}
    >
      {`Remove ${label}`}
    </Button>
  ) : (
    <IconButton onClick={() => fields.remove(index)}>
      <Delete />
    </IconButton>
  )
);

function TypeArray({
  fields,
  label,
  typeComponent,
  classes,
  removeLabel,
  hover = true,
  labelStartCase = true,
  maxOccurs = Infinity,
  dense = false,
  withHeader = true,
  direction = 'column',
  arrayHeader = false,
}) {
  const thisLabel = labelStartCase ? startCase(label) : label;
  return (
    <div>
      { arrayHeader && (
        <Typography variant="subtitle2">{thisLabel}</Typography>
      )}

      {fields.map((thisField, index) => (
        <div
          key={`${thisField}`}
          className={hover ? classes.onHover : classes.noHover}
        >
          <Grid
            container
            direction="row-reverse"
            justify="space-between"
            alignItems="baseline"
          >
            <Grid item sm="auto">
              { direction !== 'row' && (
                <RemoveAction
                  index={index}
                  removeLabel={removeLabel}
                  fields={fields}
                  label={thisLabel}
                />
              )}
            </Grid>
            { withHeader && (
              <Typography variant="subtitle2">
                {`${thisLabel} ${index + 1}`}
              </Typography>
            )}
          </Grid>
          { direction === 'row' ? (
            <Grid container direction="row">
              <Grid item sm={11}>
                <FormSection
                  name={`${thisField}`}
                  component={typeComponent}
                />
              </Grid>
              <Grid item sm="auto">
                <RemoveAction
                  index={index}
                  removeLabel={removeLabel}
                  fields={fields}
                  label={thisLabel}
                />
              </Grid>
            </Grid>
          ) : (
            <div
              className={dense ? undefined : classes.marginLeft}
            >
              <FormSection
                name={`${thisField}`}
                component={typeComponent}
              />
            </div>
          )}
        </div>
      ))}
      {fields.length !== maxOccurs && (
        <TextButton onClick={() => fields.push()} color="primary" style={{ marginTop: 10 }}>
          {thisLabel ? `Add ${thisLabel}` : 'Add'}
        </TextButton>
      )}
    </div>
  );
}

const FieldTypeArray = ({ component, ...props }) => (
  <FieldArray
    component={TypeArray}
    typeComponent={component}
    {...props}
  />
);

export default withErrorBoundary(withStyles(hoverStyle)(FieldTypeArray));
