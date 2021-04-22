import React from 'react';
import { compose } from 'redux';

import TitleHeader from '../components/ui/TitleHeader';
import FieldGroupSearchParams from '../components/fieldgroup/FieldGroupSearchParams';
import FieldGroupSearchDocument from '../components/fieldgroup/FieldGroupSearch';
import FieldGroupSearchListTable from '../components/fieldgroup/FieldGroupSearchListTable';

import withFormActions from '../hoc/withFormActions';
import withCard from '../hoc/withCard';
import withPaginationForm from '../hoc/withPaginationForm';

const FIELDGROUP_SEARCH_FORM = 'FIELDGROUP_SEARCH_FORM';
const FieldGroupSearchListTableCard = compose(
  withCard,
  withPaginationForm,
)(FieldGroupSearchListTable);

class FieldGroupSearch extends React.PureComponent {
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
      metadataFieldResultDocument: undefined,
    };
  }

  componentDidMount() {
    document.title = 'xray | Field Group';
    this.onRefresh();
  }

  onRefresh() {
    const { submitForm } = this.props;
    submitForm(FIELDGROUP_SEARCH_FORM);
  }

  onSearchSuccess(response) {
    const { data: metadataFieldResultDocument, queryParams } = response;
    this.setState({
      metadataFieldResultDocument,
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
      metadataFieldResultDocument,
      queryParams,
    } = this.state;
    return (
      <>
        <TitleHeader
          title="Field Groups"
          helpTo="/ref/metadata/field-group.html"
          onRefresh={this.onRefresh}
          code={metadataFieldResultDocument}
          codeModal="MetadataFieldResultDocument"
        />
        <FieldGroupSearchDocument
          form={FIELDGROUP_SEARCH_FORM}
          defaultExpanded={false}
          onSuccess={this.onSearchSuccess}
          initialValues={this.initialValues}
          destroyOnUnmount={false}
        />
        <FieldGroupSearchParams
          form={FIELDGROUP_SEARCH_FORM}
          defaultExpanded={false}
          onSuccess={this.onSearchSuccess}
          initialValues={this.initialValues}
          destroyOnUnmount={false}
        />
        <FieldGroupSearchListTableCard
          metadataFieldResultDocument={metadataFieldResultDocument}
          queryParams={queryParams}
          form={FIELDGROUP_SEARCH_FORM}
          sortField="metadataFieldGroupSearchDocument.sort"
        />
      </>
    );
  }
}

export default compose(withFormActions)(FieldGroupSearch);
