import { createStore, combineReducers, applyMiddleware } from 'redux';
import { myApps, isLoading } from './commons/reducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';



const reducers = {
    myApps
};


const rootReducer = combineReducers(reducers);

export const configureStore = () =>
    createStore(
        rootReducer,
        composeWithDevTools(
            applyMiddleware(thunk)
        )
        
    );