import React from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { LoaderWrapper } from './loader.styled';

export const Loader = () => {
  return (
    <LoaderWrapper>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#b53fab"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </LoaderWrapper>
  );
};