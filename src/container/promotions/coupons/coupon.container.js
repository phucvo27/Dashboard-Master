import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_COUPONS, ADMIN_DELETE_COUPON } from '../../../graphql/queries';
import { Spin } from 'antd';
import Coupon from './coupon'
const CouponContainer = () => {
    const { data, loading, error } = useQuery(GET_COUPONS);
    const [deleteCoupon] = useMutation(ADMIN_DELETE_COUPON);

    if(loading){
        return <div className="spin"><Spin /></div>
    }
    if(error){
        return <p>We have an error</p>
    }

    const handleRemove = (coupon, cb) => {
        console.log(coupon);
        deleteCoupon({
            variables: {
                id: coupon._id
            }
        }).then(res => {
            console.log('remove success');
            console.log(res);
            cb({type: 'success', title: "Thành Công", des: `Bạn đã xóa thành công coupon: ${coupon.code}`})
        })
        .catch(e => {
            console.log(e);
            console.log("we have an error");
            cb({type: 'error', title: "Thất Bại", des: `Hiện không thể xóa coupon: ${coupon.code}`})
        })
    }

    console.log(data);
    const { adminListCoupon } = data;

    return <Coupon adminListCoupon={adminListCoupon} remove={handleRemove} />
}

export default CouponContainer;