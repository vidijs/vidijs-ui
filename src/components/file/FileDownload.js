import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import Tooltip from '@material-ui/core/Tooltip';

import {
  file as api,
  noauth as apiNoAuth,
} from '@vidispine/vdt-api';
import { downloadFile } from '../../utils';
import { DOWNLOAD_STATES } from '../../const/FileStates';
import { withSnackbarNoRouter } from '../../hoc/withSnackbar';

export const getNoAuth = ({ fileId, openSnackBar }) => (
  api.getFile({ fileId, queryParams: { methodType: 'AUTO' } })
    .then((response) => {
      const { data } = response;
      const { uri: uriList = [] } = data;
      if (uriList.length > 0) {
        const uri = uriList[0].split('/APInoauth/')[1];
        return `/APInoauth/${uri}`;
      }
      return undefined;
    })
    .catch(() => {
      const messageContent = 'Error Loading Download URL';
      if (openSnackBar) { openSnackBar({ messageContent, messageColor: 'secondary' }); }
    })
);

export const getDownloadNoAuth = ({ fileId, fileName, openSnackBar }) => {
  getNoAuth({ fileId, openSnackBar })
    .then((path) => {
      apiNoAuth.getFileRaw({ path })
        .then((fileResponse) => {
          downloadFile({ data: fileResponse.data, fileName });
          const messageContent = 'Download Started';
          if (openSnackBar) { openSnackBar({ messageContent }); }
        })
        .catch(() => {
          const messageContent = 'Error Downloading File Content';
          if (openSnackBar) { openSnackBar({ messageContent, messageColor: 'secondary' }); }
        });
    });
};

const FileDownload = ({ fileDocument, openSnackBar }) => {
  if (fileDocument === undefined) { return null; }
  const { path: fileName, id: fileId, state } = fileDocument;
  if (!DOWNLOAD_STATES.includes(state)) { return null; }
  const onDownload = () => getDownloadNoAuth({ fileId, fileName, openSnackBar });
  return (
    <Tooltip title="Download">
      <IconButton onClick={onDownload}>
        <CloudDownloadIcon />
      </IconButton>
    </Tooltip>
  );
};

export default withSnackbarNoRouter(FileDownload);
