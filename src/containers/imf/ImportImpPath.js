import React from 'react';

import ImportImpPathWizard, { EDIT_IMPORTIMPPATH_FORM } from '../../components/imf/ImportImpPathWizard';
import withFormActions from '../../hoc/withFormActions';

class ImportImpPath extends React.PureComponent {
  componentDidMount() {
    document.title = 'xray | IMF | Import Path';
  }

  componentWillUnmount() {
    const { destroyForm } = this.props;
    destroyForm(EDIT_IMPORTIMPPATH_FORM);
  }

  render() {
    const { history } = this.props;
    return (
      <ImportImpPathWizard
        onSuccess={(response) => history.push(`/job/${response.data.jobId}`)}
      />
    );
  }
}

export default withFormActions(ImportImpPath);
