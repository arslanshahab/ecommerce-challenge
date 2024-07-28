import { ISignInDto, ISignUpDto } from '@/types/auth.types';
import { apiService } from './api';

export const authApi = {
  signIn: (signInDto: ISignInDto) => 
    apiService.post<any>('/user/signIn', signInDto),
  
  signUp: (signUpDto: ISignUpDto) =>
    apiService.post<any>('/user/signup', signUpDto),
};