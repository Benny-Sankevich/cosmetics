import { AppConstants } from 'src/core/Export';
import { MutationTree } from 'vuex';
import { UsersStateInterface, UserInterface } from './models';

const mutation: MutationTree<UsersStateInterface> = {
  [AppConstants.Users.MutationSetUsers]: (state, payload: UserInterface[]) => {
    state.users = payload;
  },
  [AppConstants.Users.MutationSaveUser]: (
    state,
    payload: UserInterface
  ) => {
    state.users.push(payload);    
  },
  [AppConstants.Users.MutationUpdateUser]: (
    state,
    payload: UserInterface
  ) => {
    const indexToUpdate = state.users.findIndex(
      (x) => x._id === payload._id
    );
    state.users[indexToUpdate] = payload;
  },
};

export default mutation;
