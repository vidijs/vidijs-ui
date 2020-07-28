import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Checkbox from '@material-ui/core/Checkbox';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import startCase from 'lodash.startcase';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import CodeMirror from './CodeMirror';
import { bitRateToSize, freqToSize } from '../../utils/bitsToSize';
import formatXML from '../../utils/formatXML';
import formatJSON from '../../utils/formatJSON';
import { capitalizeString, bytesToSize } from '../../utils';
import UnstyledLink from './UnstyledLink';
import withErrorBoundary from '../../hoc/withErrorBoundary';

const hoverStyle = theme => ({
  FormControlLabel: {
    height: theme.typography.subtitle1.lineHeight,
  },
  onHover: {
    minHeight: '32px',
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
  default: {
    minHeight: '32px',
  },
});


function fromNow(value) {
  const startMoment = moment(value);
  const nowMoment = moment();
  const durationMoment = moment.duration(nowMoment.diff(startMoment));
  return `${parseInt(durationMoment.asMinutes(), 10)} minutes`;
}

function SetValueComponent({
  value,
  variant,
  capitalize,
  classes,
  ...typographyProps
}) {
  let valueComponent = null;
  if (value === undefined || null) {
    return valueComponent;
  }
  const StyledTypography = props => <Typography color="textPrimary" variant="subtitle2" {...typographyProps} {...props} />;
  switch (variant) {
    case 'checkbox':
      valueComponent = (
        <Checkbox
          checked={value}
          disabled
        />
      );
      break;
    case 'component':
      valueComponent = value;
      break;
    case 'aspectratio':
      if (typeof value === 'object' && value.horizontal) {
        valueComponent = (
          <StyledTypography>
            {`Horizontal:${value.horizontal} Vertical:${value.vertical}`}
          </StyledTypography>
        );
      }
      break;
    case 'duration':
      if (typeof value === 'object' && value.started) {
        const startMoment = moment(value.started);
        const finishedMoment = moment(value.finished);
        const durationMoment = moment.duration(finishedMoment.diff(startMoment));
        const durationHuman = durationMoment.humanize();
        valueComponent = (
          <StyledTypography>
            {durationHuman}
          </StyledTypography>
        );
      }
      break;
    case 'fromnow':
      valueComponent = (
        <StyledTypography>
          {fromNow(value)}
        </StyledTypography>
      );
      break;
    case 'timestamp':
      valueComponent = (
        <StyledTypography>
          {value}
        </StyledTypography>
      );
      break;
    case 'seconds':
      valueComponent = (
        <StyledTypography>
          {moment.duration(value, 'seconds').humanize()}
        </StyledTypography>
      );
      break;
    case 'rational':
      if (typeof value === 'object' && value.denominator) {
        valueComponent = (
          <StyledTypography>
            {`${value.numerator}/${value.denominator}`}
          </StyledTypography>
        );
      }
      break;
    case 'resolution':
      if (typeof value === 'object' && value.width) {
        valueComponent = (
          <StyledTypography>
            {`Width:${value.width} Height:${value.height}`}
          </StyledTypography>
        );
      }
      break;
    case 'timebase':
      if (typeof value === 'object' && value.denominator) {
        valueComponent = (
          <StyledTypography>
            {`${value.denominator}/${value.numerator}`}
          </StyledTypography>
        );
      }
      break;
    case 'timecode':
      if (typeof value === 'object' && value.samples) {
        valueComponent = (
          <StyledTypography>
            {`${value.samples}@${value.timeBase.denominator}/${value.timeBase.numerator}`}
          </StyledTypography>
        );
      }
      break;
    case 'fps':
      if (typeof value === 'object' && value.denominator) {
        const videoSamplerate = +(value.denominator / value.numerator).toFixed(2);
        valueComponent = (
          <StyledTypography>
            {`${videoSamplerate} fps`}
          </StyledTypography>
        );
      }
      break;
    case 'fps-reverse':
      if (typeof value === 'object' && value.denominator) {
        const videoSamplerate = +(value.numerator / value.denominator).toFixed(2);
        valueComponent = (
          <StyledTypography>
            {`${videoSamplerate} fps`}
          </StyledTypography>
        );
      }
      break;
    case 'bitrate':
      valueComponent = (
        <StyledTypography>
          {bitRateToSize(value)}
        </StyledTypography>
      );
      break;
    case 'percent':
      valueComponent = (
        <StyledTypography>
          {`${parseInt(value, 10) || 0}%`}
        </StyledTypography>
      );
      break;
    case 'frequency':
      valueComponent = (
        <StyledTypography>
          {freqToSize(value)}
        </StyledTypography>
      );
      break;
    case 'bytes':
      valueComponent = (
        <StyledTypography>
          {bytesToSize(value)}
        </StyledTypography>
      );
      break;
    case 'username':
      valueComponent = (
        <StyledTypography>
          <UnstyledLink to={`/user/${value}/`}>{value}</UnstyledLink>
        </StyledTypography>
      );
      break;
    case 'group':
      valueComponent = (
        <StyledTypography>
          <UnstyledLink to={`/group/${value}/`}>{value}</UnstyledLink>
        </StyledTypography>
      );
      break;
    case 'shape-tag':
      valueComponent = (
        <StyledTypography>
          <UnstyledLink to={`/shape-tag/${value}/`}>{value}</UnstyledLink>
        </StyledTypography>
      );
      break;
    case 'metadata-field':
      valueComponent = (
        <StyledTypography>
          <UnstyledLink to={`/metadata-field/${value}/`}>{value}</UnstyledLink>
        </StyledTypography>
      );
      break;
    case 'itemId':
      valueComponent = (
        <StyledTypography>
          <UnstyledLink to={`/item/${value}/`}>{value}</UnstyledLink>
        </StyledTypography>
      );
      break;
    case 'item':
      valueComponent = (
        <StyledTypography>
          <UnstyledLink to={`/item/${value}/`}>{value}</UnstyledLink>
        </StyledTypography>
      );
      break;
    case 'collectionId':
      valueComponent = (
        <StyledTypography>
          <UnstyledLink to={`/collection/${value}/`}>{value}</UnstyledLink>
        </StyledTypography>
      );
      break;
    case 'collection':
      valueComponent = (
        <StyledTypography>
          <UnstyledLink to={`/collection/${value}/`}>{value}</UnstyledLink>
        </StyledTypography>
      );
      break;
    case 'library':
      valueComponent = (
        <StyledTypography>
          <UnstyledLink to={`/library/${value}/`}>{value}</UnstyledLink>
        </StyledTypography>
      );
      break;
    case 'documentMetadataName':
      valueComponent = (
        <StyledTypography>
          <UnstyledLink to={`/document/${value}`}>{value}</UnstyledLink>
        </StyledTypography>
      );
      break;
    case 'document':
      valueComponent = (
        <StyledTypography>
          <UnstyledLink to={`/document/${value}`}>{value}</UnstyledLink>
        </StyledTypography>
      );
      break;
    case 'fileId':
      valueComponent = (
        <StyledTypography>
          <UnstyledLink to={`/file/${value}/`}>{value}</UnstyledLink>
        </StyledTypography>
      );
      break;
    case 'storageId':
      valueComponent = (
        <StyledTypography>
          <UnstyledLink to={`/storage/${value}/`}>{value}</UnstyledLink>
        </StyledTypography>
      );
      break;
    case 'jobtype':
      valueComponent = (
        <StyledTypography>
          <UnstyledLink to={`/task-definition/jobtype/${value}/`}>{value}</UnstyledLink>
        </StyledTypography>
      );
      break;
    case 'boolean':
      valueComponent = (
        <StyledTypography>
          {(value === 'true' || value === true) && 'True'}
          {(value === 'false' || value === false) && 'False'}
        </StyledTypography>
      );
      break;
    case 'list':
      if (Array.isArray(value)) {
        valueComponent = (
          value.map(label => (
            <Chip key={label} label={label} />
          ))
        );
      }
      break;
    default:
      if (variant) { console.warn(`TextGrid: Unknown variant=${variant}`); } // eslint-disable-line no-console
      valueComponent = (
        <StyledTypography>
          {capitalize ? capitalizeString(value) : value.toString()}
        </StyledTypography>
      );
      break;
  }
  return valueComponent;
}

function TextGrid({
  title,
  value,
  variant,
  capitalize = false,
  titleGridProps,
  valueGridProps,
  titleTypographyProps = {},
  valueTypographyProps = {},
  classes,
  hover = false,
  hideNoValue = false,
  titleStartCase = true,
  codeProps = {},
  onClick,
  disableOnClick = true,
  noWrap = false,
}) {
  const onTextClick = disableOnClick ? event => event.stopPropagation() : onClick;
  if (hideNoValue) {
    if (value === undefined) {
      return null;
    }
    if (Array.isArray(value) && value.length === 0) {
      return null;
    }
  }
  if (variant === 'code' || variant === 'text/plain') {
    return (
      <div>
        {title !== undefined &&
        <Typography
          variant="subtitle2"
          onClick={onTextClick}
        >
          {titleStartCase ? startCase(title) : title}
        </Typography>
        }
        <CodeMirror
          value={value || ''}
          onClick={onTextClick}
          options={{
            readOnly: true,
            theme: 'material',
            lineWrapping: true,
            lineNumbers: true,
            foldGutter: true,
            gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
            ...codeProps,
           }}
        />
      </div>
    );
  }
  if (variant === 'json' || variant === 'application/json') {
    return (
      <div>
        {title !== undefined &&
        <Typography
          variant="subtitle2"
          onClick={onTextClick}
        >
          {titleStartCase ? startCase(title) : title}
        </Typography>
        }
        <CodeMirror
          value={formatJSON(value) || ''}
          onClick={onTextClick}
          options={{
            readOnly: true,
            theme: 'material',
            mode: 'application/json',
            lineWrapping: true,
            lineNumbers: true,
            foldGutter: true,
            gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
            ...codeProps,
           }}
        />
      </div>
    );
  }
  if (variant === 'xml' || variant === 'application/xml') {
    return (
      <div>
        {title !== undefined &&
        <Typography
          variant="subtitle2"
          onClick={onTextClick}
        >
          {titleStartCase ? startCase(title) : title}
        </Typography>
        }
        <CodeMirror
          value={formatXML(value) || ''}
          onClick={onTextClick}
          options={{
            readOnly: true,
            theme: 'material',
            mode: 'xml',
            lineWrapping: true,
            lineNumbers: true,
            foldGutter: true,
            gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
            ...codeProps,
           }}
        />
      </div>
    );
  }
  if (variant === 'boolean') {
    return (
      <div
        className={hover ? classes.onHover : classes.default}
      >
        <FormControlLabel
          classes={{ root: classes.FormControlLabel }}
          control={
            <Checkbox
              checked={(value === 'true' || value === true)}
              indeterminate={(value === '' || value === undefined)}
              disabled
            />
          }
          label={
            <Typography variant="subtitle2" color="textSecondary">
              {titleStartCase ? startCase(title) : title}
            </Typography>
          }
        />
      </div>
    );
  }
  const valueComponent = SetValueComponent({
    value,
    variant,
    capitalize,
    onClick: onTextClick,
    classes,
    noWrap,
    ...valueTypographyProps,
  });
  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      className={hover ? classes.onHover : classes.default}
      wrap="nowrap"
    >
      <Grid xl={1} lg={2} md={3} sm={4} xs={6} {...titleGridProps} item>
        <Typography
          color="textSecondary"
          variant="subtitle2"
          onClick={onTextClick}
          noWrap
          {...titleTypographyProps}
        >
          {titleStartCase ? startCase(title) : title}
        </Typography>
      </Grid>
      <Grid xs="auto" {...valueGridProps} item>
        {valueComponent}
      </Grid>
    </Grid>
  );
}


export default withErrorBoundary(withStyles(hoverStyle)(TextGrid));
