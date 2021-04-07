import React from 'react';

import Table from '../ui/Table';
import TableBody from '../ui/TableBody';
import TableCell from '../ui/TableCell';
import TableHead from '../ui/TableHead';
import TableRow from '../ui/TableRow';

import withDialogProps from '../../hoc/withDialogProps';
import MetadataFieldRow from './MetadataFieldRow';
import FieldGroupFieldRemove from '../fieldgroup/FieldGroupFieldRemove';
import MetadataFieldRemove from './MetadataFieldRemove';

const REMOVE_METADATAFIELD_DIALOG = 'REMOVE_METADATAFIELD_DIALOG';

function MetadataFieldListTable({
  metadataFieldListDocument = [],
  groupName,
  onRefresh,
  dialogProps,
  onOpen,
}) {
  const { field: metadataFieldList = [] } = metadataFieldListDocument;
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Field Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>System</TableCell>
            <TableCell>Inheritance</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {metadataFieldList.map((metadataFieldDocument) => (
            <MetadataFieldRow
              key={metadataFieldDocument.name}
              metadataFieldDocument={metadataFieldDocument}
              onOpen={onOpen(REMOVE_METADATAFIELD_DIALOG)}
            />
          ))}
        </TableBody>
      </Table>
      {groupName
        ? (
          <FieldGroupFieldRemove
            {...dialogProps}
            dialogName={REMOVE_METADATAFIELD_DIALOG}
            groupName={groupName}
            onSuccess={onRefresh}
          />
        )
        : (
          <MetadataFieldRemove
            {...dialogProps}
            dialogName={REMOVE_METADATAFIELD_DIALOG}
            onSuccess={onRefresh}
          />
        )}
    </>
  );
}

export default withDialogProps(MetadataFieldListTable);
