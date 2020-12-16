import React, { useState } from 'react';
import { Row, Col, Table, notification, Space } from 'antd';
import { AutoComplete } from '../../../components/autoComplete/autoComplete'
import { TableWrapper } from '../../styled';
import { Button } from '../../../components/buttons/buttons';
import { Cards } from '../../../components/cards/frame/cards-frame'
import FeatherIcon from 'feather-icons-react';

  
const Drivers = (props)=>{
    const { branches, listDrivers, branchOrder, driverOrder } = props;
    
    const renderOptions = () => {
        if(branches) {
            return branches.map(branch => {
                return {
                    _id: branch._id,
                    value: branch.name
                }
            })
        }else {
            return [];
        }
    }
    const [state, setState] = useState({
        branches: renderOptions()
    })
    const dataSource = [];
    const columns = [
        {
            title: "Tên",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email"
        },
        {
            title: "Phone",
            dataIndex: "phone",
            key: "phone"
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
        },
    ]
    const callbackSuccess = (noti) => {
        notification['success']({
            message: noti.title,
            description: noti.des,
          });
    }
    if(listDrivers.docs) {
        const { docs: drivers } = listDrivers;
        let driverId = driverOrder ? driverOrder._id : '';
        for(let i = 0; i < drivers.length; i++){
            const { name, _id, email, phone } = drivers[i]
            dataSource.push({
                key: _id,
                name,
                email,
                phone: `${phone ? phone : 'Chưa Đăng Ký'}`,
                action: (
                    <div className="table-actions">
                        <>
                        {
                            driverId === _id 
                                ? <Button className="btn-icon" type="primary" to="#" shape="circle">
                                    <FeatherIcon icon="user-check" size={16} style={{color: '#20C997'}} />
                                </Button>
                                :
                                <Button onClick={()=>{ props.assignDriver(_id, callbackSuccess)}} className="btn-icon" type="primary" to="#" shape="circle">
                                    <FeatherIcon icon="user-plus" size={16} />
                                </Button>
                        }
                        </>
                    </div>
                )
            })
        }
    }
    const handleSelectBranch = (value, option) => {
        console.log(option)
        props.assignBranch(option._id, callbackSuccess)
    }
    const onSearch = searchText => {
        let arrayData = [];
        if(props.branches){
            const data = props.branches.filter(item => item.name.toUpperCase().startsWith(searchText.toUpperCase()));
            if (data.length) {
                data.map(item => arrayData.push(item.value));
            } else {
                arrayData = ['Data Not Found!'];
            }
            setState({
                branches: !searchText ? renderOptions() : arrayData,
            });
        }
      };
    
    return (
        <>
            <Row gutter={30} style={{marginTop: "40px"}}>
                <Cards title="Chọn Chi Nhánh:">
                    <AutoComplete 
                        onSelect={handleSelectBranch} 
                        dataSource={renderOptions()} 
                        placeholder="Tìm kiếm chi nhánh.."
                        onSearch={onSearch}
                        onSelect={handleSelectBranch}
                        filterOption={(inputValue, option) =>
                            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                        }
                     />
                    <Row>
                        <Col span={24}>
                            <Space size="large" style={{marginTop: '30px'}}>
                                <h4>Chi Nhánh Đã Đăng Ký: </h4>
                                <p style={{marginBottom: '0.5em'}}>{branchOrder ? branchOrder : 'Chưa Đăng Ký'}</p>
                            </Space>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Space size="large" style={{marginTop: '30px'}}>
                                <h4>Tài Xế Đang Nhận Đơn: </h4>
                                <p style={{marginBottom: '0.5em'}}>
                                    {driverOrder ? driverOrder.email : 'Chưa Đăng Ký'}
                                </p>
                            </Space>
                        </Col>
                    </Row>
                </Cards>
            </Row>
            <Row gutter={30}>
                <Cards>
                    <div style={{ minHeight: '40px' }}>
                        <h2>Danh Sách Tài Xế:</h2>
                    </div>
                </Cards>
                <Col md={24}>
                    <TableWrapper className="table-order table-responsive">
                        <Table
                            // rowSelection={rowSelection}
                            dataSource={dataSource}
                            columns={columns}
                            pagination={{ pageSize: 7, showSizeChanger: true, total: listDrivers.totalDocs }}
                        />
                    </TableWrapper>
                </Col>
          </Row>
        </>
    )
}

export default Drivers;