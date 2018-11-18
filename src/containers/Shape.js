import React from 'react';

import ShapeTitle from '../components/shape/ShapeTitle';
import ShapeParams from '../components/shape/ShapeParams';
import ShapeOverview from '../components/shape/ShapeOverview';

import { shape as api } from '@vidijs/vidijs-api';
import withSnackbar from '../hoc/withSnackbar';


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
    const { shapeId, itemId } = this.props;
    const { shapeDocument } = this.state;
    return (
      <React.Fragment>
        <ShapeTitle
          code={shapeDocument}
          codeModal="shapeDocument"
          onRefresh={this.onRefresh}
          shapeId={shapeId}
          itemId={itemId}
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
      </React.Fragment>
    );
  }
}

export default withSnackbar(Shape);
