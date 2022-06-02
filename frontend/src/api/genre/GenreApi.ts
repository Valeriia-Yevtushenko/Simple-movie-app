import { AxiosResponse } from 'axios';

import { Endpoints } from '../../constants';
import { API } from '../common/HTTPRequest';
import { Genre, CreateGenreDTO, UpdateGenreDTO } from '../../types/Genre';

const endpointBase = Endpoints.GENRES;

export const GenreApi = {
  getList: (): Promise<AxiosResponse<Genre[]>> => API.get(endpointBase),
  getSingle: (genreId: number) => API.get(`${endpointBase}/${genreId}`),
  create: (body: CreateGenreDTO): Promise<AxiosResponse<Genre>> =>
    API.post(endpointBase, body),
  edit: (
    body: UpdateGenreDTO,
    genreId: number,
  ): Promise<AxiosResponse<Genre>> =>
    API.put(`${endpointBase}/${genreId}`, body),
  delete: (genreId: number): Promise<AxiosResponse<void>> =>
    API.delete(`${endpointBase}/${genreId}`),
};
