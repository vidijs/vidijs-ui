import React from 'react';
import withFormActions from '../../hoc/withFormActions';
import ImportUriWizard, { EDIT_IMPORTURI_FORM } from '../../components/import/ImportUriWizard';

class ImportUri extends React.PureComponent {
  componentDidMount() {
    document.title = 'xray | Import | URI';
  }

  componentWillUnmount() {
    const { destroyForm } = this.props;
    destroyForm(EDIT_IMPORTURI_FORM);
  }

  render() {
    const { history, ...props } = this.props;
    return (
      <ImportUriWizard
        onSuccess={(response) => history.push(`/job/${response.data.jobId}`)}
        {...props}
      />
    );
  }
}

export default withFormActions(ImportUri);
