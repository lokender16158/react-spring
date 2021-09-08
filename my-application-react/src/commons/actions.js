export const CREATE_APP = 'CREATE_APP';
export const createApp = myApp => ({
    type: CREATE_APP,
    payload: { myApp },
});

export const LOAD_APPS_IN_PROGRESS = 'LOAD_APPS_IN_PROGRESS';
export const loadAppsInProgress = () => ({
    type: LOAD_APPS_IN_PROGRESS,
});

export const LOAD_APPS_SUCCESS = 'LOAD_APPS_SUCCESS';
export const loadAppssSuccess = myApps => ({
    type: LOAD_APPS_SUCCESS,
    payload: { myApps },
});

export const LOAD_APPS_FAILURE = 'LOAD_APPS_FAILURE';
export const loadAppsFailure = () => ({
    type: LOAD_APPS_FAILURE,
});

