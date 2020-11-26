import React, { memo, useCallback, useState } from 'react';
import { Form, Input, Button } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  display: flex;
  
`;

const FormComponent = ({ send }) => {
  const [body, setBody] = useState('');
  const [form] = Form.useForm();
  const handleChange = useCallback(({ target: { value } }) => setBody(value), [])
  const onFinish = useCallback(() => {
    send({ body })
    setBody('');
    form.resetFields();
  }, [send, form, body]);

  return (
    <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
      <Container name="body">
        <Input value={body} onChange={handleChange} size="large" placeholder="Type a message" />
        <Button size="large" type="primary" htmlType="submit">
          Send
        </Button>
      </Container>
    </Form>
  );
};

export default memo(FormComponent);
