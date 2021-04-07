import React from 'react';
import { connect } from 'react-redux';

import { access as api } from '@vidijs/vidijs-api';
import ImportAccessTitle from '../components/importaccess/ImportAccessTitle';
import ImportAccessCard from '../components/importaccess/ImportAccessCard';
import ImportAccessRemove from '../components/importaccess/ImportAccessRemove';
import ImportAccessDialog from '../components/importaccess/ImportAccessDialog';
import CodeModal from '../components/ui/CodeModal';

import * as actions from '../actions';

const IMPORTACCESS_CODE_MODAL = 'IMPORTACCESS_CODE_MODAL';
const IMPORTACCESS_REMOVE_MODAL = 'IMPORTACCESS_REMOVE_MODAL';
const IMPORTACCESS_EDIT_MODAL = 'IMPORTACCESS_EDIT_MODAL';

class ImportSettings extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.openRemove = this.openRemove.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.openEdit = this.openEdit.bind(this);
    this.state = {
      importAccessControlListDocument: undefined,
    };
  }

  componentDidMount() {
    const { userName } = this.props;
    document.title = `vidi.js | User | ${userName} | Import Access`;
    this.onRefresh();
  }

  onRefresh() {
    const { openSnackBar, userName } = this.props;
    const headers = { RunAs: userName };
    api.getImportAccess({ headers })
      .then((response) => response.json())
      .then((importAccessControlListDocument) => this.setState({ importAccessControlListDocument }))
      .catch(() => {
        const messageContent = 'Error Loading Import Settings';
        openSnackBar({ messageContent, messageColor: 'secondary' });
      });
  }

  onRemove(groupName) {
    const {
      openSnackBar,
      closeModal,
      userName,
    } = this.props;
    const headers = { RunAs: userName };
    return () => {
      api.removeImportAccessGroup({ groupName, headers })
        .then(() => {
          const messageContent = `Import Access "${groupName}" Removed`;
          openSnackBar({ messageContent });
          closeModal();
          this.onRefresh();
        })
        .catch(() => {
          const messageContent = 'Error Removing Import Access';
          openSnackBar({ messageContent, messageColor: 'secondary' });
        });
    };
  }

  openRemove(currentGroup) {
    const { openModal } = this.props;
    return () => {
      const onOpen = () => openModal({ modalName: IMPORTACCESS_REMOVE_MODAL });
      this.setState({ currentGroup }, onOpen);
    };
  }

  openEdit(currentGroup) {
    const { openModal } = this.props;
    return () => {
      const onOpen = () => openModal({ modalName: IMPORTACCESS_EDIT_MODAL });
      this.setState({ currentGroup }, onOpen);
    };
  }

  render() {
    const {
      modalName,
      closeModal,
      openModal,
      userName,
    } = this.props;
    const {
      importAccessControlListDocument,
      currentGroup,
    } = this.state;
    return (
      <>
        <ImportAccessTitle
          openCode={() => openModal({ modalName: IMPORTACCESS_CODE_MODAL })}
          openCreate={() => openModal({ modalName: IMPORTACCESS_EDIT_MODAL })}
          onRefresh={this.onRefresh}
          userName={userName}
        />
        {importAccessControlListDocument
          && (
          <ImportAccessCard
            importAccessControlListDocument={importAccessControlListDocument}
            openRemove={this.openRemove}
            openEdit={this.openEdit}
          />
          )}
        <CodeModal
          isOpen={(modalName === IMPORTACCESS_CODE_MODAL)}
          toggleDialogue={closeModal}
          code={importAccessControlListDocument}
          title="ImportAccessControlListDocument"
        />
        { currentGroup
          && (
          <ImportAccessRemove
            isOpen={(modalName === IMPORTACCESS_REMOVE_MODAL)}
            closeModal={closeModal}
            onRemove={this.onRemove}
            groupName={currentGroup.name}
          />
          )}
        <ImportAccessDialog
          isOpen={(modalName === IMPORTACCESS_EDIT_MODAL)}
          closeModal={closeModal}
          onRefresh={this.onRefresh}
          group={currentGroup}
          userName={userName}
        />
      </>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { ui: { modalName } } = state;
  const { userName } = ownProps.match.params;
  return {
    userName,
    modalName,
  };
}

const mapDispatchToProps = {
  openSnackBar: actions.ui.openSnackBar,
  closeModal: actions.ui.closeModal,
  openModal: actions.ui.openModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(ImportSettings);
