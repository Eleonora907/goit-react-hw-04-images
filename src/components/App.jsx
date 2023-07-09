import { Component } from 'react';
import { Searchbar } from './searchbar/searchbar';
import { getImages } from '../service/imageApi';
import { ImageGallery } from './imageGallery/imageGallery';
import { Button } from './button/button';
import { toast } from 'react-toastify';
import { Loader } from './loader/loader';
import { AppContainer } from './App.styled';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    showBtn: false,
    loading: false,
    photosLoaded: false,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page, photosLoaded } = this.state;

    if (query !== prevState.query || page !== prevState.page) {
      try {
        await getImages(query, page).then(({ hits, totalHits }) => {
          this.setState(prevState => ({
            images: [...prevState.images, ...hits],
            showBtn: page < Math.ceil(totalHits / 12),
          }));
          if (hits.length === 0) {
            return toast.info(
              'Sorry, there are no images matching your search query.'
            );
          }

          if (!photosLoaded) {
            this.setState({ photosLoaded: true });
            toast.success(`We found ${totalHits} photos`);
          }
        });
      } catch (error) {
        toast.error('Ops... something wrong');
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  handleSubmit = query => {
    if (query.trim() === '') {
      return toast.info(
        'Sorry, but the search field cannot be empty, please enter your query'
      );
    }

    this.setState({
      query,
      page: 1,
      images: [],
      showBtn: false,
      loading: true,
      photosLoaded: false,
    });
  };
  onButtonLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, showBtn, loading } = this.state;
    return (
      <AppContainer>
        <Searchbar onSubmit={this.handleSubmit} />
        {loading ? <Loader /> : <ImageGallery images={images} />}
        {showBtn && <Button onButtonLoadMore={this.onButtonLoadMore} />}
      </AppContainer>
    );
  }
}
