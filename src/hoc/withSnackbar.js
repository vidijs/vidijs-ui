import { compose } from 'redux';
import { connect } from 'react-redux';

import { withRouterProps } from './withRouterProps';
import * as actions from '../actions';

const mapDispatchToProps = {
  openSnackBar: actions.ui.openSnackBar,
};

export const withSnackbarNoRouter = WrappedComponent => connect(
  null,
  mapDispatchToProps,
)(WrappedComponent);

export default compose(withSnackbarNoRouter, withRouterProps);
