import React from 'react';

import ImportShapeEssenceWizard, { EDIT_IMPORTSHAPEESSENCE_FORM } from '../../components/import/ImportShapeEssenceWizard';
import withFormActions from '../../hoc/withFormActions';

class ImportShapeEssence extends React.PureComponent {
  componentDidMount() {
    document.title = 'vidi.js | Import | Essence';
  }

  componentWillUnmount() {
    const { destroyForm } = this.props;
    destroyForm(EDIT_IMPORTSHAPEESSENCE_FORM);
  }

  render() {
    const { history } = this.props;
    return (
      <ImportShapeEssenceWizard
        onSuccess={response => history.push(`/job/${response.data.jobId}`)}
      />
    );
  }
}


export default withFormActions(ImportShapeEssence);
