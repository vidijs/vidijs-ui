import React from 'react';

import Table from '../ui/Table';
import TableBody from '../ui/TableBody';
import TableCell from '../ui/TableCell';
import TableHead from '../ui/TableHead';
import TableRow from '../ui/TableRow';
import ExternalIdNamespaceRow from './ExternalIdNamespaceRow';
import ExternalIdNamespaceRemove from './ExternalIdNamespaceRemove';
import ExternalIdNamespaceDialog from './ExternalIdNamespaceDialog';
import withDialogProps from '../../hoc/withDialogProps';

const EXTERNALID_NAMESPACE_REMOVE_DIALOG = 'EXTERNALID_NAMESPACE_REMOVE_DIALOG';
const EXTERNALID_NAMESPACE_EDIT_DIALOG = 'EXTERNALID_NAMESPACE_EDIT_DIALOG';

function ExternalIdNamespaceTable({
  externalIdentifierNamespaceListDocument,
  onRefresh,
  dialogProps,
  onOpen,
}) {
  const {
    namespace: externalIdentifierNamespaceList = [],
  } = externalIdentifierNamespaceListDocument;
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Pattern</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {externalIdentifierNamespaceList.map((externalIdentifierNamespaceDocument) => (
            <ExternalIdNamespaceRow
              key={externalIdentifierNamespaceDocument.name}
              externalIdentifierNamespaceDocument={externalIdentifierNamespaceDocument}
              onRemove={onOpen(EXTERNALID_NAMESPACE_REMOVE_DIALOG)}
              onEdit={onOpen(EXTERNALID_NAMESPACE_EDIT_DIALOG)}
            />
          ))}
        </TableBody>
      </Table>
      <ExternalIdNamespaceDialog
        {...dialogProps}
        dialogName={EXTERNALID_NAMESPACE_EDIT_DIALOG}
        onSuccess={onRefresh}
      />
      <ExternalIdNamespaceRemove
        {...dialogProps}
        dialogName={EXTERNALID_NAMESPACE_REMOVE_DIALOG}
        onSuccess={onRefresh}
      />
    </>
  );
}

export default withDialogProps(ExternalIdNamespaceTable);
