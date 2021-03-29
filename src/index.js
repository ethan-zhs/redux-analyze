import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from './store'
import { Provider } from  './react-redux'
import logger from './middlewares/redux-logger'
import errorReport from './middlewares/redux-error'
import reducer from './reducer'
import Example from './Example'

const newCcreateStore = applyMiddleware([logger, errorReport])(createStore)

const store = newCcreateStore(reducer)

function App() {    
    return (
        <Provider store={store}>
            <Example />
        </Provider>        
    )
}

ReactDOM.render(<App />, document.getElementById('app'))