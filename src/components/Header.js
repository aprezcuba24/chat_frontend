import React, { memo, useMemo } from 'react';
import { Menu, Dropdown, Layout, Button, Row, Col } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useAppContext } from '../context/AppContext';

const { Header: HeaderAntd } = Layout;

const Header = () => {
  const { workspaces, workspaceActive, changeWorkspace } = useAppContext();
  const menu = useMemo(() => {
    return (
      <Menu>
        {workspaces.map(item => (
          <Menu.Item key={item.id} onClick={() => changeWorkspace(item)}>
            {item.name}
          </Menu.Item>
        ))}
      </Menu>
    );
  }, [workspaces, changeWorkspace]);

  return (
    <HeaderAntd style={{ padding: 0 }}>
      <Row>
        <Col span={1} offset={20}>
          <Dropdown overlay={menu}>
            <Button>
              {workspaceActive?.name} <DownOutlined />
            </Button>
          </Dropdown>
        </Col>
      </Row>
    </HeaderAntd>
  );
};

export default memo(Header);