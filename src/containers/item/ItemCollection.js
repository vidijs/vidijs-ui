import React from 'react';
import ItemCollectionCard from '../../components/item/ItemCollectionCard';

import { item as api } from '@vidijs/vidijs-api';
import withSnackbar from '../../hoc/withSnackbar';


class ItemCollection extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onFetch = this.onFetch.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.state = {
      metadataListDocument: undefined,
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
    const matrixParams = { field: '__collection,__ancestor_collection,__parent_collection' };
    try {
      api.getItemMetadata({
        itemId,
        matrixParams: Object.entries(matrixParams),
      })
        .then(response => this.setState({ metadataListDocument: response.data }))
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
    const { metadataListDocument } = this.state;
    return (
      <React.Fragment>
        {TitleComponent && (
          <TitleComponent
            code={metadataListDocument}
            codeModal="MetadataListDocument"
            onRefresh={this.onRefresh}
          />
        )}
        {TabComponent && (
          <TabComponent />
        )}
        {metadataListDocument && (
          <ItemCollectionCard
            metadataListDocument={metadataListDocument}
          />
        )}
      </React.Fragment>
    );
  }
}

export default withSnackbar(ItemCollection);
