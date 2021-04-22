import React from 'react';
import { connect } from 'react-redux';

import { resource as api } from '@vidispine/vdt-api';
import ResourceTypeListTitle from '../components/resource/ResourceTypeListTitle';
import ResourceTypeListCard from '../components/resource/ResourceTypeListCard';
import CodeModal from '../components/ui/CodeModal';

import * as actions from '../actions';

const RESOURCETYPELIST_CODE_MODAL = 'RESOURCETYPELIST_CODE_MODAL';

class ResourceTypeList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.state = {
      resourceTypeListDocument: undefined,
    };
  }

  componentDidMount() {
    document.title = 'xray | Resource';
    this.onRefresh();
  }

  onRefresh() {
    const { openSnackBar } = this.props;
    try {
      api.listResource()
        .then((response) => this.setState({ resourceTypeListDocument: response.data }));
    } catch (error) {
      const messageContent = 'Error Loading Resource Types';
      openSnackBar({ messageContent, messageColor: 'secondary' });
    }
  }

  render() {
    const {
      modalName,
      closeModal,
      openModal,
    } = this.props;
    const {
      resourceTypeListDocument,
    } = this.state;
    return (
      <>
        <ResourceTypeListTitle
          openCode={() => openModal({ modalName: RESOURCETYPELIST_CODE_MODAL })}
          onRefresh={this.onRefresh}
        />
        { resourceTypeListDocument
        && (
        <ResourceTypeListCard
          resourceTypeListDocument={resourceTypeListDocument}
        />
        )}
        <CodeModal
          isOpen={(modalName === RESOURCETYPELIST_CODE_MODAL)}
          toggleDialogue={closeModal}
          code={resourceTypeListDocument}
          title="ResourceTypeListDocument"
        />
      </>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { resourceType } = ownProps.match.params;
  const { ui: { modalName } } = state;
  return {
    modalName,
    resourceType,
  };
}

const mapDispatchToProps = {
  openSnackBar: actions.ui.openSnackBar,
  closeModal: actions.ui.closeModal,
  openModal: actions.ui.openModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResourceTypeList);
