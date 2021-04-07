import React from 'react';
import { bulkymetadata as BulkyMetadataApi } from '@vidijs/vidijs-api';

import UriListCard from '../../components/ui/UriListCard';
import withSnackbar from '../../hoc/withSnackbar';

class ShapeBulkyMetadataList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onFetch = this.onFetch.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.state = {
      uriListDocument: undefined,
    };
  }

  componentDidMount() {
    this.onRefresh();
  }

  UNSAFE_componentWillReceiveProps({ shapeId, itemId }) {
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

  onFetch(itemId, shapeId) {
    try {
      BulkyMetadataApi.listShapeBulkyMetadata({ itemId, shapeId })
        .then((response) => this.setState({ uriListDocument: response.data }))
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
      itemId,
      shapeId,
    } = this.props;
    const { uriListDocument } = this.state;
    return (
      <>
        {TitleComponent && (
          <TitleComponent
            code={uriListDocument}
            codeModal="URIListDocument"
            onRefresh={this.onRefresh}
          />
        )}
        {TabComponent && (
          <TabComponent />
        )}
        {uriListDocument && (
          <UriListCard
            uriListDocument={uriListDocument}
            linkTo={(uri) => `/item/${itemId}/shape/${shapeId}/bulky-metadata/${uri}/`}
          />
        )}
      </>
    );
  }
}

export default withSnackbar(ShapeBulkyMetadataList);
