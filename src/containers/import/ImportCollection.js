import React from 'react';

import ImportCollectionWizard, { EDIT_COLLECTION_FORM } from '../../components/import/ImportCollectionWizard';
import withFormActions from '../../hoc/withFormActions';

class ImportCollection extends React.PureComponent {
  componentDidMount() {
    document.title = 'vidi.js | Import | Collection';
  }

  componentWillUnmount() {
    const { destroyForm } = this.props;
    destroyForm(EDIT_COLLECTION_FORM);
  }

  render() {
    const { history } = this.props;
    return (
      <ImportCollectionWizard
        onSuccess={response => history.push(`/collection/${response.data.id}`)}
      />
    );
  }
}

export default withFormActions(ImportCollection);
