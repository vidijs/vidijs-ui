import { compose } from 'redux';
import { connect } from 'react-redux';

import { withRouterProps } from './withRouterProps';
import * as actions from '../actions';

function mapStateToProps(state, ownProps) {
  const { dialogName, isOpen } = ownProps;
  const { ui: { modalName: currentDialog } } = state;
  let open = (dialogName !== undefined) && (currentDialog === dialogName);
  if (isOpen !== undefined) { open = isOpen; } // To be deprecated
  return {
    open,
    currentDialog,
    modalName: currentDialog,
  };
}

const mapDispatchToProps = {
  onClose: actions.ui.closeModal,
  onOpen: actions.ui.openModal,
};


export const withModalNoRouter = WrappedComponent => connect(
  mapStateToProps,
  mapDispatchToProps,
)(WrappedComponent);

export default compose(withModalNoRouter, withRouterProps);
