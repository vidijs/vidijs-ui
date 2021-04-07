import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

const mapDispatchToProps = {
  onClose: actions.ui.closeModal,
  onOpen: actions.ui.openModal,
};

const withDialogProps = (WrappedComponent) => connect(
  null,
  mapDispatchToProps,
)(class extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onOpen = this.onOpen.bind(this);
    this.state = {
      dialogProps: undefined,
    };
  }

  onOpen(modalName) {
    const { onOpen } = this.props;
    return (dialogProps) => {
      this.setState({ dialogProps }, () => onOpen({ modalName }));
    };
  }

  render() {
    return (
      <WrappedComponent
        {...this.props}
        dialogProps={this.state.dialogProps}
        onOpen={this.onOpen}
      />
    );
  }
});

export default withDialogProps;
