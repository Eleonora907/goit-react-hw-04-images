import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import {
  SearchFormButton,
  SearchFormContainer,
  SearchFormInput,
  SearchbarHeader,
} from './searchbar.styled';

export class Searchbar extends Component {
  state = {
    value: '',
  };

  handleInputChange = ({ target }) => {
    this.setState({ value: target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { value } = this.state;
    if (value.trim() === '') {
      toast.info(
        'Sorry, but the search field cannot be empty, please enter your query'
      );
      return;
    }

    this.props.onSubmit(value);
    this.setState({ value: '' });
  };

  render() {
    const { value } = this.state;
    return (
      <SearchbarHeader>
        <SearchFormContainer onSubmit={this.handleSubmit}>
          <SearchFormInput
            onChange={this.handleInputChange}
            value={value}
            type="text"
            autoComplete="off"
            placeholder="Search images and photos"
          />

          <SearchFormButton type="submit">Search</SearchFormButton>
        </SearchFormContainer>
      </SearchbarHeader>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
