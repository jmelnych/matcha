import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers' //no need to specify index


const initialState = {};
const middleware   = [thunk];

// Redux DevTools Chrome addon
//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store            = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...middleware),
        //composeEnhancers
    )
);

export default store;