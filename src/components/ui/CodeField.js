import React from 'react';
import CodeMirror from 'react-codemirror';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/xml/xml';

const CodeField = (p) => {
  const className = p.className || {};
  return (
    <div className={className.root}>
      {p.label && (
      <InputLabel
        error={Boolean(p.error || p.warning)}
        className={className.label}
      >
        {p.label}
      </InputLabel>
      )}
      <CodeMirror
        options={{ theme: 'material', ...p.options }}
        className={className.input}
        ref={p.cmRef}
        {...p.input}
      />
      {Boolean(p.meta.touched && p.meta.error) && (
        <FormHelperText error className={className.helper}>
          {p.meta.error}
        </FormHelperText>
      )}
    </div>
  );
};

export default CodeField;
