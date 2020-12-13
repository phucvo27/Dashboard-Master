import React from 'react';
import { Row, Col, Input } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { Main } from '../../styled';
import { ShareButtonPageHeader } from '../../../components/buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../../../components/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../../components/buttons/calendar-button/calendar-button';
import Heading from '../../../components/heading/heading';
const Category = () => {
  return (
    <>
      <PageHeader
        ghost
        title="Category"
        buttons={[
          <div key="6" className="page-header-actions">
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
        <Row gutter={25}>
          <Col lg={24} xs={24}>
            <Cards headless>
                <div style={{ minHeight: '100px' }}>
                    <h2>Category</h2>
                </div>
                <Row gutter={25} align="bottom">
                    <Col span="8">
                        {/* <h5>Tạo Sản Phẩm:</h5> */}
                        <Heading as="h5">Tạo Sản Phẩm:</Heading>
                        <Input type="text" placeholder="Enter new category.." />
                    </Col>
                    <Col span="2">
                        <Button block size="large" raised type="primary">Add</Button>
                    </Col>
                </Row>
            </Cards>
          </Col>
        </Row>
        <Row >
            <Col lg={24} xs={24}>
                <Cards headless>
                    <div style={{ minHeight: '100px' }}>
                        <h2>Các Danh Mục Hiện Có:</h2>
                    </div>
                </Cards>
            </Col>
        </Row>
      </Main>
    </>
  );
};

export default Category;
