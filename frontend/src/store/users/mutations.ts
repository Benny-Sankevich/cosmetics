import { AppConstants } from '../../core/Export';
import { MutationTree } from 'vuex';
import { UsersStateInterface, User } from './models';

const mutation: MutationTree<UsersStateInterface> = {
  [AppConstants.Users.MutationSetUsers]: (state, payload: User[]): void => {
    state.users = payload;
  },
  [AppConstants.Users.MutationSaveUser]: (state, payload: User): void => {
    state.users.push(payload);
  },
  [AppConstants.Users.MutationUpdateUser]: (state, payload: User): void => {
    const indexToUpdate = state.users.findIndex((x) => x._id === payload._id);
    state.users[indexToUpdate] = payload;
  },
};

export default mutation;
