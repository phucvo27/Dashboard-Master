import React, { Suspense } from 'react';
import { Spin } from 'antd';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Dashboard from './dashboard';
import ChatApp from '../../container/chat/ChatApp';
import Product from './products'
import Orders from './orders'
import withAdminLayout from '../../layout/withAdminLayout';

const Admin = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Suspense
        fallback={
          <div className="spin">
            <Spin />
          </div>
        }
      >
        <Route path={path} component={Dashboard} />
        <Route path={`${path}/products`} component={Product} />
        <Route path={`${path}/orders`} component={Orders} />
        <Route path={`${path}/chat`} component={ChatApp} />
      </Suspense>
    </Switch>
  );
};

export default withAdminLayout(Admin);
