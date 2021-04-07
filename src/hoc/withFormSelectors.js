import { connect } from 'react-redux';
import {
  isDirty,
  isSubmitting,
  getFormValues,
  formValueSelector,
} from 'redux-form';

const mapStateToProps = (form) => (state) => ({
  formValues: getFormValues(form)(state),
  isFormDirty: isDirty(form)(state),
  isFormSubmitting: isSubmitting(form)(state),
  valueSelector: (field) => formValueSelector(form)(state, field),
});

const withFormSelectors = (
  WrappedComponent,
  form,
) => connect(mapStateToProps(form))(WrappedComponent);

export default withFormSelectors;
