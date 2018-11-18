import React from 'react';
import { compose } from 'redux';

import TitleHeader from '../components/ui/TitleHeader';
import CollectionSearchParams from '../components/collection/CollectionSearchParams';
import CollectionSearchDocument from '../components/collection/CollectionSearch';
import CollectionListTable from '../components/collection/CollectionListTable';
import CollectionCreate from '../components/collection/CollectionCreate';

import withFormActions from '../hoc/withFormActions';
import withCard from '../hoc/withCard';
import withPaginationForm from '../hoc/withPaginationForm';

const COLLECTION_CREATE_DIALOG = 'COLLECTION_CREATE_DIALOG';
const COLLECTION_SEARCH_FORM = 'COLLECTION_SEARCH_FORM';
const CollectionListTableCard = compose(
  withCard,
  withPaginationForm,
)(CollectionListTable);

class CollectionSearch extends React.PureComponent {
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
      collectionListDocument: undefined,
    };
  }

  componentDidMount() {
    document.title = 'vidi.js | Collection';
    this.onRefresh();
  }

  onRefresh() {
    const { submitForm } = this.props;
    submitForm(COLLECTION_SEARCH_FORM);
  }

  onSearchSuccess(response) {
    const { data: collectionListDocument, queryParams } = response;
    this.setState({
      collectionListDocument,
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
      collectionListDocument,
      queryParams,
    } = this.state;
    const { history } = this.props;
    return (
      <React.Fragment>
        <TitleHeader
          title="Collection"
          helpTo="/ref/collection.html"
          onRefresh={this.onRefresh}
          code={collectionListDocument}
          codeModal="CollectionListDocument"
          createModal={COLLECTION_CREATE_DIALOG}
        />
        <CollectionSearchDocument
          form={COLLECTION_SEARCH_FORM}
          defaultExpanded={false}
          onSuccess={this.onSearchSuccess}
          initialValues={this.initialValues}
          destroyOnUnmount={false}
        />
        <CollectionSearchParams
          form={COLLECTION_SEARCH_FORM}
          defaultExpanded={false}
          onSuccess={this.onSearchSuccess}
          initialValues={this.initialValues}
          destroyOnUnmount={false}
        />
        <CollectionListTableCard
          collectionListDocument={collectionListDocument}
          queryParams={queryParams}
          form={COLLECTION_SEARCH_FORM}
        />
        <CollectionCreate
          dialogName={COLLECTION_CREATE_DIALOG}
          onSuccess={response => history.push(`/collection/${response.data.id}`)}
        />
      </React.Fragment>
    );
  }
}

export default compose(withFormActions)(CollectionSearch);
