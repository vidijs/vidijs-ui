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
import { TextField, Select } from '../form';

import TextButton from '../ui/TextButton';
import UserSelect from '../user/UserSelect';
import GroupSelect from '../group/GroupSelect';

const ResourceArray = ({ fields }) => (
  <>
    {fields.map((thisField, index) => (
      <React.Fragment key={thisField}>
        <Grid
          key={thisField}
          container
          direction="row"
          wrap="nowrap"
          spacing={16}
        >
          <Grid item sm={10}>
            <FormControl fullWidth>
              <InputLabel htmlFor={`${thisField}.name`}>Resource Name</InputLabel>
              <Field name={`${thisField}.name`} component={Select} required>
                <MenuItem value="item">Item</MenuItem>
                <MenuItem value="storage">Storage</MenuItem>
              </Field>
            </FormControl>
            <Field
              name={`${thisField}.limit`}
              label="Resource Limit"
              component={TextField}
              fullWidth
              required
            />
          </Grid>
          <Grid item sm={2}>
            <IconButton onClick={() => fields.remove(index)}>
              <Delete />
            </IconButton>
          </Grid>
        </Grid>
      </React.Fragment>
    ))}
    <TextButton onClick={() => fields.push()} color="primary" style={{ marginTop: 10 }}>
      Add Resource
    </TextButton>
  </>
);

const QuotaRuleType = () => (
  <>
    <Field
      name="description"
      component={TextField}
      label="Description"
      fullWidth
    />
    <UserSelect
      name="user"
      label="User"
      isClearable
      fullWidth
    />
    <GroupSelect
      name="group"
      label="Group"
      isClearable
      fullWidth
    />
    <Field
      name="collection"
      component={TextField}
      label="Collection"
      fullWidth
    />
    <Field
      name="library"
      component={TextField}
      label="Library"
      fullWidth
    />
    <Field
      name="storage"
      component={TextField}
      label="Storage"
      fullWidth
    />
    <Field
      name="storageGroup"
      component={TextField}
      label="Storage Group"
      fullWidth
    />
    <Field
      name="tag"
      component={TextField}
      label="Tag"
      fullWidth
    />
    <Grid container direction="column">
      <FieldArray
        name="resource"
        component={ResourceArray}
      />
    </Grid>
  </>
);

function QuotaForm({
  error,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection
        name="quotaRuleDocument"
        component={QuotaRuleType}
      />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(QuotaForm);
