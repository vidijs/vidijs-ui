import React from 'react';

import Table from '../ui/Table';
import TableBody from '../ui/TableBody';
import TableCell from '../ui/TableCell';
import TableHead from '../ui/TableHead';
import TableRow from '../ui/TableRow';
import StorageRuleRow from './StorageRuleRow';
import StorageRuleRemove from './StorageRuleRemove';
import withDialogProps from '../../hoc/withDialogProps';

const REMOVE_STORAGERULE_DIALOG = 'REMOVE_STORAGERULE_DIALOG';

function StorageRuleListTable({
  storageRulesDocument,
  onRefresh,
  dialogProps,
  onOpen,
}) {
  const { tag: storageRuleList = [] } = storageRulesDocument;
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Entity</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>ID</TableCell>
            <TableCell>Count</TableCell>
            <TableCell>Storage</TableCell>
            <TableCell>Precedence</TableCell>
            <TableCell>Inherited</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {storageRuleList.map((storageRuleDocument) => (
            <StorageRuleRow
              key={`${storageRuleDocument.appliesTo.id}_${storageRuleDocument.appliesTo.type}_${storageRuleDocument.id}`}
              storageRuleDocument={storageRuleDocument}
              onRemove={onOpen(REMOVE_STORAGERULE_DIALOG)}
            />
          ))}
        </TableBody>
      </Table>
      <StorageRuleRemove
        {...dialogProps}
        dialogName={REMOVE_STORAGERULE_DIALOG}
        onSuccess={onRefresh}
      />
    </>
  );
}
export default withDialogProps(StorageRuleListTable);
