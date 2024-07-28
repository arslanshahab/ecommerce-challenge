export interface ISignInDto {
  email: string;
  password: string;
}

export interface ISignUpDto {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface IAuthContextType {
  token: string | null;
  saveAuthToken: (token: string) => void;
  removeAuthToken: () => void;
}
