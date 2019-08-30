import React from 'react';
import CM from 'react-codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/xml/xml';

export default class CodeMirror extends React.Component {
  constructor(props) {
    super(props);
    this.cmRef = this.cmRef.bind(this);
  }

  cmRef(el) {
    this.jsonRef = el;
  }

  render() {
    if (this.jsonRef) { this.jsonRef.codeMirror.setValue(this.props.value); }
    return (
      <React.Fragment>
        <CM
          ref={this.cmRef}
          {...this.props}
        />
      </React.Fragment>
    );
  }
}
