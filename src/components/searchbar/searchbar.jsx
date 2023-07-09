import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import {
  SearchFormButton,
  SearchFormContainer,
  SearchFormInput,
  SearchbarHeader,
} from './searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleInputChange = event => {
    setValue(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (value.trim() === '') {
      toast.info('Sorry, but the search field cannot be empty, please enter your query');
      return;
    }

    onSubmit(value);
    setValue('');
  };

  return (
    <SearchbarHeader>
      <SearchFormContainer onSubmit={handleSubmit}>
        <SearchFormInput
          onChange={handleInputChange}
          value={value}
          type="text"
          autoComplete="off"
          placeholder="Search images and photos"
        />

        <SearchFormButton type="submit">Search</SearchFormButton>
      </SearchFormContainer>
    </SearchbarHeader>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};


