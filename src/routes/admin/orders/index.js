import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';

const Order = lazy(() => import('../../../container/ecommerce/Orders/Orders.container'));
const OderDetail = lazy(()=> import ('../../../container/ecommerce/OrderDetails/OrderDetail.container'));

const OrderRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={Order} />
      <Route path={`${path}/:orderid`} component={OderDetail} />
    </Switch>
  );
};

export default OrderRoutes;
