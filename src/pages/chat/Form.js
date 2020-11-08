import React, { memo, useState, useEffect } from 'react';
import { Form as FormAntd, Input, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const Form = () => {
  const [form] = FormAntd.useForm();
  const [, forceUpdate] = useState();

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = values => {
    console.log('Finish:', values);
  };

  return (
    <FormAntd FormAntd={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
      <FormAntd.Item
        name="body"
      >
        <Input prefix={<UserOutlined className="site-FormAntd-item-icon" />} placeholder="Type a message" />
      </FormAntd.Item>
      <FormAntd.Item shouldUpdate={true}>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              !form.isFieldsTouched(true) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Send
          </Button>
        )}
      </FormAntd.Item>
    </FormAntd>
  );
};

export default memo(Form);
