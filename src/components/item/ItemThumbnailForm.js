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
import { loadShapeTagOptions } from '../shapetag/ShapeTagSelect';
import FieldTypeArray from '../ui/FieldTypeArray';
import { KeyValuePairType } from '../ui/FormType';
import JobPriority from '../../const/JobPriority';
import { required } from '../../utils/FieldValidation';

const queryParams = ({ variant }) => (
  <>
    {variant !== 'thumbnail' && (
    <>
      <Field
        name="createPosters"
        label="Poster Timecode"
        component={ChipInput}
        validate={[required]}
        simple
        required
        fullWidth
      />
      <Field
        name="posterWidth"
        component={TextField}
        fullWidth
      />
      <Field
        name="posterHeight"
        component={TextField}
        fullWidth
      />
      <FormControl fullWidth>
        <InputLabel htmlFor="posterFormat">Poster Format</InputLabel>
        <Field name="posterFormat" component={Select}>
          <MenuItem value="jpeg">JPEG</MenuItem>
          <MenuItem value="png">PNG</MenuItem>
        </Field>
      </FormControl>
    </>
    )}
    {variant !== 'poster' && (
    <>
      <Field
        name="createThumbnails"
        label="Thumbnail Timecode"
        component={ChipInput}
        validate={[required]}
        simple
        required
        fullWidth
      />
      <Field
        name="thumbnailWidth"
        component={TextField}
        fullWidth
      />
      <Field
        name="thumbnailHeight"
        component={TextField}
        fullWidth
      />
    </>
    )}
    <FormControl fullWidth>
      <InputLabel htmlFor="priority">Priority</InputLabel>
      <Field name="priority" component={Select}>
        {JobPriority.map((priority) => (
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
    <Field
      name="tag"
      label="Shape-Tag Settings"
      component={TextField}
      fullWidth
    />
    <Field
      name="version"
      label="Item Essence ID"
      component={TextField}
      fullWidth
    />
    <Field
      name="sourceTag"
      label="Source Shape-Tag"
      component={StatefulAsyncSelect}
      loadOptions={loadShapeTagOptions}
      cacheOptions
      isClearable
      fullWidth
      isMulti
    />
    <Field
      name="resourceId"
      label="Transcoder ID"
      component={TextField}
      fullWidth
    />
    <Field
      name="thumbnailService"
      label="Thumbnail Service ID"
      component={TextField}
      fullWidth
    />
    <Field
      name="notification"
      label="Notification ID"
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
  </>
);

function ItemThumbnailForm({
  error,
  handleSubmit,
  variant,
  itemId,
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
      <FormSection
        name="queryParams"
        label="queryParams"
        component={queryParams}
        variant={variant}
      />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(ItemThumbnailForm);
