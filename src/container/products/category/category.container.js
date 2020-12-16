import React from 'react'
import { useQuery, useMutation } from '@apollo/client';
import { ADMIN_LIST_CATEGORIES, ADMIN_CREATE_CATEGORY, ADMIN_UPDATE_CATEGORY} from '../../../graphql/queries';
import Category from './category'
import { Spin } from 'antd'
const CategoryContainer = props => {
    const { data, loading, error } = useQuery(ADMIN_LIST_CATEGORIES, {
        variables: {
            perPage: 20
        }
    });
    const [addCategory] = useMutation(ADMIN_CREATE_CATEGORY);
    const [updateCategory] = useMutation(ADMIN_UPDATE_CATEGORY);
    if(loading) {
        return <div className="spin"><Spin /></div>
    }
    if(error){
        return <p>Error</p>
    }

    const handleAddCategory = (name, cb) =>{
        addCategory({variables: {adminCreateCategoryInput: {name}}})
            .then(res => {
                console.log('Create Category success');
                const newCategory = res.data.adminCreateCategory
                cb({type: 'success', title: "Tạo Danh Mục Thành Công", des: `Bạn đã tạo thành công danh mục: ${newCategory.name}`})
            })
            .catch(e => {
                console.log('we have an problem when creating Category')
                cb({type: 'error', title: "Tạo Danh Mục Thành Công", des: `Bạn đã tạo thành công danh mục: ${name}`})
            })
    }
    console.log(data)
    const { adminListCategories } = data;
    return <Category listCategories={adminListCategories} addCategory={handleAddCategory} />
}

export default CategoryContainer