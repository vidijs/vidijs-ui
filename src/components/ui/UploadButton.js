import React from 'react';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';

export default function UploadButton({
  input,
  meta,
  loading,
  fullWidth = false,
}) {
  const { value } = input;
  const fileName = value && value[0].name;
  return (
    <>
      {Boolean(meta.touched && meta.error) && (
        <FormHelperText error>
          {meta.error}
        </FormHelperText>
      )}
      <Button
        variant="text"
        component="label"
        color="primary"
        disableRipple
        disabled={loading}
        fullWidth={fullWidth}
      >
        {fileName || 'Choose File'}
        <input
          style={{ display: 'none' }}
          type="file"
          onChange={input.onChange}
        />
      </Button>
    </>
  );
}
