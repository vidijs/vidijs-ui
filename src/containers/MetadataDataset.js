import React from 'react';

import { metadatadataset as api } from '@vidispine/vdt-api';

import MetadataDatasetTitle from '../components/metadatadataset/MetadataDatasetTitle';
import MetadataDatasetCard from '../components/metadatadataset/MetadataDatasetCard';
import MetadataDatasetRemove from '../components/metadatadataset/MetadataDatasetRemove';
import withSnackbar from '../hoc/withSnackbar';

const METADATADATASET_REMOVE_MODAL = 'METADATADATASET_REMOVE_MODAL';

class MetadataDataset extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.state = {
      body: undefined,
    };
  }

  componentDidMount() {
    const { datasetId } = this.props;
    document.title = `xray | Metadata Dataset | ${datasetId}`;
    this.onRefresh();
  }

  onRefresh() {
    const { openSnackBar, datasetId } = this.props;
    try {
      api.getMetadataDataset({ datasetId, headers: { accept: 'application/ld+json' } })
        .then((response) => this.setState({ body: response.request.responseText }));
    } catch (error) {
      const messageContent = 'Error Getting Metadata Dataset';
      openSnackBar({ messageContent, messageColor: 'secondary' });
    }
  }

  render() {
    const { datasetId } = this.props;
    const { body } = this.state;
    return (
      <>
        <MetadataDatasetTitle
          removeModal={METADATADATASET_REMOVE_MODAL}
          onRefresh={this.onRefresh}
          datasetId={datasetId}
          code={body ? JSON.parse(body) : undefined}
          codeModal="body"
        />
        {body
        && (
          <MetadataDatasetCard
            body={body}
            datasetId={datasetId}
            onRefresh={this.onRefresh}
          />
        )}
        <MetadataDatasetRemove
          dialogName={METADATADATASET_REMOVE_MODAL}
          datasetId={datasetId}
        />
      </>
    );
  }
}

export default withSnackbar(MetadataDataset);
