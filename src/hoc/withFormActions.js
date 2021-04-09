import { connect } from 'react-redux';
import {
  submit,
  reset,
  change,
  destroy,
  initialize,
} from 'redux-form';

const mapDispatchToProps = {
  submitForm: submit,
  resetForm: reset,
  changeForm: change,
  destroyForm: destroy,
  initializeForm: initialize,
};

const withFormActions = (WrappedComponent) => connect(
  null,
  mapDispatchToProps,
)(WrappedComponent);

export default withFormActions;
