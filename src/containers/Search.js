import React from 'react';
import { compose } from 'redux';

import TitleHeader from '../components/ui/TitleHeader';
import SearchParams from '../components/search/SearchParams';
import SearchDocument from '../components/search/SearchDocument';
import SearchListTable from '../components/search/SearchListTable';

import withFormActions from '../hoc/withFormActions';
import withCard from '../hoc/withCard';
import withPaginationForm from '../hoc/withPaginationForm';

const SEARCH_FORM = 'SEARCH_FORM';
const SearchListTableCard = compose(
  withCard,
  withPaginationForm,
)(SearchListTable);

class Search extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onSearchSuccess = this.onSearchSuccess.bind(this);
    this.onSetUrlParams = this.onSetUrlParams.bind(this);
    this.onGetUrlParams = this.onGetUrlParams.bind(this);
    const params = this.onGetUrlParams();
    const {
      first = 1,
      number = 10,
      orderBy,
      orderDirection = 'desc',
      ...queryParams
    } = params;
    const sort = orderBy ? [{ field: orderBy, order: `${orderDirection}ending` }] : [];
    this.initialValues = {
      queryParams,
      matrixParams: {
        first,
        number,
      },
      itemSearchDocument: {
        sort,
      },
    };
    this.state = {
      searchResultDocument: undefined,
    };
  }

  componentDidMount() {
    document.title = 'vidi.js | Search';
    this.onRefresh();
  }

  onRefresh() {
    const { submitForm } = this.props;
    submitForm(SEARCH_FORM);
  }

  onSearchSuccess(response) {
    const { data: searchResultDocument, queryParams } = response;
    this.setState({
      searchResultDocument,
      queryParams,
    });
    this.onSetUrlParams(queryParams);
  }

  onSetUrlParams(params) {
    const {
      location,
      history,
    } = this.props;
    const urlParams = new URLSearchParams(location.search);
    Object.entries(params).forEach(([k, v]) => urlParams.set(k, v));
    history.push({ search: urlParams.toString() });
  }

  onGetUrlParams() {
    const { location } = this.props;
    const urlParams = new URLSearchParams(location.search);
    const params = {};
    Array.from(urlParams).forEach(([k, v]) => { params[k] = v; });
    return params;
  }

  render() {
    const {
      searchResultDocument,
      queryParams,
    } = this.state;
    return (
      <React.Fragment>
        <TitleHeader
          title="Search"
          helpTo="/ref/search.html"
          onRefresh={this.onRefresh}
          code={searchResultDocument}
          codeModal="SearchResultDocument"
        />
        <SearchDocument
          form={SEARCH_FORM}
          defaultExpanded={false}
          onSuccess={this.onSearchSuccess}
          initialValues={this.initialValues}
          destroyOnUnmount={false}
        />
        <SearchParams
          form={SEARCH_FORM}
          defaultExpanded={false}
          onSuccess={this.onSearchSuccess}
          initialValues={this.initialValues}
          destroyOnUnmount={false}
        />
        <SearchListTableCard
          searchResultDocument={searchResultDocument}
          queryParams={queryParams}
          form={SEARCH_FORM}
        />
      </React.Fragment>
    );
  }
}

export default compose(withFormActions)(Search);
