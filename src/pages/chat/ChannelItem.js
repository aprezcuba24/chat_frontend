import React, { memo } from 'react';
import styled from 'styled-components';
import { useChannelItem } from '../../hooks/useChannelItem';

const Container = styled.div`
  display: flex;
`;
const Point = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: white;
  margin-top: 15px;
  margin-right: 5px;
  visibility: hidden;
  visibility: ${({ hasMessage }) => hasMessage ? 'visible': 'hidden'};
`;
const Text = styled.div`
  padding: 0;
  font-weight: ${({ hasMessage }) => hasMessage ? 900 : 'normal'};
`;

const ChannelItem = ({ channel }) => {
  const { hasMessage } = useChannelItem(channel);

  return (
    <Container>
      <Point hasMessage={hasMessage}/>
      <Text hasMessage={hasMessage}>{channel.name}</Text>
    </Container>
  );
};

export default memo(ChannelItem);
