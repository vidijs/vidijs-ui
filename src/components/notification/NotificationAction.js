import React from 'react';

import TextGrid from '../ui/TextGrid';

const ActionType = ({ ...props }) => (
  <React.Fragment>
    <TextGrid title="Extra Data" value={props.extradata} />
    <TextGrid title="Retry" value={props.retry} />
    <TextGrid title="Synchronous" value={props.synchronous} />
    <TextGrid title="Group" value={props.group} />
  </React.Fragment>
);

const HttpActionType = ({ action: { http } }) => (
  <React.Fragment>
    <TextGrid title="URL" value={http.url} />
    <TextGrid title="Content Type" value={http.contentType} />
    <TextGrid title="Method" value={http.method} />
    <TextGrid title="Timeout" value={http.timeout} />
    <ActionType {...http} />
  </React.Fragment>
);

const EjbActionType = ({ action: { ejb } }) => (
  <React.Fragment>
    <TextGrid title="Bean" value={ejb.bean} />
    <TextGrid title="Method" value={ejb.method} />
    { ejb.data &&
      ejb.data.map(thisData => (
        <TextGrid title={thisData.key} value={thisData.value} />
      ))
    }
    <ActionType {...ejb} />
  </React.Fragment>
);

const JmsActionType = ({ action: { jms } }) => (
  <React.Fragment>
    <TextGrid title="Queue" value={jms.queue} />
    <TextGrid title="Queue Factory" value={jms.queueFactory} />
    <TextGrid title="Content Type" value={jms.contentType} />
    <TextGrid title="Username" value={jms.username} />
    <TextGrid title="Password" value={jms.password} />
    <ActionType {...jms} />
  </React.Fragment>
);

const SqsActionType = ({ action: { sqs } }) => (
  <React.Fragment>
    <TextGrid title="Queue" value={sqs.queue} />
    <TextGrid title="Endpoint" value={sqs.endpoint} />
    <TextGrid title="Content Type" value={sqs.contentType} />
    <TextGrid title="Access Key" value={sqs.accessKey} />
    <TextGrid title="Secret Key" value={sqs.secret} />
    <ActionType {...sqs} />
  </React.Fragment>
);

const JavascriptActionType = ({ action: { javascript } }) => (
  <React.Fragment>
    <TextGrid
      value={javascript.script}
      variant="code"
      codeProps={{
        mode: 'application/javascript',
      }}
    />
    <ActionType {...javascript} />
  </React.Fragment>
);


export function getActionType(action = {}) {
  if ('http' in action) {
    return 'http';
  } else if ('ejb' in action) {
    return 'ejb';
  } else if ('jms' in action) {
    return 'jms';
  } else if ('sqs' in action) {
    return 'sqs';
  } else if ('javascript' in action) {
    return 'javascript';
  }
  return undefined;
}


export default function NotificationAction({
  action = {},
}) {
  let ActionComponent = <React.Fragment />;
  const actionType = getActionType(action);
  switch (actionType) {
    case 'http':
      ActionComponent = HttpActionType;
      break;
    case 'ejb':
      ActionComponent = EjbActionType;
      break;
    case 'jms':
      ActionComponent = JmsActionType;
      break;
    case 'sqs':
      ActionComponent = SqsActionType;
      break;
    case 'javascript':
      ActionComponent = JavascriptActionType;
      break;
    default:
      break;
  }
  return (
    <React.Fragment>
      <TextGrid title="Action Type" value={actionType} />
      <ActionComponent action={action} />
    </React.Fragment>
  );
}
