import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Radio, Table, notification } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { TopToolBox } from '../Style';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Main, TableWrapper } from '../../styled';
import { AutoComplete } from '../../../components/autoComplete/autoComplete';
import { Button } from '../../../components/buttons/buttons';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { orderFilter } from '../../../redux/orders/actionCreator';

import { ShareButtonPageHeader } from '../../../components/buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../../../components/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../../components/buttons/calendar-button/calendar-button';
import { addCommas } from '../../../utility/utility'
import Notification from '../../../components/notification/Notification'
const Orders = (props) => {
  console.log(props.orders)
  const dispatch = useDispatch();
  const { searchData, orders } = useSelector(state => {
    return {
      searchData: state.headerSearchData,
      orders: state.orders.data,
    };
  });

  const [state, setState] = useState({
    data: props.orders ? props.orders.docs : [],
    item: [],
    selectedRowKeys: [],
  });
  console.log(state)
  const { data, item, selectedRowKeys } = state;
  console.log(data)
  const filterKey = ['shipped', 'ordered', 'cancelled', 'delivered'];
  // ordered
  // requested
  // packed
  // shipped
  // delivered
  // cancelled

  /**
   * @todo purpose
   * @todo ternary issue
   */
  useEffect(() => {
    if (orders) {
      setState({
        ...state,
        item: orders,
        selectedRowKeys,
      });
    }
  }, [orders, selectedRowKeys]);

  const handleSearch = searchText => {
    const res = data.filter(value => value.orderCode.toUpperCase().startsWith(searchText.toUpperCase()));
    setState({
      ...state,
      data: res,
    });
  };

  const handleChangeForFilter = e => {
    //dispatch(orderFilter('status', e.target.value));
    const typeOrder = e.target.value
    console.log(typeOrder);
    console.log(data)
    const res = props.orders.docs.filter(value => value.shippingStatus.toUpperCase().startsWith(typeOrder.toUpperCase()));
    console.log(res)
    setState({
      ...state,
      data: res,
    });
  };

  const dataSource = [];
  if (data) {
    data.map((value, key) => {
      const { shippingStatus, orderCode, customer, totalAmount, sellDate, _id } = value;
      return dataSource.push({
        key: key + 1,
        id: <span className="order-id">#{orderCode}</span>,
        customer: <span className="customer-name">{customer.name}</span>,
        status: (
          <span
            className={`status ${
              shippingStatus === 'shipped' ? 'Success' : shippingStatus === 'ordered' ? 'warning' : 'error'
            }`}
          >
            {shippingStatus}
          </span>
        ),
        amount: <span className="ordered-amount">{addCommas(totalAmount)}</span>,
        date: <span className="ordered-date">{sellDate}</span>,
        action: (
          <div className="table-actions">
            <>
              <Button 
                  onClick={() => {props.history.push(`/admin/orders/${_id}`)}}
                  className="btn-icon" 
                  type="primary" 
                  to="#" 
                  shape="circle">
                <FeatherIcon icon="eye" size={16} />
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
              <Button className="btn-icon" type="danger" to="#" shape="circle">
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
      title: 'Order Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'customer',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
  ];
  const renderOptionsOrderCode = () => {
    if(data) {
      return data.map(order => {
        return order.orderCode
      })
    }
    return [];
  }
  const onSelectChange = selectedRowKey => {
    setState({ ...state, selectedRowKeys: selectedRowKey });
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      onSelectChange(selectedRowKeys);
    },
  };

  return (
    <>
      <PageHeader
        ghost
        title="Orders"
        // buttons={[
        //   <div key="1" className="page-header-actions">
        //     <CalendarButtonPageHeader key="1" />
        //     <ExportButtonPageHeader key="2" />
        //     <ShareButtonPageHeader key="3" />
        //     <Button size="small" key="4" type="primary">
        //       <FeatherIcon icon="plus" size={14} />
        //       Add New
        //     </Button>
        //   </div>,
        // ]}
      />
      <Main>
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
                      <Radio.Group onChange={handleChangeForFilter} defaultValue="">
                        <Radio.Button value="">All</Radio.Button>
                        {item.length &&
                          [...new Set(filterKey)].map(value => {
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
                  rowSelection={rowSelection}
                  dataSource={dataSource}
                  columns={columns}
                  pagination={{ pageSize: 7, showSizeChanger: true, total: props.orders.totalDocs }}
                />
              </TableWrapper>
            </Col>
          </Row>
        </Cards>
         
      </Main>
    </>
  );
};

export default Orders;
