import React from 'react';
import { Row, Col, notification } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../page-headers/page-headers';
import { Main, NotificationListWrapper } from './styled';
import { Cards } from '../cards/frame/cards-frame';
import { Button } from '../buttons/buttons';
import { ShareButtonPageHeader } from '../buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../buttons/calendar-button/calendar-button';

const Notifications = () => {
  

    const openNotificationWithIcon = type => {
        notification[type]({
        message: 'Notification Title',
        description:
            'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        });
    };

  return (
    <>
      <PageHeader
        ghost
        title="Notifications"
        buttons={[
          <div key="1" className="page-header-actions">
            <CalendarButtonPageHeader />
            <ExportButtonPageHeader />
            <ShareButtonPageHeader />
            <Button size="small" type="primary">
              <FeatherIcon icon="plus" size={14} />
              Add New
            </Button>
          </div>,
        ]}
      />
      <Main>
        <Row gutter={15}>
          
          <Col md={12} sm={12} xs={24}>
            <Cards title="Notification with icon" caption="The simplest use of Notification">
              <NotificationListWrapper>
                <Button type="success" size="small" onClick={() => openNotificationWithIcon('success')}>
                  Success
                </Button>
                <Button type="info" size="small" onClick={() => openNotificationWithIcon('info')}>
                  Info
                </Button>
                <Button type="warning" size="small" onClick={() => openNotificationWithIcon('warning')}>
                  Warning
                </Button>
                <Button type="error" size="small" onClick={() => openNotificationWithIcon('error')}>
                  Error
                </Button>
              </NotificationListWrapper>
            </Cards>
          </Col>
          
        </Row>
      </Main>
    </>
  );
};

export default Notifications;
