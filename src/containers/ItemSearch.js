import React from 'react';
import { compose } from 'redux';

import TitleHeader from '../components/ui/TitleHeader';
import ItemSearchDocument from '../components/item/ItemSearch';
import ItemSearchParams from '../components/item/ItemSearchParams';
import ItemListTable from '../components/item/ItemListTable';
import ItemListCard from '../components/item/ItemListCard';
import ItemListGrid from '../components/item/ItemListGrid';
import ViewSelect, { CARD_VIEW, GRID_VIEW, ROW_VIEW } from '../components/ui/ViewSelect';

import withFormActions from '../hoc/withFormActions';
import withCard from '../hoc/withCard';
import withPaginationForm from '../hoc/withPaginationForm';

const ITEM_SEARCH_FORM = 'ITEM_SEARCH_FORM';

const ItemListTableCard = compose(
  withCard,
  withPaginationForm,
)(ItemListTable);

class ItemSearch extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onSearchSuccess = this.onSearchSuccess.bind(this);
    this.onSetUrlParams = this.onSetUrlParams.bind(this);
    this.onGetUrlParams = this.onGetUrlParams.bind(this);
    this.onChangeView = this.onChangeView.bind(this);
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
      itemListDocument: undefined,
      viewLayout: ROW_VIEW,
    };
  }

  componentDidMount() {
    document.title = 'xray | Item';
    this.onRefresh();
  }

  onRefresh() {
    const { submitForm } = this.props;
    submitForm(ITEM_SEARCH_FORM);
  }

  onSearchSuccess(response) {
    const { data: itemListDocument, queryParams } = response;
    this.setState({
      itemListDocument,
      queryParams,
    });
    this.onSetUrlParams(queryParams);
  }

  onChangeView(viewLayout) {
    this.setState({ viewLayout });
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
      itemListDocument,
      queryParams,
      viewLayout,
    } = this.state;
    return (
      <>
        <TitleHeader
          title="Item"
          helpTo="/ref/item/item.html"
          onRefresh={this.onRefresh}
          code={itemListDocument}
          codeModal="ItemListDocument"
        />
        <ItemSearchDocument
          form={ITEM_SEARCH_FORM}
          defaultExpanded={false}
          onSuccess={this.onSearchSuccess}
          initialValues={this.initialValues}
          destroyOnUnmount={false}
        />
        <ItemSearchParams
          form={ITEM_SEARCH_FORM}
          defaultExpanded={false}
          onSuccess={this.onSearchSuccess}
          initialValues={this.initialValues}
          destroyOnUnmount={false}
        />
        <ViewSelect
          onChange={this.onChangeView}
          isActive={viewLayout}
        />
        { viewLayout === ROW_VIEW && (
          <ItemListTableCard
            form={ITEM_SEARCH_FORM}
            itemListDocument={itemListDocument}
            queryParams={queryParams}
          />
        )}
        { viewLayout === CARD_VIEW && (
          <ItemListCard
            form={ITEM_SEARCH_FORM}
            itemListDocument={itemListDocument}
            queryParams={queryParams}
          />
        )}
        { viewLayout === GRID_VIEW && (
          <ItemListGrid
            form={ITEM_SEARCH_FORM}
            itemListDocument={itemListDocument}
            queryParams={queryParams}
          />
        )}
      </>
    );
  }
}

export default compose(withFormActions)(ItemSearch);
