import React from 'react';
import Coupon from './Coupon';
import { ADMIN_UPDATE_COUPON } from '../../../../graphql/queries';
import { useMutation } from '@apollo/client';


const EditCouponContainer = props => {
    const coupon = props.coupon;
    console.log(coupon)
    const [editCoupon ] = useMutation(ADMIN_UPDATE_COUPON);

    const handleEdit = (data, cb) => {
        // coupon.discountValue = Number(coupon.discountValue);
        // coupon.remainingCount = Number(coupon.remainingCount);
        console.log(coupon);
        editCoupon({
            variables: {
                id: coupon._id,
                adminUpdateCouponInput: data
            }
        }).then(res => {
            console.log('Edit success');
            cb()
        })
        .catch(e => {
            console.log('we have error when creating');
            console.log(e)
        })
    }
    return <Coupon handleEdit={handleEdit} isEdit={true} coupon={coupon} />
}

export default EditCouponContainer;