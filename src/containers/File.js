import React from 'react';

import FileTitle from '../components/file/FileTitle';
import FileCard from '../components/file/FileCard';
import FileDelete from '../components/file/FileDelete';
import FileAbandon from '../components/file/FileAbandon';
import FileState from '../components/file/FileState';
import FileMove from '../components/file/FileMove';
import FileEntityRemove from '../components/file/FileEntityRemove';
import FilePath from '../components/file/FilePath';
import FileOverwrite from '../components/file/FileOverwrite';
import SimpleMetadataCard from '../components/ui/SimpleMetadataCard';

import withUI from '../hoc/withUI';
import { file as api } from '@vidijs/vidijs-api';

const FILE_DELETE_DIALOG = 'FILE_DELETE_DIALOG';
const FILE_ABANDON_DIALOG = 'FILE_ABANDON_DIALOG';
const FILE_STATE_DIALOG = 'FILE_STATE_DIALOG';
const FILE_MOVE_DIALOG = 'FILE_MOVE_DIALOG';
const FILE_ENTITY_REMOVE_DIALOG = 'FILE_ENTITY_REMOVE_DIALOG';
const FILE_PATH_DIALOG = 'FILE_PATH_DIALOG';
const FILE_OVERWRITE_DIALOG = 'FILE_OVERWRITE_DIALOG';

class File extends React.PureComponent {
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
    document.title = `vidi.js | File | ${fileId}`;
  }

  componentWillReceiveProps({ fileId }) {
    const { fileId: prevFileId } = this.props;
    if (prevFileId !== fileId) {
      this.onFetch(fileId);
      document.title = `vidi.js | File | ${fileId}`;
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
        .then(response => this.setState({ fileDocument: response.data }))
        .catch(error => this.onRefreshError(error));
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
    const { fileId, history } = this.props;
    return (
      <React.Fragment>
        <FileTitle
          onRefresh={this.onRefresh}
          code={fileDocument}
          codeModal="FileDocument"
          deleteModal={FILE_DELETE_DIALOG}
          abandonModal={FILE_ABANDON_DIALOG}
          stateModal={FILE_STATE_DIALOG}
          moveModal={FILE_MOVE_DIALOG}
          removeEntityModal={FILE_ENTITY_REMOVE_DIALOG}
          pathModal={FILE_PATH_DIALOG}
          overwriteModal={FILE_OVERWRITE_DIALOG}
          fileId={fileId}
        />
        {fileDocument &&
          <React.Fragment>
            <FileCard
              fileDocument={fileDocument}
            />
            <SimpleMetadataCard
              simpleMetadataDocument={fileDocument.metadata}
              onSuccess={this.onRefresh}
              entityType="storage/file"
              entityId={fileId}
            />
          </React.Fragment>
        }
        <FileDelete
          dialogName={FILE_DELETE_DIALOG}
          onSuccess={response => history.push(`/job/${response.data.jobId}`)}
          fileDocument={fileDocument}
        />
        <FileAbandon
          dialogName={FILE_ABANDON_DIALOG}
          onSuccess={this.onRefresh}
          fileDocument={fileDocument}
        />
        <FileState
          dialogName={FILE_STATE_DIALOG}
          onSuccess={this.onRefresh}
          fileDocument={fileDocument}
        />
        <FileMove
          dialogName={FILE_MOVE_DIALOG}
          onSuccess={response => history.push(`/job/${response.data.jobId}`)}
          fileDocument={fileDocument}
        />
        <FilePath
          dialogName={FILE_PATH_DIALOG}
          onSuccess={response => history.push(`/file/${response.data.id}`)}
          fileDocument={fileDocument}
        />
        <FileEntityRemove
          dialogName={FILE_ENTITY_REMOVE_DIALOG}
          onSuccess={() => history.push('/file/')}
          fileDocument={fileDocument}
        />
        <FileOverwrite
          dialogName={FILE_OVERWRITE_DIALOG}
          onSuccess={this.onRefresh}
          fileDocument={fileDocument}
        />
      </React.Fragment>
    );
  }
}

export default withUI(File);
