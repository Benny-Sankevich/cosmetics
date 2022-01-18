import { TranslationInterface, UIStateInterface } from './models';
import { ActionTree } from 'vuex';
import { MainStateInterface } from '../index';
import { httpClient } from '../../utils/http-client';
import { AppConstants } from '../../core/Export';

const actions: ActionTree<UIStateInterface, MainStateInterface> = {
  [AppConstants.Ui.ActionLoadTranslations]: (
    context
  ): Promise<void | TranslationInterface[]> => {
    return httpClient
      .post('translations/get-translations', {
        languageCode: context.getters[AppConstants.Ui.GetUserLangCode],
      })
      .then((response) => {
        if (response.status.toString() === '200') {
          context.commit(
            AppConstants.Ui.MutationSetTranslations,
            response.data as TranslationInterface[]
          );
        }
      });
  },
};

export default actions;
