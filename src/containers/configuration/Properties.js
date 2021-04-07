import React from 'react';

import { configuration as api } from '@vidispine/vdt-api';
import PropertiesCard from '../../components/configuration/properties/PropertiesCard';
import PropertiesDialog from '../../components/configuration/properties/PropertiesDialog';

import TitleHeader from '../../components/ui/TitleHeader';
import withSnackbar from '../../hoc/withSnackbar';

const CONFIGURATIONPROPERTIES_CREATE_MODAL = 'CONFIGURATIONPROPERTIES_CREATE_MODAL';

class Properties extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.state = {
      configurationPropertyListDocument: undefined,
    };
  }

  componentDidMount() {
    document.title = 'vidi.js | Configuration Properties';
    this.onRefresh();
  }

  onRefresh() {
    const { openSnackBar } = this.props;
    try {
      api.getPropertiesConfiguration()
        .then((response) => this.setState({ configurationPropertyListDocument: response.data }));
    } catch (error) {
      const messageContent = 'Error Getting Configuration Properties';
      openSnackBar({ messageContent, messageColor: 'secondary' });
    }
  }

  render() {
    const { configurationPropertyListDocument } = this.state;
    return (
      <>
        <TitleHeader
          parentTitle="Configuration"
          parentTo="/configuration/"
          title="Properties"
          helpTo="/ref/property.html#configuration-properties"
          createModal={CONFIGURATIONPROPERTIES_CREATE_MODAL}
          onRefresh={this.onRefresh}
          code={configurationPropertyListDocument}
          codeModal="ConfigurationPropertyListDocument"
        />
        {configurationPropertyListDocument
        && (
        <PropertiesCard
          configurationPropertyListDocument={configurationPropertyListDocument}
          onRefresh={this.onRefresh}
        />
        )}
        <PropertiesDialog
          dialogName={CONFIGURATIONPROPERTIES_CREATE_MODAL}
          onSuccess={this.onRefresh}
        />
      </>
    );
  }
}

export default withSnackbar(Properties);
