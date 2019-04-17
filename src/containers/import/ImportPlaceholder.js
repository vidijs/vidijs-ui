import React from 'react';
import withFormActions from '../../hoc/withFormActions';
import ImportPlaceholderWizard, { EDIT_IMPORTPLACEHOLDER_FORM } from '../../components/import/ImportPlaceholderWizard';

class ImportPlaceholder extends React.PureComponent {
  componentDidMount() {
    document.title = 'vidi.js | Import | Placeholder';
  }

  componentWillUnmount() {
    const { destroyForm } = this.props;
    destroyForm(EDIT_IMPORTPLACEHOLDER_FORM);
  }

  render() {
    const { history, ...props } = this.props;
    return (
      <ImportPlaceholderWizard
        onSuccess={response => history.push(`/item/${response.data.id}`)}
        {...props}
      />
    );
  }
}

export default withFormActions(ImportPlaceholder);
