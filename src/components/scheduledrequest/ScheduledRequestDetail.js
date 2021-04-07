import React from 'react';

import { scheduledrequest as api } from '@vidispine/vdt-api';
import TextGrid from '../ui/TextGrid';

export default function ScheduledRequestDetail({
  scheduledRequestType,
  openSnackBar,
}) {
  const {
    id: requestId,
    request = {},
    response = {},
  } = scheduledRequestType;
  const { contentType } = response;
  const [responseBody, setResponseBody] = React.useState();
  const onGetScheduledRequestResponse = () => {
    if (!response.hasBody) return;
    api.getScheduledRequestResponse({ requestId })
      .then(({ data }) => setResponseBody(data))
      .catch(() => {
        const messageContent = 'Error Loading Request Response';
        openSnackBar({ messageContent, messageColor: 'secondary' });
      });
  };
  React.useEffect(onGetScheduledRequestResponse, []);
  return (
    <>
      <TextGrid title="URI" value={request.uri} hover />
      <TextGrid title="Method" value={request.method} hover />
      <TextGrid
        title="Request Body"
        value={request.body}
        variant="code"
        hover
        hideNoValue
      />
      {response.statusCode && (
      <>
        <TextGrid title="Response Status" value={response.statusCode} hover />
        <TextGrid title="Response Content-Type" value={response.contentType} hover />
        {responseBody && (
        <TextGrid
          title="Response Body"
          value={contentType === 'application/json' ? JSON.stringify(responseBody) : responseBody}
          variant={contentType}
          hover
          hideNoValue
        />
        )}
      </>
      )}
    </>
  );
}
