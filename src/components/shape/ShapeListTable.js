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
import ChipArray from '../ui/ChipArray';

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

export const ShapeTypeRow = ({ shapeType }) => {
  const {
    id: shapeId,
    item: itemList = [],
    mimeType = [],
    essenceVersion,
    tag = [],
  } = shapeType;
  const itemIds = itemList.map(thisItem => thisItem.id);
  const [itemId] = itemIds;
  const linkTo = itemId ? `/item/${itemId}/shape/${shapeId}/` : undefined;
  return (
    <TableRowLink
      to={linkTo}
      hover
    >
      <TableCell>{itemIds}</TableCell>
      <TableCell>
        <ChipArray labels={itemIds} />
      </TableCell>
      <TableCell>{essenceVersion}</TableCell>
      <TableCell>
        <ChipArray labels={mimeType} />
      </TableCell>
      <TableCell>
        <ChipArray labels={tag} />
      </TableCell>
    </TableRowLink>
  );
};

function ShapeListTable({
  shapeListDocument,
  onChangePage,
  onChangeRowsPerPage,
  rowsPerPageOptions,
  page,
  rowsPerPage,
  onChangeOrder,
  orderBy,
  orderDirection,
}) {
  if (shapeListDocument === undefined) { return null; }
  const { shape: shapeList = [], hits: count = 0 } = shapeListDocument;
  return (
    <React.Fragment>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell name="shapeId" />
            <TableHeadCell
              name="itemId"
              onChangeOrder={onChangeOrder}
              orderBy={orderBy}
              orderDirection={orderDirection}
            />
            <TableHeadCell name="essenceVersion" />
            <TableHeadCell
              name="mimeType"
              onChangeOrder={onChangeOrder}
              orderBy={orderBy}
              orderDirection={orderDirection}
            />
            <TableHeadCell
              name="shapeTag"
              onChangeOrder={onChangeOrder}
              orderBy={orderBy}
              orderDirection={orderDirection}
            />
          </TableRow>
        </TableHead>
        <TableBody>
          {shapeList.map(shapeType => (
            <ShapeTypeRow
              key={shapeType.id}
              shapeType={shapeType}
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

export default ShapeListTable;
