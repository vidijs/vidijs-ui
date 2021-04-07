import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
// import { TextField, Select } from '../form';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { Select } from '../form';

import FormSection from '../ui/FormSection';
import Field from '../ui/Field';

const queryParams = () => (
  <FormControl fullWidth>
    <InputLabel htmlFor="state">State</InputLabel>
    <Field name="state" component={Select}>
      <MenuItem value="TRANSFERRING">Transferring</MenuItem>
      <MenuItem value="WAITING">Waiting</MenuItem>
      <MenuItem value="FINISHED">Finished</MenuItem>
      <MenuItem value="ABORTED">Aborted</MenuItem>
      <MenuItem value="FAILED">Failed</MenuItem>
      <MenuItem value="FINISHED_PART">Finished Part</MenuItem>
    </Field>
  </FormControl>
);

// const matrixParams = () => (
//   <React.Fragment>
//     <Field
//       name="first"
//       component={TextField}
//       type="number"
//       fullWidth
//     />
//     <Field
//       name="number"
//       component={TextField}
//       type="number"
//       fullWidth
//     />
//   </React.Fragment>
// );

function TransferFilterForm({
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
      {/* <FormSection
        name="matrixParams"
        component={matrixParams}
      /> */}
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(TransferFilterForm);
