import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import UnstyledLink from '../ui/UnstyledLink';
import { bytesToSize } from '../../utils';

const FileTypeRow = ({ fileType }) => (
  <TableRow key={fileType.id} hover>
    <TableCell><UnstyledLink to={`/file/${fileType.id}/`}>{fileType.id}</UnstyledLink></TableCell>
    <TableCell>{(fileType.size && fileType.size > -1) && bytesToSize(fileType.size)}</TableCell>
    <TableCell>{fileType.state}</TableCell>
    <TableCell>
      {fileType.timestamp ? moment(fileType.timestamp).format('YYYY-MM-DD HH:mm').toString() : ''}
    </TableCell>
    <TableCell>{fileType.path}</TableCell>
    <TableCell>{fileType.hash}</TableCell>
    <TableCell><UnstyledLink to={`/storage/${fileType.storage}/`}>{fileType.storage}</UnstyledLink></TableCell>
  </TableRow>
);

export default function FileTypeTable({
  value,
  hideNoValue,
  title = 'Files',
}) {
  if (hideNoValue && value === undefined) { return null; }
  return (
    <>
      <Typography variant="subtitle2">{title}</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Size</TableCell>
            <TableCell>State</TableCell>
            <TableCell>Timestamp</TableCell>
            <TableCell>Path</TableCell>
            <TableCell>Hash</TableCell>
            <TableCell>Storage</TableCell>
          </TableRow>
        </TableHead>
        {Array.isArray(value) && (
          <TableBody>
            {value.map((fileType) => (
              <FileTypeRow key={fileType.id} fileType={fileType} />
            ))}
          </TableBody>
        )}
      </Table>
    </>
  );
}
