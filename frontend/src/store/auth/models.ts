export interface AuthStateInterface {
  user: UserAuthInterface;
  isAdminRole: boolean;
}
export interface UserAuthInterface {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  isAdmin: string;
  token: string;
  imageName: string;
}
export class RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
}
export class LoginForm {
  email: string;
  password: string;
}
