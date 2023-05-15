import {
    Route,
    BrowserRouter as Router,
    Routes

} from 'react-router-dom';

import Auth from './routes/auth';
import  Unauth  from './routes/unauth';
import TableContext from './contexts/transection';

const App = () => {


    return (
        <TableContext>
            <Router>
            <Routes>
                <Route path="/public/*" element={<Unauth/>} />
                <Route path="*" element={<Auth/>} />
            </Routes>
        </Router>
        </TableContext>
        

    )

}


export default App;