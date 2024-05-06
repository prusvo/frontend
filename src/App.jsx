import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';

import Auth from './Pages/Auth';
import Home from './Pages/Home';

import Search from './Pages/Search';



function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const token = localStorage.getItem('token');

  // useEffect(() => {
  //   setIsAuthenticated(!!token);
  // }, [token]);
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path='/' element={<Home/>}/>
        <Route path='/auth' element={<Auth/>}/>
        <Route path='/search' element={<Search/>}/>
   
        
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
