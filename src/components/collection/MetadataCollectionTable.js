import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import UnstyledLink from '../ui/UnstyledLink';
import TableRowLink from '../ui/TableRowLink';

const COLLECTION_TRANSIENT_FIELDS = [
  '__collection',
  '__ancestor_collection',
  '__parent_collection',
];

export default function MetadataCollectionTable({
  metadataDocument = {},
}) {
  const itemCollection = [];
  const { timespan: metadataTimespanList = [] } = metadataDocument;
  const infTimeSpan = metadataTimespanList.find((thisTimespan) => (thisTimespan.start === '-INF' && thisTimespan.end === '+INF'));
  if (infTimeSpan) {
    const { field: fieldList = [] } = infTimeSpan;
    fieldList.forEach((thisField) => {
      if (COLLECTION_TRANSIENT_FIELDS.includes(thisField.name)) {
        const { value: allValues = [] } = thisField;
        const firstValue = allValues.find((thisValue) => (thisValue.value));
        if (firstValue) {
          const relation = (thisField.name === '__collection' || thisField.name === '__parent_collection') ? 'Parent' : 'Ancestor';
          itemCollection.push({
            relation,
            id: firstValue.value,
          });
        }
      }
    });
  }
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Type</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {itemCollection.map((collection) => (
          <TableRowLink
            key={`${collection.relation}_${collection.id}`}
            to={`/collection/${collection.id}/`}
            hover
          >
            <TableCell>
              <UnstyledLink to={`/collection/${collection.id}/`}>{collection.id}</UnstyledLink>
            </TableCell>
            <TableCell>
              {collection.relation}
            </TableCell>
            <TableCell />
          </TableRowLink>
        ))}
      </TableBody>
    </Table>
  );
}
