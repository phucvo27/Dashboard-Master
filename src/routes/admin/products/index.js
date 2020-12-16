import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';

const Product = lazy(() => import('../../../container/products/product.container'));
const ProductAdd = lazy(() => import('../../../container/products/AddProduct/AddProduct.container'));
// const ProductAdd = lazy(() => import('../../../container/products/AddProduct/AddProduct'));

const Category = lazy(() => import('../../../container/products/category/category.container'))
const ProductRoutes = () => {
  const { path } = useRouteMatch();
  console.log(path)
  return (
    <Switch>
      <Route exact path={path} component={Product} />
      <Route exact path={`${path}/add`} component={ProductAdd} />
      <Route exact path={`${path}/category`} component={Category} />
    </Switch>
  );
};

export default ProductRoutes;
