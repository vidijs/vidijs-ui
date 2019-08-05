import React from 'react';
import { reduxForm, Field, FieldArray, FormSection } from 'redux-form';
import Typography from '@material-ui/core/Typography';
import { TextField } from '../form';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import TextButton from '../ui/TextButton';
import SquareCard from '../ui/SquareCard';


export function TimeBaseType({ label }) {
  return (
    <React.Fragment>
      <Field
        name="numerator"
        component={TextField}
        label={label ? `${label} Numerator` : 'Numerator'}
        type="number"
      />
      <Field
        name="denominator"
        component={TextField}
        label={label ? `${label} Denominator` : 'Denominator'}
        type="number"
      />
    </React.Fragment>
  );
}

export function ConformTimePointType({ label }) {
  return (
    <React.Fragment>
      <Field
        name="samples"
        component={TextField}
        label={label ? `${label} Sample` : 'Sample'}
        type="number"
      />
      <FormSection
        name="timeBase"
        component={TimeBaseType}
        label={label}
      />
    </React.Fragment>
  );
}

export function SegmentArray({
  fields,
  maxFields = Infinity,
  minFields = 0,
  label,
}) {
  const addField = () => fields.push({});
  return (
    <React.Fragment>
      {fields.map((thisField, index) => (
        <SquareCard key={thisField}>
          <CardContent>
            <Grid container direction="row" justify="space-between">
              <Grid item sm={2}>
                { label &&
                  <InputLabel shrink>{label} {index + 1}</InputLabel>
                }
              </Grid>
              <Grid item sm={2}>
                { minFields < fields.length &&
                <Button
                  size="small"
                  color="secondary"
                  onClick={() => fields.remove(index)}
                >
                  Remove Segment
                </Button>
                }
              </Grid>
            </Grid>
            <Grid container direction="row" key={thisField} alignItems="flex-end" spacing={16}>
              <Grid item sm={8}>
                <Field
                  name={`${thisField}.source.id`}
                  component={TextField}
                  label="Source ID"
                  fullWidth
                />
                <Grid container direction="row" justify="space-between">
                  <FormSection
                    name={`${thisField}.source.interval.start`}
                    component={ConformTimePointType}
                    label="Start"
                  />
                </Grid>
                <Grid container direction="row" justify="space-between">
                  <FormSection
                    name={`${thisField}.source.interval.end`}
                    component={ConformTimePointType}
                    label="End"
                  />
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </SquareCard>
      ))}
      { maxFields > fields.length &&
        <Grid container direction="column" justify="flex-start" alignItems="stretch">
          <TextButton onClick={addField} color="primary">
            Add Segment
          </TextButton>
        </Grid>
      }
    </React.Fragment>
  );
}


function ConformForm({
  error,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FieldArray
        name="conformRequestDocument.conform.timeline.segment"
        component={SegmentArray}
        label="Segment"
      />
      <button type="submit" hidden />
    </form>
  );
}


export default reduxForm()(ConformForm);
