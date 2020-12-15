import React, { useState, useEffect } from 'react';
import { OrderSummary } from '../Style';
import { Cards } from '../../../components/cards/frame/cards-frame';
import Heading from '../../../components/heading/heading';
//import { cartGetData } from '../../../redux/cart/actionCreator';
import { addCommas } from '../../../utility/utility'
const Ordersummary = ({ discount, totalAmount, totalAmountAfterDiscounted }) => {
  //const dispatch = useDispatch();
  // const { rtl } = useSelector(state => {
  //   return {
  //     rtl: state.ChangeLayoutMode.rtlData,
  //   };
  // });

  //const [form] = Form.useForm();
  const [state, setState] = useState({
    coupon: 0,
    promo: 0,
    current: 0,
  });

  // useEffect(() => {
  //   if (cartGetData) {
  //     dispatch(cartGetData());
  //   }
  // }, [dispatch]);

  // const submitPromo = values => {
  //   setState({ ...state, promo: values });
  // };

  // const { Option } = Select;

  // const onSubmit = () => {
  //   document.querySelectorAll('button span').forEach(item => {
  //     if (item.innerHTML === 'Done') {
  //       item.click();
  //     }
  //   });
  // };
  const renderDiscount = () => {
    const {  discountCode, discountType, discountValue } = discount;
    if(discountCode) {
      return discountType === 'fixed' ? `${addCommas(discountValue)}đ` : `${discountValue}%`
    }else {
      return 'None'
    }
  }

  return (
    <Cards
      bodyStyle={{
        backgroundColor: '#F8F9FB',
        borderRadius: '20px',
      }}
      headless
    >
      <OrderSummary>
        <Heading className="summary-table-title" as="h4">
          Thông Tin
        </Heading>
        <Cards
          bodyStyle={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
          }}
          headless
        >
          <div className="order-summary-inner">
            <ul className="summary-list" style={{marginBottom: '40px'}}>
              <li>
                <span className="summary-list-title">Đơn Giá :</span>
                <span className="summary-list-text">{`${addCommas(totalAmount)}đ`}</span>
              </li>
              <li>
                <span className="summary-list-title">Giảm Giá :</span>
                <span className="summary-list-text">{renderDiscount()}</span>
              </li>
              <li>
                <span className="summary-list-title">Shipping :</span>
                <span className="summary-list-text">{addCommas(5000)}</span>
              </li>
              {
                discount.discountCode &&
                <li>
                  <span className="summary-list-title">Mã Giảm Giá :</span>
                  <span className="summary-list-text" style={{color: '#5F63F2'}}>{discount.discountCode}</span>
              </li>
              }
            </ul>
            <Heading className="summary-total" as="h4">
              <span className="summary-total-label">Tổng Tiền: </span>
              <span className="summary-total-amount">{`${addCommas(totalAmountAfterDiscounted + 5000)}`}đ</span>
            </Heading>
            {/* {isExact && (
              <Button className="btn-proceed" type="secondary" size="large">
                <Link to={`${path}/checkout`}>
                  Proceed To Checkout
                  <FeatherIcon icon={!rtl ? 'arrow-right' : 'arrow-left'} size={14} />
                </Link>
              </Button>
            )}
            {state.current === 3 && (
              <Button onClick={onSubmit} className="btn-proceed" type="secondary" size="large">
                <Link to="#">Place Order</Link>
              </Button>
            )} */}
          </div>
        </Cards>
      </OrderSummary>
    </Cards>
  );
};

export default Ordersummary;
