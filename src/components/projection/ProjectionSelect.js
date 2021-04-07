import React from 'react';
import { Field } from 'redux-form';

import { projection as api } from '@vidispine/vdt-api';
import { StatefulAsyncSelect } from '../ui/Select';

export const loadProjectionOptions = (inputValue) => new Promise((resolve, reject) => {
  api.listProjection()
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((jsonDocument) => {
      const { uri = [] } = jsonDocument;
      let filterProj = uri;
      if (inputValue && inputValue !== '*') {
        filterProj = uri.filter((p) => p.toLowerCase().includes(inputValue.toLowerCase()));
      }
      const options = filterProj.map((p) => ({ label: p, value: p }));
      resolve(options);
    })
    .catch((error) => {
      reject(error);
    });
});

const parseValue = (value) => {
  if (value) {
    return value.value;
  }
  return '';
};

export default function ProjectionSelect(props) {
  return (
    <Field
      component={StatefulAsyncSelect}
      loadOptions={loadProjectionOptions}
      cacheOptions
      defaultOptions
      parse={parseValue}
      {...props}
    />
  );
}
