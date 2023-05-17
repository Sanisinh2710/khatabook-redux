import {
    Route,
    BrowserRouter as Router,
    Routes

} from 'react-router-dom';

import Auth from './routes/auth';
import  Unauth  from './routes/unauth';

const App = () => {


    return (

        <Router>
            <Routes>
                <Route path="/public/*" element={<Unauth/>} />
                <Route path="*" element={<Auth/>} />
            </Routes>
        </Router>


    )

}


export default App;