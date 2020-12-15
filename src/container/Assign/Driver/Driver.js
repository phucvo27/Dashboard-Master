import React, { useState } from 'react';
import { Row, Col, Table } from 'antd';
import { AutoComplete } from '../../../components/autoComplete/autoComplete'
import { TableWrapper } from '../../styled';
import { Button } from '../../../components/buttons/buttons';
import { Cards } from '../../../components/cards/frame/cards-frame'
import FeatherIcon from 'feather-icons-react';

  
const Drivers = (props)=>{
    const { branches, listDrivers } = props;
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
    if(listDrivers.docs) {
        const { docs: drivers } = listDrivers;
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
                        <Button className="btn-icon" type="primary" to="#" shape="circle">
                            <FeatherIcon icon="user-plus" size={16} />
                        </Button>
                        <Button className="btn-icon" type="primary" to="#" shape="circle">
                            <FeatherIcon icon="user-minus" size={16} style={{color: '#FF4D4F'}} />
                        </Button>
                        
                        </>
                    </div>
                )
            })
        }
    }

    
    const handleSelectBranch = (value, option) => {
        console.log(option)
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