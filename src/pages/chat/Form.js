import React, { memo, useCallback } from 'react';
import { Form, Input, Button } from 'antd';

const FormComponent = ({ send }) => {
  const [form] = Form.useForm();
  const onFinish = useCallback(values => {
    send(values)
    form.resetFields();
  }, [send, form]);

  return (
    <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
      <Form.Item
        name="body"
      >
        <Input placeholder="Type a message" />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
        <Button type="primary" htmlType="submit">
          Send
        </Button>
      </Form.Item>
    </Form>
  );
};

export default memo(FormComponent);
