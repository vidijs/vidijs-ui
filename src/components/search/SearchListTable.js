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
import { ItemTypeRow } from '../item/ItemListTable';
import { CollectionTypeRow } from '../collection/CollectionListTable';

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

export const SearchResultEntryTypeRow = ({
  searchResultEntryType,
  terse,
  fieldList,
}) => {
  const typeCell = <TableCell>{searchResultEntryType.type}</TableCell>;
  const entryKeys = Object.keys(searchResultEntryType);
  if (entryKeys.includes('item')) {
    const { item: itemType = {} } = searchResultEntryType;
    return (
      <ItemTypeRow
        itemType={itemType}
        terse={terse}
        fieldList={fieldList}
      >
        {typeCell}
      </ItemTypeRow>
    );
  }
  if (entryKeys.includes('collection')) {
    const { collection: collectionType = {} } = searchResultEntryType;
    return (
      <CollectionTypeRow
        collectionType={collectionType}
        terse={terse}
        fieldList={fieldList}
        withName={false}
      >
        {typeCell}
      </CollectionTypeRow>
    );
  }
  return (
    <TableRow>
      {typeCell}
    </TableRow>
  );
};

function ItemListTable({
  searchResultDocument,
  queryParams,
  onChangePage,
  onChangeRowsPerPage,
  rowsPerPageOptions,
  onChangeOrder,
  orderDirection,
  orderBy,
  page,
  rowsPerPage,
}) {
  if (searchResultDocument === undefined) { return null; }
  const { entry: entryList = [], hits: count = 0 } = searchResultDocument;
  const { terse, field = [] } = queryParams;
  let fieldList = field;
  if (!Array.isArray(field)) { fieldList = field.split(','); }
  return (
    <React.Fragment>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell name="type" />
            <TableHeadCell name="id" />
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
          {entryList.map(searchResultEntryType => (
            <SearchResultEntryTypeRow
              key={searchResultEntryType.id}
              searchResultEntryType={searchResultEntryType}
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
    </React.Fragment>
  );
}

export default ItemListTable;
