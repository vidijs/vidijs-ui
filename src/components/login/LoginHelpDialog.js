import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '../ui/DialogContent';
import { withModalNoRouter } from '../../hoc/withModal';
import TextGrid from '../ui/TextGrid';


const corsConfigurationDocument = `<CORSConfigurationDocument xmlns="http://xml.vidispine.com/schema/vidispine">
    <entry>
        <request>
            <origin>${window.location.origin}</origin>
        </request>
        <response>
            <allowOrigin>${window.location.origin}</allowOrigin>
            <allowMethods>*</allowMethods>
            <allowHeaders>*</allowHeaders>
            <allowMaxAge>600</allowMaxAge>
        </response>
    </entry>
</CORSConfigurationDocument>`;

function LoginHelpDialog({
  open,
  onClose,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
    >
      <DialogTitle>Configure CORS</DialogTitle>
      <DialogContent>
        {'Cross-Origin must be configured on the Vidispine API server to allow browser requests from this location.'}

      </DialogContent>
      <DialogContent>
        <TextGrid
          title="Request"
          value="PUT /API/configuration/cors"
          variant="xml"
          codeProps={{ lineNumbers: false }}
        />
        <TextGrid
          title="Body"
          value={corsConfigurationDocument}
          variant="xml"
          codeProps={{ lineNumbers: false }}
        />
      </DialogContent>
      <DialogContent>
        <Link
          href="https://apidoc.vidispine.com/latest/system/property.html#cors-configuration"
          variant="body2"
          color="inherit"
          target="_blank"
          rel="noopener noreferrer"
        >
          {'View API Documentation'}
        </Link>
      </DialogContent>
      <DialogActions>
        <Button
          size="small"
          color="inherit"
          onClick={onClose}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}


export default withModalNoRouter(LoginHelpDialog);
