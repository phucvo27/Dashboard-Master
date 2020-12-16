import React from 'react';
import Coupon from './Coupon';
import { ADMIN_CREATE_COUPON } from '../../../../graphql/queries';
import { useMutation } from '@apollo/client';
const AddCouponContainer = props => {

    const [createCoupon ] = useMutation(ADMIN_CREATE_COUPON);

    const handleCreate = (coupon, cb) => {
        // coupon.discountValue = Number(coupon.discountValue);
        // coupon.remainingCount = Number(coupon.remainingCount);
        console.log(coupon);
        coupon.discountValue = Number(coupon.discountValue);
        coupon.remainingCount = Number(coupon.remainingCount)
        createCoupon({
            variables: {
                adminCreateCouponInput: coupon
            }
        }).then(res => {
            console.log('create success');
            cb({type: 'success', title: "Thành Công", des: `Bạn đã thêm thành công coupon: ${coupon.code}`})
        })
        .catch(e => {
            console.log('we have error when creating');
            console.log(e);
            cb({type: 'error', title: "Thất Bại", des: `Không thể tạo coupon: ${coupon.code}`})
        })
    }
    return <Coupon createCoupon={handleCreate} />
}

export default AddCouponContainer;