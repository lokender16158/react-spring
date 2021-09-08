
import {
    CREATE_APP, LOAD_APPS_IN_PROGRESS, LOAD_APPS_FAILURE, LOAD_APPS_SUCCESS
} from './actions';


const initialState = {
    data: [],
    isLoading: false
}

export const myApps = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
    case CREATE_APP: {
        const { myApp } = payload;
        return state;
    }
    case LOAD_APPS_SUCCESS: {
        const { myApps } = payload;
        return {
            ...state,
            data: myApps,
            isLoading: false
        };
    }
    case LOAD_APPS_IN_PROGRESS: {
        return {
            ...state,
            isLoading: true
        }
    }
    case LOAD_APPS_FAILURE: {
        return {
            data: [],
            isLoading: false
        }
    }
    default:
        return state;
    }
    
}