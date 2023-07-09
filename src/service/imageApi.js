import axios from "axios";

const API_KEY = '37050387-e4c3f855052e73f889b68f3e3';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: API_KEY,
    orientation: 'horizontal',
    image_type: 'photo',
    per_page: 12,
  },
});

export const getImages = async (query, page) => {
  const { data } = await instance.get(`?q=${query}&page=${page}`);
  return data;
};



