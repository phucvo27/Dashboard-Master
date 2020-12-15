import React from 'react';
import { useQuery } from '@apollo/client';
import { ADMIN_LIST_ORDERS } from '../../../graphql/queries';
import Orders from './Orders';
import { Spin } from 'antd'

const OrderContainer = props => {
    const { data, loading, error } = useQuery(ADMIN_LIST_ORDERS);

    if(loading) {
        return <div className="spin"><Spin /></div>
    }

    if(error){
        return <p>We have an error</p>
    }

    //console.log(data)
    const { adminListOrders } = data;
    return <Orders {...props} orders={adminListOrders} />
}

export default OrderContainer;