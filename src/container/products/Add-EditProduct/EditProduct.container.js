import React, {useState} from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ADMIN_LIST_CATEGORIES, ADMIN_UPDATE_PRODUCT ,ADMIN_GET_PRODUCT ,AMIN_LIST_BRANCHES, LIST_SALE_REGIONS, ADMIN_CREATE_CATEGORY } from '../../../graphql/queries';
import { Spin } from 'antd'
import { graphql } from '@apollo/client/react/hoc';
import { flowRight } from 'lodash';
import Product from './Product';



const EditContainer = props => {
    console.log(props.match.params.productid)
    const { productid } = props.match.params;
    
    const [editProduct] = useMutation(ADMIN_UPDATE_PRODUCT);
    const [addCategory] = useMutation(ADMIN_CREATE_CATEGORY)
    // console.log(props.match.params.id)
    const { data, loading, error } = useQuery(ADMIN_GET_PRODUCT, {variables: {id: productid}});

    if(loading){
        return <div className="spin"><Spin /></div>
    }
    if(error){
        return <p>We have an error</p>
    }
    const handleAddCategory = (name, cb) =>{
        addCategory({variables: {adminCreateCategoryInput: {name}}})
            .then(res => {
                console.log('Create Category success');
                const newCategory = res.data.adminCreateCategory
                cb({title: "Tạo Danh Mục Thành Công", des: `Bạn đã tạo thành công danh mục: ${newCategory.name}`});
                setCategories([newCategory, ...categories])
            })
            .catch(e => {
                console.log('we have an problem when creating Category')
            })
    }
    const handleEditProduct = (payload, cb) => {
        editProduct({
            variables: {
                adminUpdateProductInput: payload,
                id: productid
            }
        })
        .then(res => {
            console.log(payload)
            cb({type: 'success', title: 'Thành Công', des:`Bạn đã cập nhật thành công sản phẩm: ${payload.name}`})

        })
        .catch(e => {
            console.log(e)
            cb({type: 'error', title: 'Thất Bại', des:`Xin lỗi, Không thể cập nhật sản phẩm: ${payload.name}`})
        })
    }

    const product = data.adminGetProduct;

    console.log(product);
    const categories = props.categories.adminListCategories ? props.categories.adminListCategories.docs : [];
    const regions = props.regions.listSaleRegions ? props.regions.listSaleRegions : [];
    const branches = props.branches.adminListBranches;
    return <Product 
        regions={regions} 
        addCategory={handleAddCategory} 
        categories={categories}
        branches={branches}
        currentProduct={product}
        edit={handleEditProduct}
        /> 
}
export default flowRight(
    graphql(LIST_SALE_REGIONS, {name: 'regions'}),
    graphql(AMIN_LIST_BRANCHES, {name: 'branches'}),
    graphql(ADMIN_LIST_CATEGORIES, {name: 'categories'})
)(EditContainer);