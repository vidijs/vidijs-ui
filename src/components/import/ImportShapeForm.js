import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm, Field, FieldArray } from 'redux-form';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { TextField, Select } from '../form';

import { loadShapeTagOptions } from '../shapetag/ShapeTagSelect';
import { StatefulAsyncSelect } from '../ui/Select';
import SimpleMetadataField from '../ui/SimpleMetadataField';
import { required } from '../../utils/FieldValidation';

function ImportShapeForm({
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
            name="queryParams.uri"
            label="URI"
            component={TextField}
            helperText="Must be specified unless File Id is specified"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            name="queryParams.fileId"
            label="File ID"
            component={TextField}
            helperText="Must be specified unless URI is specified"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            name="queryParams.tag"
            label="Shape Tag"
            component={StatefulAsyncSelect}
            loadOptions={loadShapeTagOptions}
            cacheOptions
            isClearable
            fullWidth
            isMulti
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
      </Grid>
    </form>
  );
}

export default reduxForm()(ImportShapeForm);
