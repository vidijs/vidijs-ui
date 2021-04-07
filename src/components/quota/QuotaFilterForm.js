import React from 'react';
import Typography from '@material-ui/core/Typography';
import {
  reduxForm, Field, FormSection, FieldArray,
} from 'redux-form';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { TextField, Select } from '../form';

import BoolCheckbox from '../ui/BoolCheckbox';

import TextButton from '../ui/TextButton';

const FilterArray = ({ fields }) => (
  <>
    {fields.map((thisField, index) => (
      <Grid
        key={thisField}
        container
        direction="row"
        wrap="nowrap"
        spacing={16}
      >
        <Grid item sm={5}>
          <FormControl fullWidth>
            <InputLabel htmlFor={`${thisField}.key`}>Filter Key</InputLabel>
            <Field name={`${thisField}.key`} component={Select}>
              <MenuItem value="user">user</MenuItem>
              <MenuItem value="group">group</MenuItem>
              <MenuItem value="storage">storage</MenuItem>
              <MenuItem value="storageGroup">storageGroup</MenuItem>
              <MenuItem value="collection">collection</MenuItem>
              <MenuItem value="library">library</MenuItem>
              <MenuItem value="tag">tag</MenuItem>
            </Field>
          </FormControl>
        </Grid>
        <Grid item sm={5}>
          <Field
            name={`${thisField}.value`}
            component={TextField}
            label="Filter Value"
            fullWidth
          />
        </Grid>
        <Grid item sm={2}>
          <IconButton onClick={() => fields.remove(index)}>
            <Delete />
          </IconButton>
        </Grid>
      </Grid>
    ))}
    <TextButton onClick={() => fields.push()} color="primary" style={{ marginTop: 10 }}>
      Add Filter
    </TextButton>
  </>
);

const QuotaFilterQueryParams = () => (
  <>
    <Grid container direction="column">
      <FieldArray
        name="filter"
        component={FilterArray}
      />
    </Grid>
    <FormControlLabel
      control={(
        <Field
          name="exceeded"
          component={BoolCheckbox}
        />
      )}
      label="Exceeded"
    />
    <FormControl fullWidth>
      <InputLabel htmlFor="content">Content</InputLabel>
      <Field name="content" component={Select}>
        <MenuItem value="external">External</MenuItem>
      </Field>
    </FormControl>
  </>
);

function QuotaFilterForm({
  error,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection
        name="queryParams"
        component={QuotaFilterQueryParams}
      />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(QuotaFilterForm);
