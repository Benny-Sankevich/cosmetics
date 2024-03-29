import { AppConstants } from '../../core/Export';
import { appStore, MainStateInterface } from '../../store/index';

import { Store } from 'vuex';

function resolveCalendar() {
  const usersPromise = (appStore as Store<MainStateInterface>).dispatch(
    `${AppConstants.UsersModule}/${AppConstants.Users.ActionLoadUsers}`
  );

  return Promise.all([usersPromise]);
}

export default resolveCalendar;
