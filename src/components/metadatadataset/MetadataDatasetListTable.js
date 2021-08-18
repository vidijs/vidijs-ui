import React from 'react';

import Table from '../ui/Table';
import TableBody from '../ui/TableBody';
import TableCell from '../ui/TableCell';
import TableHead from '../ui/TableHead';
import TableRow from '../ui/TableRow';

import withDialogProps from '../../hoc/withDialogProps';
import MetadataDatasetRow from './MetadataDatasetRow';
import MetadataDatasetRemove from './MetadataDatasetRemove';

const REMOVE_METADATAFIELD_DIALOG = 'REMOVE_METADATAFIELD_DIALOG';

function MetadataDatasetListTable({
  metadataDatasetListDocument = [],
  onRefresh,
  dialogProps,
  onOpen,
}) {
  const { dataset: metadataDatasetList = [] } = metadataDatasetListDocument;
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Dataset Name</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {metadataDatasetList.map(({ name }) => (
            <MetadataDatasetRow
              key={name}
              datasetId={name}
              onOpen={onOpen(REMOVE_METADATAFIELD_DIALOG)}
            />
          ))}
        </TableBody>
      </Table>
      <MetadataDatasetRemove
        {...dialogProps}
        dialogName={REMOVE_METADATAFIELD_DIALOG}
        onSuccess={onRefresh}
      />
    </>
  );
}

export default withDialogProps(MetadataDatasetListTable);
