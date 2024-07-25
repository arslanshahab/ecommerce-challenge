import { apiService } from './api';

interface ISignInDto {
  email: string;
  password: string;
}

interface ISignUpDto {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export const authApi = {
  signIn: (signInDto: ISignInDto) => 
    apiService.post<any>('/user/signIn', signInDto),
  
  signUp: (signUpDto: ISignUpDto) =>
    apiService.post<any>('/user/signup', signUpDto),
};