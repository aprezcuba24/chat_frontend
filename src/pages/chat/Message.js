import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Image as ImageAnt } from 'antd';

const Container = styled.div`
  margin: 10px;
  display: flex;
`;
const Image = styled(ImageAnt)`
  margin-right: 10px;
`;

const Message = ({ message }) => {
  return (
    <Container>
      <Image src={message.owner.photo} width={50} />
      <p>{message.body}</p>
    </Container>
  );
};
Message.propTypes = {
  message: PropTypes.object,
};

export default memo(Message);
