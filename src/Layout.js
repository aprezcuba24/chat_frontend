import React, { memo, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSecurityContext } from './context/SecurityContext';
import { Layout, Menu } from 'antd';
import styled from 'styled-components';
import Header from './components/Header';

const { Footer, Sider: SiderAntd } = Layout;

const Logo = styled.div`
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 14px;
`;
const Sider = styled(SiderAntd)`
  overflow: auto;
  height: 100vh;
  position: fixed;
  left: 0;
`;
const LayoutBody = styled(Layout)`
  margin-left: 200px;
  overflow: auto;
  height: 100vh;
`;

const ChatLayout = () => {
  const { isAuthenticated } = useSecurityContext();
  const { push } = useHistory();
  useEffect(() => {
    if (!isAuthenticated) {
      push('/')
    }
  }, [isAuthenticated, push]);

  return (
    <Layout>
      <Sider>
        <Logo />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
          <Menu.Item key="1">
            nav 1
          </Menu.Item>
          <Menu.Item key="2">
            nav 2
          </Menu.Item>
          <Menu.Item key="3">
            nav 3
          </Menu.Item>
        </Menu>
      </Sider>
      <LayoutBody>
        <Header />
        <Layout style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div style={{ padding: 24, textAlign: 'center' }}>
            content
             asdfa
             sdfa
            sdfa
            sdf
          </div>
        </Layout>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </LayoutBody>
    </Layout>
  );
};

export default memo(ChatLayout);