import { AxiosResponse } from 'axios';
import { Auth, SignInDTO, SignUpDTO } from 'src/types/Auth';
import { API } from 'src/api/common/HTTPRequest';
import { Endpoints } from 'src/constants';

export const AuthApi = {
  signup: (creds: SignUpDTO): Promise<AxiosResponse<Auth>> =>
    API.post(Endpoints.AUTH_SIGNUP, creds),
  signin: (creds: SignInDTO): Promise<AxiosResponse<Auth>> =>
    API.post(Endpoints.AUTH_SIGNIN, creds),
};
