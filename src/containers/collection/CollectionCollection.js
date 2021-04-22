import React from 'react';
import { collection as api } from '@vidispine/vdt-api';
import MetadataCollectionTable from '../../components/collection/MetadataCollectionTable';

import withSnackbar from '../../hoc/withSnackbar';
import withCard from '../../hoc/withCard';

const MetadataCollectionCard = withCard(MetadataCollectionTable);

class CollectionCollection extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onFetch = this.onFetch.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.state = {
      metadataDocument: undefined,
    };
  }

  componentDidMount() {
    this.onRefresh();
  }

  UNSAFE_componentWillReceiveProps({ collectionId }) {
    const { collectionId: prevCollectionId } = this.props;
    if (prevCollectionId !== collectionId) {
      this.onFetch(collectionId);
      document.title = `xray | Collection | ${collectionId}`;
    }
  }

  onRefresh() {
    const { collectionId } = this.props;
    this.onFetch(collectionId);
  }

  onFetch(collectionId) {
    const matrixParams = { field: '__collection,__ancestor_collection,__parent_collection' };
    try {
      api.getCollectionMetadata({
        collectionId,
        matrixParams: Object.entries(matrixParams),
      })
        .then((response) => this.setState({ metadataDocument: response.data }))
        .catch((error) => this.onRefreshError(error));
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading Collection';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  render() {
    const {
      titleComponent: TitleComponent,
      tabComponent: TabComponent,
    } = this.props;
    const { metadataDocument } = this.state;
    return (
      <>
        {TitleComponent && (
          <TitleComponent
            code={metadataDocument}
            codeModal="MetadataDocument"
            onRefresh={this.onRefresh}
          />
        )}
        {TabComponent && (
          <TabComponent />
        )}
        {metadataDocument && (
          <MetadataCollectionCard
            metadataDocument={metadataDocument}
          />
        )}
      </>
    );
  }
}

export default withSnackbar(CollectionCollection);
