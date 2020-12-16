import React, {useState} from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ADMIN_LIST_CATEGORIES, AMIN_LIST_BRANCHES, ADMIN_CREATE_PRODUCT, LIST_SALE_REGIONS, ADMIN_CREATE_CATEGORY } from '../../../graphql/queries';
import { Spin } from 'antd'
import AddProduct from './AddProduct';
import { graphql } from '@apollo/client/react/hoc';
import { flowRight } from 'lodash'
const AddProductContainer = props => {
    
    const regions = props.regions.listSaleRegions ? props.regions.listSaleRegions : [];
    //const [categories, setCategories] = useState(adminListCategories ? adminListCategories.docs : [])
    const [addCategory] = useMutation(ADMIN_CREATE_CATEGORY);
    const { data, loading, error } = useQuery(ADMIN_LIST_CATEGORIES)
    if(loading) {
        return <div className="spin"><Spin /></div>
    }
    if(error) {
        return <p> We have an error... </p>
    }
    console.log(data);
    const { adminListCategories } = data;
    //console.log(categories)
    const categories = adminListCategories.docs;
    const branches = props.branches.adminListBranches;
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
    return <AddProduct 
        regions={regions} 
        addCategory={handleAddCategory} 
        categories={categories}
        branches={branches}
        />
    // return <AddProduct />
}

//export default AddProductContainer

export default flowRight(
    graphql(LIST_SALE_REGIONS, {name: 'regions'}),
    graphql(AMIN_LIST_BRANCHES, {name: 'branches'})
)(AddProductContainer);