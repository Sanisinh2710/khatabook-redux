import {
    Route,
    BrowserRouter as Router,
    Routes

} from 'react-router-dom';

import Auth from './routes/auth';
import  Unauth  from './routes/unauth';
import { store } from './redux-duck/store'
import { Provider } from 'react-redux'
import { CookiesProvider } from 'react-cookie';
import * as React from 'react'

const App  = () => {


    return (
        <CookiesProvider>
        <Provider store={store}>
            <Router>
            <Routes>
                <Route path="/public/*" element={<Unauth/>} />
                <Route path="*" element={<Auth/>} />
            </Routes>
        </Router>
        </Provider>
        </CookiesProvider>
    )

}


export default App;