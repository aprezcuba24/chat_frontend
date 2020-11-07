import { Button, Form, Input } from 'antd';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSecurityContext } from '../context/SecurityContext';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;
const Box = styled.div`
  padding: 24px 24px 0 24px;
  border: 1px solid white;
  border-radius: 5px;
`;

const layout = {
  layout: "vertical",
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Login = () => {
  const { isAuthenticated, login } = useSecurityContext();
  const { push } = useHistory();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (isAuthenticated) {
      push('/')
    }
  }, [isAuthenticated, push]);
  const onFinish = useCallback(async values => {
    try {
      setLoading(true);
      await login(values);
    } catch (e) {
      setLoading(false);
    }
  }, [login]);

  return (
    <Container>
      <Box>
        <Form
          {...layout}
          name="basic"
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input placeholder="email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Box>
    </Container>
  );
};

export default memo(Login);