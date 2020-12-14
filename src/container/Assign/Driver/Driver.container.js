import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { AMIN_LIST_BRANCHES, ADMIN_LIST_DRIVERS } from '../../../graphql/queries'
import { graphql } from '@apollo/client/react/hoc';
import { flowRight } from 'lodash';
import Drivers from './Driver';
import { Spin } from 'antd'
const DriverContainer = props => {
    console.log('First time run')
    console.log(props.branches)
    const { data, loading, error } = useQuery(ADMIN_LIST_DRIVERS, {
        variables: {
            page: 1,
            perPage: 10,
            orderBy: "createdAt",
            orderDir: "desc"
        }
    });
    if(loading) {
        return <div className="spin"><Spin /></div>
    }
    if(error) {
        return <div>We have an error...</div>
    }
    console.log(data)
    const branches = props.branches.adminListBranches;
    const listDrivers = data.adminListDrivers;
    return <Drivers branches={branches} listDrivers={listDrivers} />

}

export default flowRight(
    graphql(AMIN_LIST_BRANCHES, {name: 'branches'})
)(DriverContainer)