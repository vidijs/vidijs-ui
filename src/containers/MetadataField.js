import React from 'react';

import { metadatafield as api } from '@vidispine/vdt-api';

import MetadataFieldTitle from '../components/metadatafield/MetadataFieldTitle';
import MetadataFieldCard from '../components/metadatafield/MetadataFieldCard';
import MetadataFieldRemove from '../components/metadatafield/MetadataFieldRemove';
import withSnackbar from '../hoc/withSnackbar';
import SimpleMetadataCard from '../components/ui/SimpleMetadataCard';

const METADATAFIELD_REMOVE_MODAL = 'METADATAFIELD_REMOVE_MODAL';

class MetadataField extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.state = {
      simpleMetadataDocument: undefined,
      metadataFieldDocument: undefined,
    };
  }

  componentDidMount() {
    const { fieldName } = this.props;
    document.title = `xray | Metadata Field | ${fieldName}`;
    this.onRefresh();
  }

  onRefresh() {
    const { openSnackBar, fieldName } = this.props;
    try {
      api.getMetadataField({ fieldName, queryParams: { includeValues: true } })
        .then((response) => this.setState({ metadataFieldDocument: response.data }));
      api.getSimpleMetadata({ fieldName })
        .then((response) => this.setState({ simpleMetadataDocument: response.data }));
    } catch (error) {
      const messageContent = 'Error Getting Metadata Field';
      openSnackBar({ messageContent, messageColor: 'secondary' });
    }
  }

  render() {
    const {
      fieldName,
    } = this.props;
    const { simpleMetadataDocument = {}, metadataFieldDocument } = this.state;
    const { field: simpleMetadataList = [] } = simpleMetadataDocument;
    return (
      <>
        <MetadataFieldTitle
          removeModal={METADATAFIELD_REMOVE_MODAL}
          onRefresh={this.onRefresh}
          fieldName={fieldName}
          code={metadataFieldDocument}
          codeModal="MetadataFieldDocument"
        />
        {metadataFieldDocument
        && (
        <MetadataFieldCard
          metadataFieldDocument={metadataFieldDocument}
          onRefresh={this.onRefresh}
        />
        )}
        {simpleMetadataList
        && (
        <SimpleMetadataCard
          simpleMetadataList={simpleMetadataList}
          onSuccess={this.onRefresh}
          entityType="metadata-field"
          entityId={fieldName}
        />
        )}
        <MetadataFieldRemove
          dialogName={METADATAFIELD_REMOVE_MODAL}
          fieldName={fieldName}
        />
      </>
    );
  }
}

export default withSnackbar(MetadataField);
