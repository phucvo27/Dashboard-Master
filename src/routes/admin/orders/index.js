import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';

const Order = lazy(() => import('../../../container/ecommerce/Orders.js'));

const OrderRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={Order} />
    </Switch>
  );
};

export default OrderRoutes;
