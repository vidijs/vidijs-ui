import React from 'react';
import { Field } from 'redux-form';

import { exportlocation as api } from '@vidijs/vidijs-api';
import Select from '../ui/Select';

export const loadExportLocationOptions = (inputValue) => new Promise((resolve, reject) => {
  api.listExportLocation()
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((jsonDocument) => {
      const { exportLocation = [] } = jsonDocument;
      let filterExportLocation = exportLocation;
      if (inputValue && inputValue !== '*') filterExportLocation = exportLocation.filter((f) => f.name.toLowerCase().includes(inputValue.toLowerCase()));
      const options = filterExportLocation.map((f) => ({ label: f.name, value: f.name }));
      resolve(options);
    })
    .catch((error) => {
      reject(error);
    });
});

const parse = (value) => {
  if (value) {
    return value.value;
  }
  return undefined;
};

export default function ExportLocationSelect(props) {
  return (
    <Field
      component={Select}
      loadOptions={loadExportLocationOptions}
      cacheOptions
      parse={parse}
      {...props}
    />
  );
}
