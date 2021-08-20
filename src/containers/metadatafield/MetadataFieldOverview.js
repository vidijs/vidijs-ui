import React from 'react';

import { metadatafield as api } from '@vidispine/vdt-api';

import MetadataFieldCard from '../../components/metadatafield/MetadataFieldCard';
import withSnackbar from '../../hoc/withSnackbar';
import SimpleMetadataCard from '../../components/ui/SimpleMetadataCard';

class MetadataFieldOverview extends React.PureComponent {
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
      titleComponent: TitleComponent,
      tabComponent: TabComponent,
    } = this.props;
    const { simpleMetadataDocument = {}, metadataFieldDocument } = this.state;
    const { field: simpleMetadataList = [] } = simpleMetadataDocument;
    return (
      <>
        {TitleComponent && (
          <TitleComponent
            code={metadataFieldDocument}
            codeModal="MetadataFieldDocument"
            onRefresh={this.onRefresh}
          />
        )}
        {TabComponent && (
          <TabComponent />
        )}
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
      </>
    );
  }
}

export default withSnackbar(MetadataFieldOverview);
