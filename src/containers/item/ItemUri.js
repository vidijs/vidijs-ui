import React from 'react';
import { item as api } from '@vidijs/vidijs-api';
import ItemUriParams from '../../components/item/ItemUriParams';
import UriListCard from '../../components/ui/UriListCard';

import withSnackbar from '../../hoc/withSnackbar';

class ItemUri extends React.PureComponent {
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

  UNSAFE_componentWillReceiveProps({ itemId }) {
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
    try {
      api.getItemUri({ itemId })
        .then((response) => this.setState({ uriListDocument: response.data }))
        .catch((error) => this.onRefreshError(error));
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
      itemId,
      titleComponent: TitleComponent,
      tabComponent: TabComponent,
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
        <ItemUriParams
          itemId={itemId}
          onSuccess={(response) => this.setState({ uriListDocument: response.data })}
        />
        {uriListDocument && (
          <UriListCard
            uriListDocument={uriListDocument}
          />
        )}
      </>
    );
  }
}

export default withSnackbar(ItemUri);
