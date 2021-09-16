import React from 'react';
import { file as api } from '@vidispine/vdt-api';

import FileCard from '../../components/file/FileCard';
import SimpleMetadataCard from '../../components/ui/SimpleMetadataCard';
import withUI from '../../hoc/withUI';

class FileOverview extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.onFetch = this.onFetch.bind(this);
    this.state = {
      fileDocument: undefined,
    };
  }

  componentDidMount() {
    this.onRefresh();
    const { fileId } = this.props;
    document.title = `xray | File | ${fileId}`;
  }

  UNSAFE_componentWillReceiveProps({ fileId }) {
    const { fileId: prevFileId } = this.props;
    if (prevFileId !== fileId) {
      this.onFetch(fileId);
      document.title = `xray | File | ${fileId}`;
    }
  }

  onRefresh() {
    const { fileId } = this.props;
    this.onFetch(fileId);
  }

  onFetch(fileId) {
    const matrixParams = [{ includeItem: true }];
    try {
      api.getFile({ fileId, matrixParams })
        .then((response) => this.setState({ fileDocument: response.data }))
        .catch((error) => this.onRefreshError(error));
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading File';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  render() {
    const { fileDocument } = this.state;
    const {
      fileId, titleComponent: TitleComponent,
      tabComponent: TabComponent,
    } = this.props;
    return (
      <>
        {TitleComponent && (
          <TitleComponent
            code={fileDocument}
            fileDocument={fileDocument}
            codeModal="FileDocument"
            onRefresh={this.onRefresh}
          />
        )}
        {TabComponent && (
          <TabComponent />
        )}
        {fileDocument
          && (
            <>
              <FileCard
                fileDocument={fileDocument}
              />
              <SimpleMetadataCard
                simpleMetadataDocument={fileDocument.metadata}
                onSuccess={this.onRefresh}
                entityType="storage/file"
                entityId={fileId}
              />
            </>
          )}

      </>
    );
  }
}

export default withUI(FileOverview);
