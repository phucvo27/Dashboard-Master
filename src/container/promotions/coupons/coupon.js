import React, {useState} from 'react';
import { Row, Col, Radio, Table, notification } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Main, TableWrapper, TopToolBox } from '../../styled';
import { Button } from '../../../components/buttons/buttons';
import { addCommas } from '../../../utility/utility'
const Coupon = (props) => {
    const dataSource = []
    const { adminListCoupon } = props;
    const [state, setState] = useState({
        coupons: adminListCoupon ? adminListCoupon.docs : []
    })
    const filterKey = ['Đang Hoạt Động', 'Chưa Kích hoạt'];
    const { coupons } = state;
    if(coupons.length > 0){
        coupons.forEach((coupon, idx) => {
            const { _id, code, discountType, discountValue, isActive } = coupon;
            dataSource.push({
                key: idx + 1,
                id: <span className="order-id">#{code}</span>,
                status: (
                  <span
                    className={`status ${
                        isActive ? 'Success' : 'error'
                    }`}
                  >
                    {isActive ? 'Đang Hoạt Động' : 'Chưa Kích Hoạt'}
                  </span>
                ),
                discount: <span className="ordered-amount">
                    {
                         discountType === 'fixed' ? `${addCommas(discountValue)}đ` : `${discountValue}%`
                    }</span>,
                
                action: (
                  <div className="table-actions">
                    <>
                      <Button 
                        //   onClick={() => {props.history.push(`/admin/promotions/${_id}`)}}
                          className="btn-icon" 
                          type="primary" 
                          to="#" 
                          shape="circle">
                        <FeatherIcon icon="gift" size={16} />
                      </Button>
                        <Button className="btn-icon" type="info" to="#" shape="circle" onClick={()=>{
                            notification['success']({
                                message: 'Notification Title',
                                description:
                                    'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
                            });
                        }}>
                        <FeatherIcon icon="edit" size={16} />
                      </Button>
                      <Button 
                        className="btn-icon" 
                        type="danger" 
                        to="#" 
                        shape="circle" 
                        onClick={() => {props.remove(coupon, callback)}}>
                        <FeatherIcon icon="trash-2" size={16} />
                      </Button>
                    </>
                  </div>
                ),
              });
            });
        
    }
    const columns = [
        {
            title: 'Order Code',
            dataIndex: 'id',
            key: 'id',
          },
          
          {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
          },
          {
            title: 'Giá Trị',
            dataIndex: 'discount',
            key: 'discount',
          },
          {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
          },
    ]

    const callback = (noti) => {
        notification[`${noti.type}`]({
          message: noti.title,
          description: noti.des,
        });
      }
    const handleChangeForFilter = e => {
        //dispatch(orderFilter('status', e.target.value));
        let typeCoupon = e.target.value;
        if(typeCoupon === 'all'){
            setState({
                ...state,
                coupons: adminListCoupon.docs,
            });
        }else {
            let filterFor = typeCoupon === 'Đang Hoạt Động' ? true : false
            const res = adminListCoupon.docs.filter(coupon => coupon.isActive === filterFor);
            console.log(res)
            setState({
                ...state,
                coupons: res,
            });
        }
        
      };
    return (
        <>
        <PageHeader
            ghost
            title="Coupon"
        />
        <Main>
            <Row gutter={25}>
            <Col lg={24} xs={24}>
                <Cards headless>
                    <Row gutter={15}>
                        <Col xs={24}>
                        <TopToolBox>
                            <Row gutter={15} className="justify-content-center">
                            <Col lg={6} xs={24}>
                                {/* <div className="table-search-box">
                                <AutoComplete 
                                    onSearch={handleSearch} 
                                    dataSource={renderOptionsOrderCode()} width="100%" patterns />
                                </div> */}
                            </Col>
                            <Col xxl={14} lg={16} xs={24}>
                                <div className="table-toolbox-menu">
                                <span className="toolbox-menu-title"> Status:</span>
                                <Radio.Group onChange={handleChangeForFilter} defaultValue="all">
                                    <Radio.Button value="all">All</Radio.Button>
                                    {filterKey.map(value => {
                                        return (
                                        <Radio.Button key={value} value={value}>
                                            {value}
                                        </Radio.Button>
                                        );
                                    })}
                                </Radio.Group>
                                </div>
                            </Col>
                            <Col xxl={4} xs={24}>
                                <div className="table-toolbox-actions">
                                <Button size="small" type="secondary" transparented>
                                    Export
                                </Button>
                                {/* <Button size="small" type="primary">
                                    <FeatherIcon icon="plus" size={12} /> Add Order
                                </Button> */}
                                </div>
                            </Col>
                            </Row>
                        </TopToolBox>
                        </Col>
                    </Row>
                    <Row gutter={15}>
                        <Col md={24}>
                        <TableWrapper className="table-order table-responsive">
                            <Table
                            // rowSelection={rowSelection}
                            dataSource={dataSource}
                            columns={columns}
                            pagination={{ pageSize: 7, showSizeChanger: true, total: adminListCoupon && adminListCoupon.totalDocs }}
                            />
                        </TableWrapper>
                        </Col>
                    </Row>
                </Cards>
            </Col>
            </Row>
        </Main>
        </>
    );
};

export default Coupon;
