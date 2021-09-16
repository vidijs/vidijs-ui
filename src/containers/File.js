import React from 'react';
import List from '@material-ui/core/List';
import { compose } from 'redux';

import FileTitle from '../components/file/FileTitle';
import FileDelete from '../components/file/FileDelete';
import FileAbandon from '../components/file/FileAbandon';
import FileState from '../components/file/FileState';
import FileMove from '../components/file/FileMove';
import FileEntityRemove from '../components/file/FileEntityRemove';
import FilePath from '../components/file/FilePath';
import FileOverwrite from '../components/file/FileOverwrite';
import FileAnalyze from '../components/file/FileAnalyze';
import FileOverview from './file/FileOverview';
import FileShape from './file/FileShape';
import DrawerContainer from '../components/ui/DrawerContainer';
import DrawerListItem from '../components/ui/DrawerListItem';
import withTabs from '../hoc/withTabs';
import withUI from '../hoc/withUI';

const FILE_DELETE_DIALOG = 'FILE_DELETE_DIALOG';
const FILE_ABANDON_DIALOG = 'FILE_ABANDON_DIALOG';
const FILE_STATE_DIALOG = 'FILE_STATE_DIALOG';
const FILE_MOVE_DIALOG = 'FILE_MOVE_DIALOG';
const FILE_ENTITY_REMOVE_DIALOG = 'FILE_ENTITY_REMOVE_DIALOG';
const FILE_PATH_DIALOG = 'FILE_PATH_DIALOG';
const FILE_OVERWRITE_DIALOG = 'FILE_OVERWRITE_DIALOG';
const FILE_ANALYZE_DIALOG = 'FILE_ANALYZE_DIALOG';
const FILE_OVERVIEW_TAB = 'FILE_OVERVIEW_TAB';
const FILE_SHAPE_TAB = 'FILE_SHAPE_TAB';

const TAB_TITLE = [
  { tab: FILE_OVERVIEW_TAB, listText: 'Overview', component: FileOverview },
  { tab: FILE_SHAPE_TAB, listText: 'Shape', component: FileShape },
];

const listComponent = ({ onChangeTab, tabValue }) => (
  <List>
    {TAB_TITLE.map(({ tab, listText }) => (
      <DrawerListItem
        key={listText}
        listText={listText}
        listItemProps={{
          onClick: () => onChangeTab(null, tab),
          selected: tabValue === tab || undefined,
        }}
      />
    ))}
  </List>
);

class File extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.setOnRefresh = this.setOnRefresh.bind(this);
    this.state = {
      onRefresh: undefined,
    };
  }

  componentDidMount() {
    const { fileId } = this.props;
    document.title = `xray | File | ${fileId}`;
    this.onRefresh();
  }

  onRefresh() {
    const { onRefresh } = this.state;
    if (onRefresh) { onRefresh(); }
  }

  setOnRefresh(onRefresh) {
    this.setState({ onRefresh });
  }

  render() {
    const { fileDocument } = this.state;
    const {
      fileId, history, onChangeTab,
      tabValue,
    } = this.props;
    const tabInfo = TAB_TITLE.find((thisTab) => thisTab.tab === tabValue) || TAB_TITLE[0];
    const { listText, component: mainComponent } = tabInfo;
    const titleComponent = (props) => (
      <FileTitle
        title={listText}
        deleteModal={FILE_DELETE_DIALOG}
        abandonModal={FILE_ABANDON_DIALOG}
        stateModal={FILE_STATE_DIALOG}
        moveModal={FILE_MOVE_DIALOG}
        removeEntityModal={FILE_ENTITY_REMOVE_DIALOG}
        pathModal={FILE_PATH_DIALOG}
        overwriteModal={FILE_OVERWRITE_DIALOG}
        analyzeModal={FILE_ANALYZE_DIALOG}
        fileId={fileId}
        {...props}
      />
    );
    return (
      <>

        <DrawerContainer
          onChangeTab={onChangeTab}
          tabValue={tabValue}
          fileId={fileId}
          mainComponent={mainComponent}
          listComponent={listComponent}
          defaultOpen
          titleComponent={titleComponent}
          setOnRefresh={this.setOnRefresh}
        />
        <FileDelete
          dialogName={FILE_DELETE_DIALOG}
          onSuccess={(response) => history.push(`/job/${response.data.jobId}`)}
          fileDocument={fileDocument}
        />
        <FileAbandon
          dialogName={FILE_ABANDON_DIALOG}
          onSuccess={this.onRefresh}
          fileDocument={fileDocument}
        />
        <FileState
          dialogName={FILE_STATE_DIALOG}
          onSuccess={this.onRefresh}
          fileDocument={fileDocument}
        />
        <FileMove
          dialogName={FILE_MOVE_DIALOG}
          onSuccess={(response) => history.push(`/job/${response.data.jobId}`)}
          fileDocument={fileDocument}
        />
        <FilePath
          dialogName={FILE_PATH_DIALOG}
          onSuccess={(response) => history.push(`/file/${response.data.id}`)}
          fileDocument={fileDocument}
        />
        <FileEntityRemove
          dialogName={FILE_ENTITY_REMOVE_DIALOG}
          onSuccess={() => history.push('/file/')}
          fileDocument={fileDocument}
        />
        <FileOverwrite
          dialogName={FILE_OVERWRITE_DIALOG}
          onSuccess={this.onRefresh}
          fileDocument={fileDocument}
        />
        <FileAnalyze
          dialogName={FILE_ANALYZE_DIALOG}
          onSuccess={(response) => history.push(`/job/${response.data.jobId}`)}
          fileDocument={fileDocument}
        />
      </>
    );
  }
}

export default compose(withTabs(FILE_OVERVIEW_TAB), withUI)(File);
