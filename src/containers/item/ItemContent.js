import React from 'react';
import ItemContentParams, { ITEM_PARAMS_FORM } from '../../components/item/ItemContentParams';
import ItemContentDisplay from '../../components/item/ItemContent';

import withFormActions from '../../hoc/withFormActions';

class ItemContent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.state = {
      itemDocument: undefined,
    };
  }

  componentDidMount() {
    this.onRefresh();
  }

  UNSAFE_componentWillReceiveProps({ itemId }) {
    const { itemId: prevItemId } = this.props;
    if (prevItemId !== itemId) {
      this.onRefresh(itemId);
      document.title = `vidi.js | Item | ${itemId}`;
    }
  }

  onRefresh() {
    const { submitForm } = this.props;
    submitForm(ITEM_PARAMS_FORM);
  }

  render() {
    const {
      itemId,
      titleComponent: TitleComponent,
      tabComponent: TabComponent,
    } = this.props;
    const { itemDocument } = this.state;
    return (
      <>
        {TitleComponent && (
          <TitleComponent
            code={itemDocument}
            codeModal="ItemDocument"
            onRefresh={this.onRefresh}
          />
        )}
        {TabComponent && (
          <TabComponent />
        )}
        <ItemContentParams
          itemId={itemId}
          onSuccess={(response) => this.setState({ itemDocument: response.data })}
        />
        {itemDocument && (
          <ItemContentDisplay
            itemId={itemId}
            itemDocument={itemDocument}
          />
        )}
      </>
    );
  }
}

export default withFormActions(ItemContent);
