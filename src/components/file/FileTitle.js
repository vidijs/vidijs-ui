import React from 'react';
import Typography from '@material-ui/core/Typography';

import TitleHeader from '../ui/TitleHeader';
import Menu, { MenuItem } from '../ui/Menu';
import UnstyledLink from '../ui/UnstyledLink';
import { withModalNoRouter } from '../../hoc/withModal';
import FileDownload from './FileDownload';
import FileStatus from './FileStatus';

const AbandonMenuItem = ({ fileDocument, abandonModal, onOpen }) => {
  if (fileDocument === undefined) { return null; }
  if (!fileDocument.item) { return null; }
  return (
    <MenuItem onClick={() => onOpen({ modalName: abandonModal })}>
      <Typography color="secondary">Abandon Item</Typography>
    </MenuItem>
  );
};

function FileTitle({
  fileId,
  onOpen,
  stateModal,
  moveModal,
  abandonModal,
  deleteModal,
  removeEntityModal,
  pathModal,
  overwriteModal,
  ...props
}) {
  return (
    <TitleHeader
      helpTo="/ref/storage/file.html"
      title={fileId}
      parentTitle="File"
      parentTo="/file/"
      iconList={(
        <>
          <FileStatus fileDocument={props.code} />
          <FileDownload fileDocument={props.code} />
          <Menu>
            <MenuItem onClick={() => onOpen({ modalName: stateModal })}>
              <Typography color="inherit">Change State</Typography>
            </MenuItem>
            <UnstyledLink to={`/import?tab=IMPORTFILE_TAB&fileId=${fileId}`}>
              <MenuItem>
                <Typography color="inherit">Import As Item</Typography>
              </MenuItem>
            </UnstyledLink>
            <UnstyledLink to={`/import?tab=IMPORTCOMPONENT_TAB&fileId=${fileId}`}>
              <MenuItem>
                <Typography color="inherit">Import To Component</Typography>
              </MenuItem>
            </UnstyledLink>
            <UnstyledLink to={`/import?tab=IMPORTSIDECAR_TAB&fileId=${fileId}`}>
              <MenuItem>
                <Typography color="inherit">Import As Sidecar</Typography>
              </MenuItem>
            </UnstyledLink>
            <MenuItem onClick={() => onOpen({ modalName: moveModal })}>
              <Typography color="inherit">Copy/Move File</Typography>
            </MenuItem>
            <MenuItem onClick={() => onOpen({ modalName: pathModal })}>
              <Typography color="inherit">Set New Path</Typography>
            </MenuItem>
            <MenuItem onClick={() => onOpen({ modalName: overwriteModal })}>
              <Typography color="inherit">Overwrite File Data</Typography>
            </MenuItem>
            <AbandonMenuItem
              fileDocument={props.code}
              abandonModal={abandonModal}
              onOpen={onOpen}
            />
            <MenuItem onClick={() => onOpen({ modalName: removeEntityModal })}>
              <Typography color="secondary">Remove Entity</Typography>
            </MenuItem>
            <MenuItem onClick={() => onOpen({ modalName: deleteModal })}>
              <Typography color="secondary">Delete File</Typography>
            </MenuItem>
          </Menu>
        </>
      )}
      {...props}
    />
  );
}
export default withModalNoRouter(FileTitle);
