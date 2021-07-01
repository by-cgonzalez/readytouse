import React from 'react'
import { Row, Col, Layout, Typography } from 'antd';

const MainHeader = () => {
  const { Header } = Layout;
  const { Title } = Typography;
  return (
    <Layout>
      <Header style={{display:'flex', alignItems:'center', justifyContent:'flex-end', height:54}}>
        <Row>
          <Col>
              <Title 
                level={1} 
                className='title' 
                style={{
                  fontFamily:'Arial', 
                  fontWeight:900, 
                  color:'#333399', 
                  margin:0
                }}
              >
                MAPRIN®
              </Title>
          </Col>
        </Row> 
      </Header>
    </Layout>
    )}

export default MainHeader;