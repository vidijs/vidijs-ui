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

function TestForm({
  classes,
  error,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <Field
        name="javascriptDocument"
        label="Javascript Input"
        component={CodeField}
        options={{
          theme: 'material',
          mode: 'application/javascript',
          lineWrapping: true,
          lineNumbers: true,
        }}
        className={{ root: classes.scriptFieldRoot, input: classes.scriptFieldInput }}
      />
    </form>
  );
}

export default reduxForm()(withStyles(styles)(TestForm));
