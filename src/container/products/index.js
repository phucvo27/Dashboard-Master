import React, { useState } from 'react';
import { Row, Col, Table, Select, Pagination, notification } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Main, TableWrapper, SelectWrapperStyle } from '../styled';
import { ShareButtonPageHeader } from '../../components/buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../../components/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../components/buttons/calendar-button/calendar-button';
import { addCommas } from '../../utility/utility'
const { Option } = Select;
const Product = (props) => {
  console.log(props);
  const { adminListProducts, categories, regions } = props;
  const [category, setCategory] = useState(categories.docs ? categories.docs[0]._id : '')
  const [region, setRegion] = useState(regions.length > 0 ? regions[0]._id : '')
  const columns = [
    {
      title: 'Image',
      width: 100,
      dataIndex: 'image',
      key: 'image',
      fixed: 'left',
      render: (text, record) => {
            const imgUrl = record.images.length > 0 ? record.images[0] : '';
            return <img width="50" src={imgUrl} alt={`${record._id}`} />
      }
    },
    {
        title: 'SKU',
        dataIndex: 'sku',
        key: '7',
        width: 150,
    },
    {
      title: 'Tên Sản Phẩm',
      width: 100,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Đơn Giá Mua',
      dataIndex: 'buyPriceExcTax',
      key: '2',
      width: 150,
    },
    {
      title: 'Đơn Giá Bán',
      dataIndex: 'salePrice',
      key: '3',
      width: 150,
    },
    {
      title: 'Tồn Kho',
      dataIndex: 'quantity',
      key: '4',
      width: 150,
    },
    {
      title: 'Danh Mục',
      dataIndex: 'category',
      key: '5',
      width: 150,
    },
    {
        title: 'Thuế',
        dataIndex: 'tax',
        key: '6',
        width: 150,
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 100,
      render: (text, record) => {
            return (
              <div className="table-actions">
                <>
                  <Button className="btn-icon" type="primary" to="#" shape="circle">
                    <FeatherIcon icon="eye" size={16} />
                  </Button>
                  <Button className="btn-icon" type="info" to="#" shape="circle" onClick={()=>{ props.history.push(`/admin/products/edit/${record._id}`)}}>
                    <FeatherIcon icon="edit" size={16} />
                  </Button>
                  <Button className="btn-icon" type="danger" to="#" shape="circle">
                    <FeatherIcon icon="trash-2" size={16} />
                  </Button>
                </>
              </div>
            )
      }
    },
]
  const convert = () => {
    let data = [];
      if(adminListProducts.docs){
        const { docs: products} = adminListProducts;
        const filterByCategory = products.filter(prod => {
          // console.log(prod.category._id)
          // console.log(prod.category._id === '5fc7327288341c736abe2d64')
          
          return  prod.category._id === category
        })
        //console.log(category)
        console.log(filterByCategory)
        for (let i = 0; i < filterByCategory.length; i++) {
          const { _id, name, images, quantity,salePriceInRegions, description, sku, salePrice,buyPriceExcTax, category } = filterByCategory[i]
          let price = salePrice;
          //console.log(salePriceInRegions)
          let doesPriceExistOnRegion = salePriceInRegions.find(item => item.saleRegion._id === region);
          //console.log(doesPriceExistOnRegion)
          if(doesPriceExistOnRegion){
              //console.log(`Old price: ${price}`)
              price = doesPriceExistOnRegion.salePrice;
              //console.log(`We found new price: ${price}`)
          }
          data.push({
              key: i,
              name,
              images,
              description,
              quantity,
              sku,
              salePrice: addCommas(price),
              buyPriceExcTax: addCommas(buyPriceExcTax),
              category: category.name,
              tax: "10%",
              _id,
          });
      }
      
      
      }
    return data;  
        
  }
  const [products, setProducts] = useState(convert())
  const onPageChange = (page) => {
    console.log(page)
  }
  const renderCategory = () => {
    if(props.categories.docs){
      const { docs: categories } = props.categories;
      return categories.map((category, idx) => <Option key={idx} value={category._id}>{category.name}</Option>)
    }
  }
  const renderRegion = () => {
    const { regions } = props;

    return regions.map((region, idx) => <Option key={idx} value={region._id}>{region.name}</Option>)
  }
  const onShowSizeChange = () => {

  }
  return (
    <>
      <PageHeader
        ghost
        title="Sản Phẩm"
        
      />
      <Main>
        {/* <Row gutter={25}>
          <Col lg={24} xs={24}>
            <Cards headless>
              <div style={{ minHeight: '40px' }}>
                <h2>Tìm Sản Phẩm</h2>
              </div>
            </Cards>
          </Col>
        </Row> */}
        <Row gutter={25}>
          <Col lg={24} xs={24}>
            <Cards headless>
              <Row gutter={30}>
                <Col span={8}>
                  <Cards title="Danh Mục">
                    <SelectWrapperStyle>
                      <Select onSelect={value => { console.log(value); setCategory(value); convert()}} defaultValue={category} style={{ width: '100%' }}>
                        {renderCategory()}
                      </Select>
                      
                      
                    </SelectWrapperStyle>
                  </Cards>
                </Col>
                <Col span={8}>
                  <Cards title="Vùng">
                      <SelectWrapperStyle>
                        <Select onSelect={value => { console.log(value); setRegion(value)}} defaultValue={region} style={{ width: '100%' }}>
                          {renderRegion()}
                        </Select>
                        
                        
                      </SelectWrapperStyle>
                    </Cards>
                  </Col>
              </Row>
              <Row>
              <Col lg={24} xs={24} style={{margin: '20px 0px'}}>
                <Button onClick={()=>{props.history.push('/admin/products/add')}} type="primary" size="medium">Tạo Sản Phẩm</Button>
              </Col>
              </Row>
            </Cards>
            
          </Col>
          
        </Row>
          <Row gutter={15}>
            <Col md={24}>
              <TableWrapper className="table-order table-responsive">
                <Table
                  rowSelection={{
                    onChange: (selectedRowKeys, selectedRows) => {
                      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                    },
                  }}
                  dataSource={convert()}
                  columns={columns}
                  pagination={false}
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
                    defaultPageSize= {100} 
                    onChange= {onPageChange}
                    showSizeChanger= {true} 
                    onShowSizeChange={onShowSizeChange}
                    total= {adminListProducts.totalDocs}
                  />
                </Row>
              </TableWrapper>
            </Col>
          </Row>
      </Main>
    </>
  );
};

export default Product;
