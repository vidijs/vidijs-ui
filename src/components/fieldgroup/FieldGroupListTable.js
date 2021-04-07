import React from 'react';

import Table from '../ui/Table';
import TableBody from '../ui/TableBody';
import TableCell from '../ui/TableCell';
import TableHead from '../ui/TableHead';
import TableRow from '../ui/TableRow';
import FieldGroupRow from './FieldGroupRow';
import FieldGroupRemove from './FieldGroupRemove';
import FieldGroupChildRemove from './FieldGroupChildRemove';
import withDialogProps from '../../hoc/withDialogProps';

const REMOVE_FIELDGROUP_DIALOG = 'REMOVE_FIELDGROUP_DIALOG';

function FieldGroupListTable({
  metadataFieldGroupListDocument = [],
  groupName,
  onRefresh,
  dialogProps,
  onOpen,
}) {
  const { group: fieldGroupList = [] } = metadataFieldGroupListDocument;
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Field Group Name</TableCell>
            <TableCell>Inheritance</TableCell>
            <TableCell padding="checkbox" />
          </TableRow>
        </TableHead>
        <TableBody>
          {fieldGroupList.map((metadataFieldGroupDocument) => (
            <FieldGroupRow
              key={metadataFieldGroupDocument.name}
              metadataFieldGroupDocument={metadataFieldGroupDocument}
              onOpen={onOpen(REMOVE_FIELDGROUP_DIALOG)}
            />
          ))}
        </TableBody>
      </Table>
      {groupName
        ? (
          <FieldGroupChildRemove
            {...dialogProps}
            dialogName={REMOVE_FIELDGROUP_DIALOG}
            groupName={groupName}
            onSuccess={onRefresh}
          />
        )
        : (
          <FieldGroupRemove
            {...dialogProps}
            dialogName={REMOVE_FIELDGROUP_DIALOG}
            onSuccess={onRefresh}
          />
        )}
    </>
  );
}

export default withDialogProps(FieldGroupListTable);
