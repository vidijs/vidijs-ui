import React from 'react';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import update from 'immutability-helper';
import Typography from '@material-ui/core/Typography';

import decodeUrl from '../../utils/decodeUrl';
import encodeUrl from '../../utils/encodeUrl';

const FILE_SCHEME = 'file';
const S3_SCHEME = 's3';
const FTP_SCHEME = 'ftp';
const SFTP_SCHEME = 'sftp';
const HTTP_SCHEME = 'http';
const HTTPS_SCHEME = 'https';
const OMMS_SCHEME = 'omms';
const DS3_SCHEME = 'ds3';
const AZURE_SCHEME = 'azure';
const GS_SCHEME = 'gs';
const VSA_SCHEME = 'vxa';
const UNIVERSAL_SCHEME = 'universal';

function S3Form({
  values = {},
  onChange,
  onQueryParamsChange,
}) {
  return (
    <>
      <TextField
        label="Bucket"
        value={values.host || ''}
        onChange={onChange('host')}
        fullWidth
      />
      <TextField
        label="Folder"
        value={values.path || ''}
        onChange={onChange('path')}
        fullWidth
      />
      <TextField
        label="Access Key"
        value={values.username || ''}
        onChange={onChange('username')}
        fullWidth
      />
      <TextField
        label="Secret Key"
        value={values.password || ''}
        onChange={onChange('password')}
        fullWidth
      />
      <TextField
        label="Endpoint"
        value={values.queryParams.endpoint || ''}
        onChange={onQueryParamsChange('endpoint')}
        fullWidth
      />
      <TextField
        label="Region"
        value={values.queryParams.region || ''}
        onChange={onQueryParamsChange('region')}
        fullWidth
      />

      <TextField
        select
        fullWidth
        value={values.queryParams.signer || ''}
        onChange={onQueryParamsChange('signer')}
        label="Signer Type"
      >
        <MenuItem value="" />
        <MenuItem value="S3SignerType">S3 Signer</MenuItem>
        <MenuItem value="AWSS3V4SignerType">AWS S3 v4 Signer</MenuItem>
      </TextField>

      <TextField
        select
        fullWidth
        value={values.queryParams.storageClass || 'standard'}
        onChange={onQueryParamsChange('storageClass')}
        label="Storage Class"
      >
        <MenuItem value="standard">Standard</MenuItem>
        <MenuItem value="infrequent">Infrequent</MenuItem>
        <MenuItem value="reduced">Reduced</MenuItem>
      </TextField>

      <TextField
        label="SSE Algorithm"
        value={values.queryParams.sseAlgorithm || ''}
        onChange={onQueryParamsChange('sseAlgorithm')}
        fullWidth
      />
      <TextField
        label="SSE Key ID"
        value={values.queryParams.sseKeyId || ''}
        onChange={onQueryParamsChange('sseKeyId')}
        fullWidth
      />

      <TextField
        select
        fullWidth
        value={values.queryParams.accelerate || 'false'}
        onChange={onQueryParamsChange('accelerate')}
        label="Accelerate Transfer"
      >
        <MenuItem value="true">True</MenuItem>
        <MenuItem value="false">False</MenuItem>
      </TextField>

      <TextField
        select
        fullWidth
        value={values.queryParams.retrievalTier || ''}
        onChange={onQueryParamsChange('retrievalTier')}
        label="Retrieval Tier"
      >
        <MenuItem value="" />
        <MenuItem value="Expedited">Expedited</MenuItem>
        <MenuItem value="Standard">Standard</MenuItem>
        <MenuItem value="Bulk">Bulk</MenuItem>
      </TextField>
      <TextField
        select
        fullWidth
        value={values.queryParams.ssl || 'true'}
        onChange={onQueryParamsChange('ssl')}
        label="Use SSL"
      >
        <MenuItem value="true">True</MenuItem>
        <MenuItem value="false">False</MenuItem>
      </TextField>
    </>
  );
}

function Ds3Form({
  values = {},
  onChange,
  onQueryParamsChange,
}) {
  return (
    <>
      <TextField
        label="Bucket"
        value={values.host || ''}
        onChange={onChange('host')}
        fullWidth
      />
      <TextField
        label="Folder"
        value={values.path || ''}
        onChange={onChange('path')}
        fullWidth
      />
      <TextField
        label="Access Key"
        value={values.username || ''}
        onChange={onChange('username')}
        fullWidth
      />
      <TextField
        label="Secret Key"
        value={values.password || ''}
        onChange={onChange('password')}
        fullWidth
      />
      <TextField
        label="Endpoint"
        value={values.queryParams.endpoint || ''}
        onChange={onQueryParamsChange('endpoint')}
        fullWidth
      />
      <TextField
        label="Chunk Ready Timeout"
        value={values.queryParams.chunkReadyTimeout || ''}
        onChange={onQueryParamsChange('chunkReadyTimeout')}
        fullWidth
      />
      <TextField
        select
        fullWidth
        value={values.queryParams.checksumType || ''}
        onChange={onQueryParamsChange('checksumType')}
        label="Checksum Type"
      >
        <MenuItem value="" />
        <MenuItem value="md5">md5</MenuItem>
        <MenuItem value="crc32">crc32</MenuItem>
        <MenuItem value="crc32c">crc32c</MenuItem>
      </TextField>
    </>
  );
}

function AzureForm({
  values = {},
  onChange,
}) {
  return (
    <>
      <TextField
        label="Account Name"
        value={values.host || ''}
        onChange={onChange('host')}
        fullWidth
      />
      <TextField
        label="Container"
        value={values.path || ''}
        onChange={onChange('path')}
        fullWidth
      />
      <TextField
        label="Access Key"
        value={values.username || ''}
        onChange={onChange('username')}
        fullWidth
      />
    </>
  );
}

function GsForm({
  values = {},
  onChange,
  onQueryParamsChange,
}) {
  return (
    <>
      <TextField
        label="Bucket"
        value={values.host || ''}
        onChange={onChange('host')}
        fullWidth
      />
      <TextField
        label="Access Key"
        value={values.username || ''}
        onChange={onChange('username')}
        fullWidth
      />
      <TextField
        label="Project"
        value={values.queryParams.project || ''}
        onChange={onQueryParamsChange('project')}
        fullWidth
      />
      <TextField
        label="Account"
        value={values.queryParams.account || ''}
        onChange={onQueryParamsChange('account')}
        fullWidth
      />
    </>
  );
}

function FtpForm({
  values = {},
  onChange,
}) {
  return (
    <>
      <TextField
        label="Host"
        value={values.host || ''}
        onChange={onChange('host')}
        fullWidth
      />
      <TextField
        label="Path"
        value={values.path || ''}
        onChange={onChange('path')}
        fullWidth
      />
      <TextField
        label="Username"
        value={values.username || ''}
        onChange={onChange('username')}
        fullWidth
      />
      <TextField
        label="Password"
        value={values.password || ''}
        onChange={onChange('password')}
        fullWidth
      />
    </>
  );
}

function SftpForm({
  values = {},
  onChange,
}) {
  return (
    <>
      <TextField
        label="Host"
        value={values.host || ''}
        onChange={onChange('host')}
        fullWidth
      />
      <TextField
        label="Path"
        value={values.path || ''}
        onChange={onChange('path')}
        fullWidth
      />
      <TextField
        label="Username"
        value={values.username || ''}
        onChange={onChange('username')}
        fullWidth
      />
      <TextField
        label="Password"
        value={values.password || ''}
        onChange={onChange('password')}
        fullWidth
      />
    </>
  );
}

function HttpForm({
  values = {},
  onChange,
}) {
  return (
    <>
      <TextField
        label="Host"
        value={values.host || ''}
        onChange={onChange('host')}
        fullWidth
      />
      <TextField
        label="Path"
        value={values.path || ''}
        onChange={onChange('path')}
        fullWidth
      />
      <TextField
        label="Username"
        value={values.username || ''}
        onChange={onChange('username')}
        fullWidth
      />
      <TextField
        label="Password"
        value={values.password || ''}
        onChange={onChange('password')}
        fullWidth
      />
    </>
  );
}

function HttpsForm({
  values = {},
  onChange,
}) {
  return (
    <>
      <TextField
        label="Host"
        value={values.host || ''}
        onChange={onChange('host')}
        fullWidth
      />
      <TextField
        label="Path"
        value={values.path || ''}
        onChange={onChange('path')}
        fullWidth
      />
      <TextField
        label="Username"
        value={values.username || ''}
        onChange={onChange('username')}
        fullWidth
      />
      <TextField
        label="Password"
        value={values.password || ''}
        onChange={onChange('password')}
        fullWidth
      />
    </>
  );
}

function OmmsForm({
  values = {},
  onChange,
}) {
  return (
    <>
      <TextField
        label="Host"
        value={values.host || ''}
        onChange={onChange('host')}
        fullWidth
      />
      <TextField
        label="ClusterID/VaultID"
        value={values.path || ''}
        onChange={onChange('path')}
        fullWidth
      />
      <TextField
        label="User ID"
        value={values.username || ''}
        onChange={onChange('username')}
        fullWidth
      />
      <TextField
        label="User Key"
        value={values.password || ''}
        onChange={onChange('password')}
        fullWidth
      />
    </>
  );
}

function VsaForm({
  values = {},
  onChange,
}) {
  return (
    <>
      <TextField
        label="Agent UUID"
        value={values.host || ''}
        onChange={onChange('host')}
        fullWidth
      />
      <TextField
        label="Share"
        value={values.path || ''}
        onChange={onChange('path')}
        fullWidth
      />
    </>
  );
}

function FileForm({
  values = {},
  onChange,
}) {
  return (
    <>
      <TextField
        label="Path"
        value={values.path || ''}
        onChange={onChange('path')}
        fullWidth
      />
    </>
  );
}

export default class UrlForm extends React.PureComponent {
  static renderUrl(props) {
    const { path, protocol } = props;
    if (protocol === UNIVERSAL_SCHEME) {
      return 'universal:/';
    }
    if (path && !path.endsWith('/')) {
      return encodeUrl({ ...props, path: `${path}/` });
    }
    return encodeUrl(props);
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleQueryParamsChange = this.handleQueryParamsChange.bind(this);
    const values = decodeUrl(props.url);
    this.hasInitialProtocal = (values.protocol !== undefined);
    this.state = {
      ...values,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { name, change } = this.props;
    const prevUrl = UrlForm.renderUrl(prevState);
    const newUrl = UrlForm.renderUrl(this.state);
    if (change && prevUrl !== newUrl) {
      change(name, newUrl);
    }
  }

  handleChange(name) {
    return (event) => {
      this.setState({ [name]: event.target.value });
    };
  }

  handleQueryParamsChange(name) {
    return (event) => {
      let queryParams = { [name]: event.target.value };
      const prevState = this.state.queryParams;
      if (prevState) {
        queryParams = update(prevState, {
          [name]: {
            $set: event.target.value,
          },
        });
      }
      this.setState({ queryParams });
    };
  }

  render() {
    const { protocol } = this.state;
    let SchemeForm;
    switch (protocol) {
      case FILE_SCHEME:
        SchemeForm = FileForm;
        break;
      case S3_SCHEME:
        SchemeForm = S3Form;
        break;
      case FTP_SCHEME:
        SchemeForm = FtpForm;
        break;
      case SFTP_SCHEME:
        SchemeForm = SftpForm;
        break;
      case HTTP_SCHEME:
        SchemeForm = HttpForm;
        break;
      case HTTPS_SCHEME:
        SchemeForm = HttpsForm;
        break;
      case OMMS_SCHEME:
        SchemeForm = OmmsForm;
        break;
      case DS3_SCHEME:
        SchemeForm = Ds3Form;
        break;
      case AZURE_SCHEME:
        SchemeForm = AzureForm;
        break;
      case GS_SCHEME:
        SchemeForm = GsForm;
        break;
      case VSA_SCHEME:
        SchemeForm = VsaForm;
        break;
      default:
        SchemeForm = () => null;
        break;
    }
    const displayUrl = UrlForm.renderUrl(this.state);
    return (
      <>
        <Typography variant="subtitle2">
          URI:
          {' '}
          {displayUrl}
        </Typography>
        <FormHelperText>Protocol</FormHelperText>
        <TextField
          select
          fullWidth
          disabled={this.hasInitialProtocal}
          value={this.state.protocol || ''}
          onChange={this.handleChange('protocol')}
        >
          <MenuItem value={FILE_SCHEME}>File</MenuItem>
          <MenuItem value={S3_SCHEME}>S3</MenuItem>
          <MenuItem value={FTP_SCHEME}>FTP</MenuItem>
          <MenuItem value={SFTP_SCHEME}>SFTP</MenuItem>
          <MenuItem value={HTTP_SCHEME}>HTTP</MenuItem>
          <MenuItem value={HTTPS_SCHEME}>HTTPS</MenuItem>
          <MenuItem value={OMMS_SCHEME}>Matrix Store</MenuItem>
          <MenuItem value={DS3_SCHEME}>Spectra BlackPearl</MenuItem>
          <MenuItem value={AZURE_SCHEME}>Azure</MenuItem>
          <MenuItem value={GS_SCHEME}>Google Storage</MenuItem>
          <MenuItem value={VSA_SCHEME}>Vidispine Agent</MenuItem>
          <MenuItem value={UNIVERSAL_SCHEME}>Universal</MenuItem>
        </TextField>
        <SchemeForm
          values={this.state}
          onChange={this.handleChange}
          onQueryParamsChange={this.handleQueryParamsChange}
        />
      </>
    );
  }
}
