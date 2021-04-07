import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteForever from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';

import CollectionEntityRemove from './CollectionEntityRemove';
import UnstyledLink from '../ui/UnstyledLink';
import { capitalizeString } from '../../utils';
import withDialogProps from '../../hoc/withDialogProps';

const REMOVE_COLLECTION_ENTITY_DIALOG = 'REMOVE_COLLECTION_ENTITY_DIALOG';

function CollectionContentTable({
  collectionDocument,
  onSuccess,
  onOpen,
  dialogProps,
}) {
  const { content: collectionContentList = [], id: collectionId } = collectionDocument;
  const onOpenRemove = onOpen(REMOVE_COLLECTION_ENTITY_DIALOG);
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Type</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {collectionContentList.map((collectionContentType) => (
            <TableRow key={`${collectionContentType.type}_${collectionContentType.id}`} hover>
              <TableCell>
                <UnstyledLink
                  to={`/${collectionContentType.type.toLowerCase()}/${collectionContentType.id}/`}
                >
                  {collectionContentType.id}
                </UnstyledLink>
              </TableCell>
              <TableCell>
                <UnstyledLink
                  to={`/${collectionContentType.type.toLowerCase()}/${collectionContentType.id}/`}
                >
                  {capitalizeString(collectionContentType.type)}
                </UnstyledLink>
              </TableCell>
              <TableCell>
                <IconButton
                  onClick={() => onOpenRemove({
                    entityType: collectionContentType.type,
                    entityId: collectionContentType.id,
                  })}
                >
                  <DeleteForever />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <CollectionEntityRemove
        dialogName={REMOVE_COLLECTION_ENTITY_DIALOG}
        onSuccess={onSuccess}
        collectionId={collectionId}
        {...dialogProps}
      />
    </>
  );
}
export default withDialogProps(CollectionContentTable);
