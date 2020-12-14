import React, { lazy, useState, useEffect } from 'react';
import { Row, Col, Space, Switch } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Main } from '../../styled';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { ShareButtonPageHeader } from '../../../components/buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../../../components/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../../components/buttons/calendar-button/calendar-button';
import { cartGetData } from '../../../redux/cart/actionCreator';
import Drivers from '../../Assign/Driver/Driver.container'
//const Checkout = lazy(() => import('../overview/CheckOut'));
const CartTable = lazy(() => import('../overview/CartTable'));
const Ordersummary = lazy(() => import('../overview/Ordersummary'));

const ShoppingCart = (props) => {
  const {details: products, orderCode, saleRegion, totalAmount, totalAmountAfterDiscounted,discountCode,discountType,discountValue} = props.order;
  const discount = {
    discountCode,
    discountType,
    discountValue
  }
  const [isAssign, assignDriver] = useState(false)
  const dispatch = useDispatch();
  const { cartData } = useSelector(state => {
    return {
      cartData: state.cart.data,
      rtl: state.ChangeLayoutMode.rtlData,
    };
  });
  const { path, isExact } = useRouteMatch();
  const [state, setState] = useState({
    coupon: 0,
    promo: 0,
    current: 0,
  });

  useEffect(() => {
    if (cartGetData) {
      dispatch(cartGetData());
    }
  }, [dispatch]);

  let subtotal = 0;

  if (cartData !== null) {
    cartData.map(data => {
      const { quantity, price } = data;
      subtotal += parseInt(quantity, 10) * parseInt(price, 10);
      return subtotal;
    });
  }

  const onHandleCurrent = current => {
    setState({
      ...state,
      current,
    });
  };
  const handleChangeAssignDriver = checked => {
    assignDriver(checked)

  }

  return (
    <>
      <PageHeader
        ghost
        title="Shopping Cart"
        buttons={[
          <div key="1" className="page-header-actions">
            <CalendarButtonPageHeader key="1" />
            <ExportButtonPageHeader key="2" />
            <ShareButtonPageHeader key="3" />
            <Button size="small" key="4" type="primary">
              <FeatherIcon icon="plus" size={14} />
              Add New
            </Button>
          </div>,
        ]}
      />
      <Main>
        <div className={isExact ? 'cartWraper' : 'checkoutWraper'}>
          <Row gutter={15}>
            <Col md={24}>
              <Cards headless>
                <Row gutter={30}>
                  <Col xxl={17} xs={24}>
                    <CartTable 
                      orderCode={orderCode}
                      saleRegion={saleRegion}
                      products={products} />
                    {/* <Switch>
                      <Suspense
                        fallback={
                          <Cards headless>
                            <Skeleton paragraph={{ rows: 10 }} active />
                          </Cards>
                        }
                      >
                        <Route
                          path={`${path}/checkout`}
                          render={() => <Checkout onCurrentChange={onHandleCurrent} />}
                        />
                        <Route exact path={path} component={CartTable} />
                      </Suspense>
                    </Switch> */}
                  </Col>
                  <Col xxl={7} xs={24}>
                    {/* <Suspense
                      fallback={
                        <Cards headless>
                          <Skeleton paragraph={{ rows: 10 }} active />
                        </Cards>
                      }
                    >
                      <Ordersummary 
                        discount={discount}
                        totalAmount={totalAmount}
                        totalAmountAfterDiscounted={totalAmountAfterDiscounted}
                        subtotal={subtotal} isExact={isExact} path={path} />
                    </Suspense> */}
                    <Ordersummary 
                        discount={discount}
                        totalAmount={totalAmount}
                        totalAmountAfterDiscounted={totalAmountAfterDiscounted}
                        subtotal={subtotal} isExact={isExact} path={path} />
                  </Col>
                </Row>
              </Cards>
              <Cards headless>
                <Space size="middle" align="center">
                    <p style={{marginBottom: 0}}>Assign Driver</p>
                    <Switch onChange={handleChangeAssignDriver} checked={isAssign} />
                </Space>
                <Row>
                  <Col span={24}>
                  {
                    isAssign && <Drivers />
                  }
                  </Col>
                </Row>
              </Cards>
            </Col>
          </Row>
        </div>
      </Main>
    </>
  );
};

export default ShoppingCart;
