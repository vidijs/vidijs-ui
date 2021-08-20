import React from 'react';

import { metadatafield as api } from '@vidispine/vdt-api';

import withSnackbar from '../../hoc/withSnackbar';
import MetadataFieldAllowedValuesCard from '../../components/metadatafield/MetadataFieldAllowedValuesCard';
import MetadataFieldAllowedValuesParams from '../../components/metadatafield/MetadataFieldAllowedValuesParams';

class MetadataFieldAllowedValues extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.state = {
      constraintValueListDocument: undefined,
    };
  }

  componentDidMount() {
    const { fieldName } = this.props;
    document.title = `xray | Metadata Field | ${fieldName}`;
    this.onRefresh();
  }

  onRefresh() {
    const { openSnackBar, fieldName } = this.props;
    try {
      api.getMetadataFieldAllowedValues({ fieldName })
        .then((response) => this.setState({ constraintValueListDocument: response.data }));
    } catch (error) {
      const messageContent = 'Error Getting Metadata Field';
      openSnackBar({ messageContent, messageColor: 'secondary' });
    }
  }

  render() {
    const {
      fieldName,
      titleComponent: TitleComponent,
      tabComponent: TabComponent,
    } = this.props;
    const { constraintValueListDocument } = this.state;
    return (
      <>
        {TitleComponent && (
          <TitleComponent
            code={constraintValueListDocument}
            codeModal="ConstraintValueListDocument"
            onRefresh={this.onRefresh}
          />
        )}
        {TabComponent && (
          <TabComponent />
        )}
        <MetadataFieldAllowedValuesParams
          fieldName={fieldName}
          onSuccess={(response) => this.setState({
            constraintValueListDocument: response.constraintValueListDocument,
          })}
        />
        {constraintValueListDocument
        && (
        <MetadataFieldAllowedValuesCard
          constraintValueListDocument={constraintValueListDocument}
          onRefresh={this.onRefresh}
        />
        )}
      </>
    );
  }
}

export default withSnackbar(MetadataFieldAllowedValues);
