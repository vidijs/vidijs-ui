import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import Field from '../ui/Field';
import InitialDisabledTextField from '../ui/InitialDisabledTextField';
import FormSection from '../ui/FormSection';
import CodeField from '../ui/CodeField';
import { StatefulAsyncSelect } from '../ui/Select';
import { loadShapeTagOptions } from '../shapetag/ShapeTagSelect';
import { loadProjectionOptions } from '../projection/ProjectionSelect';

import UrlField from '../ui/UrlField';
import FieldArray from '../ui/FieldArray';

const ExportLocationType = () => (
  <>
    <Field
      name="name"
      label="name"
      component={InitialDisabledTextField}
      fullWidth
    />
    <FieldArray
      name="uriList"
      label="URI"
      component={UrlField}
    />
    <Field
      name="tag"
      label="Shape Tag"
      component={StatefulAsyncSelect}
      loadOptions={loadShapeTagOptions}
      cacheOptions
      isClearable
      fullWidth
      isMulti
    />
    <Field
      name="projection"
      label="Projection"
      component={StatefulAsyncSelect}
      loadOptions={loadProjectionOptions}
      cacheOptions
      isClearable
      fullWidth
    />
    <Field
      name="script"
      label="Script"
      component={CodeField}
      options={{
        theme: 'material',
        mode: 'application/json',
        lineWrapping: true,
        lineNumbers: true,
      }}
    />
  </>
);

const ExportLocationForm = ({ error, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    {error && <Typography color="error">{error}</Typography>}
    <FormSection
      name="exportLocationDocument"
      component={ExportLocationType}
    />
    <button type="submit" hidden />
  </form>
);

export default reduxForm()(ExportLocationForm);
