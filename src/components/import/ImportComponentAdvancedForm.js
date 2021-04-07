import React from 'react';
import { reduxForm, Field } from 'redux-form';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { TextField } from '../form';
import BoolCheckbox from '../ui/BoolCheckbox';
import ChipInput from '../ui/ChipInput';
import FormSection from '../ui/FormSection';

const queryParams = () => (
  <>
    <Field
      name="original"
      label="Original Shape Tag"
      component={TextField}
      helperText="Reset original to this tag"
      fullWidth
    />
    <FormControlLabel
      control={(
        <Field
          name="allowReimport"
          component={BoolCheckbox}
        />
      )}
      label="Allow Reimport"
    />
    <FormControlLabel
      control={(
        <Field
          name="no-transcode"
          component={BoolCheckbox}
        />
      )}
      label="Disable Transcoding"
    />
    <FormControlLabel
      control={(
        <Field
          name="createThumbnails"
          component={BoolCheckbox}
        />
      )}
      label="Create Thumbnails"
    />
    <FormControlLabel
      control={(
        <Field
          name="overrideFastStart"
          component={BoolCheckbox}
        />
      )}
      label="Override Fast Start"
    />
    <FormControlLabel
      control={(
        <Field
          name="requireFastStart"
          component={BoolCheckbox}
        />
      )}
      label="Require Fast Start"
    />
    <FormControlLabel
      control={(
        <Field
          name="growing"
          component={BoolCheckbox}
        />
      )}
      label="Growing File"
    />
    <Field
      name="createPosters"
      label="Poster Timecodes"
      component={ChipInput}
      simple
      fullWidth
    />
    <Field
      name="fastStartLength"
      label="Fast Start Length"
      component={TextField}
      fullWidth
    />
    <Field
      name="storageId"
      label="Storage ID"
      component={TextField}
      fullWidth
    />
    <Field
      name="resourceId"
      label="Transcoder ID"
      component={TextField}
      fullWidth
    />
    <Field
      name="thumbnailService"
      label="Thumbnail Storage ID"
      component={TextField}
      fullWidth
    />
    <Field
      name="xmpfile"
      label="XMP URI"
      component={TextField}
      fullWidth
    />
    <Field
      name="sidecar"
      label="Sidecar URIs/IDs"
      component={ChipInput}
      simple
      fullWidth
    />
    <Field
      name="settings"
      label="Access Control Setting"
      component={TextField}
      fullWidth
    />
    <Field
      name="notification"
      label="Notification ID"
      component={TextField}
      fullWidth
    />
    <Field
      name="notificationData"
      label="Notification Data"
      component={TextField}
      fullWidth
    />
    <Field
      name="index"
      label="Component Track"
      component={TextField}
      fullWidth
    />
    <Field
      name="importTag"
      label="Default Shape Tag"
      component={ChipInput}
      simple
      fullWidth
    />
  </>
);

function ImportComponentAdvancedForm({
  error,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection
        name="queryParams"
        component={queryParams}
      />
      <button type="submit" hidden />
    </form>
  );
}
export default reduxForm()(ImportComponentAdvancedForm);
