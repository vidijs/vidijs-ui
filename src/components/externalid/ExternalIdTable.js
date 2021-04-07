import React from 'react';

import Table from '../ui/Table';
import TableBody from '../ui/TableBody';
import TableCell from '../ui/TableCell';
import TableHead from '../ui/TableHead';
import TableRow from '../ui/TableRow';
import ExternalIdRow from './ExternalIdRow';
import ExternalIdRemove from './ExternalIdRemove';
import withDialogProps from '../../hoc/withDialogProps';

const EXTERNALID_REMOVE_DIALOG = 'EXTERNALID_REMOVE_DIALOG';

function ExternalIdTable({
  externalIdentifierListDocument,
  onRefresh,
  dialogProps,
  onOpen,
  entityType,
  entityId,
}) {
  const {
    id: externalIdentifierList = [],
  } = externalIdentifierListDocument;
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>External Id</TableCell>
            <TableCell>Namespace</TableCell>
            <TableCell>Entity Id</TableCell>
            <TableCell>Entity Type</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {externalIdentifierList.map((externalIdentifierDocument) => (
            <ExternalIdRow
              key={externalIdentifierDocument.externalId}
              externalIdentifierDocument={externalIdentifierDocument}
              onRemove={onOpen(EXTERNALID_REMOVE_DIALOG)}
            />
          ))}
        </TableBody>
      </Table>
      <ExternalIdRemove
        {...dialogProps}
        dialogName={EXTERNALID_REMOVE_DIALOG}
        onSuccess={onRefresh}
        entityType={entityType}
        entityId={entityId}
      />
    </>
  );
}

export default withDialogProps(ExternalIdTable);
