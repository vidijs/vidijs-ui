import React from 'react';

import ItemRelationEditor from './ItemRelationEditor';

export default function ItemRelationList({ itemRelationListDocument, openRemove, onRefresh }) {
  if (itemRelationListDocument === undefined) { return null; }
  const {
    relation: relationList = [],
  } = itemRelationListDocument;
  return (
    relationList.map((itemRelationType) => (
      <ItemRelationEditor
        key={itemRelationType.id}
        itemRelationType={itemRelationType}
        openRemove={openRemove}
        onRefresh={onRefresh}
      />
    ))
  );
}
