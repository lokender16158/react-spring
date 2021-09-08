import {loadAppsInProgress, loadAppssSuccess, loadAppsFailure} from './actions'

export const loadApps = () => async (dispatch, getState) => {
    try {
        dispatch(loadAppsInProgress());
        const response = await fetch('http://localhost:8080/getApps');
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