import React, {Component} from 'react'
import {Provider} from 'react-redux'
import {BrowserRouter, Route} from 'react-router-dom'
import Root from './Root'
import store from '../store'

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Provider store={store}>
                    <Route component={Root} />
                </Provider>
            </BrowserRouter>
    )}
}
export default App;