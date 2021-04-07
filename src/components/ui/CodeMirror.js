import React from 'react';
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

export default class CodeMirror extends React.Component {
  constructor(props) {
    super(props);
    this.cmRef = this.cmRef.bind(this);
  }

  cmRef(el) {
    this.jsonRef = el;
  }

  render() {
    const { value } = this.props;
    if (this.jsonRef) { this.jsonRef.codeMirror.setValue(value); }
    return (
      <>
        <ReactCodeMirror
          codeMirrorInstance={CodeMirrorInstance}
          ref={this.cmRef}
          {...this.props}
        />
      </>
    );
  }
}
