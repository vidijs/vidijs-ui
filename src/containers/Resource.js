import React from 'react';
import { connect } from 'react-redux';
import startCase from 'lodash.startcase';

import { resource as api } from '@vidispine/vdt-api';
import ResourceTitle from '../components/resource/ResourceTitle';
import ResourceCard from '../components/resource/ResourceCard';
import ResourceRemove from '../components/resource/ResourceRemove';
import CodeModal from '../components/ui/CodeModal';

import * as actions from '../actions';

const RESOURCE_CODE_MODAL = 'RESOURCELIST_CODE_MODAL';
const RESOURCE_REMOVE_MODAL = 'RESOURCE_REMOVE_MODAL';

class Resource extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.state = {
      resourceDocument: undefined,
    };
  }

  componentDidMount() {
    const { resourceType, resourceId } = this.props;
    document.title = `vidi.js | Resource | ${startCase(resourceType)} | ${resourceId}`;
    this.onRefresh();
  }

  onRefresh() {
    const { openSnackBar, resourceType, resourceId } = this.props;
    try {
      api.getResource({ resourceType, resourceId })
        .then((response) => this.setState({ resourceDocument: response.data }));
    } catch (error) {
      const messageContent = 'Error Loading Resource';
      openSnackBar({ messageContent, messageColor: 'secondary' });
    }
  }

  render() {
    const {
      resourceType,
      resourceId,
      modalName,
      closeModal,
      openModal,
      openSnackBar,
      history,
    } = this.props;
    const {
      resourceDocument,
    } = this.state;
    return (
      <>
        <ResourceTitle
          openCode={() => openModal({ modalName: RESOURCE_CODE_MODAL })}
          openRemove={() => openModal({ modalName: RESOURCE_REMOVE_MODAL })}
          onRefresh={this.onRefresh}
          resourceType={resourceType}
          resourceId={resourceId}
        />
        {resourceDocument
        && (
        <ResourceCard
          onRefresh={this.onRefresh}
          resourceType={resourceType}
          resourceId={resourceId}
          resourceDocument={resourceDocument}
        />
        )}
        <CodeModal
          isOpen={(modalName === RESOURCE_CODE_MODAL)}
          toggleDialogue={closeModal}
          code={resourceDocument}
          title="ResourceDocument"
        />
        <ResourceRemove
          isOpen={(modalName === RESOURCE_REMOVE_MODAL)}
          resourceType={resourceType}
          resourceId={resourceId}
          openSnackBar={openSnackBar}
          closeModal={closeModal}
          history={history}
        />
      </>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { resourceType, resourceId } = ownProps.match.params;
  const { ui: { modalName } } = state;
  return {
    modalName,
    resourceType,
    resourceId,
  };
}

const mapDispatchToProps = {
  openSnackBar: actions.ui.openSnackBar,
  closeModal: actions.ui.closeModal,
  openModal: actions.ui.openModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(Resource);
