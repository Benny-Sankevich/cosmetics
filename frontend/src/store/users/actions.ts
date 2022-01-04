import { AppConstants } from 'src/core/Export';
import { MainStateInterface } from './../index';
import { ActionTree } from 'vuex';
import { httpClient } from 'src/utils/http-client';
import { UserInterface, UsersStateInterface } from './models';

const actions: ActionTree<UsersStateInterface, MainStateInterface> = {
  [AppConstants.Users.ActionLoadUsers]: (context) => {
    return httpClient.post('users/get-users').then((response) => {
      if (response.status.toString() === '200') {
        context.commit(          
          AppConstants.Users.MutationSetUsers,
          response.data as UserInterface[]
        );
      }
    });
  },
  [AppConstants.Users.ActionSaveUser]: (
    context,
    payload: UserInterface
  ) => {
    return httpClient
      .post('users/add-user', payload)
      .then((response) => {
        if (response.status.toString() === '201') {
          context.commit(
            AppConstants.Users.MutationSaveUser,
            response.data as UserInterface
          );
        }
      });
  },
  [AppConstants.Users.ActionEditUser]: (context, payload: UserInterface) => {
    return httpClient
      .post('users/update-user', payload)
      .then((response) => {
        if (response.status.toString() === '201') {         
          context.commit(
            AppConstants.Users.MutationUpdateUser,
            response.data as UserInterface
          );
        }
      });
  },
}
export default actions;
