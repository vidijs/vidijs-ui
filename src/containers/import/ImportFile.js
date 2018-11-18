import React from 'react';
import withFormActions from '../../hoc/withFormActions';
import ImportFileWizard, { EDIT_IMPORTFILE_FORM } from '../../components/import/ImportFileWizard';

class ImportFile extends React.PureComponent {
  componentDidMount() {
    document.title = 'vidi.js | Import | File';
  }

  componentWillUnmount() {
    const { destroyForm } = this.props;
    destroyForm(EDIT_IMPORTFILE_FORM);
  }

  render() {
    const { history, location } = this.props;
    const query = new URLSearchParams(location.search);
    const fileId = query.get('fileId');
    return (
      <ImportFileWizard
        onSuccess={response => history.push(`/job/${response.data.jobId}`)}
        initialValues={{ fileId }}
      />
    );
  }
}

export default withFormActions(ImportFile);
