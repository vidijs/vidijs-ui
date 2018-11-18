import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { reduxForm, Field } from 'redux-form';

import CodeField from '../ui/CodeField';

const styles = {
  scriptFieldRoot: {
    height: 300,
    marginBottom: 50,
  },
  scriptFieldInput: {
    height: 300,
  },
};

function EchoForm({
  classes,
  error,
  handleSubmit,
  cmRef,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <Field
        name="xmlDocument"
        label="XML Input"
        component={CodeField}
        options={{
          theme: 'material',
          mode: 'application/xml',
          lineWrapping: true,
          lineNumbers: true,
        }}
        className={{ root: classes.scriptFieldRoot, input: classes.scriptFieldInput }}
      />
      <Field
        name="jsonDocument"
        label="JSON Output"
        component={CodeField}
        options={{
          theme: 'material',
          mode: 'application/json',
          readOnly: true,
          lineWrapping: true,
        }}
        cmRef={cmRef}
      />
    </form>
  );
}


export default reduxForm()(withStyles(styles)(EchoForm));
