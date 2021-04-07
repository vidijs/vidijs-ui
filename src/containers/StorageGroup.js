import React from 'react';
import { connect } from 'react-redux';

import { storagegroup as api } from '@vidijs/vidijs-api';
import StorageGroupTitle from '../components/storagegroup/StorageGroupTitle';
import StorageGroupCard from '../components/storagegroup/StorageGroupCard';
import StorageGroupRemove from '../components/storagegroup/StorageGroupRemove';
import StorageGroupStorageDialog from '../components/storagegroup/StorageGroupStorageDialog';
import CodeModal from '../components/ui/CodeModal';

import * as actions from '../actions';

const STORAGEGROUP_CODE_MODAL = 'STORAGEGROUP_CODE_MODAL';
const STORAGEGROUP_REMOVE_MODAL = 'STORAGEGROUP_REMOVE_MODAL';
const STORAGEGROUP_STORAGE_ADD_MODAL = 'STORAGEGROUP_STORAGE_ADD_MODAL';

class StorageGroup extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.state = {
      storageGroupDocument: undefined,
    };
  }

  componentDidMount() {
    const { groupName } = this.props;
    document.title = `vidi.js | Storage Group | ${groupName}`;
    this.onRefresh();
  }

  onRefresh() {
    const { openSnackBar, groupName } = this.props;
    try {
      api.getStorageGroup({ groupName })
        .then((response) => this.setState({ storageGroupDocument: response.data }));
    } catch (error) {
      const messageContent = 'Error Loading Storage Group';
      openSnackBar({ messageContent, messageColor: 'secondary' });
    }
  }

  render() {
    const {
      groupName,
      modalName,
      closeModal,
      openModal,
      openSnackBar,
      history,
    } = this.props;
    const {
      storageGroupDocument,
    } = this.state;
    return (
      <>
        <StorageGroupTitle
          openCode={() => openModal({ modalName: STORAGEGROUP_CODE_MODAL })}
          openRemove={() => openModal({ modalName: STORAGEGROUP_REMOVE_MODAL })}
          openAddStorage={() => openModal({ modalName: STORAGEGROUP_STORAGE_ADD_MODAL })}
          onRefresh={this.onRefresh}
          groupName={groupName}
        />
        {storageGroupDocument
        && (
        <StorageGroupCard
          onRefresh={this.onRefresh}
          groupName={groupName}
          storageGroupDocument={storageGroupDocument}
        />
        )}
        <CodeModal
          isOpen={(modalName === STORAGEGROUP_CODE_MODAL)}
          toggleDialogue={closeModal}
          code={storageGroupDocument}
          title="StorageGroupDocument"
        />
        <StorageGroupRemove
          isOpen={(modalName === STORAGEGROUP_REMOVE_MODAL)}
          groupName={groupName}
          openSnackBar={openSnackBar}
          closeModal={closeModal}
          history={history}
        />
        <StorageGroupStorageDialog
          isOpen={(modalName === STORAGEGROUP_STORAGE_ADD_MODAL)}
          closeModal={closeModal}
          groupName={groupName}
          onRefresh={this.onRefresh}
        />
      </>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { groupName } = ownProps.match.params;
  const { ui: { modalName } } = state;
  return {
    modalName,
    groupName,
  };
}

const mapDispatchToProps = {
  openSnackBar: actions.ui.openSnackBar,
  closeModal: actions.ui.closeModal,
  openModal: actions.ui.openModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(StorageGroup);
