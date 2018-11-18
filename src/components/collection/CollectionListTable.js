import React from 'react';
import startCase from 'lodash.startcase';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import TableActions from '../ui/TableActions';
import TableRowLink from '../ui/TableRowLink';

const TableHeadCell = ({
  orderBy,
  orderDirection,
  onChangeOrder,
  name,
}) => (
  onChangeOrder ? (
    <TableCell>
      <TableSortLabel
        active={(orderBy === name)}
        direction={orderDirection || undefined}
        onClick={onChangeOrder(name)}
      >
        {startCase(name)}
      </TableSortLabel>
    </TableCell>
  ) : (
    <TableCell>
      {startCase(name)}
    </TableCell>
  )
);

export const CollectionTypeRow = ({
  collectionType,
  terse,
  fieldList,
  withName = true,
  children,
}) => (
  <TableRowLink
    to={`/collection/${collectionType.id}/`}
    hover
  >
    {children}
    <TableCell>{collectionType.id}</TableCell>
    {withName && (
      <TableCell>{collectionType.name}</TableCell>
    )}
    {(terse && collectionType.terse) && (
      fieldList.map(fieldName => (
        <TableCell
          key={fieldName}
        >
          {collectionType.terse[fieldName] && collectionType.terse[fieldName].value}
        </TableCell>
      ))
    )}
  </TableRowLink>
);

function CollectionListTable({
  collectionListDocument,
  queryParams = {},
  onChangePage,
  onChangeRowsPerPage,
  rowsPerPageOptions,
  page,
  rowsPerPage,
  onChangeOrder,
  orderBy,
  orderDirection,
}) {
  if (collectionListDocument === undefined) { return null; }
  const { collection: collectionContentList = [], hits: count = 0 } = collectionListDocument;
  const { terse, field = [] } = queryParams;
  let fieldList = field;
  if (!Array.isArray(field)) { fieldList = field.split(','); }
  return (
    <React.Fragment>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell
              name="collectionId"
              onChangeOrder={onChangeOrder}
              orderBy={orderBy}
              orderDirection={orderDirection}
            />
            <TableHeadCell
              name="title"
              onChangeOrder={onChangeOrder}
              orderBy={orderBy}
              orderDirection={orderDirection}
            />
            {terse && (
              fieldList.map(fieldName => (
                <TableHeadCell
                  key={fieldName}
                  name={fieldName}
                  onChangeOrder={onChangeOrder}
                  orderBy={orderBy}
                  orderDirection={orderDirection}
                />
              ))
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {collectionContentList.map(collectionType => (
            <CollectionTypeRow
              key={collectionType.id}
              collectionType={collectionType}
              fieldList={fieldList}
              terse={terse}
            />
          ))}
        </TableBody>
        {(onChangePage && onChangeRowsPerPage) && (
          <TableFooter>
            <TableRow>
              <TablePagination
                count={count}
                page={page}
                rowsPerPage={rowsPerPage}
                onChangePage={onChangePage}
                onChangeRowsPerPage={onChangeRowsPerPage}
                ActionsComponent={TableActions}
                rowsPerPageOptions={rowsPerPageOptions}
              />
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </React.Fragment>
  );
}

export default CollectionListTable;
