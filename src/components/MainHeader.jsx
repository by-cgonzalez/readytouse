import React, {useState, useEffect} from 'react'
import { Row, Col, Layout, Typography } from 'antd';
import axios from 'axios';
const MainHeader = () => {
  const { Header } = Layout;
  const { Title } = Typography;
  const [bd, setBd] = useState(null)
  
  useEffect(async () => {
    const getBD = await axios.get('http://localhost:4003/')
    setBd(getBD.data)
  },[])

  return (
    <Layout >

          BD: {bd && bd.BD }

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