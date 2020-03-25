import React from 'react';
import { compose } from 'redux';
import { bulkymetadata as BulkyMetadataApi } from '@vidijs/vidijs-api';

import withSnackbar from '../../hoc/withSnackbar';
import { withRouterProps } from '../../hoc/withRouterProps';
import BulkyMetadataDisplay from '../../components/bulkymetadata/BulkyMetadataDisplay';

class ShapeBulkyMetadata extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onFetch = this.onFetch.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.state = {
      bulkyMetadataDocument: undefined,
    };
  }

  componentDidMount() {
    this.onRefresh();
  }

  componentWillReceiveProps({ shapeId, itemId, bulkyMetadataKey }) {
    const { shapeId: prevItemId, bulkyMetadataKey: prevKey } = this.props;
    if (prevItemId !== shapeId || prevKey !== bulkyMetadataKey) {
      this.onFetch(itemId, shapeId, bulkyMetadataKey);
      document.title = `vidi.js | Shape | ${shapeId}`;
    }
  }

  onRefresh() {
    const { itemId, shapeId, bulkyMetadataKey } = this.props;
    this.onFetch(itemId, shapeId, bulkyMetadataKey);
  }

  onFetch(itemId, shapeId, bulkyMetadataKey) {
    try {
      BulkyMetadataApi.getShapeBulkyMetadata({ itemId, shapeId, key: bulkyMetadataKey })
        .then(response => this.setState({ bulkyMetadataDocument: response.data }))
        .catch(error => this.onRefreshError(error));
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading Bulky Metadata';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }


  render() {
    const {
      titleComponent: TitleComponent,
      tabComponent: TabComponent,
      bulkyMetadataKey,
    } = this.props;
    const { bulkyMetadataDocument } = this.state;
    return (
      <React.Fragment>
        {TitleComponent && (
          <TitleComponent
            code={bulkyMetadataDocument}
            codeModal="BulkyMetadataDocument"
            onRefresh={this.onRefresh}
            title={bulkyMetadataKey}
          />
        )}
        {TabComponent && (
          <TabComponent />
        )}
        { bulkyMetadataDocument && (
          <BulkyMetadataDisplay bulkyMetadataDocument={bulkyMetadataDocument} />
        )}
      </React.Fragment>
    );
  }
}

export default compose(withRouterProps, withSnackbar)(ShapeBulkyMetadata);
