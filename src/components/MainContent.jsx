import React, { useState } from 'react'
import { Row, Col, Layout } from 'antd';

const MainContent = ({ children }) => {
  const [state, setState] = useState(false)
  const { Content } = Layout;
  return(
    <Layout>
      <Content
        style={{
          width: '100%',
          padding: 15,
          // display:'flex',
          // justifyContent:'center',
        }}
      >
        {children}
      </Content>
    </Layout>
    
  );
}

export default MainContent;