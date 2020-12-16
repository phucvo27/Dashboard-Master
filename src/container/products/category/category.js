import React, { useState } from 'react';
import { Row, Col, Input, Table, notification, Pagination } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { Main, TableWrapper } from '../../styled';
import { ShareButtonPageHeader } from '../../../components/buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../../../components/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../../components/buttons/calendar-button/calendar-button';
const Category = (props) => {
  const dataSource = [];
  const [pageSize, setPageSize] = useState(7)
  const [nameCategory, setNameCategory] = useState('');
  const [categories, setCategories] = useState(props.listCategories.docs ? props.listCategories.docs : [])
  const { listCategories } = props;
  if(categories.length > 0) {
    categories.map((category, idx) => {
      const {name, _id} = category;
      return dataSource.push({
        key: idx,
        name,
        _id,
        action: (
          <div className="table-actions">
            <>
              <Button className="btn-icon" type="primary" to="#" shape="circle">
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
      })
    })
  }
  const columns = [
    {
      title: 'Tên Danh Mục',
      dataIndex: 'name',
      key: 'name',
    },
    
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
  ];

  const onShowSizeChange = (current, size) => {
    setPageSize(size)
  }
  const onPageChange = (page) => {
    console.log(page)
  }
  const handleChangeCategoryName = e => {
    const {value} = e.target;
    setNameCategory(value)
  }
  const handleAddSuccess = (noti) => {
    notification[`${noti.type}`]({
        message: noti.title,
        description: noti.des,
      });
    setNameCategory('')
}
  const createCategory = () => {
    if(nameCategory){
      props.addCategory(nameCategory, handleAddSuccess)
    }
  }
  return (
    <>
      <PageHeader
        ghost
        title="Category"
        
      />
      <Main>
        <Row gutter={25}>
          <Col lg={24} xs={24}>
            <Cards headless>
                <div style={{ minHeight: '80px' }}>
                    <h2>Tạo Danh Mục:</h2>
                </div>
                <Row gutter={25} align="bottom">
                    <Col span="8">
                        <Input value={nameCategory} type="text" onChange={handleChangeCategoryName} placeholder="Enter new category.." />
                    </Col>
                    <Col span="2">
                        <Button onClick={createCategory} block size="large" raised type="primary">Add</Button>
                    </Col>
                </Row>
            </Cards>
          </Col>
        </Row>
        
          <Row gutter={15}>
            <Col md={24}>
              <TableWrapper className="table-order table-responsive">
                <Table
                  // rowSelection={rowSelection}
                  dataSource={dataSource}
                  columns={columns}
                  // pagination={
                  //   { 
                  //     pageSize: pageSize, 
                  //     onChange: onPageChange,
                  //     showSizeChanger: true, 
                  //     onShowSizeChange:onShowSizeChange,
                  //     total: listCategories.totalDocs
                  //   }}
                />
                <Row justify="end">
                  <Pagination 
                    defaultPageSize= {pageSize} 
                    onChange= {onPageChange}
                    showSizeChanger= {true} 
                    onShowSizeChange={onShowSizeChange}
                    total= {listCategories.totalDocs}
                  />
                </Row>
              </TableWrapper>
            </Col>
          </Row>
      </Main>
    </>
  );
};

export default Category;
