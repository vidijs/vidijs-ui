import React from 'react';
import List from '@material-ui/core/List';

import withTabs from '../hoc/withTabs';
import ImportImpUrl from './imf/ImportImpUrl';
import ImportImpFile from './imf/ImportImpFile';
import ImportImpPath from './imf/ImportImpPath';
import DrawerContainer from '../components/ui/DrawerContainer';
import DrawerListItem from '../components/ui/DrawerListItem';

const IMPORTIMP_URL_TAB = 'IMPORTIMP_URL_TAB';
const IMPORTIMP_PATH_TAB = 'IMPORTIMP_PATH_TAB';
const IMPORTIMP_FILE_TAB = 'IMPORTIMP_FILE_TAB';

const TAB_TITLE = [
  { tab: IMPORTIMP_URL_TAB, listText: 'URL', component: ImportImpUrl },
  { tab: IMPORTIMP_PATH_TAB, listText: 'Path', component: ImportImpPath },
  { tab: IMPORTIMP_FILE_TAB, listText: 'File', component: ImportImpFile },
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

class ImportImp extends React.PureComponent {
  render() {
    const { tabValue, onChangeTab, ...tabProps } = this.props;
    const tabInfo = TAB_TITLE.find((thisTab) => thisTab.tab === tabValue) || TAB_TITLE[0];
    const { listText, component: mainComponent } = tabInfo;
    return (
      <DrawerContainer
        mainComponent={mainComponent}
        listComponent={listComponent}
        defaultOpen
        onChangeTab={onChangeTab}
        tabValue={tabValue}
        title={listText}
        {...tabProps}
      />
    );
  }
}

export default withTabs(IMPORTIMP_URL_TAB)(ImportImp);
