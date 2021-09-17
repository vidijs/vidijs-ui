import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm, Field, FieldArray } from 'redux-form';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { TextField, Select } from '../form';

import SimpleMetadataField from '../ui/SimpleMetadataField';
import { required } from '../../utils/FieldValidation';

function ImportSidecarForm({
  error,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit} style={{ padding: '10px' }}>
      <Grid container direction="row" alignItems="center">
        {error
          && (
          <Grid item xs={12}>
            <Typography color="error">{error}</Typography>
          </Grid>
          )}
        <Grid item xs={12}>
          <Field
            name="itemId"
            label="Item Id"
            component={TextField}
            validate={[required]}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            name="queryParams.sidecar"
            label="FileId / URI"
            component={TextField}
            helperText="Either the id of the sidecar file or a URL for locating it"
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            name="queryParams.startTimeCode"
            label="Start TimeCode"
            component={TextField}
            helperText="Expected start time code of the content"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel htmlFor="priority">Priority</InputLabel>
            <Field name="queryParams.priority" component={Select}>
              <MenuItem value="HIGHEST">HIGHEST</MenuItem>
              <MenuItem value="HIGH">HIGH</MenuItem>
              <MenuItem value="MEDIUM">MEDIUM</MenuItem>
              <MenuItem value="LOW">LOW</MenuItem>
              <MenuItem value="LOWEST">LOWEST</MenuItem>
            </Field>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FieldArray
            name="queryParams.jobmetadata"
            label="Job Metadata"
            component={SimpleMetadataField}
            buttonLabel="Add Job Metadata"
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            name="queryParams.notification"
            label="Notification ID"
            component={TextField}
            helperText="The placeholder job notification to use for this job"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <FieldArray
            name="queryParams.notificationData"
            label="Notification Data"
            component={SimpleMetadataField}
            buttonLabel="Add Notification Data"
          />
        </Grid>
      </Grid>
    </form>
  );
}

export default reduxForm()(ImportSidecarForm);
