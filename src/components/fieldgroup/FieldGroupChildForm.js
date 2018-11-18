import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { StatefulAsyncSelect } from '../ui/Select';
import Field from '../ui/Field';
import { loadFieldGroupOptions } from './FieldGroupSelect';


const FieldGroupChildForm = ({ error, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    {error && <Typography color="error">{error}</Typography>}
    <Field
      name="childGroupName"
      label="Field Group"
      component={StatefulAsyncSelect}
      loadOptions={loadFieldGroupOptions}
      cacheOptions
      isClearable
      required
      fullWidth
      disableInitial
    />
    <button type="submit" hidden />
  </form>
);

export default reduxForm()(FieldGroupChildForm);
