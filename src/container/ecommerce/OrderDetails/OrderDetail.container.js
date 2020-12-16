import React from 'react';
import { useQuery } from '@apollo/client';
import { ADMIN_GET_ORDER } from '../../../graphql/queries';
import { Spin } from 'antd';
import OrderDetail from './OrderDetail';

const OrderDetailContainer = props => {
    console.log(props.match.params.orderid)
    const { orderid } = props.match.params
    const { data, loading, error } = useQuery(ADMIN_GET_ORDER, {
        variables: {
            id: orderid
        },
        fetchPolicy: "network-only"
    });
    if(loading){
        return <div className="spin"><Spin /></div>
    }

    if(error) {
        return <p>we have an error</p>
    }

    const { adminGetOrder } = data;
    //console.log(adminGetOrder);
    return <OrderDetail orderid={orderid} order={adminGetOrder} />
}

export default OrderDetailContainer;
