import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

function ShapeTagPresetForm({
  handleSubmit,
  error,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <DialogContent>
        <DialogContentText>
          Add built-in shape-tag templates.
        </DialogContentText>
        <DialogContentText>
          These template tags have names that begin with double underscore
          and cannot be overwritten.
        </DialogContentText>
      </DialogContent>
      <button type="submit" hidden />
    </form>
  );
}

export const EDIT_SHAPETAG_PRESET_FORM = 'EDIT_SHAPETAG_PRESET';

export default reduxForm({
  form: EDIT_SHAPETAG_PRESET_FORM,
})(ShapeTagPresetForm);
