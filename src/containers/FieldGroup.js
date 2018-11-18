import React from 'react';

import { fieldgroup as api } from '@vidijs/vidijs-api';

import FieldGroupTitle from '../components/fieldgroup/FieldGroupTitle';
import FieldGroupCard from '../components/fieldgroup/FieldGroupCard';
import FieldGroupRemove from '../components/fieldgroup/FieldGroupRemove';
import withSnackbar from '../hoc/withSnackbar';
import SimpleMetadataCard from '../components/ui/SimpleMetadataCard';

const FIELDGROUP_REMOVE_MODAL = 'FIELDGROUP_REMOVE_MODAL';

class FieldGroup extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onFetch = this.onFetch.bind(this);
    this.state = {
      simpleMetadataDocument: undefined,
      metadataFieldGroupDocument: undefined,
    };
  }

  componentDidMount() {
    const { groupName } = this.props;
    document.title = `vidi.js | Field Group | ${groupName}`;
    this.onRefresh();
  }


  componentWillReceiveProps({ groupName }) {
    const { groupName: prevGroupName } = this.props;
    if (prevGroupName !== groupName) {
      this.onFetch(groupName);
      document.title = `vidi.js | Field Group | ${groupName}`;
    }
  }

  onRefresh() {
    const { groupName } = this.props;
    this.onFetch(groupName);
  }

  onFetch(groupName) {
    const { openSnackBar } = this.props;
    try {
      api.getFieldGroup({ groupName })
        .then(response => this.setState({ metadataFieldGroupDocument: response.data }));
      api.getSimpleMetadata({ groupName })
        .then(response => this.setState({ simpleMetadataDocument: response.data }));
    } catch (error) {
      const messageContent = 'Error Getting Metadata Field';
      openSnackBar({ messageContent, messageColor: 'secondary' });
    }
  }

  render() {
    const {
      groupName,
    } = this.props;
    const { simpleMetadataDocument, metadataFieldGroupDocument } = this.state;
    return (
      <React.Fragment>
        <FieldGroupTitle
          removeModal={FIELDGROUP_REMOVE_MODAL}
          onRefresh={this.onRefresh}
          groupName={groupName}
          code={metadataFieldGroupDocument}
          codeModal="MetadataFieldGroupDocument"
        />
        {metadataFieldGroupDocument &&
        <FieldGroupCard
          metadataFieldGroupDocument={metadataFieldGroupDocument}
          groupName={groupName}
          onRefresh={this.onRefresh}
        />
        }
        {simpleMetadataDocument &&
        <SimpleMetadataCard
          simpleMetadataList={simpleMetadataDocument.field || []}
          onSuccess={this.onRefresh}
          entityType="metadata-field/field-group"
          entityId={groupName}
        />
        }
        <FieldGroupRemove
          dialogName={FIELDGROUP_REMOVE_MODAL}
          groupName={groupName}
        />
      </React.Fragment>
    );
  }
}

export default withSnackbar(FieldGroup);
