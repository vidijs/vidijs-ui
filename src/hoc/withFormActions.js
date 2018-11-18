import { connect } from 'react-redux';
import {
  submit,
  reset,
  change,
  destroy,
} from 'redux-form';


const mapDispatchToProps = {
  submitForm: submit,
  resetForm: reset,
  changeForm: change,
  destroyForm: destroy,
};


const withFormActions = WrappedComponent => connect(
  null,
  mapDispatchToProps,
)(WrappedComponent);

export default withFormActions;
