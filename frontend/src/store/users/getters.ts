import { AppConstants } from 'src/core/Export';
import { GetterTree } from 'vuex';
import { MainStateInterface } from '..';
import { UsersStateInterface } from './models';

const getters: GetterTree<UsersStateInterface, MainStateInterface> = {
  [AppConstants.Users.GetUsers]: (state) => {
    return state.users;
  },
};
export default getters;
