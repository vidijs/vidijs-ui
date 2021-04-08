/* eslint-disable max-len */
import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '../ui/DialogContent';
import { withModalNoRouter } from '../../hoc/withModal';
import TextGrid from '../ui/TextGrid';

const corsConfigurationDocumentXML = `<CORSConfigurationDocument xmlns="http://xml.vidispine.com/schema/vidispine">
    <entry>
        <request>
            <origin>${window.location.origin}</origin>
        </request>
        <response>
            <allowOrigin>${window.location.origin}</allowOrigin>
            <allowMethods>OPTIONS,GET,HEAD,POST,PUT,DELETE</allowMethods>
            <allowHeaders>accept,content-type,authorization,index,size,runas</allowHeaders>
            <allowMaxAge>600</allowMaxAge>
        </response>
    </entry>
</CORSConfigurationDocument>`;

const corsConfigurationDocumentJSON = `{
  "entry": [
    {
      "request": [
        {
          "origin": [
            "${window.location.origin}"
          ]
        }
      ],
      "response": {
        "allowOrigin": "${window.location.origin}",
        "allowMethods": [
          "OPTIONS,GET,HEAD,POST,PUT,DELETE"
        ],
        "allowHeaders": [
          "accept,content-type,authorization,index,size,runas"
        ],
        "allowMaxAge": 600
      }
    }
  ]
}`;

const curlCommand = `curl '{YOUR_VIDICORE_SERVER}/API/configuration/cors' \\
-uadmin -XPUT -H 'Content-Type: application/json' \\
--data-raw '{
  "entry": [
    {
      "request": [
        {
          "origin": [
            "${window.location.origin}"
          ]
        }
      ],
      "response": {
        "allowOrigin": "${window.location.origin}",
        "allowMethods": [
          "OPTIONS,GET,HEAD,POST,PUT,DELETE"
        ],
        "allowHeaders": [
          "accept,content-type,authorization,index,size,runas"
        ],
        "allowMaxAge": 600
      }
    }
  ]
}'`;

const XML_TAB = 'XML_TAB';
const JSON_TAB = 'JSON_TAB';
const CURL_TAB = 'CURL_TAB';

function LoginHelpDialog({
  open,
  onClose,
  baseUrl,
}) {
  const [tab, setTab] = React.useState(XML_TAB);
  const onChangeTab = (event, newTab) => setTab(newTab);
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
    >
      <DialogTitle>Configure CORS</DialogTitle>
      <DialogContent>
        Cross-Origin must be configured on the VidiCore server to allow browser requests from this location.
      </DialogContent>
      <DialogContent>
        <Tabs
          value={tab}
          onChange={onChangeTab}
        >
          <Tab label="XML" value={XML_TAB} />
          <Tab label="JSON" value={JSON_TAB} />
          <Tab label="cURL" value={CURL_TAB} />
        </Tabs>
        {{
          XML_TAB: (
            <>
              <TextGrid
                title="Request"
                value={`PUT ${baseUrl}/API/configuration/cors`}
                variant="xml"
                codeProps={{ lineNumbers: false }}
                noWrapTitle={false}
              />
              <TextGrid
                title="Body"
                value={corsConfigurationDocumentXML}
                variant="xml"
                codeProps={{ lineNumbers: false }}
              />
            </>
          ),
          JSON_TAB: (
            <>
              <TextGrid
                title="Request"
                value={`PUT ${baseUrl}/API/configuration/cors`}
                variant="xml"
                codeProps={{ lineNumbers: false }}
                noWrapTitle={false}
              />
              <TextGrid
                title="Body"
                value={corsConfigurationDocumentJSON}
                variant="json"
                codeProps={{ lineNumbers: false }}
              />
            </>
          ),
          CURL_TAB: (
            <TextGrid
              value={curlCommand.replace('{YOUR_VIDICORE_SERVER}', baseUrl)}
              variant="code"
              codeProps={{ lineNumbers: false, mode: 'shell' }}
            />
          ),
        }[tab]}
      </DialogContent>
      <DialogContent>
        <Link
          href="https://apidoc.vidispine.com/latest/system/property.html#cors-configuration"
          variant="body2"
          color="inherit"
          target="_blank"
          rel="noopener noreferrer"
        >
          View API Documentation
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
