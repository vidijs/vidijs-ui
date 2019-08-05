import React from 'react';
import moment from 'moment';

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
      <TableCell>{fileDocument.path}</TableCell>
      <TableCell>
        <UnstyledLink to={`/file/${fileDocument.id}/`}>
          {fileDocument.id}
        </UnstyledLink>
      </TableCell>
      <TableCell><FileStatus fileDocument={fileDocument} /></TableCell>
      <TableCell>
        <UnstyledLink to={`/storage/${fileDocument.storage}/`}>
          {fileDocument.storage}
        </UnstyledLink>
      </TableCell>
      <TableCell>{bytesToSize(fileDocument.size)}</TableCell>
      <TableCell>
        {fileDocument.timestamp ? moment(fileDocument.timestamp) : ''}
      </TableCell>
    </TableRow>
  );
}
