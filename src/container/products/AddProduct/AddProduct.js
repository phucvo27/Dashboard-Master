import React, { useState } from 'react';
import { Row, Col, Form, Input, Select, InputNumber, Radio, Upload, message, notification } from 'antd';
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
    {
      uid: '1',
      name: '1.png',
      status: 'done',
      url: require('../../../static/img/products/1.png'),
      thumbUrl: require('../../../static/img/products/1.png'),
    },
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

  const handleSubmit = values => {
    console.log(values)
    console.log(state.fileList)
    const readyForSend = normalizePricing(values);
    console.log(readyForSend)
    setState({ ...state, submitValues: values });
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
    return res;
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
     return categories.map((item, idx) => {
       return <Option key={idx} value={item._id}>{item.name}</Option>
     })
  }
  const renderPriceOnEachRegion = () => {
    const { regions } = state;
    return regions.map(region => (
      <Col span={8} style={{marginBottom: '10px'}}>
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
  const renderBranch = () => {
    
  }
  console.log(props.branches)
  return (
    <>
      <PageHeader
        ghost
        title="Add Product"
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
                                <Cards title="About Product">
                                  <Form.Item name="name" label="Tên Sản Phẩm">
                                    <Input />
                                  </Form.Item>
                                  <Form.Item name="sku" label="SKU">
                                    <Input />
                                  </Form.Item>
                                  <Form.Item name="branch" initialValue="" label="Chi Nhánh">
                                    <Select disabled={state.isCreateNewCategory} onSelect={handleSelect} style={{ width: '100%' }}>
                                      <Option value="">Please Select</Option>
                                      {renderBranch()}
                                    </Select>
                                  </Form.Item>
                                  <Form.Item name="category" initialValue="" label="Category">
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
                                  <Form.Item name="price" label="Price">
                                    <div className="input-prepend-wrap">
                                      <span className="input-prepend">
                                        <FeatherIcon icon="dollar-sign" size={14} />
                                      </span>
                                      <InputNumber style={{ width: '100%' }} />
                                    </div>
                                  </Form.Item>


                                  <Form.Item name="description" label="Product Description">
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
                            <Button size="large" htmlType="submit" type="primary" raised>
                              Save Product
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
