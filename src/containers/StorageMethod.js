import React from 'react';
import { connect } from 'react-redux';

import StorageMethodTitle from '../components/storage/StorageMethodTitle';
import StorageMethodCard from '../components/storage/StorageMethodCard';
import StorageMethodRemove from '../components/storage/StorageMethodRemove';
import CodeModal from '../components/ui/CodeModal';

import * as actions from '../actions';
import { storage as api } from '@vidijs/vidijs-api';

const STORAGEMETHOD_CODE_MODAL = 'STORAGEMETHOD_CODE_MODAL';
const STORAGEMETHOD_REMOVE_MODAL = 'STORAGEMETHOD_REMOVE_MODAL';

class StorageMethod extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.state = {
      storageMethodDocument: undefined,
    };
  }

  componentDidMount() {
    const { storageId, storageMethodId } = this.props;
    document.title = `vidi.js | Storage | ${storageId} | Method | ${storageMethodId}`;
    this.onRefresh();
  }

  onRefresh() {
    const { openSnackBar, storageId, storageMethodId } = this.props;
    try {
      api.getStorageMethod({ storageId, storageMethodId })
        .then(response => this.setState({ storageMethodDocument: response.data }));
    } catch (error) {
      const messageContent = 'Error Loading Storage Method';
      openSnackBar({ messageContent, messageColor: 'secondary' });
    }
  }

  render() {
    const {
      storageId,
      storageMethodId,
      modalName,
      closeModal,
      openModal,
      openSnackBar,
      history,
    } = this.props;
    const {
      storageMethodDocument,
    } = this.state;
    return (
      <React.Fragment>
        <StorageMethodTitle
          openCode={() => openModal({ modalName: STORAGEMETHOD_CODE_MODAL })}
          openRemove={() => openModal({ modalName: STORAGEMETHOD_REMOVE_MODAL })}
          onRefresh={this.onRefresh}
          storageId={storageId}
          storageMethodId={storageMethodId}
        />
        {storageMethodDocument &&
        <StorageMethodCard
          onRefresh={this.onRefresh}
          storageMethodDocument={storageMethodDocument}
          storageId={storageId}
          storageMethodId={storageMethodId}
        />
        }
        <CodeModal
          isOpen={(modalName === STORAGEMETHOD_CODE_MODAL)}
          toggleDialogue={closeModal}
          code={storageMethodDocument}
          title="StorageMethodDocument"
        />
        <StorageMethodRemove
          isOpen={(modalName === STORAGEMETHOD_REMOVE_MODAL)}
          storageId={storageId}
          storageMethodId={storageMethodId}
          openSnackBar={openSnackBar}
          closeModal={closeModal}
          history={history}
        />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { storageId, storageMethodId } = ownProps.match.params;
  const { ui: { modalName } } = state;
  return {
    modalName,
    storageId,
    storageMethodId,
  };
}

const mapDispatchToProps = {
  openSnackBar: actions.ui.openSnackBar,
  closeModal: actions.ui.closeModal,
  openModal: actions.ui.openModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(StorageMethod);
