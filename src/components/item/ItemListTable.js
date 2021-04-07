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

export const ItemTypeRow = ({
  itemType,
  terse,
  fieldList,
  children,
}) => (
  <TableRowLink
    to={`/item/${itemType.id}/`}
    hover
  >
    {children}
    <TableCell>{itemType.id}</TableCell>
    {(terse && itemType.terse) && (
      fieldList.map((fieldName) => (
        <TableCell
          key={fieldName}
        >
          {itemType.terse[fieldName] && itemType.terse[fieldName].value}
        </TableCell>
      ))
    )}
  </TableRowLink>
);

function ItemListTable({
  itemListDocument,
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
  if (itemListDocument === undefined) { return null; }
  const { item: itemList = [], hits: count = 0 } = itemListDocument;
  const { terse, field = [] } = queryParams;
  let fieldList = field;
  if (!Array.isArray(field)) { fieldList = field.split(','); }
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell
              name="itemId"
              onChangeOrder={onChangeOrder}
              orderBy={orderBy}
              orderDirection={orderDirection}
            />
            {terse && (
              fieldList.map((fieldName) => (
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
          {itemList.map((itemType) => (
            <ItemTypeRow
              key={itemType.id}
              itemType={itemType}
              terse={terse}
              fieldList={fieldList}
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
    </>
  );
}

export default ItemListTable;
