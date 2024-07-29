import axios from 'axios';
import {apiAccessToken, apiKey} from '../constants';

//End points
const apiBaseURL = 'https://api.themoviedb.org/3';
const trendingMoviesEndpoint = `${apiBaseURL}/trending/movie/day?language=en-US?api_key=${apiKey}`;
const upComingMoviesEndpoint = `${apiBaseURL}/movie/upcoming?language=en-US&page=1?api_key=${apiKey}`;
const topMoviesEndpoint = `${apiBaseURL}/movie/top_rated?language=en-US&page=1?api_key=${apiKey}`;
const personDetailsEndpoint = id =>
  `${apiBaseURL}/person/${id}?api_key=${apiKey}&language=en-US`;
const personMoviesEndpoint = id =>
  `${apiBaseURL}/person/${id}/movie_credits?api_key=${apiKey}&language=en-US`;
const movieDetailsEndpoint = id =>
  `${apiBaseURL}/movie/${id}?language=en-US&api_key=${apiKey}`;
const movieCreditsEndpoint = id =>
  `${apiBaseURL}/movie/${id}/credits?api_key=${apiKey}&language=en-US`;
const similarMoviesEndPoint = id =>
  `${apiBaseURL}/movie/${id}/similar?api_key=${apiKey}&language=en-US`;

const searchedMoviesEndpoint = () =>
  `${apiBaseURL}/search/movie?api_key=${apiKey}`;

export const image500 = path =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : null;

export const image342 = path =>
  path ? `https://image.tmdb.org/t/p/w342${path}` : null;

export const image185 = path =>
  path ? `https://image.tmdb.org/t/p/w185${path}` : null;

const apiCall = async (endpoint, params) => {
  console.log(endpoint, params);
  const options = {
    method: 'GET',
    url: endpoint,
    params: params ? params : {},
    headers: {
      Authorization: `Bearer ${apiAccessToken}`,
    },
  };

  try {
    const response = await axios.request(options);
    return response?.data;
  } catch (error) {
    console.log(error, 'Error!!!');
    return {};
  }
};

export const fetchTrendingMovies = () => {
  return apiCall(trendingMoviesEndpoint);
};

export const fetchUpComingMovies = () => {
  return apiCall(upComingMoviesEndpoint);
};
export const fetchTopMovies = () => {
  return apiCall(topMoviesEndpoint);
};

export const fetchMovieDetails = id => {
  return apiCall(movieDetailsEndpoint(id));
};
export const fetchMovieCredits = id => {
  return apiCall(movieCreditsEndpoint(id));
};
export const fetchSimilarMovies = id => {
  return apiCall(similarMoviesEndPoint(id));
};

export const fetchPersonDetails = id => {
  return apiCall(personDetailsEndpoint(id));
};
export const fetchPersonMovies = id => {
  return apiCall(personMoviesEndpoint(id));
};

export const fetchSearchedMovies = params => {
  return apiCall(searchedMoviesEndpoint(), params);
};
