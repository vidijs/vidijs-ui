import React from 'react';
import { compose } from 'redux';
import { item as itemApi } from '@vidispine/vdt-api';

import ItemRelationListParams, { ITEM_RELATION_LIST_PARAMS_FORM } from '../../components/item/ItemRelationListParams';
import ItemRelationListDisplay from '../../components/item/ItemRelationList';
import ItemRelationRemove from '../../components/item/ItemRelationRemove';

import withFormActions from '../../hoc/withFormActions';
import withUI from '../../hoc/withUI';

const ITEM_RELATION_REMOVE_MODAL = 'ITEM_RELATION_REMOVE_MODAL';

class ItemRelation extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.openRemove = this.openRemove.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.state = {
      itemRelationListDocument: undefined,
      currentRelationId: undefined,
    };
  }

  componentDidMount() {
    const { setOnRefresh } = this.props;
    this.onRefresh();
    setOnRefresh(this.onRefresh);
  }

  UNSAFE_componentWillReceiveProps({ itemId }) {
    const { itemId: prevItemId } = this.props;
    if (prevItemId !== itemId) {
      this.onRefresh(itemId);
      document.title = `xray | Item | ${itemId}`;
    }
  }

  onRefresh() {
    const { submitForm } = this.props;
    submitForm(ITEM_RELATION_LIST_PARAMS_FORM);
  }

  onRemove(relationId) {
    const {
      openSnackBar,
      onClose,
    } = this.props;
    return () => {
      itemApi.removeRelation({ relationId })
        .then(() => {
          const messageContent = `Relation "${relationId}" Removed`;
          openSnackBar({ messageContent });
          onClose();
          this.onRefresh();
        })
        .catch(() => {
          const messageContent = 'Error Removing Relation';
          openSnackBar({ messageContent, messageColor: 'secondary' });
        });
    };
  }

  openRemove(currentRelationId) {
    const { onOpen } = this.props;
    return () => {
      this.setState(
        { currentRelationId },
        () => onOpen({ modalName: ITEM_RELATION_REMOVE_MODAL }),
      );
    };
  }

  render() {
    const {
      itemId,
      titleComponent: TitleComponent,
      tabComponent: TabComponent,
      onClose,
      modalName,
    } = this.props;
    const {
      itemRelationListDocument,
      currentRelationId,
    } = this.state;
    return (
      <>
        {TitleComponent && (
          <TitleComponent
            code={itemRelationListDocument}
            codeModal="ItemRelationListDocument"
            onRefresh={this.onRefresh}
          />
        )}
        {TabComponent && (
          <TabComponent />
        )}
        <ItemRelationListParams
          itemId={itemId}
          onSuccess={(response) => this.setState({ itemRelationListDocument: response.data })}
        />
        {itemRelationListDocument && (
          <ItemRelationListDisplay
            itemId={itemId}
            itemRelationListDocument={itemRelationListDocument}
            openRemove={this.openRemove}
            onRefresh={this.onRefresh}
          />
        )}
        <ItemRelationRemove
          isOpen={(modalName === ITEM_RELATION_REMOVE_MODAL)}
          onClose={onClose}
          onRemove={this.onRemove}
          relationId={currentRelationId}
        />
      </>
    );
  }
}

export default compose(withFormActions, withUI)(ItemRelation);
