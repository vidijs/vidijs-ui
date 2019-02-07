import React from 'react';

import ImportImpFileWizard, { EDIT_IMPORTIMPFILE_FORM } from '../../components/imf/ImportImpFileWizard';
import withFormActions from '../../hoc/withFormActions';

class ImportImpFile extends React.PureComponent {
  componentDidMount() {
    document.title = 'vidi.js | IMF | Import File';
  }

  componentWillUnmount() {
    const { destroyForm } = this.props;
    destroyForm(EDIT_IMPORTIMPFILE_FORM);
  }

  render() {
    const { history } = this.props;
    return (
      <ImportImpFileWizard
        onSuccess={response => history.push(`/job/${response.data.jobId}`)}
      />
    );
  }
}


export default withFormActions(ImportImpFile);
