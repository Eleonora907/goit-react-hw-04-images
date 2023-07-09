import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/modal/modal';
import { ImageGalleryItemContainer, ImageGalleryItemImage } from './imageGalleryItem.styled';

export const ImageGalleryItem = ({ webformatURL, tags, largeImageURL }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  return (
    <>
      <ImageGalleryItemContainer>
        <ImageGalleryItemImage src={webformatURL} alt={tags} onClick={toggleModal} />
      </ImageGalleryItemContainer>
      {showModal && <Modal onClose={toggleModal} src={largeImageURL} />}
    </>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};


