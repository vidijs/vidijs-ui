import React from 'react';
import { shape as api } from '@vidispine/vdt-api';

import withSnackbar from '../../hoc/withSnackbar';
import ShapeParams from '../../components/shape/ShapeParams';
import ShapeOverviewComponent from '../../components/shape/ShapeOverview';

class ShapeOverview extends React.PureComponent {
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
    this.onRefresh();
  }

  UNSAFE_componentWillReceiveProps({ shapeId, itemId }) {
    const { shapeId: prevItemId } = this.props;
    if (prevItemId !== shapeId) {
      this.onFetch(itemId, shapeId);
      document.title = `xray | Shape | ${shapeId}`;
    }
  }

  onRefresh() {
    const { itemId, shapeId } = this.props;
    this.onFetch(itemId, shapeId);
  }

  onFetch(itemId, shapeId) {
    try {
      api.getShape({
        itemId,
        shapeId,
      })
        .then((response) => this.setState({ shapeDocument: response.data }))
        .catch((error) => this.onRefreshError(error));
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading Shape';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  render() {
    const {
      titleComponent: TitleComponent,
      tabComponent: TabComponent,
      shapeId,
      itemId,
    } = this.props;
    const { shapeDocument } = this.state;
    return (
      <>
        {TitleComponent && (
          <TitleComponent
            code={shapeDocument}
            codeModal="ShapeDocument"
            onRefresh={this.onRefresh}
          />
        )}
        {TabComponent && (
          <TabComponent />
        )}
        <ShapeParams
          shapeId={shapeId}
          itemId={itemId}
          onSuccess={this.onRefresh}
        />
        {shapeDocument && (
          <ShapeOverviewComponent
            shapeDocument={shapeDocument}
          />
        )}
      </>
    );
  }
}

export default withSnackbar(ShapeOverview);
