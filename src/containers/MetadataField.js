import React from 'react';
import List from '@material-ui/core/List';
import { compose } from 'redux';

import withTabs from '../hoc/withTabs';
import MetadataFieldTitle from '../components/metadatafield/MetadataFieldTitle';
import MetadataFieldRemove from '../components/metadatafield/MetadataFieldRemove';
import withSnackbar from '../hoc/withSnackbar';
import DrawerContainer from '../components/ui/DrawerContainer';
import DrawerListItem from '../components/ui/DrawerListItem';
import MetadataFieldOverview from './metadatafield/MetadataFieldOverview';
import MetadataFieldAllowedValues from './metadatafield/MetadataFieldAllowedValues';

const METADATAFIELD_OVERVIEW_TAB = 'METADATAFIELD_OVERVIEW_TAB';
const METADATAFIELD_ALLOWEDVALUES_TAB = 'METADATAFIELD_ALLOWEDVALUES_TAB';

const TAB_TITLE = [
  { tab: METADATAFIELD_OVERVIEW_TAB, listText: 'Overview', component: MetadataFieldOverview },
  { tab: METADATAFIELD_ALLOWEDVALUES_TAB, listText: 'Allowed Values', component: MetadataFieldAllowedValues },
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

const METADATAFIELD_REMOVE_MODAL = 'METADATAFIELD_REMOVE_MODAL';

class MetadataField extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.setOnRefresh = this.setOnRefresh.bind(this);
    this.state = {
      onRefresh: undefined,
    };
  }

  componentDidMount() {
    const { fieldName } = this.props;
    document.title = `xray | Metadata Field | ${fieldName}`;
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
    const {
      fieldName,
      onChangeTab,
      tabValue,
    } = this.props;
    const tabInfo = TAB_TITLE.find((thisTab) => thisTab.tab === tabValue) || TAB_TITLE[0];
    const { listText, component: mainComponent } = tabInfo;
    const titleComponent = (props) => (
      <MetadataFieldTitle
        removeModal={METADATAFIELD_REMOVE_MODAL}
        fieldName={fieldName}
        title={listText}
        {...props}
      />
    ); return (
      <>
        <DrawerContainer
          onChangeTab={onChangeTab}
          tabValue={tabValue}
          fieldName={fieldName}
          mainComponent={mainComponent}
          listComponent={listComponent}
          defaultOpen
          titleComponent={titleComponent}
          setOnRefresh={this.setOnRefresh}
        />
        <MetadataFieldRemove
          dialogName={METADATAFIELD_REMOVE_MODAL}
          fieldName={fieldName}
        />
      </>
    );
  }
}

export default compose(withTabs(METADATAFIELD_OVERVIEW_TAB), withSnackbar)(MetadataField);
