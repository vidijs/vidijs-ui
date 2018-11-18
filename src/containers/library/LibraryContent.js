import React from 'react';
import { compose } from 'redux';
import LibraryContentParams, { LIBRARY_CONTENT_PARAMS_FORM } from '../../components/library/LibraryContentParams';
import ItemListContent from '../../components/item/ItemListContent';
import withFormActions from '../../hoc/withFormActions';
import withFormSelectors from '../../hoc/withFormSelectors';


class LibraryList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onChangeRowsPerPage = this.onChangeRowsPerPage.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.onChangeExpansion = this.onChangeExpansion.bind(this);
    this.state = {
      itemListDocument: undefined,
      page: 0,
      rowsPerPage: 100,
      expanded: false,
    };
  }

  componentDidMount() {
    this.onRefresh();
  }

  onRefresh() {
    const { submitForm } = this.props;
    submitForm(LIBRARY_CONTENT_PARAMS_FORM);
  }

  async onChangeRowsPerPage({ target: { value: number } } = {}) {
    const { changeForm } = this.props;
    const first = 1;
    changeForm(LIBRARY_CONTENT_PARAMS_FORM, 'queryParams.first', first);
    await changeForm(LIBRARY_CONTENT_PARAMS_FORM, 'queryParams.number', number);
    this.setState({ page: 0, rowsPerPage: number });
    this.onRefresh();
  }

  async onChangePage({ page }) {
    const { rowsPerPage } = this.state;
    const { formValues = {}, changeForm } = this.props;
    const { matrixParams = {} } = formValues;
    const { number = rowsPerPage } = matrixParams;
    const first = page * number + 1;
    changeForm(LIBRARY_CONTENT_PARAMS_FORM, 'queryParams.first', first);
    await changeForm(LIBRARY_CONTENT_PARAMS_FORM, 'queryParams.number', number);
    this.setState({ page, rowsPerPage: number });
    this.onRefresh();
  }

  onChangeExpansion(event, expanded) {
    this.setState({ expanded });
  }

  render() {
    const {
      libraryId,
      titleComponent: TitleComponent,
      tabComponent: TabComponent,
    } = this.props;
    const { itemListDocument, expanded } = this.state;
    return (
      <React.Fragment>
        {TitleComponent && (
          <TitleComponent
            code={itemListDocument}
            codeModal="ItemListDocument"
            onRefresh={this.onRefresh}
          />
        )}
        {TabComponent && (
          <TabComponent />
        )}
        <LibraryContentParams
          libraryId={libraryId}
          onSuccess={response => this.setState({ itemListDocument: response.data })}
          expanded={expanded}
          onChangeExpansion={this.onChangeExpansion}
          initialValues={{
            queryParams: {
              number: 10,
              first: 1,
            },
          }}
        />
        {itemListDocument && (
          <ItemListContent
            itemListDocument={itemListDocument}
          />
        )}
      </React.Fragment>
    );
  }
}

export default compose(withFormActions, withFormSelectors)(LibraryList, LIBRARY_CONTENT_PARAMS_FORM);
