import { AppConstants } from '../../core/Export';
import { MainStateInterface } from './../index';
import { ActionTree } from 'vuex';
import { httpClient } from '../../utils/http-client';
import { User, UsersStateInterface } from './models';

const actions: ActionTree<UsersStateInterface, MainStateInterface> = {
  [AppConstants.Users.ActionLoadUsers]: (context): Promise<void | User[]> => {
    return httpClient.post('users/get-users').then((response) => {
      if (response.status.toString() === '200') {
        context.commit(
          AppConstants.Users.MutationSetUsers,
          response.data as User[]
        );
      }
    });
  },
  [AppConstants.Users.ActionSaveUser]: (
    context,
    payload: User
  ): Promise<void | User> => {
    return httpClient.post('users/add-user', payload).then((response) => {
      if (response.status.toString() === '201') {
        context.commit(
          AppConstants.Users.MutationSaveUser,
          response.data as User
        );
      }
    });
  },
  [AppConstants.Users.ActionEditUser]: (
    context,
    payload: User
  ): Promise<void | User> => {
    return httpClient.post('users/update-user', payload).then((response) => {
      if (response.status.toString() === '201') {
        context.commit(
          AppConstants.Users.MutationUpdateUser,
          response.data as User
        );
      }
    });
  },
};
export default actions;
