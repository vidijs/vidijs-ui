import React from 'react';
import { compose } from 'redux';
import Typography from '@material-ui/core/Typography';

import CollectionContentParams from '../../components/collection/CollectionContentParams';
import CollectionContentTable from '../../components/collection/CollectionContentTable';
import CollectionMetadataEditor from '../../components/collection/CollectionMetadataEditor';
import CollectionRename from '../../components/collection/CollectionRename';
import CollectionEntityAdd from '../../components/collection/CollectionEntityAdd';
import Menu, { MenuItem } from '../../components/ui/Menu';

import { collection as api } from '@vidijs/vidijs-api';
import withSnackbar from '../../hoc/withSnackbar';
import withUI from '../../hoc/withUI';
import withCard from '../../hoc/withCard';

const COLLECTION_RENAME_DIALOG = 'COLLECTION_RENAME_DIALOG';
const COLLECTION_ENTITY_ADD_DIALOG = 'COLLECTION_ENTITY_ADD_DIALOG';

const CollectionContentCard = withCard(CollectionContentTable);
const CollectionMetadataCard = withCard(CollectionMetadataEditor);

class CollectionContent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onFetch = this.onFetch.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.state = {
      collectionDocument: undefined,
    };
  }

  componentDidMount() {
    this.onRefresh();
  }

  componentWillReceiveProps({ collectionId }) {
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
      api.getCollection({ collectionId })
        .then(response => this.setState({ collectionDocument: response.data }))
        .catch(error => this.onRefreshError(error));
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
      onOpen,
      collectionId,
      titleComponent: TitleComponent,
      tabComponent: TabComponent,
    } = this.props;
    const { collectionDocument } = this.state;
    return (
      <React.Fragment>
        {TitleComponent && (
          <TitleComponent
            code={collectionDocument}
            codeModal="CollectionDocument"
            onRefresh={this.onRefresh}
            titleChip={collectionDocument && collectionDocument.name}
            actionComponent={(
              <Menu>
                <MenuItem onClick={() => onOpen({ modalName: COLLECTION_ENTITY_ADD_DIALOG })}>
                  <Typography>Add Entity</Typography>
                </MenuItem>
                <MenuItem onClick={() => onOpen({ modalName: COLLECTION_RENAME_DIALOG })}>
                  <Typography>Rename</Typography>
                </MenuItem>
              </Menu>
            )}
          />
        )}
        {TabComponent && (
          <TabComponent />
        )}
        <CollectionContentParams
          collectionId={collectionId}
          onSuccess={response => this.setState({ collectionDocument: response.data })}
        />
        {collectionDocument && (
          <React.Fragment>
            <CollectionContentCard
              collectionId={collectionId}
              collectionDocument={collectionDocument}
              onSuccess={this.onRefresh}
            />
            {collectionDocument.metadata && (
              <CollectionMetadataCard
                collectionId={collectionId}
                metadataDocument={collectionDocument.metadata}
                onSuccess={() => this.onRefresh()}
              />
            )}
            <CollectionRename
              dialogName={COLLECTION_RENAME_DIALOG}
              collectionId={collectionId}
              collectionDocument={collectionDocument}
              onSuccess={() => this.onRefresh()}
            />
          </React.Fragment>
        )}
        <CollectionEntityAdd
          dialogName={COLLECTION_ENTITY_ADD_DIALOG}
          onSuccess={this.onRefresh}
          collectionId={collectionId}
        />
      </React.Fragment>
    );
  }
}

export default compose(withUI, withSnackbar)(CollectionContent);
