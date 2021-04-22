import React from 'react';

import { documentmetadata as api } from '@vidispine/vdt-api';
import TitleHeader from '../components/ui/TitleHeader';
import DocumentMetadataListCard from '../components/documentmetadata/DocumentMetadataListCard';
import DocumentMetadataCreate from '../components/documentmetadata/DocumentMetadataCreate';

import withSnackbar from '../hoc/withSnackbar';

const DOCUMENT_CREATE_DIALOG = 'DOCUMENT_CREATE_DIALOG';

class DocumentMetadataList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.onFetch = this.onFetch.bind(this);
    this.onChangeRowsPerPage = this.onChangeRowsPerPage.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.state = {
      documentListDocument: undefined,
      first: 1,
      rowsPerPage: 100,
      page: 0,
    };
  }

  componentDidMount() {
    document.title = 'xray | Document';
    this.onRefresh();
  }

  onRefresh() {
    const {
      first,
      rowsPerPage: number,
    } = this.state;
    this.onFetch(first, number);
  }

  onFetch(first, number) {
    const matrixParams = [{ first }, { number }];
    try {
      api.listDocumentMetadata({ matrixParams })
        .then((response) => this.setState({ documentListDocument: response.data }))
        .catch((error) => this.onRefreshError(error));
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading Document List';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  onChangeRowsPerPage({ target: { value: rowsPerPage } } = {}) {
    const first = 1;
    this.setState({ first, rowsPerPage });
    this.onFetch(first, rowsPerPage);
  }

  onChangePage({ page }) {
    const { rowsPerPage } = this.state;
    const first = (page * rowsPerPage) + 1;
    this.setState({ page, first });
    this.onFetch(first, rowsPerPage);
  }

  render() {
    const {
      page,
      rowsPerPage,
      documentListDocument,
    } = this.state;
    const { history } = this.props;
    return (
      <>
        <TitleHeader
          title="Document"
          code={documentListDocument}
          codeModal="DocumentListDocument"
          onRefresh={this.onRefresh}
          createModal={DOCUMENT_CREATE_DIALOG}
        />
        <DocumentMetadataListCard
          documentListDocument={documentListDocument}
          page={page}
          rowsPerPage={rowsPerPage}
          onChangeRowsPerPage={this.onChangeRowsPerPage}
          onChangePage={this.onChangePage}
        />
        <DocumentMetadataCreate
          dialogName={DOCUMENT_CREATE_DIALOG}
          onSuccess={(response) => history.push(`/document/${response.documentMetadataName}`)}
        />
      </>
    );
  }
}

export default withSnackbar(DocumentMetadataList);
