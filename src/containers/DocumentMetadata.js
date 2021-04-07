import React from 'react';
import { documentmetadata as api } from '@vidispine/vdt-api';
import TitleHeader from '../components/ui/TitleHeader';
import DocumentMetadataCard from '../components/documentmetadata/DocumentMetadataCard';
import DocumentMetadataRemove from '../components/documentmetadata/DocumentMetadataRemove';
import DocumentMetadataDisplayParams from '../components/documentmetadata/DocumentMetadataDisplayParams';

import withSnackbar from '../hoc/withSnackbar';

const DOCUMENT_REMOVE_DIALOG = 'DOCUMENT_REMOVE_DIALOG';

class DocumentMetadata extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.state = {
      metadataDocument: undefined,
    };
  }

  componentDidMount() {
    const { documentMetadataName } = this.props;
    document.title = `vidi.js | Document | ${documentMetadataName}`;
    this.onRefresh();
  }

  onRefresh() {
    const { documentMetadataName } = this.props;
    try {
      api.getDocumentMetadata({ documentMetadataName })
        .then((response) => this.setState({ metadataDocument: response.data }))
        .catch((error) => this.onRefreshError(error));
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading Document';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  render() {
    const { documentMetadataName, history } = this.props;
    const { metadataDocument } = this.state;
    return (
      <>
        <TitleHeader
          parentTitle="Document"
          parentTo="/document/"
          title={documentMetadataName}
          code={metadataDocument}
          codeModal="MetadataDocument"
          onRefresh={this.onRefresh}
          removeModal={DOCUMENT_REMOVE_DIALOG}
        />
        <DocumentMetadataDisplayParams
          documentMetadataName={documentMetadataName}
          onSuccess={(response) => this.setState({ metadataDocument: response.data })}
        />
        {documentMetadataName && (
          <DocumentMetadataCard
            metadataDocument={metadataDocument}
            documentMetadataName={documentMetadataName}
            onSuccess={this.onRefresh}
          />
        )}
        <DocumentMetadataRemove
          documentMetadataName={documentMetadataName}
          onSuccess={() => history.push('/document/')}
          dialogName={DOCUMENT_REMOVE_DIALOG}
        />
      </>
    );
  }
}

export default withSnackbar(DocumentMetadata);
