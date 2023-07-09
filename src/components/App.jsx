import React, { useState, useEffect, useRef } from 'react';
import { Searchbar } from './searchbar/searchbar';
import { getImages } from '../service/imageApi';
import { ImageGallery } from './imageGallery/imageGallery';
import { Button } from './button/button';
import { toast } from 'react-toastify';
import { Loader } from './loader/loader';
import { AppContainer } from './App.styled';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [showBtn, setShowBtn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [photosLoaded, setPhotosLoaded] = useState(false);
  const prevQuery = useRef('');

  useEffect(() => {
    const fetchData = async () => {
      if (query !== prevQuery.current || page !== 1) {
        setLoading(true);

        try {
          const { hits, totalHits } = await getImages(query, page);

          setImages(prevImages => [...prevImages, ...hits]);
          setShowBtn(page < Math.ceil(totalHits / 12));

          if (hits.length === 0) {
            toast.info('Sorry, there are no images matching your search query.');
          }

          if (!photosLoaded) {
            setPhotosLoaded(true);
            toast.success(`We found ${totalHits} photos`);
          }
        } catch (error) {
          toast.error('Oops... something went wrong');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
    prevQuery.current = query;
  }, [query, page, photosLoaded]);

  const handleSubmit = newQuery => {
    if (newQuery.trim() === '') {
      toast.info('Sorry, but the search field cannot be empty, please enter your query');
    } else {
      setQuery(newQuery);
      setPage(1);
      setImages([]);
      setShowBtn(false);
      setLoading(true);
      setPhotosLoaded(false);
    }
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <AppContainer>
      <Searchbar onSubmit={handleSubmit} />
      {loading ? <Loader /> : <ImageGallery images={images} />}
      {showBtn && <Button onButtonLoadMore={handleLoadMore} />}
    </AppContainer>
  );
};


