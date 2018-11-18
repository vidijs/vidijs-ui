import React from 'react';
import Moment from 'react-moment';

import UnstyledLink from '../ui/UnstyledLink';
import TableCell from '../ui/TableCell';
import TableRow from '../ui/TableRow';
import FileStatus from './FileStatus';
import { bytesToSize } from '../../utils';

export default function FileRow({
  fileDocument = {},
}) {
  return (
    <TableRow to={`/file/${fileDocument.id}/`} hover>
      <TableCell>
        <UnstyledLink to={`/file/${fileDocument.id}/`}>
          {fileDocument.id}
        </UnstyledLink>
      </TableCell>
      <TableCell>{fileDocument.path}</TableCell>
      <TableCell><FileStatus fileDocument={fileDocument} /></TableCell>
      <TableCell>
        <UnstyledLink to={`/storage/${fileDocument.storage}/`}>
          {fileDocument.storage}
        </UnstyledLink>
      </TableCell>
      <TableCell>{bytesToSize(fileDocument.size)}</TableCell>
      <TableCell><Moment>{fileDocument.timestamp}</Moment></TableCell>
    </TableRow>
  );
}
