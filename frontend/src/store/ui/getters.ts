import { AppConstants } from '../../core/Export';
import { GetterTree } from 'vuex';
import { MainStateInterface } from '../index';
import { UIStateInterface } from './models';

const getters: GetterTree<UIStateInterface, MainStateInterface> = {
    [AppConstants.Ui.GetIsFormDirty]: (state) => {
        return state.isDirty
    },

    [AppConstants.Ui.GetPendingRequestsCount]: (state) => {
        return state.pendingHttpRequests.length
    },

    [AppConstants.Ui.GetAllTranslations]: state => {
        return state.allTranslations.reduce(
            (prevValue, translation) => ({
                ...prevValue,
                [translation.code]: translation.value
            }),
            {}
        );
    },

    [AppConstants.Ui.GetRouteParamId]: (state) => {
        return state.routeParamId
    },

    [AppConstants.Ui.GetUserLangCode]: state => {
        return state.userLangCode
    }
};

export default getters;
