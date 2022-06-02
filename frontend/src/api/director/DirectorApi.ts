import { AxiosResponse } from 'axios';

import { Endpoints } from '../../constants';
import { API } from '../common/HTTPRequest';
import {
  Director,
  CreateDirectorDTO,
  UpdateDirectorDTO,
} from '../../types/Director';

const endpointBase = Endpoints.DIRECTORS;

export const DirectorApi = {
  getList: (): Promise<AxiosResponse<Director[]>> => API.get(endpointBase),
  getSingle: (directorId: number) => API.get(`${endpointBase}/${directorId}`),
  create: (body: CreateDirectorDTO): Promise<AxiosResponse<Director>> =>
    API.post(endpointBase, body),
  edit: (
    body: UpdateDirectorDTO,
    directorId: number,
  ): Promise<AxiosResponse<Director>> =>
    API.put(`${endpointBase}/${directorId}`, body),
  delete: (directorId: number): Promise<AxiosResponse<void>> =>
    API.delete(`${endpointBase}/${directorId}`),
};
