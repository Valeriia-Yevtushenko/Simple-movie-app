import { AxiosResponse } from 'axios';

import { Endpoints } from '../../constants';
import { API } from '../common/HTTPRequest';
import { Movie, CreateMovieDTO, UpdateMovieDTO } from '../../types/Movie';

const endpointBase = Endpoints.MOVIES;

export const MovieApi = {
  getList: (): Promise<AxiosResponse<Movie[]>> => API.get(endpointBase),
  getSingle: (movieId: number) => API.get(`${endpointBase}/${movieId}`),
  create: (body: CreateMovieDTO): Promise<AxiosResponse<Movie>> =>
    API.post(endpointBase, body),
  edit: (
    body: UpdateMovieDTO,
    movieId: number,
  ): Promise<AxiosResponse<Movie>> =>
    API.put(`${endpointBase}/${movieId}`, body),
  delete: (movieId: number): Promise<AxiosResponse<void>> =>
    API.delete(`${endpointBase}/${movieId}`),
};
