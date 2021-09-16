import React from 'react';
import List from '@material-ui/core/List';

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
import ImportSidecar from './import/ImportSidecar';
import DrawerContainer from '../components/ui/DrawerContainer';
import DrawerListItem from '../components/ui/DrawerListItem';

const IMPORTURI_TAB = 'IMPORTURI_TAB';
const IMPORTPLACEHOLDER_TAB = 'IMPORTPLACEHOLDER_TAB';
const IMPORTCOMPONENT_TAB = 'IMPORTCOMPONENT_TAB';
const IMPORTRAW_TAB = 'IMPORTRAW_TAB';
const IMPORTFILE_TAB = 'IMPORTFILE_TAB';
const IMPORTSHAPEPLACEHOLDER_TAB = 'IMPORTSHAPEPLACEHOLDER_TAB';
const IMPORTSHAPE_TAB = 'IMPORTSHAPE_TAB';
const IMPORTCOLLECTION_TAB = 'IMPORTCOLLECTION_TAB';
const IMPORTSHAPEESSENCE_TAB = 'IMPORTSHAPEESSENCE_TAB';
const IMPORTSIDECAR_TAB = 'IMPORTSIDECAR_TAB';

const TAB_TITLE = [
  { tab: IMPORTURI_TAB, listText: 'URI', component: ImportUri },
  { tab: IMPORTPLACEHOLDER_TAB, listText: 'Placeholder Item', component: ImportPlaceholder },
  { tab: IMPORTCOMPONENT_TAB, listText: 'Component', component: ImportComponent },
  { tab: IMPORTRAW_TAB, listText: 'Upload', component: ImportRaw },
  { tab: IMPORTFILE_TAB, listText: 'File', component: ImportFile },
  { tab: IMPORTSHAPEPLACEHOLDER_TAB, listText: 'Placeholder Shape', component: ImportShapePlaceholder },
  { tab: IMPORTSHAPE_TAB, listText: 'Shape', component: ImportShape },
  { tab: IMPORTCOLLECTION_TAB, listText: 'Collection', component: ImportCollection },
  { tab: IMPORTSHAPEESSENCE_TAB, listText: 'Essence', component: ImportShapeEssence },
  { tab: IMPORTSIDECAR_TAB, listText: 'Sidecar', component: ImportSidecar },
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

class Import extends React.PureComponent {
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

export default withTabs(IMPORTFILE_TAB)(Import);
