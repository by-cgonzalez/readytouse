import React from 'react'
import { Row, Col, Layout } from 'antd';
import '../assets/styles/Header.less';

const MainHeader = () => {
  const { Header } = Layout;
  return (
    <Layout>
      <Header>
        <Row>
          <Col flex="auto" align='end'><h1>MAPRIN®</h1></Col>
        </Row> 
      </Header>
    </Layout>
    )}

export default MainHeader;