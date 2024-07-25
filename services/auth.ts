import { apiService } from './api';

interface ISignInDto {
  email: string;
  password: string;
}

export const authApi = {
  signIn: (signInDto: ISignInDto) => 
    apiService.post<any>('/user/signIn', signInDto),
};