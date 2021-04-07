import React from 'react';
import { compose } from 'redux';
import List from '@material-ui/core/List';
import { Route, Link } from 'react-router-dom';

import { withRouterProps } from '../hoc/withRouterProps';

import ShapeOverview from './shape/ShapeOverview';
import ShapeBulkyMetadata from './shape/ShapeBulkyMetadata';
import ShapeBulkyMetadataList from './shape/ShapeBulkyMetadataList';

import ShapeTitle from '../components/shape/ShapeTitle';
import ShapeDelete from '../components/shape/ShapeDelete';
import ShapeTranscode from '../components/shape/ShapeTranscode';
import ShapeAnalyze from '../components/shape/ShapeAnalyze';
import ShapeAddTag from '../components/shape/ShapeAddTag';
import ShapeRemoveTag from '../components/shape/ShapeRemoveTag';
import DrawerContainer from '../components/ui/DrawerContainer';
import DrawerListItem from '../components/ui/DrawerListItem';

const SHAPE_REMOVE_DIALOG = 'SHAPE_REMOVE_DIALOG';
const SHAPE_TRANSCODE_DIALOG = 'SHAPE_TRANSCODE_DIALOG';
const SHAPE_ANALYZE_DIALOG = 'SHAPE_ANALYZE_DIALOG';
const SHAPE_ADD_TAG_DIALOG = 'SHAPE_ADD_TAG_DIALOG';
const SHAPE_REMOVE_TAG_DIALOG = 'SHAPE_REMOVE_TAG_DIALOG';

const shapeOverviewLink = ({ itemId = ':itemId', shapeId = ':shapeId' } = {}) => `/item/${itemId}/shape/${shapeId}/`;
const shapeBulkyListLink = (props) => `${shapeOverviewLink(props)}bulky-metadata/`;
const shapeBulkyLink = ({ bulkyMetadataKey = ':bulkyMetadataKey', ...props } = {}) => `${shapeBulkyListLink(props)}${bulkyMetadataKey}`;

const TAB_TITLE = [
  {
    listText: 'Overview',
    link: shapeOverviewLink,
  },
  {
    listText: 'Bulky Metadata',
    link: shapeBulkyListLink,
  },
];

const listComponent = ({ itemId, shapeId }) => (
  <List>
    {TAB_TITLE.map(({ link, listText }) => (
      <DrawerListItem
        key={listText}
        listText={listText}
        listItemProps={{
          component: Link,
          to: link({ itemId, shapeId }),
        }}
      />
    ))}
  </List>
);

const mainComponent = (props) => (
  <>
    <Route
      exact
      path={shapeOverviewLink()}
      render={() => <ShapeOverview {...props} />}
    />
    <Route
      exact
      path={shapeBulkyListLink()}
      render={() => <ShapeBulkyMetadataList {...props} />}
      {...props}
    />
    <Route
      exact
      path={shapeBulkyLink()}
      render={() => <ShapeBulkyMetadata {...props} />}
      {...props}
    />
  </>
);

class Shape extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.setOnRefresh = this.setOnRefresh.bind(this);
    this.state = {
      onRefresh: undefined,
    };
  }

  componentDidMount() {
    const { shapeId } = this.props;
    document.title = `vidi.js | Shape | ${shapeId}`;
  }

  onRefresh() {
    const { onRefresh } = this.state;
    if (onRefresh) { onRefresh(); }
  }

  setOnRefresh(onRefresh) {
    this.setState({ onRefresh });
  }

  render() {
    const {
      itemId,
      shapeId,
      history,
    } = this.props;
    const titleComponent = (props) => (
      <ShapeTitle
        onRefresh={this.onRefresh}
        shapeId={shapeId}
        itemId={itemId}
        removeModal={SHAPE_REMOVE_DIALOG}
        transcodeModal={SHAPE_TRANSCODE_DIALOG}
        analyzeTagModal={SHAPE_ANALYZE_DIALOG}
        addTagModal={SHAPE_ADD_TAG_DIALOG}
        removeTagModal={SHAPE_REMOVE_TAG_DIALOG}
        {...props}
      />
    );
    return (
      <>
        <DrawerContainer
          shapeId={shapeId}
          itemId={itemId}
          mainComponent={mainComponent}
          listComponent={listComponent}
          defaultOpen
          titleComponent={titleComponent}
          setOnRefresh={this.setOnRefresh}
        />
        <ShapeDelete
          dialogName={SHAPE_REMOVE_DIALOG}
          onSuccess={() => history.push(`/item/${itemId}`)}
          itemId={itemId}
          shapeId={shapeId}
        />
        <ShapeTranscode
          dialogName={SHAPE_TRANSCODE_DIALOG}
          onSuccess={(response) => history.push(`/job/${response.data.jobId}/`)}
          itemId={itemId}
          shapeId={shapeId}
        />
        <ShapeAnalyze
          dialogName={SHAPE_ANALYZE_DIALOG}
          onSuccess={(response) => history.push(`/job/${response.data.jobId}/`)}
          itemId={itemId}
          shapeId={shapeId}
        />
        <ShapeAddTag
          dialogName={SHAPE_ADD_TAG_DIALOG}
          onSuccess={this.onRefresh}
          itemId={itemId}
          shapeId={shapeId}
        />
        <ShapeRemoveTag
          dialogName={SHAPE_REMOVE_TAG_DIALOG}
          onSuccess={this.onRefresh}
          itemId={itemId}
          shapeId={shapeId}
        />
      </>
    );
  }
}

export default compose(withRouterProps)(Shape);
