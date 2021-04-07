import { SubmissionError } from 'redux-form';

import { taskdefinition as api } from '@vidijs/vidijs-api';

export function onCreate(form) {
  const { taskDefinitionDocument } = form;
  const taskDefinitionListDocument = { task: [taskDefinitionDocument] };
  return api.createTaskDefinition({
    taskDefinitionListDocument,
  })
    .then((response) => ({ uriListDocument: response.data }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onUpdate(form, dispatch, props) {
  const { taskDefinitionDocument } = form;
  const taskDefinitionId = props.taskDefinitionId || taskDefinitionDocument.id;
  return api.modifyTaskDefinition({
    taskDefinitionId,
    taskDefinitionDocument,
  })
    .then((response) => ({ taskDefinitionDocument: response.data, taskDefinitionId }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onCreateJobType(form) {
  const { jobType, queryParams } = form;
  return api.createJobType({
    jobType,
    queryParams,
  })
    .then(() => ({ jobType }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        if (error.response.status === 404) {
          errorMessage = '{"invalidInput":{"context":"job-type","explanation":"id must be between 20000 and 30000"}}';
        } else {
          errorMessage = JSON.stringify(
            error.response.data,
            (k, v) => (v === null ? undefined : v),
          );
        }
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}
