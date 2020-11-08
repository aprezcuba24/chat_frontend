import React, { memo, useEffect } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import { useSecurityContext } from './context/SecurityContext';
import { Layout, Menu } from 'antd';
import styled from 'styled-components';
import Header from './components/Header';
import { useAppContext } from './context/AppContext';
import Chat from './pages/chat';
import { ChatContextProvider } from './context/ChatContext';

const { Sider: SiderAntd } = Layout;

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
  const { channels } = useAppContext();

  return (
    <Layout>
      <Sider>
        <Logo />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
          {channels.map(item => (
            <Menu.Item key={item.id}>
              <NavLink to={`/messages/${item.id}`}>
                {item.name}
              </NavLink>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <LayoutBody>
        <Header />
        <ChatContextProvider>
          <Chat />
        </ChatContextProvider>
      </LayoutBody>
    </Layout>
  );
};

export default memo(ChatLayout);