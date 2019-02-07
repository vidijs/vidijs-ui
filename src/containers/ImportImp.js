import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import withTabs from '../hoc/withTabs';
import ImportImpUrl from './imf/ImportImpUrl';
import ImportImpFile from './imf/ImportImpFile';
import ImportImpPath from './imf/ImportImpPath';

const IMPORTIMP_URL_TAB = 'IMPORTIMP_URL_TAB';
const IMPORTIMP_PATH_TAB = 'IMPORTIMP_PATH_TAB';
const IMPORTIMP_FILE_TAB = 'IMPORTIMP_FILE_TAB';

class ImportImp extends React.PureComponent {
  render() {
    const { tabValue, onChangeTab, ...tabProps } = this.props;
    return (
      <React.Fragment>
        <Tabs
          value={tabValue}
          onChange={onChangeTab}
          indicatorColor="primary"
          textColor="primary"
          scrollable
        >
          <Tab label="URL" value={IMPORTIMP_URL_TAB} />
          <Tab label="Path" value={IMPORTIMP_PATH_TAB} />
          <Tab label="FIle" value={IMPORTIMP_FILE_TAB} />
        </Tabs>
        {tabValue === IMPORTIMP_URL_TAB && (
          <ImportImpUrl {...tabProps} />
        )}
        {tabValue === IMPORTIMP_PATH_TAB && (
          <ImportImpPath {...tabProps} />
        )}
        {tabValue === IMPORTIMP_FILE_TAB && (
          <ImportImpFile {...tabProps} />
        )}
      </React.Fragment>
    );
  }
}

export default withTabs(IMPORTIMP_URL_TAB)(ImportImp);
