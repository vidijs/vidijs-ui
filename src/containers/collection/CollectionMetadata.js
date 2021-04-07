import React from 'react';

import { collection as api } from '@vidispine/vdt-api';
import CollectionMetadataEditor from '../../components/collection/CollectionMetadataEditor';
import CollectionMetadataDisplayParams from '../../components/collection/CollectionMetadataDisplayParams';

import withSnackbar from '../../hoc/withSnackbar';
import withCard from '../../hoc/withCard';

const CollectionMetadataCard = withCard(CollectionMetadataEditor);

class CollectionMetadata extends React.PureComponent {
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
      document.title = `vidi.js | Collection | ${collectionId}`;
    }
  }

  onRefresh() {
    const { collectionId } = this.props;
    this.onFetch(collectionId);
  }

  onFetch(collectionId) {
    try {
      api.getCollectionMetadata({ collectionId })
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
      collectionId,
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
        <CollectionMetadataDisplayParams
          collectionId={collectionId}
          onSuccess={(response) => this.setState({ metadataDocument: response.data })}
        />
        {metadataDocument && (
          <CollectionMetadataCard
            collectionId={collectionId}
            metadataDocument={metadataDocument}
            onSuccess={() => this.onRefresh()}
          />
        )}
      </>
    );
  }
}

export default withSnackbar(CollectionMetadata);
