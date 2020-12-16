import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';

const Product = lazy(() => import('../../../container/products/product.container'));
const ProductAdd = lazy(() => import('../../../container/products/Add-EditProduct/AddProduct.container'));
const ProductEdit = lazy(() => import('../../../container/products/Add-EditProduct/EditProduct.container'));

const Category = lazy(() => import('../../../container/products/category/category.container'))
const ProductRoutes = () => {
  const { path } = useRouteMatch();
  console.log(path)
  return (
    <Switch>
      <Route exact path={path} component={Product} />
      <Route exact path={`${path}/add`} component={ProductAdd} />
      <Route eact path={`${path}/edit/:productid`} component={ProductEdit} />
      <Route exact path={`${path}/category`} component={Category} />
    </Switch>
  );
};

export default ProductRoutes;
