import React, { memo, useEffect } from 'react';
import { Layout as LayoutAntd } from 'antd';
import Form from './Form';
import { useParams } from 'react-router-dom';
import { useChatContext } from '../../context/ChatContext';
import Message from './Message';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContext';

const { Footer } = LayoutAntd;

const Layout = styled(LayoutAntd)`
  display: flex;
  flex-direction: column-reverse;  
`;

const Chat = () => {
  const { changeChannel, channelActive } = useAppContext();
  const { messages, sendMessage } = useChatContext();
  const { channelId } = useParams();
  useEffect(() => changeChannel(parseInt(channelId)), [channelId, changeChannel]);

  return (
    <>
      <h1>{channelActive?.name}</h1>
      <Layout style={{ margin: '24px 16px 0', overflow: 'initial' }}>
        {messages.map(item => <Message key={item.id} message={item} />)}
      </Layout>
      <Footer style={{ textAlign: 'center' }}>
        <Form send={sendMessage} />
      </Footer>
    </>
  );
};

export default memo(Chat);
