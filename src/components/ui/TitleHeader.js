import React from 'react';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import CodeIcon from '@material-ui/icons/Code';
import PlaylistAdd from '@material-ui/icons/PlaylistAdd';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import Help from '@material-ui/icons/Help';
import Refresh from '@material-ui/icons/Refresh';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteForever from '@material-ui/icons/DeleteForever';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import ExternalIdLink from '../externalid/ExternalIdLink';

import withUI from '../../hoc/withUI';
import CodeModal from './CodeModal';


function TitleHeader({
  title,
  openCode,
  openAction,
  actionComponent,
  iconList,
  parentTitle,
  grandParentTo,
  grandParentTitle,
  parentTo,
  entityId,
  entityType,
  onRefresh,
  helpTo,
  codeModal,
  onOpen: openModal,
  createModal,
  removeModal,
  code,
  titleChip,
  addAccessControl,
  style = {},
}) {
  const baseUrl = localStorage.getItem('vsBaseUrl');
  const breadcrumb =
    (
      <Grid
        container
        alignItems="center"
      >
        {grandParentTitle &&
          <Grid item>
              {grandParentTo ?
                <Typography
                  variant="headline"
                  color="textSecondary"
                  component={Link}
                  to={grandParentTo}
                  style={{ textDecoration: 'none' }}
                >
                  {grandParentTitle}
                </Typography> :
                <Typography variant="headline" color="textSecondary">
                  {grandParentTitle}
                </Typography>
              }
          </Grid>
        }
        {grandParentTitle &&
          <Grid item>
            <IconButton disabled>
              <ArrowForwardIos />
            </IconButton>
          </Grid>
        }
        {parentTitle &&
          <Grid item>
              {parentTo ?
                <Typography
                  variant="headline"
                  color="textSecondary"
                  component={Link}
                  to={parentTo}
                  style={{ textDecoration: 'none' }}
                >
                  {parentTitle}
                </Typography> :
                <Typography variant="headline" color="textSecondary">
                  {parentTitle}
                </Typography>
              }
          </Grid>
        }
        {parentTitle &&
          <Grid item>
            <IconButton disabled>
              <ArrowForwardIos />
            </IconButton>
          </Grid>
        }
        <Grid item>
          <Typography variant="headline">
            {title}
          </Typography>
        </Grid>
        {titleChip && (
          <Chip label={titleChip} />
        )}
      </Grid>
    );
  let openCodeComponent;
  if (openCode) {
    openCodeComponent = (
      <Tooltip title="Code">
        <IconButton onClick={openCode}>
          <CodeIcon />
        </IconButton>
      </Tooltip>
    );
  } else if (codeModal) {
    openCodeComponent = (
      <Tooltip title="Code">
        <IconButton onClick={() => openModal({ modalName: codeModal })}>
          <CodeIcon />
        </IconButton>
      </Tooltip>
    );
  }
  const refeshAction = onRefresh && (
    <Tooltip title="Refresh">
      <IconButton onClick={onRefresh}>
        <Refresh />
      </IconButton>
    </Tooltip>
  );
  let defaultAction;
  if (openAction) {
    defaultAction = (
      <IconButton onClick={openAction}>
        <PlaylistAdd />
      </IconButton>
    );
  } else if (createModal) {
    defaultAction = (
      <Tooltip title="New">
        <IconButton onClick={() => openModal({ modalName: createModal })}>
          <PlaylistAdd />
        </IconButton>
      </Tooltip>
    );
  }
  const openHelp = helpTo && (
    <Tooltip title="API Guide">
      <IconButton onClick={() => window.open(`${baseUrl}/APIdoc${helpTo}`)}>
        <Help />
      </IconButton>
    </Tooltip>
  );
  const openRemove = removeModal && (
    <Tooltip title="Remove">
      <IconButton onClick={() => openModal({ modalName: removeModal })}>
        <DeleteForever />
      </IconButton>
    </Tooltip>
  );
  const openExternalId = entityId && (
    <ExternalIdLink entityId={entityId} entityType={entityType} />
  );
  const openAddAccess = addAccessControl && (
    <Tooltip title="Add ACL">
      <IconButton onClick={() => openModal({ modalName: addAccessControl })}>
        <AccessibilityIcon />
      </IconButton>
    </Tooltip>
  );
  const action = actionComponent || defaultAction;
  return (
    <div style={style}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="baseline"
      >
        <Grid item>
          {breadcrumb}
        </Grid>
        <Grid item>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            {openRemove}
            {openHelp}
            {openAddAccess}
            {openExternalId}
            {openCodeComponent}
            {refeshAction}
            {iconList}
            {action}
          </Grid>
        </Grid>
      </Grid>
      { code &&
      <CodeModal
        dialogName={codeModal}
        code={code}
        title={codeModal}
      />
    }
    </div>
  );
}

export default withUI(TitleHeader);
