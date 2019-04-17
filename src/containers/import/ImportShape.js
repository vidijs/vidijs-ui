import React from 'react';
import withFormActions from '../../hoc/withFormActions';
import ImportShapeWizard, { EDIT_IMPORTSHAPE_FORM } from '../../components/import/ImportShapeWizard';

class ImportShape extends React.PureComponent {
  componentDidMount() {
    document.title = 'vidi.js | Import | Shape';
  }

  componentWillUnmount() {
    const { destroyForm } = this.props;
    destroyForm(EDIT_IMPORTSHAPE_FORM);
  }

  render() {
    const { history, ...props } = this.props;
    return (
      <ImportShapeWizard
        onSuccess={response => history.push(`/job/${response.data.jobId}`)}
        {...props}
      />
    );
  }
}


export default withFormActions(ImportShape);
