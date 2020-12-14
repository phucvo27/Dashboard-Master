import React from 'react';
import { useQuery } from '@apollo/client';
import { ADMIN_GET_ORDER } from '../../../graphql/queries';
import { Spin } from 'antd';
import OrderDetail from './OrderDetail';

const OrderDetailContainer = props => {
    //console.log(props)
    const { data, loading, error } = useQuery(ADMIN_GET_ORDER, {
        variables: {
            id: "5fd6cc68d3d17271cb6411bb"
        }
    });
    if(loading){
        return <div className="spin"><Spin /></div>
    }

    if(error) {
        return <p>we have an error</p>
    }

    const { adminGetOrder } = data;
    //console.log(adminGetOrder);
    return <OrderDetail order={adminGetOrder} />
}

export default OrderDetailContainer;
