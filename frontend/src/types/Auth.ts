export interface Auth {
  accesstoken: string;
}

export interface SignUpDTO {
  email: string;
  password: string;
}
export interface SignInDTO extends SignUpDTO {}
