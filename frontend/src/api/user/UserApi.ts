import { AxiosResponse } from 'axios';
import { Movie } from 'src/types/Movie';

import { Endpoints } from '../../constants';
import { API } from '../common/HTTPRequest';
import {
  User,
  UpdateUserDTO,
  UpdateUserMoviesDTO,
  GetUserMoviesDTO,
} from '../../types/User';

export const UserApi = {
  getSelf: (): Promise<AxiosResponse<User>> => API.get(Endpoints.USER_HIMSELF),
  editSelf: (body: UpdateUserDTO): Promise<AxiosResponse<User>> =>
    API.put(`${Endpoints.USER_HIMSELF}`, body),
  getMyMovies: (): Promise<AxiosResponse<GetUserMoviesDTO>> =>
    API.get(Endpoints.USER_MOVIES),
  editMyMovies: (
    body: UpdateUserMoviesDTO,
  ): Promise<AxiosResponse<GetUserMoviesDTO>> =>
    API.put(`${Endpoints.USER_MOVIES}`, body),
};
