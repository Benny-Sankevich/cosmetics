import { AppConstants } from '../../core/Export';
import { GetterTree } from 'vuex';
import { MainStateInterface } from '..';
import { User, UsersStateInterface } from './models';

const getters: GetterTree<UsersStateInterface, MainStateInterface> = {
  [AppConstants.Users.GetUsers]: (state): User[] => {
    return state.users;
  },
};
export default getters;
