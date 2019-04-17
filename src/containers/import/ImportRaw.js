import React from 'react';
import withFormActions from '../../hoc/withFormActions';
import ImportRawWizard, { EDIT_IMPORTRAW_FORM } from '../../components/import/ImportRawWizard';

class ImportRaw extends React.PureComponent {
  componentDidMount() {
    document.title = 'vidi.js | Import | Upload';
  }

  componentWillUnmount() {
    const { destroyForm } = this.props;
    destroyForm(EDIT_IMPORTRAW_FORM);
  }

  render() {
    const { history, ...props } = this.props;
    return (
      <ImportRawWizard
        onSuccess={response => history.push(`/job/${response.data.jobId}`)}
        {...props}
      />
    );
  }
}

export default withFormActions(ImportRaw);
