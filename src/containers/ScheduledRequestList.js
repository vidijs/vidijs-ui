import React from 'react';

import ScheduledRequestTitle from '../components/scheduledrequest/ScheduledRequestTitle';
import ScheduledRequestFilterCard from '../components/scheduledrequest/ScheduledRequestFilterCard';
import ScheduledRequestCard from '../components/scheduledrequest/ScheduledRequestCard';
import ScheduledRequestRemoveAll from '../components/scheduledrequest/ScheduledRequestRemoveAll';
import withFormActions from '../hoc/withFormActions';

const SCHEDULED_FILTER_FORM = 'SCHEDULED_FILTER_FORM';
const SCHEDULED_REMOVEALL = 'SCHEDULED_REMOVEALL';

export default withFormActions(({ submitForm }) => {
  document.title = 'xray | Scheduled Requests';
  const onRefresh = () => { submitForm(SCHEDULED_FILTER_FORM); };
  const [scheduledRequestListDocument, setScheduledRequestListDocument] = React.useState();
  const onSuccess = ({ data }) => setScheduledRequestListDocument(data);
  React.useEffect(onRefresh, []);
  return (
    <>
      <ScheduledRequestTitle
        code={scheduledRequestListDocument}
        codeModal="ScheduledRequestListDocument"
        onRefresh={onRefresh}
        removeModal={SCHEDULED_REMOVEALL}
      />
      <ScheduledRequestFilterCard
        form={SCHEDULED_FILTER_FORM}
        onSuccess={onSuccess}
      />
      {scheduledRequestListDocument && (
      <ScheduledRequestCard
        scheduledRequestListDocument={scheduledRequestListDocument}
        onSuccess={onRefresh}
      />
      )}
      <ScheduledRequestRemoveAll
        dialogName={SCHEDULED_REMOVEALL}
        onSuccess={onRefresh}
      />
    </>
  );
});
