import React from 'react';

import ImportImpCard, { EDIT_IMPORTIMP_FORM } from '../../components/import/ImportImpWizard';
import withFormActions from '../../hoc/withFormActions';

class ImportImp extends React.PureComponent {
  componentDidMount() {
    document.title = 'vidi.js | Import | IMP';
  }

  componentWillUnmount() {
    const { destroyForm } = this.props;
    destroyForm(EDIT_IMPORTIMP_FORM);
  }

  render() {
    const { history } = this.props;
    return (
      <ImportImpCard
        onSuccess={response => history.push(`/job/${response.data.jobId}`)}
      />
    );
  }
}


export default withFormActions(ImportImp);
