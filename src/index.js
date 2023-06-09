import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Sign from './Sign';
import App from './App';
import History from './History';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
    <Route path='/' exact element={<Sign/>} />
    <Route path='/main' element={<App/>} />
    <Route path='/history' element={<History/>} />
    </Routes>
  </Router>,
  
);
