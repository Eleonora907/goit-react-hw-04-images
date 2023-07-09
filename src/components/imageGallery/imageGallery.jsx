import React from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryContainer } from './imageGallery.styled';
import { ImageGalleryItem } from 'components/imageGalleryItem/imageGalleryItem';

export const ImageGallery = ({ images }) => {
  return (
    <ImageGalleryContainer>
      {images.map(image => (
        <ImageGalleryItem key={image.id} {...image} />
      ))}
    </ImageGalleryContainer>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })
  ),
};
