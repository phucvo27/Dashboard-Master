import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { AMIN_LIST_BRANCHES, ADMIN_LIST_DRIVERS,ADMIN_ASSIGN_BRANCH_TO_ORDER, ADMIN_ASSIGN_ORDER_TO_DRIVER } from '../../../graphql/queries'
import { graphql } from '@apollo/client/react/hoc';
import { flowRight } from 'lodash';
import Drivers from './Driver';
import { Spin } from 'antd'
const DriverContainer = props => {
    const { orderid, order } =props;
    const converBranch = branch => {
        if(branch){
            const { address } = branch;
            const { ward, district, addressNo, city} = address;
            const shippingAddress = `${addressNo}/${ward.name}/${district.name}/${city.name}`;
            return shippingAddress;
        }
        return ''
    }
    const [branchOrder, setBranchOrder] = useState(props.order ? converBranch(props.order.branch) : null);
    const [driverOrder, setDriverOrder] = useState(props.order ? props.order.driver : null)
    console.log(order)
    
    const { data, loading, error } = useQuery(ADMIN_LIST_DRIVERS, {
        variables: {
            page: 1,
            perPage: 10,
            orderBy: "createdAt",
            orderDir: "desc"
        }
    });

    const [assignBranch] = useMutation(ADMIN_ASSIGN_BRANCH_TO_ORDER);
    const [assignDriver] = useMutation(ADMIN_ASSIGN_ORDER_TO_DRIVER); 
    if(loading) {
        return <div className="spin"><Spin /></div>
    }
    if(error) {
        return <div>We have an error...</div>
    }
    const branches = props.branches.adminListBranches;
    const listDrivers = data.adminListDrivers;
    // Assign Branch to Order
    const handleAssignBranchToOrder = (branchId, cb) => {
        console.log(branchId)
        console.log(props.orderID)
        assignBranch({variables: {
            id: orderid,
            branch: branchId
        }}).then(res => {
            console.log('assign success');
            console.log(res);
            const address = converBranch(res.data.adminAssignBranchToOrder.branch)
            cb({title: 'Đăng ký Chi Nhánh Thành Công', des: `Đã đăng ký chi nhánh cho đơn hàng ${order.orderCode} thành công`})
            setBranchOrder(address)
        }).catch(e => {
            console.log(e)
        })
    }
    // Assign Order To Driver
    const handleAssignOrderToDriver = (driverId, cb) => {
        assignDriver({variables: {
            id: orderid,
            driver: driverId
        }}).then(res => {
            console.log('assign driver success');
            console.log(res)
            const {driver} = res.data.adminAssignOrderToDriver
            cb({title: 'Đăng ký Chi Tài Xế', des: `Đã đăng ký đơn hàng cho tài xế có email ${driver.email} thành công`});
            setDriverOrder(driver)
        }).catch(e => {
            console.log(e)
        })
    }
    return <Drivers 
            assignBranch={handleAssignBranchToOrder}
            assignDriver={handleAssignOrderToDriver}
            branches={branches} 
            listDrivers={listDrivers} 
            branchOrder={branchOrder}
            driverOrder={driverOrder}
            />

}

export default flowRight(
    graphql(AMIN_LIST_BRANCHES, {name: 'branches'})
)(DriverContainer)