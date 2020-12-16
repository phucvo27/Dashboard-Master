import React, { useState } from 'react';
import { Row, Col, Form, Input, Select, InputNumber, Upload, message, notification } from 'antd';
import { AutoComplete } from '../../../components/autoComplete/autoComplete'
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Main, BasicFormWrapper } from '../../styled';
import { Button } from '../../../components/buttons/buttons';
import { AddProductForm } from '../../ecommerce/Style';
import Heading from '../../../components/heading/heading';

import { ShareButtonPageHeader } from '../../../components/buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../../../components/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../../components/buttons/calendar-button/calendar-button';

const { Option } = Select;
const { Dragger } = Upload;

const AddProduct = (props) => {
  const [form] = Form.useForm();
  //const [categories, setCategories] = useState([])
  const [branch, setBranch] = useState([])
  const [state, setState] = useState({
    file: null,
    list: null,
    submitValues: {},
    isCreateNewCategory: false,
    nameCategory: '',
    regions: props.regions,
    categories: props.categories
  });

  const fileList = [
    // {
    //   uid: '1',
    //   name: '1.png',
    //   status: 'done',
    //   url: require('../../../static/img/products/1.png'),
    //   thumbUrl: require('../../../static/img/products/1.png'),
    // },
  ];

  const fileUploadProps = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const { status } = info.file;
      console.log(status)
      if (status !== 'uploading') {
        setState({ ...state, file: info.file, list: info.fileList });
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    listType: 'picture',
    defaultFileList: fileList,
    showUploadList: {
      showRemoveIcon: true,
      removeIcon: <FeatherIcon icon="trash-2" onClick={e => console.log(e, 'custom removeIcon event')} />,
    },
  };

  
  const normalizePricing = (obj) => {
    const res = {...obj};
    const arr = [];
    const keys = Object.keys(res);
    for(let i = 0; i < keys.length; i++){
      const key = keys[i]
      if(key.startsWith('salePriceRegion')){
        const regionID = key.split('-')[1];
        console.log(res[key])
        const value = Number(res[key]);
        console.log(value)
        arr.push({saleRegion: regionID, salePrice: value})
      }
    }
    console.log(arr)
    res.salePriceInRegions = arr;
    return arr;
  }
  const handleChangeCategoryName = e => {
    const {value} = e.target;
    setNameCategory(value)
  }
  const handleAddSuccess = (noti) => {
    notification['success']({
        message: noti.title,
        description: noti.des,
      });
    setState({
      ...state,
      isCreateNewCategory: false,
      nameCategory: ''
    })
}
  const createCategory = () => {
    if(nameCategory){
      props.addCategory(nameCategory, handleAddSuccess)
    }
  }
  const handleSelect = (value) => {
    if(value === 'new-category'){
      setState({
        ...state,
        isCreateNewCategory: true
      })
    }
  }
  const renderCategory = () => {
     const {  categories } = state;
     if(categories) {
      return categories.map((item, idx) => {
        return <Option key={idx} value={item._id}>{item.name}</Option>
      })
     }
  }
  const renderPriceOnEachRegion = () => {
    const { regions } = state;
    if(props.currentProduct){
      return props.currentProduct.salePriceInRegions.map((item, idx) => {
        const { salePrice, saleRegion:region } = item;
        return (
          <Col key={idx} span={8} style={{marginBottom: '10px'}}>
            <Form.Item initialValue={salePrice ? salePrice : 0} name={`salePriceRegion-${region._id}`} label={`Giá Tại ${region.name}`}>
                  {/* <div className="input-prepend-wrap">
                    <span className="input-prepend">
                      <FeatherIcon icon="dollar-sign" size={14} />
                    </span>
                    <InputNumber style={{ width: '100%' }} />
                  </div> */}
                  <InputNumber style={{ width: '100%' }} />
                </Form.Item>
          </Col>
        )
      })
    }
    return regions.map((region, idx) => (
      <Col key={idx} span={8} style={{marginBottom: '10px'}}>
        <Form.Item name={`salePriceRegion-${region._id}`} label={`Giá Tại ${region.name}`}>
              <div className="input-prepend-wrap">
                <span className="input-prepend">
                  <FeatherIcon icon="dollar-sign" size={14} />
                </span>
                <InputNumber style={{ width: '100%' }} />
              </div>
            </Form.Item>
      </Col>
    ))
  }
  const renderOptions = () => {
    if(props.branches) {
        return props.branches.map(branch => {
            return {
                _id: branch._id,
                value: branch.name
            }
        })
    }else {
        return [];
    }
  }
  const handleSelectBranch = (value, option) => {
    console.log(option)
    //props.assignBranch(option._id, callbackSuccess)
    setBranch([option._id])
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
              ...state,
              branches: !searchText ? renderOptions() : arrayData,
          });
      }
  };
  const renderBarcodeType = () => {
    const barcodeTypes = ["C128","C39","EAN13","EAN8","UPCA", "UPCE"];
    return barcodeTypes.map((barcode, idx)=> {
      return <Option key={idx} value={barcode}>{barcode}</Option>
    })
  }

  const callback = (noti) => {
    notification[`${noti.type}`]({
      message: noti.title,
      description: noti.des,
    });
  }
  const handleSubmit = values => {
    const normalizedData = normalizePricing(values);// array of pricing for each region
    const { barcodeType, buyPriceIncTax, buyPriceExcTax, category, description, name, quantity, salePriceType,salePrice, sku } = values;
    const requestPayload = {
      
      salePriceInRegions: normalizedData,
      branches: branch,
      isFeatured: false,
      isNewProduct: true,
      relatedProducts: [],
      productType: "single",
      barcodeType,
      buyPriceExcTax: Number(buyPriceExcTax),
      buyPriceIncTax: Number(buyPriceIncTax),
      category,
      description,
      name,
      quantity: Number(quantity),
      salePriceType,
      salePrice: Number(salePrice),
      sku
    }
    
    console.log(requestPayload)
    if(props.currentProduct) {
      console.log(requestPayload);
      props.edit(requestPayload, callback)
    }else {
      requestPayload.images = state.list ? state.list : [],
      props.create(requestPayload, callback)
    }
    
    //setState({ ...state, submitValues: values });
  };
  //console.log(props.branches)
  return (
    <>
      <PageHeader
        ghost
        title="Thêm Sản Phẩm"
        
      />
      <Main>
        <Row gutter={15} justify="center">
          <Col xs={20}>
            <Cards headless>
              <Row gutter={25}>
                <Col span={24}>
                  <AddProductForm>
                    <Form style={{ width: '100%' }} form={form} name="addProduct" onFinish={handleSubmit}>
                      <BasicFormWrapper>
                        <div className="add-product-block">
                          <Row gutter={15}>
                            <Col xs={24}>
                              <div className="add-product-content">
                                <Cards title="Thông Tin Sản Phẩm">
                                  {/* Product Name */}
                                  <Form.Item 
                                    name="name" 
                                    label="Tên Sản Phẩm" 
                                    initialValue={props.currentProduct ? props.currentProduct.name : ''}
                                    rules={[{ required: true, message: 'Xin cung cấp thông tin' }]}>
                                    <Input />
                                  </Form.Item>

                                  {/* SKU */}
                                  <Form.Item 
                                    initialValue={props.currentProduct ? props.currentProduct.sku : ''}
                                    name="sku" label="SKU" rules={[{ required: true, message: 'Xin cung cấp thông tin' }]}>
                                    <Input />
                                  </Form.Item>
                                  <Row style={{margin: "20px 0px"}}>
                                    {/* buyPriceExcTax */}
                                    <Col span={8} style={{paddingRight: '10px'}}>
                                      <Form.Item 
                                      initialValue={props.currentProduct ? props.currentProduct.buyPriceExcTax : 0}
                                      name="buyPriceExcTax" 
                                      label="Giá bán chưa bao gồm thuế" 
                                      rules={[{ required: true, message: 'Xin cung cấp thông tin' }]}>
                                        <InputNumber style={{ width: '100%' }} />
                                      </Form.Item>
                                    </Col>
                                    <Col span={8} style={{paddingRight: '10px'}}>
                                      
                                      {/* quantity */}

                                      <Form.Item 
                                      initialValue={props.currentProduct ? props.currentProduct.quantity : 0}
                                      name="quantity" label="Tồn Kho" rules={[{ required: true, message: 'Xin cung cấp thông tin' }]}>
                                        <InputNumber style={{ width: '100%' }} />
                                      </Form.Item>
                                    </Col>
                                    <Col span={8} style={{paddingRight: '10px'}}>
                                      {/* buyPriceIncTax */}
                                      <Form.Item
                                      initialValue={props.currentProduct ? props.currentProduct.buyPriceIncTax : 0}
                                       name="buyPriceIncTax" label="Giá bán đã bao gồm thuế" rules={[{ required: true, message: 'Xin cung cấp thông tin' }]}>
                                        <InputNumber style={{ width: '100%' }} />
                                      </Form.Item>
                                    </Col>
                                  </Row>
                                  {/* BarCode */}
                                  
                                  <Form.Item name="barcodeType" 
                                    initialValue={props.currentProduct ? props.currentProduct.barcodeType : ''}
                                   label="Barcode" rules={[{ required: true, message: 'Xin cung cấp thông tin' }]}>
                                    <Select style={{ width: '100%' }}>
                                        <Option value="">Please Select</Option>
                                        {renderBarcodeType()}
                                    </Select>
                                  </Form.Item>
                                  {/* BarCode */}
                                  
                                  <Form.Item name="salePriceType" 
                                    initialValue={props.currentProduct ? props.currentProduct.salePriceType : ''}
                                  label="Sale Price Type" rules={[{ required: true, message: 'Xin cung cấp thông tin' }]}>
                                    <Select style={{ width: '100%' }}>
                                        <Option value="">Please Select</Option>
                                        <Option value="inclusive">Inclusive</Option>
                                        <Option value="exclusive">Exclusive</Option>
                                    </Select>
                                  </Form.Item>

                                  {/* Branch */}
                                  
                                  <Form.Item name="branch" 
                                    // initialValue={props.currentProduct ? props.currentProduct.branches[0]._id : ''} 
                                    label="Chi Nhánh">
                                    <AutoComplete 
                                          onSelect={handleSelectBranch} 
                                          dataSource={renderOptions()} 
                                          placeholder="Tìm kiếm chi nhánh.."
                                          onSearch={onSearch}
                                          filterOption={(inputValue, option) =>
                                              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                          }
                                      />
                                  </Form.Item>

                                  {/* category */}
                                  
                                  <Form.Item name="category" 
                                    initialValue={props.currentProduct ? props.currentProduct.category._id : ''}
                                  label="Category" rules={[{ required: true, message: 'Xin cung cấp thông tin' }]}>
                                    <Select disabled={state.isCreateNewCategory} onSelect={handleSelect} style={{ width: '100%' }}>
                                      <Option value="">Please Select</Option>
                                      {renderCategory()}
                                      <Option value="new-category">Create New Category...</Option>
                                    </Select>
                                  </Form.Item>
                                  {
                                    state.isCreateNewCategory && (
                                      <Row gutter={25} align="bottom">
                                          <Col span="24">
                                              <Input value={state.nameCategory} type="text" onChange={handleChangeCategoryName} placeholder="Enter new category.." />
                                          </Col>
                                          <Col span="4" style={{margin: '15px 0'}}>
                                              <Button onClick={createCategory} size="large" block raised type="primary">Add</Button>
                                          </Col>
                                          <Col span="4" style={{margin: '15px 0'}}>
                                              <Button onClick={()=>{setStatusCreateNewCategory(false)}} size="large" block raised type="warning">Cancel</Button>
                                          </Col>
                                      </Row>
                                    )
                                  }

                                  {/* salePrice */}
                                  
                                  <Form.Item initialValue={props.currentProduct ? props.currentProduct.salePrice : 0} name="salePrice" label="Giá Bán" rules={[{ required: true, message: 'Xin cung cấp thông tin' }]}>
                                    <InputNumber style={{ width: '100%' }} />
                                    {/* <div className="input-prepend-wrap">
                                      <span className="input-prepend">
                                        <FeatherIcon icon="dollar-sign" size={14} />
                                      </span>
                                      <InputNumber style={{ width: '100%' }} />
                                    </div> */}
                                  </Form.Item>


                                  {/* Desription */}
                                  
                                  <Form.Item initialValue={props.currentProduct ? props.currentProduct.description : ''} name="description" label="Product Description" rules={[{ required: true, message: 'Xin cung cấp thông tin' }]}>
                                    <Input.TextArea rows={5} />
                                  </Form.Item>
                                </Cards>
                              </div>
                            </Col>
                          </Row>
                        </div>
                        <div className="add-product-block">
                        <Cards title="Giá Cho Từng Vùng">
                          <Row gutter={15}>
                            {renderPriceOnEachRegion()}
                          </Row>
                        </Cards>
                        </div>


                        {/* Images */}
                         {
                           !props.currentProduct && (
                            <div className="add-product-block">
                            <Row gutter={15}>
                              <Col xs={24}>
                                <div className="add-product-content">
                                  <Cards title="Product Image">
                                    <Dragger {...fileUploadProps}>
                                      <p className="ant-upload-drag-icon">
                                        <FeatherIcon icon="upload" size={50} />
                                      </p>
                                      <Heading as="h4" className="ant-upload-text">
                                        Drag and drop an image
                                      </Heading>
                                      <p className="ant-upload-hint">
                                        or <span>Browse</span> to choose a file
                                      </p>
                                    </Dragger>
                                  </Cards>
                                </div>
                              </Col>
                            </Row>
                          </div>
                           )
                         }         
                        
                        <div className="add-form-action">
                          <Form.Item>
                            <Button
                              className="btn-cancel"
                              size="large"
                              onClick={() => {
                                return form.resetFields();
                              }}
                            >
                              Cancel
                            </Button>
                            <Button size="large" htmlType="submit" type={props.currentProduct ? 'secondary' : 'primary'} raised>
                              {props.currentProduct ? 'Edit Product' : 'Save Product'}
                            </Button>
                          </Form.Item>
                        </div>
                      </BasicFormWrapper>
                    </Form>
                  </AddProductForm>
                </Col>
              </Row>
            </Cards>
          </Col>

          
        </Row>
      </Main>
    </>
  );
};

export default AddProduct;
