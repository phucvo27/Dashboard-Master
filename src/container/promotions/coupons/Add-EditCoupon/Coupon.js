import React from 'react';
import { Row, Col, Form, Input, Select, InputNumber, Upload, message, notification } from 'antd';
import { PageHeader } from '../../../../components/page-headers/page-headers';
import { Main, BasicFormWrapper } from '../../../styled';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { Button } from '../../../../components/buttons/buttons';
const { Option } = Select;

const Coupon = (props) => {
    const [form] = Form.useForm();

    const callback = (noti) => {
        notification[`${noti.type}`]({
          message: noti.title,
          description: noti.des,
        });
    }
    const handleSubmit = values => {
        console.log(values)
        props.createCoupon(values, callback)
        form.resetFields()
    }
    return (
        <>
            <PageHeader
                ghost
                title="Tạo Coupon"
            />
            <Main>
                <Cards headless>
                <Row gutter={15} justify="center">
                    <Col span={16}>
                        <Form style={{ width: '100%' }} form={form} name="addProduct" onFinish={handleSubmit}>
                            <BasicFormWrapper>
                                <Row gutter={30} style={{marginBottom: '10px'}}>
                                    <Col span={10}>
                                    <Form.Item rules={[{ required: true, message: 'Xin cung cấp thông tin' }]} name="name" label="Tên Coupon" >
                                        <Input />
                                    </Form.Item>
                                    </Col>
                                    <Col span={10}>
                                    <Form.Item rules={[{ required: true, message: 'Xin cung cấp thông tin' }]} name="code" label="Coupon Code" >
                                        <Input />
                                    </Form.Item>
                                    </Col>
                                    
                                </Row>
                                <Row gutter={30} style={{marginBottom: '10px'}}>
                                    <Col span={10}>
                                        <Form.Item rules={[{ required: true, message: 'Xin cung cấp thông tin' }]} name="discountType" label="Loại Giảm" >
                                            <Select>
                                                <Option value="">Chọn Loại</Option>
                                                <Option value="fixed">Giá Cứng</Option>
                                                <Option value="percentage">Phần Trăm</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={10}>
                                        <Form.Item rules={[{ required: true, message: 'Xin cung cấp thông tin' }]} name="discountValue" label="Giá Trị Coupon" >
                                            <InputNumber />
                                        </Form.Item>
                                    </Col>
                                    
                                </Row>
                                <Row gutter={30} style={{marginBottom: '10px'}}>
                                    <Col span={10}>
                                        <Form.Item rules={[{ required: true, message: 'Xin cung cấp thông tin' }]} name="remainingCount" label="Số Lần Sử Dụng" >
                                            <InputNumber />
                                        </Form.Item>
                                    </Col>
                                    <Col span={10}>
                                        <Form.Item rules={[{ required: true, message: 'Xin cung cấp thông tin' }]} name="isActive" label="Trạng Thái Coupon" >
                                            <Select>
                                                <Option value="">Chọn Trạng Thái</Option>
                                                <Option value={true}>Kích Hoạt</Option>
                                                <Option value={false}>Không Kích Hoạt</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    
                                </Row>
                                <div className="add-form-action">
                                    <Form.Item>
                                        <Button size="large" htmlType="submit" type={props.currentProduct ? 'secondary' : 'primary'} raised>
                                            Tạo Coupon
                                        </Button>
                                    </Form.Item>
                                </div>

                            </BasicFormWrapper>
                        </Form>
                        
                    </Col>
                </Row>
                </Cards>
            </Main>
        </>
    )
}

export default Coupon;