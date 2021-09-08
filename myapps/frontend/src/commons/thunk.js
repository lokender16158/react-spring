import {loadAppsInProgress, loadAppssSuccess, loadAppsFailure} from './actions'
import { getAllApisUri } from './apis';

export const loadApps = () => async (dispatch, getState) => {
    try {
        dispatch(loadAppsInProgress());
        const response = await fetch(getAllApisUri());
        const apps = await response.json();
        setTimeout(() => {
            dispatch(loadAppssSuccess(apps));
        }, 1000);
    } catch (e) {
        dispatch(loadAppsFailure());
        dispatch(displayAlert(e));
    }
}


export const displayAlert = text => () => {
    alert(text);
};