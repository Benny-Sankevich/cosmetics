import { UIStateInterface } from './models';

const state: UIStateInterface = {
  allTranslations: [],

  pendingHttpRequests: [],

  //
  // Forms
  //
  isDirty: false,

  routeParamId: '',
  userLangCode: JSON.parse(localStorage.getItem('lang'))
    ? JSON.parse(localStorage.getItem('lang'))
    : 'he',
};

export default state;
