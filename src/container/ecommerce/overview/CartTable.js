import React from 'react';
import { Table} from 'antd';
import { FigureCart, ProductTable } from '../Style';
import Heading from '../../../components/heading/heading';
import { addCommas } from '../../../utility/utility'
const CartTable = (props) => {
  const { products, saleRegion, orderCode } = props;
  
  const productTableData = [];

  if (products) {
    products.map(data => {
      const { _id, images, name, salePrice} = data.product
      const { quantity } = data;
      const img = images[0]
      return productTableData.push({
        key: _id,
        orderCode: (
          <div className="cart-single-t-price" style={{textAlign: 'center'}}>
              <p>{orderCode}</p>
          </div>
        ),
        product: (
          <div className="cart-single">
            <FigureCart>
              <img style={{ width: 80 }} src={img} alt="" />
              <figcaption>
                <div className="cart-single__info">
                  <Heading as="h6">{name}</Heading>
                </div>
              </figcaption>
            </FigureCart>
          </div>
        ),
        price: <span className="cart-single-price">{addCommas(salePrice)}đ</span>,
        quantity: (
          <div className="cart-single-quantity" style={{textAlign: 'center'}}>
            {/* <Button onClick={() => decrementUpdate(id, quantity)} className="btn-dec" type="default">
              <FeatherIcon icon="minus" size={12} />
            </Button> */}
            {quantity}
            {/* <Button onClick={() => incrementUpdate(id, quantity)} className="btn-inc" type="default">
              <FeatherIcon icon="plus" size={12} />
            </Button> */}
          </div>
        ),
        total: <span className="cart-single-t-price">{addCommas(quantity * salePrice)}đ</span>,
        region: (
          <div className="cart-single">
            <p style={{marginBottom: 0}}>{saleRegion.name}</p>
          </div>
        ),
      });
    });
  }

  const productTableColumns = [
    {
      title: 'Order Number',
      dataIndex: 'orderCode',
      key: 'orderCode'
    },
    {
      title: 'Sản Phẩm',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Số Lượng',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Đơn Giá',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: 'Vùng',
      dataIndex: 'region',
      key: 'region'
    }
    
  ];

  // const submitCoupon = values => {
  //   setState({ ...state, coupon: values });
  // };

  return (
    <>
      <ProductTable>
        
        <div className="table-cart table-responsive">
            <Table pagination={false} dataSource={productTableData} columns={productTableColumns} />
          </div>
      </ProductTable>
    </>
  );
};

export default CartTable;
