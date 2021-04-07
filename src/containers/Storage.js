import React from 'react';
import { connect } from 'react-redux';

import { storage as api } from '@vidispine/vdt-api';
import StorageTitle from '../components/storage/StorageTitle';
import StorageCard from '../components/storage/StorageCard';
import StorageRemove from '../components/storage/StorageRemove';
import StorageMethodDialog from '../components/storage/StorageMethodDialog';
import StorageType from '../components/storage/StorageType';
import StorageEvacuate from '../components/storage/StorageEvacuate';
import StorageEvacuateCancel from '../components/storage/StorageEvacuateCancel';

import * as actions from '../actions';

const STORAGE_REMOVE_MODAL = 'STORAGE_REMOVE_MODAL';
const STORAGEMETHOD_CREATE_MODAL = 'STORAGEMETHOD_CREATE_MODAL';
const STORAGE_TYPE_DIALOG = 'STORAGE_TYPE_DIALOG';
const STORAGE_EVACUATE_DIALOG = 'STORAGE_EVACUATE_DIALOG';
const STORAGE_EVACUATE_CANCEL_DIALOG = 'STORAGE_EVACUATE_CANCEL_DIALOG';

class Storage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.onFetch = this.onFetch.bind(this);
    this.onRescan = this.onRescan.bind(this);
    this.onRescanError = this.onRescanError.bind(this);
    this.state = {
      storageDocument: undefined,
    };
  }

  componentDidMount() {
    const { storageId } = this.props;
    document.title = `vidi.js | Storage | ${storageId}`;
    this.onRefresh();
  }

  onRefresh() {
    const { storageId } = this.props;
    this.onFetch(storageId);
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading Storage';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  onFetch(storageId) {
    try {
      api.getStorage({ storageId })
        .then((response) => this.setState({ storageDocument: response.data }))
        .catch((error) => this.onRefreshError(error));
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  onRescan() {
    const { storageId, openSnackBar } = this.props;
    try {
      api.rescanStorage({ storageId })
        .then(() => {
          const messageContent = 'Rescan Started';
          openSnackBar({ messageContent });
          this.onRefresh();
        })
        .catch((error) => this.onRescanError(error));
    } catch (error) {
      this.onRescanError(error);
    }
  }

  onRescanError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Rescanning Storage';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  render() {
    const {
      storageId,
      modalName,
      closeModal,
      openModal,
      openSnackBar,
      history,
    } = this.props;
    const {
      storageDocument,
    } = this.state;
    return (
      <>
        <StorageTitle
          removeModal={STORAGE_REMOVE_MODAL}
          typeModal={STORAGE_TYPE_DIALOG}
          evacuateModal={STORAGE_EVACUATE_DIALOG}
          evacuateCancelModal={STORAGE_EVACUATE_CANCEL_DIALOG}
          onRefresh={this.onRefresh}
          storageId={storageId}
          code={storageDocument}
          codeModal="StorageDocument"
          onRescan={this.onRescan}
        />
        {storageDocument && (
        <StorageCard
          onRefresh={this.onRefresh}
          storageId={storageId}
          storageDocument={storageDocument}
          openMethodCreate={() => openModal({ modalName: STORAGEMETHOD_CREATE_MODAL })}
        />
        )}
        <StorageRemove
          isOpen={(modalName === STORAGE_REMOVE_MODAL)}
          storageId={storageId}
          openSnackBar={openSnackBar}
          closeModal={closeModal}
          history={history}
        />
        <StorageMethodDialog
          isOpen={(modalName === STORAGEMETHOD_CREATE_MODAL)}
          onRefresh={this.onRefresh}
          storageId={storageId}
          closeModal={closeModal}
        />
        <StorageType
          dialogName={STORAGE_TYPE_DIALOG}
          storageDocument={storageDocument}
          onSuccess={this.onRefresh}
        />
        <StorageEvacuate
          dialogName={STORAGE_EVACUATE_DIALOG}
          storageDocument={storageDocument}
          onSuccess={this.onRefresh}
        />
        <StorageEvacuateCancel
          dialogName={STORAGE_EVACUATE_CANCEL_DIALOG}
          storageDocument={storageDocument}
          onSuccess={this.onRefresh}
        />
      </>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { storageId } = ownProps.match.params;
  const { ui: { modalName } } = state;
  return {
    modalName,
    storageId,
  };
}

const mapDispatchToProps = {
  openSnackBar: actions.ui.openSnackBar,
  closeModal: actions.ui.closeModal,
  openModal: actions.ui.openModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(Storage);
