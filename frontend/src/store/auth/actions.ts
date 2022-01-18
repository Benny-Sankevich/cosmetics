import { AppConstants } from '../../core/Export';
import { MainStateInterface } from './../index';
import { ActionTree } from 'vuex';
import { httpClient } from '../../utils/http-client';
import {
  LoginForm,
  RegisterForm,
  UserAuthInterface,
  AuthStateInterface,
} from './models';
import { User } from '../users/models';

const actions: ActionTree<AuthStateInterface, MainStateInterface> = {
  [AppConstants.Auth.ActionAuthLoggedIn]: (
    context,
    payload: LoginForm
  ): Promise<UserAuthInterface> => {
    return httpClient.post('auth/login', payload).then((response) => {
      if (response.status.toString() === '200') {
        context.commit(
          AppConstants.Auth.MutationAuthLoggedIn,
          response.data as UserAuthInterface
        );
        if (response.data.isAdmin === process.env.adminKey) {
          context.commit(AppConstants.Auth.MutationSetSystemRole, true);
        }
        return response.data as UserAuthInterface;
      }
    });
  },

  [AppConstants.Auth.ActionAuthRegistered]: (
    context,
    payload: RegisterForm
  ): Promise<UserAuthInterface> => {
    return httpClient.post('auth/register', payload).then((response) => {
      if (response.status.toString() === '200') {
        context.commit(
          AppConstants.Auth.MutationAuthLoggedIn,
          response.data as UserAuthInterface
        );
        if (response.data.isAdmin === process.env.adminKey) {
          context.commit(AppConstants.Auth.MutationSetSystemRole, true);
        }
        return response.data as UserAuthInterface;
      }
    });
  },

  [AppConstants.Auth.ActionAuthLoggedOut]: (context, payload: any): void => {
    context.commit(AppConstants.Auth.MutationAuthRemove, payload);
    context.commit(AppConstants.Auth.MutationSetSystemRole, false);
  },

  [AppConstants.Auth.ActionEditUserProfile]: (
    context,
    payload: User
  ): Promise<void | UserAuthInterface> => {
    return httpClient.post('users/update-user', payload).then((response) => {
      if (response.status.toString() === '201') {
        context.commit(
          AppConstants.Auth.MutationEditUserProfile,
          response.data as UserAuthInterface
        );
      }
    });
  },
};

export default actions;
