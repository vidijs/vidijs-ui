import React from 'react';

import FieldGroupListCard from '../components/fieldgroup/FieldGroupListCard';
import FieldGroupDialog from '../components/fieldgroup/FieldGroupDialog';
import FieldGroupListTitle from '../components/fieldgroup/FieldGroupListTitle';

import withSnackbar from '../hoc/withSnackbar';
import { fieldgroup as api } from '@vidijs/vidijs-api';

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
    document.title = 'vidi.js | Field Group';
  }

  onRefresh() {
    const { openSnackBar } = this.props;
    try {
      api.listFieldGroup()
        .then(response => this.setState({ metadataFieldGroupListDocument: response.data }));
    } catch (error) {
      const messageContent = 'Error Loading Field Group List';
      openSnackBar({ messageContent, messageColor: 'secondary' });
    }
  }


  render() {
    const { metadataFieldGroupListDocument } = this.state;
    return (
      <React.Fragment>
        <FieldGroupListTitle
          createModal={FIELDGROUPLIST_CREATE_MODAL}
          onRefresh={this.onRefresh}
          code={metadataFieldGroupListDocument}
          codeModal="FieldGroupListDocument"
        />
        {metadataFieldGroupListDocument &&
        <FieldGroupListCard
          metadataFieldGroupListDocument={metadataFieldGroupListDocument}
          onRefresh={this.onRefresh}
        />
        }
        <FieldGroupDialog
          dialogName={FIELDGROUPLIST_CREATE_MODAL}
        />
      </React.Fragment>
    );
  }
}

export default withSnackbar(FieldGroupList);
