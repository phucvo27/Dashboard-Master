import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';

const Coupon = lazy(() => import('../../../container/promotions/coupons/coupon.container'));
const CouponAdd = lazy(() => import('../../../container/promotions/coupons/Add-EditCoupon/AddCoupon'));
// const ProductEdit = lazy(() => import('../../../container/products/Add-EditProduct/EditProduct.container'));

// const Category = lazy(() => import('../../../container/products/category/category.container'))
const PromotionRoutes = () => {
  const { path } = useRouteMatch();
  console.log(path)
  return (
    <Switch>
      <Route exact path={path} component={Coupon} />
      <Route exact path={`${path}/add`} component={CouponAdd} />
      {/* <Route eact path={`${path}/edit/:productid`} component={ProductEdit} />
      <Route exact path={`${path}/category`} component={Category} /> */}
    </Switch>
  );
};

export default PromotionRoutes;
