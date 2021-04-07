import React from 'react';
import { connect } from 'react-redux';

import { shapetag as api } from '@vidispine/vdt-api';
import ShapeTagListTitle from '../components/shapetag/ShapeTagListTitle';
import ShapeTagListCard from '../components/shapetag/ShapeTagListCard';
import ShapeTagDialog from '../components/shapetag/ShapeTagDialog';
import CodeModal from '../components/ui/CodeModal';

import * as actions from '../actions';

const SHAPETAG_LIST_CODE_MODAL = 'SHAPETAG_LIST_CODE_MODAL';
const SHAPETAG_CREATE_MODAL = 'SHAPETAG_CREATE_MODAL';

class ShapeTagList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.state = {
      uriListDocument: undefined,
    };
  }

  componentDidMount() {
    document.title = 'vidi.js | Shape Tag';
    this.onRefresh();
  }

  onRefresh() {
    const { openSnackBar } = this.props;
    try {
      api.listShapeTag()
        .then((response) => this.setState({ uriListDocument: response.data }));
    } catch (error) {
      const messageContent = 'Error Loading Shape Tag List';
      openSnackBar({ messageContent, messageColor: 'secondary' });
    }
  }

  render() {
    const {
      modalName,
      closeModal,
      openModal,
      history,
    } = this.props;
    const {
      uriListDocument,
    } = this.state;
    return (
      <>
        <ShapeTagListTitle
          openCode={() => openModal({ modalName: SHAPETAG_LIST_CODE_MODAL })}
          openCreate={() => openModal({ modalName: SHAPETAG_CREATE_MODAL })}
          onRefresh={this.onRefresh}
        />
        { uriListDocument
        && (
        <ShapeTagListCard
          uriListDocument={uriListDocument}
        />
        )}
        <CodeModal
          isOpen={(modalName === SHAPETAG_LIST_CODE_MODAL)}
          toggleDialogue={closeModal}
          code={uriListDocument}
          title="URIListDocument"
        />
        <ShapeTagDialog
          isOpen={(modalName === SHAPETAG_CREATE_MODAL)}
          closeModal={closeModal}
          history={history}
        />
      </>
    );
  }
}

function mapStateToProps(state) {
  const { ui: { modalName } } = state;
  return {
    modalName,
  };
}

const mapDispatchToProps = {
  openSnackBar: actions.ui.openSnackBar,
  closeModal: actions.ui.closeModal,
  openModal: actions.ui.openModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShapeTagList);
