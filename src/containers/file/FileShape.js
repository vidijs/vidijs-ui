import React from 'react';
import { file as api } from '@vidispine/vdt-api';

import withUI from '../../hoc/withUI';
import FileShapeOverview from '../../components/file/FileShapeOverview';

class FileOverview extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.onFetch = this.onFetch.bind(this);
    this.state = {
      shapeListDocument: undefined,
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
    try {
      api.listFileShapes({ fileId })
        .then((response) => this.setState({ shapeListDocument: response.data }))
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
    const { shapeListDocument } = this.state;
    const {
      titleComponent: TitleComponent,
      tabComponent: TabComponent,
    } = this.props;
    return (
      <>
        {TitleComponent && (
          <TitleComponent
            code={shapeListDocument}
            codeModal="ShapeListDocument"
            onRefresh={this.onRefresh}
          />
        )}
        {TabComponent && (
          <TabComponent />
        )}
        {shapeListDocument && shapeListDocument.shape && (
          shapeListDocument.shape.map((shapeDocument) => (
            <FileShapeOverview
              shapeDocument={shapeDocument}
            />
          ))
        )}
      </>
    );
  }
}

export default withUI(FileOverview);
