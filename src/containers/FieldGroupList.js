import React from 'react';

import { fieldgroup as api } from '@vidispine/vdt-api';
import FieldGroupListCard from '../components/fieldgroup/FieldGroupListCard';
import FieldGroupDialog from '../components/fieldgroup/FieldGroupDialog';
import FieldGroupListTitle from '../components/fieldgroup/FieldGroupListTitle';

import withSnackbar from '../hoc/withSnackbar';

const FIELDGROUPLIST_CREATE_MODAL = 'FIELDGROUPLIST_CREATE_MODAL';

class FieldGroupList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.state = {
      metadataFieldGroupListDocument: undefined,
    };
  }

  componentDidMount() {
    this.onRefresh();
    document.title = 'xray | Field Group';
  }

  onRefresh() {
    const { openSnackBar } = this.props;
    try {
      api.listFieldGroup()
        .then((response) => this.setState({ metadataFieldGroupListDocument: response.data }));
    } catch (error) {
      const messageContent = 'Error Loading Field Group List';
      openSnackBar({ messageContent, messageColor: 'secondary' });
    }
  }

  render() {
    const { metadataFieldGroupListDocument } = this.state;
    return (
      <>
        <FieldGroupListTitle
          createModal={FIELDGROUPLIST_CREATE_MODAL}
          onRefresh={this.onRefresh}
          code={metadataFieldGroupListDocument}
          codeModal="FieldGroupListDocument"
        />
        {metadataFieldGroupListDocument
        && (
        <FieldGroupListCard
          metadataFieldGroupListDocument={metadataFieldGroupListDocument}
          onRefresh={this.onRefresh}
        />
        )}
        <FieldGroupDialog
          dialogName={FIELDGROUPLIST_CREATE_MODAL}
        />
      </>
    );
  }
}

export default withSnackbar(FieldGroupList);
