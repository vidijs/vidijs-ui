import React from 'react';

import { metadata as api } from '@vidispine/vdt-api';
import withSnackbar from '../hoc/withSnackbar';
import withCard from '../hoc/withCard';

import MetadataEntryDisplay from '../components/metadata/MetadataEntryDisplay';
import TitleHeader from '../components/ui/TitleHeader';

const MetadataEntryDisplayCard = withCard(MetadataEntryDisplay);

class Metadata extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onFetch = this.onFetch.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.state = {
      metadataEntryDocument: undefined,
    };
  }

  componentDidMount() {
    const { metadataUuid } = this.props;
    document.title = `vidi.js | Metadata | ${metadataUuid}`;
    this.onRefresh();
  }

  UNSAFE_componentWillReceiveProps({ metadataUuid }) {
    const { metadataUuid: prevMetadataUuid } = this.props;
    if (prevMetadataUuid !== metadataUuid) {
      this.onFetch(metadataUuid);
      document.title = `vidi.js | Metadata | ${metadataUuid}`;
    }
  }

  onRefresh() {
    const { metadataUuid } = this.props;
    this.onFetch(metadataUuid);
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading Metadata';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  onFetch(metadataUuid) {
    try {
      api.getMetadata({ metadataUuid })
        .then((response) => this.setState({ metadataEntryDocument: response.data }))
        .catch((error) => this.onRefreshError(error));
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  render() {
    const { metadataUuid } = this.props;
    const { metadataEntryDocument } = this.state;
    return (
      <>
        <TitleHeader
          code={metadataEntryDocument}
          codeModal="MetadataDocument"
          title={metadataUuid}
          parentTitle="Metadata"
          parentTo="/search/field-group/"
          onRefresh={this.onRefresh}
        />
        <MetadataEntryDisplayCard
          metadataEntryDocument={metadataEntryDocument}
        />
      </>
    );
  }
}

export default withSnackbar(Metadata);
