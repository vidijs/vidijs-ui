import React from 'react';
import { compose } from 'redux';
import Divider from '@material-ui/core/Divider';

import TextGrid from '../ui/TextGrid';
import EditorCard from '../ui/EditorCard';
import ItemRelationFormEdit from './ItemRelationFormEdit';
import * as formActions from '../../formactions/item';
import withFormActions from '../../hoc/withFormActions';
import withUI from '../../hoc/withUI';

const ITEM_RELATION_FORM_EDIT = 'ITEM_RELATION_FORM_EDIT';

export const ItemRelationType = ({ itemRelationType }) => (
  <React.Fragment>
    {itemRelationType.direction && (
      <React.Fragment>
        <TextGrid title="Source" value={itemRelationType.direction.source} />
        <TextGrid title="Target" value={itemRelationType.direction.target} />
        <TextGrid title="Type" value={itemRelationType.direction.type} />
      </React.Fragment>
    )}
    {itemRelationType.value && (
      <React.Fragment>
        <Divider />
        <TextGrid title="Metadata" />
        {itemRelationType.value.map(relationMetadata => (
          <TextGrid
            key={relationMetadata.key}
            title={relationMetadata.key}
            value={relationMetadata.value}
          />
        ))}
      </React.Fragment>
    )}
  </React.Fragment>
);

const ItemRelationDisplay = ({ itemRelationType }) => (
  <ItemRelationType itemRelationType={itemRelationType} />
);

const ItemRelationEdit = ({
  itemRelationType,
  toggleEdit,
  openSnackBar,
  onRefresh,
}) => (
  <ItemRelationFormEdit
    form={ITEM_RELATION_FORM_EDIT}
    onSubmit={formActions.onUpdateItemRelation}
    onSubmitSuccess={() => { toggleEdit(); onRefresh(); }}
    onSubmitFail={() => openSnackBar({ messageContent: 'Error Updating Relation', messageColor: 'secondary' })}
    relationId={itemRelationType.id}
    initialValues={{
      queryParams: {
        direction: itemRelationType.direction.type,
        relationMetadata: itemRelationType.value,
      },
    }}
  />
);

const ItemRelationEditor = ({
  itemRelationType,
  openRemove,
  submitForm,
  onRefresh,
  openSnackBar,
}) => (
  <EditorCard
    editComponent={ItemRelationEdit}
    displayComponent={ItemRelationDisplay}
    cardHeaderProps={{
      subheader: `Relation ID: ${itemRelationType.id}`,
    }}
    itemRelationType={itemRelationType}
    onRemove={openRemove(itemRelationType.id)}
    onSave={() => submitForm(ITEM_RELATION_FORM_EDIT)}
    onRefresh={onRefresh}
    openSnackBar={openSnackBar}
  />
);

export default compose(withFormActions, withUI)(ItemRelationEditor);
