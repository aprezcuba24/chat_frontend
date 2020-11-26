import React, { memo, useEffect } from 'react';
import { Layout as LayoutAntd, Empty, Typography } from 'antd';
import Form from './Form';
import { useParams } from 'react-router-dom';
import { useChatContext } from '../../context/ChatContext';
import Message from './Message';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContext';

// const { Footer } = LayoutAntd;
const { Title: TitleAnt } = Typography;

const Container = styled.div`
  margin: 20px;
`;
const Title = styled(TitleAnt)`
  padding-top: 16px;
`;
const Footer = styled.div`
  /* margin-left: 16px;
  padding-top: 16px; */
  margin-bottom: 30px;
`;
const Layout = styled(LayoutAntd)`
  display: flex;
  flex-direction: column-reverse;
  background-color: white;
  margin: 0 0 10px 0 !important;
`;
const EmptyContainer = styled(LayoutAntd)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Chat = () => {
  const { changeChannel, channelActive } = useAppContext();
  const { messages, sendMessage } = useChatContext();
  const { channelId } = useParams();
  useEffect(() => changeChannel(parseInt(channelId)), [channelId, changeChannel]);

  return (
    <>
      {!channelActive && (
        <EmptyContainer>
          <Empty description="Select a channel" />
        </EmptyContainer>
      )}
      {channelActive && (
        <Container>
          <Title>{channelActive?.name}</Title>
          <Layout style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            {messages.map(item => <Message key={item.id} message={item} />)}
          </Layout>
          <Footer style={{ textAlign: 'center' }}>
            <Form send={sendMessage} />
          </Footer>
        </Container>
      )}
    </>
  );
};

export default memo(Chat);
