import { SubmissionError } from 'redux-form';
import { component as api } from '@vidispine/vdt-api';

const onError = (error) => {
  let errorMessage = error.message;
  if (error.response) {
    errorMessage = JSON.stringify(
      error.response.data, (k, v) => (v === null ? undefined : v
      ),
    );
  }
  throw new SubmissionError({ _error: errorMessage });
};

export function onCreateComponent(form, dispatch, props) {
  try {
    const { queryParams } = form;
    const itemId = props.itemId || form.itemId;
    const shapeId = props.shapeId || form.shapeId;
    return api.createComponent({
      itemId,
      shapeId,
      queryParams,
    })
      .catch(onError);
  } catch (error) {
    return onError(error);
  }
}

export function onCreateComponentPlaceholder(form, dispatch, props) {
  try {
    const { queryParams } = form;
    const itemId = props.itemId || form.itemId;
    const shapeId = props.shapeId || form.shapeId;
    return api.createComponentPlaceholder({
      itemId,
      shapeId,
      queryParams,
    })
      .catch(onError);
  } catch (error) {
    return onError(error);
  }
}
