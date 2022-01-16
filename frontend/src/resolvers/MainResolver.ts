import { AppConstants } from '../core/Export';
import { appStore, MainStateInterface } from '../store/index'
import { Store } from 'vuex'

function resolveMainData() {
    const translationsPromise = (appStore as Store<MainStateInterface>).dispatch(`${AppConstants.UiModule}/${AppConstants.Ui.ActionLoadTranslations}`);

    return Promise.all([translationsPromise]);
}

export default resolveMainData;