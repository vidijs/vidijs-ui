import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import { TextField, Select } from '../form';
import FormSection from '../ui/FormSection';
import Field from '../ui/Field';
import { SimpleMetadataType } from '../ui/FormType';
import BoolCheckbox from '../ui/BoolCheckbox';

const DeletionLockType = ({
  showMetadataType,
  isNew,
  entityId,
  entityType,
}) => (
  <>
    {!isNew && (
      <>
        <Field
          name="id"
          component={TextField}
          fullWidth
          disabled
        />
        <Field
          name="user"
          component={TextField}
          fullWidth
          disabled
        />
      </>
    )}
    <Field
      name="expiryTime"
      component={TextField}
      fullWidth
    />
    {!isNew && (
      <Field
        name="modified"
        component={TextField}
        fullWidth
        disabled
      />
    )}
    {!entityType && (
      <FormControl fullWidth>
        <InputLabel htmlFor="entityType">Entity Type</InputLabel>
        <Field name="entityType" component={Select} required={isNew} disabled={!isNew}>
          <MenuItem value="item">Item</MenuItem>
          <MenuItem value="collection">Collection</MenuItem>
          <MenuItem value="file">File</MenuItem>
        </Field>
      </FormControl>
    )}
    {!entityId && (
      <Field
        name="entityId"
        component={TextField}
        fullWidth
        required={isNew}
        disabled={!isNew}
      />
    )}
    {!isNew && (
      <>
        <FormControlLabel
          control={(
            <Field
              name="isEffective"
              component={BoolCheckbox}
              disabled
            />
        )}
          label="Effective"
        />
        <FormControlLabel
          control={(
            <Field
              name="isInherited"
              component={BoolCheckbox}
              disabled
            />
        )}
          label="Inherited"
        />
        <FormControlLabel
          control={(
            <Field
              name="isExpired"
              component={BoolCheckbox}
              disabled
            />
        )}
          label="Expired"
        />
      </>
    )}
    { showMetadataType && (
      <FormSection
        name="metadata"
        component={SimpleMetadataType}
      />
    )}
  </>
);

function DeletionLockForm({
  error,
  handleSubmit,
  showMetadataType,
  isNew,
  entityId,
  entityType,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection
        name="deletionLockDocument"
        component={DeletionLockType}
        entityId={entityId}
        entityType={entityType}
        showMetadataType={showMetadataType}
        isNew={isNew}
      />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(DeletionLockForm);
