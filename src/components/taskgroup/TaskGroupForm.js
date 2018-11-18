import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm, Field, FormSection, FieldArray } from 'redux-form';
import { Select, TextField } from 'redux-form-material-ui';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Delete from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import TextButton from '../ui/TextButton';
import ChipInput from '../ui/ChipInput';

const InitialDisabledTextField = props => (
  <TextField
    disabled={props.meta.initial !== undefined}
    onFocus={props.onFocus}
    onBlur={props.onBlur}
    {...props}
  />);

const TranscoderArray = ({ fields }) => (
  <React.Fragment>
    {fields.map((thisField, index) => (
      <Grid
        key={thisField}
        container
        direction="row"
        wrap="nowrap"
        spacing={16}
      >
        <Grid item sm={10}>
          <Field
            name={`${thisField}.id`}
            component={TextField}
            label="Transcoder ID"
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
      Add Transcoder
    </TextButton>
  </React.Fragment>
);


const DataArray = ({ fields }) => (
  <React.Fragment>
    {fields.map((thisField, index) => (
      <Grid
        key={thisField}
        container
        direction="row"
        wrap="nowrap"
        spacing={16}
      >
        <Grid item sm={5}>
          <Field
            name={`${thisField}.key`}
            component={TextField}
            label="Data Key"
            fullWidth
          />
        </Grid>
        <Grid item sm={5}>
          <Field
            name={`${thisField}.value`}
            component={TextField}
            label="Data Value"
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
      Add Data
    </TextButton>
  </React.Fragment>
);

const JobArray = ({ fields }) => (
  <React.Fragment>
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
            <Field
              name={`${thisField}.type`}
              label="Job Type"
              component={ChipInput}
              simple
              fullWidth
            />
            <Field
              name={`${thisField}.priority`}
              label="Job Priority"
              component={ChipInput}
              simple
              fullWidth
            />
            <Field
              name={`${thisField}.user`}
              label="Job User"
              component={ChipInput}
              simple
              fullWidth
            />
            <Field
              name={`${thisField}.group`}
              label="Job Group"
              component={ChipInput}
              simple
              fullWidth
            />
          </Grid>
          <Grid item sm={2}>
            <IconButton onClick={() => fields.remove(index)}>
              <Delete />
            </IconButton>
          </Grid>
        </Grid>
        <FieldArray
          name={`${thisField}.data`}
          component={DataArray}
        />
      </React.Fragment>
    ))}
    <TextButton onClick={() => fields.push()} color="primary" style={{ marginTop: 10 }}>
      Add Job
    </TextButton>
  </React.Fragment>
);

const TaskGroupType = () => (
  <React.Fragment>
    <Field
      name="name"
      component={InitialDisabledTextField}
      label="Name"
      required
      fullWidth
    />
    <FormControl fullWidth>
      <InputLabel htmlFor="priority">Priority</InputLabel>
      <Field name="priority" component={Select} >
        <MenuItem value="HIGHEST">HIGHEST</MenuItem>
        <MenuItem value="HIGH">HIGH</MenuItem>
        <MenuItem value="MEDIUM">MEDIUM</MenuItem>
        <MenuItem value="LOW">LOW</MenuItem>
        <MenuItem value="LOWEST">LOWEST</MenuItem>
      </Field>
    </FormControl>
    <Grid container direction="column">
      <FieldArray
        name="transcoder"
        component={TranscoderArray}
      />
    </Grid>
    <Grid container direction="column">
      <FieldArray
        name="job"
        component={JobArray}
      />
    </Grid>
  </React.Fragment>
);

function TaskGroupForm({
  error,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection
        name="taskGroupDocument"
        component={TaskGroupType}
      />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(TaskGroupForm);
