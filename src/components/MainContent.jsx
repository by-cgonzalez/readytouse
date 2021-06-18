import React, { useState } from 'react'
import { Row, Col, Layout } from 'antd';

const MainContent = ({ children }) => {
  const [state, setState] = useState(false)
  const { Content } = Layout;
  return(
    <Layout>
      <Content>
        {children}
      </Content>
    </Layout>
    
  );
}

export default MainContent;