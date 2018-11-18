import React from 'react';
import { compose } from 'redux';
import TitleHeader from '../components/ui/TitleHeader';
import UriListCard from '../components/ui/UriListCard';

import LibraryListParams, { LIBRARY_LIST_PARAMS_FORM } from '../components/library/LibraryListParams';
import LibraryCreate from '../components/library/LibraryCreate';

import withFormActions from '../hoc/withFormActions';
import withFormSelectors from '../hoc/withFormSelectors';

const LIBRARY_CREATE_DIALOG = 'LIBRARY_CREATE_DIALOG';

class LibraryList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onChangeRowsPerPage = this.onChangeRowsPerPage.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.state = {
      uriListDocument: undefined,
      page: 0,
      rowsPerPage: 100,
    };
  }

  componentDidMount() {
    document.title = 'vidi.js | Library';
    this.onRefresh();
  }

  onRefresh() {
    const { submitForm } = this.props;
    submitForm(LIBRARY_LIST_PARAMS_FORM);
  }

  async onChangeRowsPerPage({ target: { value: number } } = {}) {
    const { changeForm } = this.props;
    const first = 1;
    changeForm(LIBRARY_LIST_PARAMS_FORM, 'matrixParams.first', first);
    await changeForm(LIBRARY_LIST_PARAMS_FORM, 'matrixParams.number', number);
    this.setState({ page: 0, rowsPerPage: number });
    this.onRefresh();
  }

  async onChangePage({ page }) {
    const { rowsPerPage } = this.state;
    const { formValues = {}, changeForm } = this.props;
    const { matrixParams = {} } = formValues;
    const { number = rowsPerPage } = matrixParams;
    const first = page * number + 1;
    changeForm(LIBRARY_LIST_PARAMS_FORM, 'matrixParams.first', first);
    await changeForm(LIBRARY_LIST_PARAMS_FORM, 'matrixParams.number', number);
    this.setState({ page, rowsPerPage: number });
    this.onRefresh();
  }

  render() {
    const {
      uriListDocument,
      page,
      rowsPerPage,
    } = this.state;
    const {
      history,
    } = this.props;
    return (
      <React.Fragment>
        <TitleHeader
          title="Library"
          helpTo="/ref/library.html"
          onRefresh={this.onRefresh}
          code={uriListDocument}
          codeModal="URIListDocument"
          createModal={LIBRARY_CREATE_DIALOG}
        />
        <LibraryListParams
          onSuccess={response => this.setState({ uriListDocument: response.data })}
          initialValues={{
            matrixParams: {
              number: 100,
              first: 1,
            },
          }}
        />
        {uriListDocument && (
          <UriListCard
            uriListDocument={uriListDocument}
            linkTo={uri => `/library/${uri}/`}
            page={page}
            rowsPerPage={rowsPerPage}
            onChangePage={this.onChangePage}
            onChangeRowsPerPage={this.onChangeRowsPerPage}
          />
        )}
        <LibraryCreate
          dialogName={LIBRARY_CREATE_DIALOG}
          onSuccess={response => history.push(`/library/${response.data.uri[0]}/`)}
        />
      </React.Fragment>
    );
  }
}

export default compose(withFormActions, withFormSelectors)(LibraryList, LIBRARY_LIST_PARAMS_FORM);
