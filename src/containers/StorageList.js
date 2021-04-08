import React from 'react';
import { connect } from 'react-redux';

import { storage as api } from '@vidispine/vdt-api';
import StorageListTitle from '../components/storage/StorageListTitle';
import StorageListCard from '../components/storage/StorageListCard';
import StorageDialog from '../components/storage/StorageDialog';
import CodeModal from '../components/ui/CodeModal';

import * as actions from '../actions';

const STORAGE_LIST_CODE_MODAL = 'STORAGE_LIST_CODE_MODAL';
const STORAGE_CREATE_MODAL = 'STORAGE_CREATE_MODAL';

class StorageList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.state = {
      storageListDocument: undefined,
    };
  }

  componentDidMount() {
    document.title = 'xray | Storage';
    this.onRefresh();
  }

  onRefresh() {
    const { openSnackBar } = this.props;
    try {
      api.listStorage()
        .then((response) => this.setState({ storageListDocument: response.data }));
    } catch (error) {
      const messageContent = 'Error Loading Storage List';
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
      storageListDocument,
    } = this.state;
    return (
      <>
        <StorageListTitle
          openCode={() => openModal({ modalName: STORAGE_LIST_CODE_MODAL })}
          openCreate={() => openModal({ modalName: STORAGE_CREATE_MODAL })}
          onRefresh={this.onRefresh}
        />
        { storageListDocument
        && (
        <StorageListCard
          storageListDocument={storageListDocument}
        />
        )}
        <CodeModal
          isOpen={(modalName === STORAGE_LIST_CODE_MODAL)}
          toggleDialogue={closeModal}
          code={storageListDocument}
          title="StorageListDocument"
        />
        <StorageDialog
          isOpen={(modalName === STORAGE_CREATE_MODAL)}
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

export default connect(mapStateToProps, mapDispatchToProps)(StorageList);
