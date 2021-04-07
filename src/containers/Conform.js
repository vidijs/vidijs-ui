import React from 'react';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';

import CodeModal from '../components/ui/CodeModal';
import TitleHeader from '../components/ui/TitleHeader';
import ConformCreate, { EDIT_CONFORM_FORM } from '../components/conform/ConformCreate';
import * as actions from '../actions';

const CONFORM_CODE_MODAL = 'CONFORM_CODE_MODAL';

class Conform extends React.PureComponent {
  render() {
    const {
      modalName,
      closeModal,
      openModal,
      conformRequestDocument = {},
      history,
    } = this.props;
    return (
      <>
        <TitleHeader
          openCode={() => openModal({ modalName: CONFORM_CODE_MODAL })}
          title="Conform"
        />
        <ConformCreate history={history} />
        <CodeModal
          isOpen={(modalName === CONFORM_CODE_MODAL)}
          toggleDialogue={closeModal}
          code={conformRequestDocument}
          title="ConformRequestDocument"
        />
      </>
    );
  }
}

function mapStateToProps(state) {
  const { ui: { modalName } } = state;
  return {
    modalName,
    conformRequestDocument: getFormValues(EDIT_CONFORM_FORM)(state),

  };
}

const mapDispatchToProps = {
  openSnackBar: actions.ui.openSnackBar,
  closeModal: actions.ui.closeModal,
  openModal: actions.ui.openModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(Conform);
