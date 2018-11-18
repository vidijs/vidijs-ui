import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import withTabs from '../hoc/withTabs';
import ImportUri from './import/ImportUri';
import ImportPlaceholder from './import/ImportPlaceholder';
import ImportComponent from './import/ImportComponent';
import ImportRaw from './import/ImportRaw';
import ImportFile from './import/ImportFile';
import ImportShapePlaceholder from './import/ImportShapePlaceholder';
import ImportShape from './import/ImportShape';
import ImportCollection from './import/ImportCollection';
import ImportShapeEssence from './import/ImportShapeEssence';
import ImportImp from './import/ImportImp';

const IMPORTURI_TAB = 'IMPORTURI_TAB';
const IMPORTPLACEHOLDER_TAB = 'IMPORTPLACEHOLDER_TAB';
const IMPORTCOMPONENT_TAB = 'IMPORTCOMPONENT_TAB';
const IMPORTRAW_TAB = 'IMPORTRAW_TAB';
const IMPORTFILE_TAB = 'IMPORTFILE_TAB';
const IMPORTSHAPEPLACEHOLDER_TAB = 'IMPORTSHAPEPLACEHOLDER_TAB';
const IMPORTSHAPE_TAB = 'IMPORTSHAPE_TAB';
const IMPORTCOLLECTION_TAB = 'IMPORTCOLLECTION_TAB';
const IMPORTSHAPEESSENCE_TAB = 'IMPORTSHAPEESSENCE_TAB';
const IMPORTIMP_TAB = 'IMPORTIMP_TAB';

class Import extends React.PureComponent {
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
          <Tab label="URI" value={IMPORTURI_TAB} />
          <Tab label="Placeholder Item" value={IMPORTPLACEHOLDER_TAB} />
          <Tab label="Shape" value={IMPORTSHAPE_TAB} />
          <Tab label="Component" value={IMPORTCOMPONENT_TAB} />
          <Tab label="Upload" value={IMPORTRAW_TAB} />
          <Tab label="File" value={IMPORTFILE_TAB} />
          <Tab label="Placeholder Shape" value={IMPORTSHAPEPLACEHOLDER_TAB} />
          <Tab label="Collection" value={IMPORTCOLLECTION_TAB} />
          <Tab label="Essence" value={IMPORTSHAPEESSENCE_TAB} />
          <Tab label="IMP" value={IMPORTIMP_TAB} />
        </Tabs>
        {tabValue === IMPORTURI_TAB && (
          <ImportUri {...tabProps} />
        )}
        {tabValue === IMPORTPLACEHOLDER_TAB && (
          <ImportPlaceholder {...tabProps} />
        )}
        {tabValue === IMPORTCOMPONENT_TAB && (
          <ImportComponent {...tabProps} />
        )}
        {tabValue === IMPORTRAW_TAB && (
          <ImportRaw {...tabProps} />
        )}

        {tabValue === IMPORTFILE_TAB && (
          <ImportFile {...tabProps} />
        )}
        {tabValue === IMPORTSHAPEPLACEHOLDER_TAB && (
          <ImportShapePlaceholder {...tabProps} />
        )}
        {tabValue === IMPORTSHAPE_TAB && (
          <ImportShape {...tabProps} />
        )}
        {tabValue === IMPORTCOLLECTION_TAB && (
          <ImportCollection {...tabProps} />
        )}
        {tabValue === IMPORTSHAPEESSENCE_TAB && (
          <ImportShapeEssence {...tabProps} />
        )}
        {tabValue === IMPORTIMP_TAB && (
          <ImportImp {...tabProps} />
        )}
      </React.Fragment>
    );
  }
}

export default withTabs(IMPORTFILE_TAB)(Import);
