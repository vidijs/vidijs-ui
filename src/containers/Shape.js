import React from 'react';
import { shape as api } from '@vidijs/vidijs-api';

import ShapeTitle from '../components/shape/ShapeTitle';
import ShapeParams from '../components/shape/ShapeParams';
import ShapeOverview from '../components/shape/ShapeOverview';
import ShapeDelete from '../components/shape/ShapeDelete';
import ShapeTranscode from '../components/shape/ShapeTranscode';

import withSnackbar from '../hoc/withSnackbar';

const SHAPE_REMOVE_DIALOG = 'SHAPE_REMOVE_DIALOG';
const SHAPE_TRANSCODE_DIALOG = 'SHAPE_TRANSCODE_DIALOG';

class Shape extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onFetch = this.onFetch.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.state = {
      shapeDocument: undefined,
    };
  }

  componentDidMount() {
    const { shapeId } = this.props;
    document.title = `vidi.js | Shape | ${shapeId}`;
    this.onRefresh();
  }

  componentWillReceiveProps({ shapeId, itemId }) {
    const { shapeId: prevItemId } = this.props;
    if (prevItemId !== shapeId) {
      this.onFetch(itemId, shapeId);
      document.title = `vidi.js | Shape | ${shapeId}`;
    }
  }

  onRefresh() {
    const { itemId, shapeId } = this.props;
    this.onFetch(itemId, shapeId);
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading Shape';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  onFetch(itemId, shapeId) {
    try {
      api.getShape({
        itemId,
        shapeId,
      })
        .then(response => this.setState({ shapeDocument: response.data }))
        .catch(error => this.onRefreshError(error));
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  render() {
    const { shapeId, itemId, history } = this.props;
    const { shapeDocument } = this.state;
    return (
      <React.Fragment>
        <ShapeTitle
          code={shapeDocument}
          codeModal="shapeDocument"
          onRefresh={this.onRefresh}
          shapeId={shapeId}
          itemId={itemId}
          removeModal={SHAPE_REMOVE_DIALOG}
          transcodeModal={SHAPE_TRANSCODE_DIALOG}
        />
        <ShapeParams
          shapeId={shapeId}
          itemId={itemId}
          onSuccess={this.onRefresh}
        />
        {shapeDocument && (
          <ShapeOverview
            shapeDocument={shapeDocument}
          />
        )}
        <ShapeDelete
          dialogName={SHAPE_REMOVE_DIALOG}
          onSuccess={() => history.push(`/item/${itemId}`)}
          itemId={itemId}
          shapeId={shapeId}
        />
        <ShapeTranscode
          dialogName={SHAPE_TRANSCODE_DIALOG}
          onSuccess={response => history.push(`/job/${response.data.jobId}/`)}
          itemId={itemId}
          shapeId={shapeId}
        />
      </React.Fragment>
    );
  }
}

export default withSnackbar(Shape);
