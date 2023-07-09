import { Modal } from 'components/modal/modal';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItemContainer, ImageGalleryItemImage } from './imageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };

  render() {
    const { webformatURL, tags, largeImageURL } = this.props;

    const { showModal } = this.state;
    return (
      <>
        <ImageGalleryItemContainer>
          <ImageGalleryItemImage src={webformatURL} alt={tags} onClick={this.toggleModal} />
        </ImageGalleryItemContainer>
        {showModal && <Modal onClose={this.toggleModal} src={largeImageURL} />}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  showModal: PropTypes.bool,
};