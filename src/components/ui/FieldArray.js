import React from 'react';
import Typography from '@material-ui/core/Typography';
import { FieldArray as RXFieldArray, Field } from 'redux-form';
import Delete from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import startCase from 'lodash.startcase';

import withErrorBoundary from '../../hoc/withErrorBoundary';
import TextButton from './TextButton';

const hoverStyle = theme => ({
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


const FieldArrayComponent = ({
  fields,
  label,
  classes,
  hover = true,
  labelStartCase = true,
  fieldComponent,
  ...props
}) => (
  <div>
    {fields.map((thisField, index) => (
      <div
        key={thisField}
        className={hover ? classes.onHover : classes.noHover}
      >
        <Grid
          container
          direction="row-reverse"
          justify="space-between"
          alignItems="baseline"
        >
          <Grid item sm="auto">
            <IconButton onClick={() => fields.remove(index)}>
              <Delete />
            </IconButton>
          </Grid>
          { label &&
            <Typography variant="body2">
              {labelStartCase ?
                startCase(`${label} ${index + 1}`)
                :
                `${label} ${index + 1}`
              }
            </Typography>
          }
        </Grid>
        <div className={classes.marginLeft}>
          <Field
            name={`${thisField}`}
            component={fieldComponent}
            {...props}
          />
        </div>
      </div>
    ))}
    <TextButton onClick={() => fields.push()} color="primary" style={{ marginTop: 10 }}>
      {label ? `Add ${label}` : 'Add'}
    </TextButton>
  </div>
);


const FieldArray = ({ component, ...props }) => {
  const StyledFieldArrayComponent = withStyles(hoverStyle)(FieldArrayComponent);
  return (
    <RXFieldArray
      component={StyledFieldArrayComponent}
      fieldComponent={component}
      {...props}
    />
  );
};

export default withErrorBoundary(FieldArray);
