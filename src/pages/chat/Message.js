import React, { memo } from 'react';
import PropTypes from 'prop-types';

const Message = ({ message }) => {
  return (
    <>
      <p>{message.body}</p>
    </>
  );
};
Message.propTypes = {
  message: PropTypes.object,
};

export default memo(Message);
