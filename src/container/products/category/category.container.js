import React from 'react'
import { useQuery } from '@apollo/client';
import { ADMIN_LIST_CATEGORIES} from '../../../graphql/queries';
import Category from './category'

const CategoryContainer = props => {
    const { data, loading, error } = useQuery(ADMIN_LIST_CATEGORIES);
    if(loading) {
        return <p>Loading</p>
    }
    if(error){
        return <p>Error</p>
    }
    console.log(data)
    const { adminListCategories } = data;
    return <Category listCategories={adminListCategories} />
}

export default CategoryContainer