import React from 'react';
import { connect } from 'react-redux';
import { access as api } from '@vidijs/vidijs-api';

import AccessControlList from '../components/access/AccessControlList';
import AccessControlRemove from '../components/access/AccessControlRemove';
import AccessControlDialog from '../components/access/AccessControlDialog';

import * as actions from '../actions';

const ACCESSCONTROL_REMOVE_MODAL = 'ACCESSCONTROL_REMOVE_MODAL';
const ACCESSCONTROL_CREATE_MODAL = 'ACCESSCONTROL_CREATE_MODAL';

class AccessControl extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.openRemove = this.openRemove.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.state = {
      accessControlListDocument: undefined,
    };
  }

  componentDidMount() {
    this.onRefresh();
  }

  onRefresh() {
    const { openSnackBar, entityId, entityType } = this.props;
    try {
      api.listEntityAccess({
        entityType,
        entityId,
      })
        .then(response => response.json())
        .then(accessControlListDocument => this.setState({ accessControlListDocument }));
    } catch (error) {
      const messageContent = 'Error Loading Access List';
      openSnackBar({ messageContent, messageColor: 'secondary' });
    }
  }

  onRemove(accessId) {
    const {
      openSnackBar,
      closeModal,
      entityType,
      entityId,
    } = this.props;
    return () => {
      api.removeEntityAccess({ accessId, entityId, entityType })
        .then(() => {
          const messageContent = `Access Control "${accessId}" Removed`;
          openSnackBar({ messageContent });
          closeModal();
          this.onRefresh();
        })
        .catch(() => {
          const messageContent = 'Error Removing Access Control';
          openSnackBar({ messageContent, messageColor: 'secondary' });
        });
    };
  }

  openRemove(currentAccessId) {
    const { openModal } = this.props;
    return () => {
      const onOpen = () => openModal({ modalName: ACCESSCONTROL_REMOVE_MODAL });
      this.setState({ currentAccessId }, onOpen);
    };
  }


  render() {
    const {
      accessControlListDocument,
      currentAccessId,
    } = this.state;
    const {
      entityType,
      entityId,
      closeModal,
      modalName,
      openModal,
      titleComponent: TitleComponent,
      tabComponent: TabComponent,
    } = this.props;
    return (
      <React.Fragment>
        {TitleComponent && (
          <TitleComponent
            onRefresh={this.onRefresh}
            codeModal="AccessControlListDocument"
            code={accessControlListDocument}
            createModal={ACCESSCONTROL_CREATE_MODAL}
          />
        )}
        {TabComponent && (
          <TabComponent />
        )}
        <AccessControlList
          accessControlListDocument={accessControlListDocument}
          openCreate={
            TitleComponent ? undefined : () => openModal({ modalName: ACCESSCONTROL_CREATE_MODAL })
          }
          entityType={entityType}
          entityId={entityId}
          onRefresh={this.onRefresh}
          openRemove={this.openRemove}
        />
        { currentAccessId && (
          <AccessControlRemove
            isOpen={(modalName === ACCESSCONTROL_REMOVE_MODAL)}
            closeModal={closeModal}
            onRemove={this.onRemove}
            accessId={currentAccessId}
          />
        )}
        <AccessControlDialog
          isOpen={(modalName === ACCESSCONTROL_CREATE_MODAL)}
          closeModal={closeModal}
          entityType={entityType}
          entityId={entityId}
          onRefresh={this.onRefresh}
        />
      </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(AccessControl);
