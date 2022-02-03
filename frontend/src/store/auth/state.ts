import { AuthStateInterface } from './models';

const sessionStorageUser = JSON.parse(sessionStorage.getItem('user'));

const state: AuthStateInterface = {
  user: sessionStorageUser ? sessionStorageUser : null,
  isAdminRole:
    sessionStorageUser && sessionStorageUser.isAdmin === process.env.adminKey
      ? true
      : false,
};

export default state;
