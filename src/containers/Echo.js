import React from 'react';
import { connect } from 'react-redux';
import { submit, SubmissionError } from 'redux-form';

import { debug as api } from '@vidispine/vdt-api';
import EchoCard from '../components/debug/EchoCard';
import { openSnackBar } from '../actions/ui';

class Echo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    document.title = 'vidi.js | XML Echo';
  }

  onSubmit(form) {
    const { xmlDocument } = form;
    const { dispatch } = this.props;
    return api.echo({ xmlDocument })
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .then((jsonDocument) => {
        const jsonString = JSON.stringify(jsonDocument, null, 2);
        this.jsonRef.codeMirror.setValue(jsonString);
      })
      .catch((error) => {
        const messageContent = 'Error Bad Request';
        dispatch(openSnackBar({ messageContent, messageColor: 'secondary' }));
        throw new SubmissionError({ _error: `Error ${error.statusText}` });
      });
  }

  render() {
    const { dispatch } = this.props;
    return (
      <>
        <EchoCard
          onSubmit={this.onSubmit}
          submitForm={(p) => dispatch(submit(p))}
          cmRef={(el) => { this.jsonRef = el; }}
        />
      </>
    );
  }
}

export default connect()(Echo);
