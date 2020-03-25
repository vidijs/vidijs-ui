import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import ReactCodeMirror from 'react-codemirror';
import CodeMirrorInstance from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/xml/xml';

import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/xml-fold';
import 'codemirror/addon/fold/indent-fold';
import 'codemirror/addon/fold/comment-fold';
import 'codemirror/addon/fold/foldgutter.css';


import 'codemirror/theme/material.css';
import 'codemirror/lib/codemirror.css';
import '../../css/CodeMirror.css';


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
      <ReactCodeMirror
        codeMirrorInstance={CodeMirrorInstance}
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
