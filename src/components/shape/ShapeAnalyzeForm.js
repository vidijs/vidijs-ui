import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

import { TextField, Select } from '../form';
import ChipInput from '../ui/ChipInput';
import FormSection from '../ui/FormSection';
import Field from '../ui/Field';
import { StatefulAsyncSelect } from '../ui/Select';
import FieldTypeArray from '../ui/FieldTypeArray';
import JobPriority from '../../const/JobPriority';
import { KeyValuePairType } from '../ui/FormType';
import { required } from '../../utils/FieldValidation';
import { loadStorageOptions } from '../storage/StorageSelect';
import { OtifPresetType } from '../shapetag/ShapeTagForm';

const queryParams = () => (
  <React.Fragment>
    <Field
      name="resourceId"
      label="Transcoder ID"
      component={TextField}
      fullWidth
    />
    <Field
      name="storageId"
      component={StatefulAsyncSelect}
      loadOptions={loadStorageOptions}
      cacheOptions
      isClearable
      fullWidth
    />
    <Field
      name="notification"
      component={TextField}
      fullWidth
    />
    <FieldTypeArray
      name="notificationData"
      component={KeyValuePairType}
      label="Notification Metadata"
      arrayHeader
      withHeader={false}
      dense
    />
    <FormControl fullWidth>
      <InputLabel htmlFor="priority">Priority</InputLabel>
      <Field name="priority" component={Select}>
        {JobPriority.map(priority => (
          <MenuItem key={priority} value={priority}>
            {priority}
          </MenuItem>
        ))}
      </Field>
    </FormControl>
    <FieldTypeArray
      name="jobmetadata"
      component={KeyValuePairType}
      label="Job Metadata"
      withHeader={false}
      arrayHeader
      dense
    />
  </React.Fragment>
);

const AnalyzeAudioChannelType = () => (
  <React.Fragment>
    <Field
      name="tone"
      label="tone"
      component={ChipInput}
      simple
      fullWidth
    />
    <Field
      name="stream"
      component={TextField}
      type="number"
      fullWidth
    />
    <Field
      name="channel"
      component={TextField}
      type="number"
      fullWidth
    />
    <Field
      name="thresh"
      component={TextField}
      type="number"
      fullWidth
    />
  </React.Fragment>
);

const analyzeJobDocument = () => (
  <React.Fragment>
    <FormSection
      name="black"
      label="Black"
      component={() => (
        <React.Fragment>
          <Field
            name="threshold"
            component={TextField}
            type="number"
            fullWidth
          />
          <Field
            name="percentage"
            component={TextField}
            type="number"
            fullWidth
          />
        </React.Fragment>
      )}
    />
    <FormSection
      name="bars"
      label="Bars"
      component={() => (
        <React.Fragment>
          <Field
            name="threshold"
            component={TextField}
            type="number"
            fullWidth
          />
          <Field
            name="percentage"
            component={TextField}
            type="number"
            fullWidth
          />
        </React.Fragment>
      )}
    />
    <FormSection
      name="freeze"
      label="Freeze"
      component={() => (
        <React.Fragment>
          <Field
            name="threshold"
            component={TextField}
            type="number"
            fullWidth
          />
          <Field
            name="time"
            component={TextField}
            type="number"
            fullWidth
          />
        </React.Fragment>
      )}
    />
    <FieldTypeArray
      name="channel"
      label="channel"
      component={AnalyzeAudioChannelType}
    />
    <FormSection
      name="audio"
      label="Audio"
      component={() => (
        <FieldTypeArray
          name="otif"
          label="otif"
          component={OtifPresetType}
        />
      )}
    />
    <FormSection
      name="video"
      label="Video"
      component={() => (
        <FieldTypeArray
          name="otif"
          label="otif"
          component={OtifPresetType}
        />
      )}
    />
  </React.Fragment>
);

function ShapeAnalyzeForm({
  error,
  handleSubmit,
  itemId,
  shapeId,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      {!itemId && (
        <Field
          name="itemId"
          component={TextField}
          validate={[required]}
          fullWidth
        />
      )}
      {!shapeId && (
        <Field
          name="shapeId"
          component={TextField}
          validate={[required]}
          fullWidth
        />
      )}
      <FormSection
        name="queryParams"
        label="queryParams"
        component={queryParams}
      />
      <FormSection
        name="analyzeJobDocument"
        label="analyzeJobDocument"
        component={analyzeJobDocument}
      />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(ShapeAnalyzeForm);
