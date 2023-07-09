import React from 'react';
import { StyledButton } from './button.styled';
import PropTypes from 'prop-types';

export const Button = ({ onButtonLoadMore }) => {
  return (
    <StyledButton onClick={onButtonLoadMore} type="button">
      Load More
    </StyledButton>
  );
};

Button.propTypes = {
  onButtonLoadMore: PropTypes.func.isRequired,
};

