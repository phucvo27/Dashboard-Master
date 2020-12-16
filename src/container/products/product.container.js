import React from 'react';
import { useQuery } from '@apollo/client';
import { ADMIN_LIST_PRODUCTS, LIST_SALE_REGIONS, ADMIN_LIST_CATEGORIES } from '../../graphql/queries';
import { flowRight } from 'lodash';
import { graphql } from '@apollo/client/react/hoc';
import { Spin } from 'antd'
import Product from './index'

const ProductContainer = props => {
    const categories = props.categories.adminListCategories ? props.categories.adminListCategories : {};
    const regions = props.regions.listSaleRegions ? props.regions.listSaleRegions : [];
    // const regions = props.regions.admin
    const { data, loading, error, refetch } = useQuery(ADMIN_LIST_PRODUCTS, {
        variables : {
            page: 1,
            perPage: 100
        }
    });
    if(loading){
        return <div className="spin"><Spin /></div>
    }
    if(error){
        return <p>We have an error</p>
    }

    const { adminListProducts } = data;

    return <Product {...props} adminListProducts={adminListProducts} categories={categories} regions={regions} />
}

export default flowRight(
    graphql(LIST_SALE_REGIONS, {name: 'regions'}),
    graphql(ADMIN_LIST_CATEGORIES, {name: 'categories'})
)(ProductContainer)