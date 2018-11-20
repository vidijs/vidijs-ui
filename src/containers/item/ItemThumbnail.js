import React from 'react';
import ItemThumbnailGrid from '../../components/item/ItemThumbnailGrid';

import { item as api } from '@vidijs/vidijs-api';
import withSnackbar from '../../hoc/withSnackbar';


class ItemThumbnail extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onFetch = this.onFetch.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.state = {
      itemDocument: undefined,
    };
  }

  componentDidMount() {
    this.onRefresh();
  }

  componentWillReceiveProps({ itemId }) {
    const { itemId: prevItemId } = this.props;
    if (prevItemId !== itemId) {
      this.onFetch(itemId);
      document.title = `vidi.js | Item | ${itemId}`;
    }
  }

  onRefresh() {
    const { itemId } = this.props;
    this.onFetch(itemId);
  }

  onFetch(itemId) {
    const baseUrl = localStorage.getItem('vsBaseUrl');
    const queryParams = {
      content: 'thumbnail',
      'noauth-url': true,
      baseURI: `${baseUrl}/APInoauth/`,
    };
    try {
      api.getItem({ itemId, queryParams })
        .then(response => this.setState({ itemDocument: response.data }))
        .catch(error => this.onRefreshError(error));
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading Item';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }


  render() {
    const {
      titleComponent: TitleComponent,
      tabComponent: TabComponent,
    } = this.props;
    const { itemDocument } = this.state;
    return (
      <React.Fragment>
        {TitleComponent && (
          <TitleComponent
            code={itemDocument}
            codeModal="ItemDocument"
            onRefresh={this.onRefresh}
          />
        )}
        {TabComponent && (
          <TabComponent />
        )}
        {itemDocument && (
          <React.Fragment>
            {itemDocument.thumbnails && (
              <ItemThumbnailGrid
                uriListDocument={itemDocument.thumbnails}
              />
            )}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default withSnackbar(ItemThumbnail);
