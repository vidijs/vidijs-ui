import React from 'react';

import { metadatadataset as api } from '@vidispine/vdt-api';
import MetadataDatasetListCard from '../components/metadatadataset/MetadataDatasetListCard';
import MetadataDatasetDialog from '../components/metadatadataset/MetadataDatasetDialog';
import MetadataDatasetListTitle from '../components/metadatadataset/MetadataDatasetListTitle';

import withSnackbar from '../hoc/withSnackbar';

const METADATADATASETLIST_CREATE_MODAL = 'METADATADATASETLIST_CREATE_MODAL';

class MetadataDatasetList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.state = {
      metadataDatasetListDocument: undefined,
    };
  }

  componentDidMount() {
    this.onRefresh();
    document.title = 'xray | Metadata Dataset';
  }

  onRefresh() {
    const { openSnackBar } = this.props;
    try {
      api.listMetadataDataset()
        .then((response) => this.setState({ metadataDatasetListDocument: response.data }));
    } catch (error) {
      const messageContent = 'Error Loading Metadata Dataset List';
      openSnackBar({ messageContent, messageColor: 'secondary' });
    }
  }

  render() {
    const { metadataDatasetListDocument } = this.state;
    return (
      <>
        <MetadataDatasetListTitle
          createModal={METADATADATASETLIST_CREATE_MODAL}
          onRefresh={this.onRefresh}
          code={metadataDatasetListDocument}
          codeModal="MetadataDatasetListDocument"
        />
        {metadataDatasetListDocument
        && (
          <MetadataDatasetListCard
            metadataDatasetListDocument={metadataDatasetListDocument}
            onRefresh={this.onRefresh}
          />
        )}
        <MetadataDatasetDialog
          dialogName={METADATADATASETLIST_CREATE_MODAL}
        />
      </>
    );
  }
}

export default withSnackbar(MetadataDatasetList);
